#!/usr/bin/env node

/**
 * Import Excel/CSV data into Airtable
 *
 * Usage:
 *   node scripts/import-excel-to-airtable.js --file path/to/jobs.csv
 *
 * Prerequisites:
 *   npm install airtable csv-parser
 *
 * Environment variables (in .env.local):
 *   AIRTABLE_API_KEY=pat_your_token
 *   AIRTABLE_BASE_ID=app_your_base_id
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Load environment variables from .env.local
function loadEnv() {
  const envPath = path.resolve(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=');
        if (key && value) {
          process.env[key.trim()] = value.trim();
        }
      }
    });
  }
}

loadEnv();

const Airtable = require('airtable');

// Configuration
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = 'Jobs'; // Change this to match your table name
const BATCH_SIZE = 10; // Airtable allows max 10 records per request

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  console.error('Error: Missing environment variables.');
  console.error('Make sure AIRTABLE_API_KEY and AIRTABLE_BASE_ID are set in .env.local');
  process.exit(1);
}

// Parse command line arguments
const args = process.argv.slice(2);
const fileIndex = args.indexOf('--file');
if (fileIndex === -1 || !args[fileIndex + 1]) {
  console.error('Usage: node import-excel-to-airtable.js --file path/to/data.csv');
  process.exit(1);
}
const csvFilePath = path.resolve(args[fileIndex + 1]);

if (!fs.existsSync(csvFilePath)) {
  console.error(`Error: File not found: ${csvFilePath}`);
  process.exit(1);
}

// Initialize Airtable
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

/**
 * Map CSV row to Airtable fields.
 * Adjust this mapping to match your CSV columns and Airtable field names.
 */
function mapRowToFields(row) {
  return {
    'Job Name': row['Job Name'] || row['Name'] || row['name'] || '',
    'Client': row['Client'] || row['client'] || row['Customer'] || '',
    'Address': row['Address'] || row['address'] || row['Location'] || '',
    'Status': mapStatus(row['Status'] || row['status'] || ''),
    'Start Date': row['Start Date'] || row['start_date'] || row['StartDate'] || null,
    'End Date': row['End Date'] || row['end_date'] || row['EndDate'] || null,
    'Priority': mapPriority(row['Priority'] || row['priority'] || ''),
    'Notes': row['Notes'] || row['notes'] || row['Description'] || '',
  };
}

function mapStatus(status) {
  const normalized = status.toLowerCase().trim();
  const statusMap = {
    'not started': 'Not Started',
    'new': 'Not Started',
    'pending': 'Not Started',
    'in progress': 'In Progress',
    'active': 'In Progress',
    'started': 'In Progress',
    'on hold': 'On Hold',
    'paused': 'On Hold',
    'completed': 'Completed',
    'done': 'Completed',
    'finished': 'Completed',
    'cancelled': 'Cancelled',
    'canceled': 'Cancelled',
  };
  return statusMap[normalized] || 'Not Started';
}

function mapPriority(priority) {
  const normalized = priority.toLowerCase().trim();
  const priorityMap = {
    'low': 'Low',
    'medium': 'Medium',
    'med': 'Medium',
    'normal': 'Medium',
    'high': 'High',
    'urgent': 'Urgent',
    'critical': 'Urgent',
  };
  return priorityMap[normalized] || 'Medium';
}

/**
 * Import records in batches (Airtable limit: 10 per request)
 */
async function importBatch(records) {
  const airtableRecords = records.map(fields => ({ fields }));
  try {
    const created = await base(TABLE_NAME).create(airtableRecords);
    return created.length;
  } catch (error) {
    console.error('Error importing batch:', error.message);
    throw error;
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main import function
 */
async function main() {
  console.log(`Importing from: ${csvFilePath}`);
  console.log(`Target table: ${TABLE_NAME}`);
  console.log('');

  // Read CSV file
  const rows = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', resolve)
      .on('error', reject);
  });

  console.log(`Found ${rows.length} records to import.`);

  // Map rows to Airtable fields
  const records = rows.map(mapRowToFields);

  // Import in batches
  let imported = 0;
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const count = await importBatch(batch);
    imported += count;
    console.log(`Imported ${imported}/${records.length} records...`);

    // Rate limiting: Airtable allows 5 requests per second
    if (i + BATCH_SIZE < records.length) {
      await sleep(250);
    }
  }

  console.log('');
  console.log(`Import complete! ${imported} records imported to "${TABLE_NAME}".`);
}

main().catch(error => {
  console.error('Import failed:', error);
  process.exit(1);
});
