# Crew Management System — Requirements & Analysis

## Executive Summary

Motu is a crew management system for a construction/trades business currently managing approximately 264 jobs. The system replaces manual Excel-based tracking with a modern web application for crew scheduling, job management, and operational oversight.

---

## Business Requirements

### Core Problem

- Managing 264+ jobs across multiple crews using spreadsheets is error-prone and inefficient
- No real-time visibility into crew availability or job status
- Scheduling conflicts are discovered too late
- No centralized communication or reporting

### Key Users

1. **Business Owner / Manager** — Oversees all jobs, assigns crews, monitors progress
2. **Foremen / Team Leads** — View their assignments, update job status in the field
3. **Office Staff** — Data entry, reporting, client communication

---

## Functional Requirements

### 1. Job Management

- **Create/Edit/Archive jobs** with all relevant details
- **Job statuses:** Not Started, In Progress, On Hold, Completed, Cancelled
- **Job details:** Client info, address, dates, priority, budget, notes
- **Search and filter** jobs by status, client, date range, priority
- **Job timeline view** — visual overview of job schedules

### 2. Crew Management

- **Crew member profiles** with contact info, skills, certifications, pay rates
- **Availability tracking** — who is available on any given day
- **Skill matching** — find crew members with specific skills for a job
- **Status tracking:** Available, On Job, On Leave, Inactive

### 3. Scheduling & Assignments

- **Assign crew to jobs** by date
- **Calendar view** — see all assignments across crews and jobs
- **Conflict detection** — prevent double-booking crew members
- **Drag-and-drop scheduling** (nice to have)
- **Recurring assignments** for ongoing jobs

### 4. Daily Operations

- **Daily crew sheet** — who is going where today
- **Time tracking** — log hours per crew member per job
- **Daily notes** — field updates and observations
- **Photo uploads** — job site documentation (future phase)

### 5. Reporting

- **Job summary reports** — status overview across all jobs
- **Crew utilization** — how busy is each crew member
- **Hours reports** — hours logged per job, per crew member, per date range
- **Export to CSV/Excel** for accounting

### 6. Notifications (Future Phase)

- Schedule change alerts
- Job status update notifications
- Crew availability reminders

---

## Non-Functional Requirements

### Performance

- Page load under 2 seconds
- Support 10+ concurrent users
- Handle 500+ jobs without performance degradation

### Security

- User authentication (email + password)
- Role-based access control (Admin, Manager, Crew)
- HTTPS everywhere
- Environment variables for API keys (never committed to repo)

### Availability

- 99% uptime target
- Mobile-responsive design (crews use phones in the field)
- Works on modern browsers (Chrome, Safari, Firefox, Edge)

---

## Recommended Tech Stack

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Frontend | Next.js (React) | Modern, fast, great DX, easy deployment |
| Backend/API | Next.js API Routes | Keeps everything in one project |
| Database | Airtable | Easy to start, visual interface, API included |
| Hosting | Vercel | Free tier, auto-deploys from GitHub |
| Authentication | NextAuth.js | Simple auth for Next.js apps |
| Styling | Tailwind CSS | Rapid UI development, responsive by default |

### Why Airtable?

- Already a spreadsheet-like interface (familiar for Excel users)
- Built-in API — no database setup needed
- Visual interface for data management alongside the app
- Free tier supports the initial scale
- Can migrate to PostgreSQL later if needed

### Future Migration Path

If the system outgrows Airtable:
1. Airtable -> Supabase (PostgreSQL) — straightforward migration
2. Add real-time features with Supabase subscriptions
3. Scale to unlimited records and users

---

## Data Model

### Jobs
```
- id (auto)
- name (string)
- client (string)
- address (text)
- status (enum: not_started, in_progress, on_hold, completed, cancelled)
- start_date (date)
- end_date (date)
- priority (enum: low, medium, high, urgent)
- budget (currency)
- notes (text)
- created_at (datetime)
- updated_at (datetime)
```

### Crew Members
```
- id (auto)
- name (string)
- role (enum: foreman, labourer, operator, subcontractor)
- phone (string)
- email (string)
- status (enum: available, on_job, on_leave, inactive)
- skills (array of strings)
- daily_rate (currency)
- emergency_contact (string)
- notes (text)
```

### Assignments
```
- id (auto)
- job_id (foreign key -> Jobs)
- crew_member_id (foreign key -> Crew Members)
- date (date)
- hours (number)
- status (enum: scheduled, completed, cancelled)
- notes (text)
```

### Users (Authentication)
```
- id (auto)
- email (string)
- name (string)
- role (enum: admin, manager, crew)
- created_at (datetime)
```

---

## Phased Delivery

### Phase 1 — Foundation (Week 1)
- Project setup (Next.js, Airtable, Vercel)
- Job CRUD (create, read, update, delete)
- Crew member CRUD
- Basic list views with search/filter

### Phase 2 — Scheduling (Week 2)
- Assignment management
- Calendar view
- Daily crew sheet
- Conflict detection

### Phase 3 — Operations (Week 3-4)
- Time tracking / hours logging
- Basic reporting
- CSV export
- User authentication

### Phase 4 — Polish (Ongoing)
- Drag-and-drop scheduling
- Photo uploads
- Notifications
- Advanced reporting and dashboards
- Mobile app (React Native or PWA)
