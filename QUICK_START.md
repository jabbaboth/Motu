# Quick Start — Get Running in 1 Hour

This guide gets you from zero to a working crew management prototype as fast as possible.

---

## Step 1: Set Up Airtable (15 minutes)

1. Go to [airtable.com](https://airtable.com) and create a free account
2. Create a new base called **"Motu Crew Management"**
3. Create the following tables:

### Jobs Table

| Field Name | Field Type | Notes |
|-----------|-----------|-------|
| Job ID | Auto Number | Primary key |
| Job Name | Single Line Text | Project/job name |
| Client | Single Line Text | Client name |
| Address | Long Text | Job site address |
| Status | Single Select | Options: `Not Started`, `In Progress`, `On Hold`, `Completed` |
| Start Date | Date | Planned start |
| End Date | Date | Planned end |
| Priority | Single Select | Options: `Low`, `Medium`, `High`, `Urgent` |
| Notes | Long Text | Additional details |

### Crew Members Table

| Field Name | Field Type | Notes |
|-----------|-----------|-------|
| Name | Single Line Text | Full name |
| Role | Single Select | e.g., `Foreman`, `Labourer`, `Operator`, `Subcontractor` |
| Phone | Phone Number | Contact number |
| Email | Email | Contact email |
| Status | Single Select | Options: `Available`, `On Job`, `On Leave`, `Inactive` |
| Skills | Multiple Select | e.g., `Excavation`, `Concrete`, `Framing`, `Roofing` |
| Daily Rate | Currency | Pay rate |

### Assignments Table

| Field Name | Field Type | Notes |
|-----------|-----------|-------|
| Job | Link to Jobs | Links to Jobs table |
| Crew Member | Link to Crew Members | Links to Crew Members table |
| Date | Date | Assignment date |
| Hours | Number | Hours worked |
| Notes | Long Text | Daily notes |

---

## Step 2: Import Your Jobs from Excel (15 minutes)

### Option A: Manual Import (Easiest)

1. Open your Excel spreadsheet with the 264 jobs
2. In Airtable, click the **"+"** on the Jobs table toolbar
3. Select **"CSV file"** import
4. Map your Excel columns to the Airtable fields above
5. Review and confirm the import

### Option B: Scripted Import

1. Export your Excel file as CSV
2. Install Node.js if you don't have it: [nodejs.org](https://nodejs.org)
3. Run:
   ```bash
   cd Motu
   npm install
   node scripts/import-excel-to-airtable.js --file your-jobs.csv
   ```

---

## Step 3: Get API Credentials (10 minutes)

1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Create a new personal access token
3. Give it these scopes:
   - `data.records:read`
   - `data.records:write`
   - `schema.bases:read`
4. Select your "Motu Crew Management" base
5. Copy the token — you'll need it for the app

Get your Base ID:
1. Go to [airtable.com/api](https://airtable.com/api)
2. Click on your "Motu Crew Management" base
3. The Base ID starts with `app...` — copy it

Create a `.env.local` file:
```bash
AIRTABLE_API_KEY=pat...your_token_here
AIRTABLE_BASE_ID=app...your_base_id_here
```

---

## Step 4: Run the App Locally (20 minutes)

```bash
# Clone the repo (if you haven't already)
git clone https://github.com/jabbaboth/Motu.git
cd Motu

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Edit .env.local with your Airtable credentials

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## What You Should See

After completing these steps:

- A dashboard showing your jobs
- Ability to view and edit job details
- Crew member list
- Basic assignment/scheduling view

---

## Next Steps

- **Want to build more features?** See `docs/implementation_guide.md`
- **Want to hire a developer?** See `docs/developer_prompt.md`
- **Want the full requirements?** See `docs/crew_management_system_requirements.md`
- **Need to deploy?** See `docs/github_setup_guide.md` for deployment instructions
