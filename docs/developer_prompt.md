# Developer Prompt — Motu Crew Management System

Use this document as a brief when hiring a developer or when prompting an AI to build the application.

---

## Project Brief

Build a **crew management web application** for a construction/trades business managing 264+ jobs. The app replaces Excel-based tracking with a modern, mobile-friendly system.

### Tech Stack (Required)

- **Framework:** Next.js 14+ (App Router)
- **Database:** Airtable (via REST API)
- **Styling:** Tailwind CSS
- **Auth:** NextAuth.js
- **Deployment:** Vercel
- **Language:** TypeScript

### Core Features (Priority Order)

1. **Job Management** — CRUD for jobs with status tracking, search, and filtering
2. **Crew Management** — CRUD for crew members with skills, availability, and contact info
3. **Scheduling** — Assign crew to jobs by date, calendar view, conflict detection
4. **Daily Crew Sheet** — View showing who goes where today
5. **Time Tracking** — Log hours per crew member per job
6. **Reporting** — Job summaries, crew utilization, hours reports, CSV export

### Pages Required

```
/                     → Dashboard (overview stats, today's assignments)
/jobs                 → Job list with search/filter/sort
/jobs/[id]            → Job detail with assignments and history
/jobs/new             → Create new job
/crew                 → Crew member list with search/filter
/crew/[id]            → Crew member detail with assignment history
/crew/new             → Add new crew member
/schedule             → Calendar view of all assignments
/schedule/daily       → Daily crew sheet (printable)
/assignments/new      → Create assignment (assign crew to job)
/reports              → Reporting dashboard
/settings             → User and app settings
/login                → Authentication
```

### Airtable Setup

The Airtable base has three tables:

**Jobs:** Job ID, Job Name, Client, Address, Status, Start Date, End Date, Priority, Budget, Notes

**Crew Members:** Name, Role, Phone, Email, Status, Skills, Daily Rate, Emergency Contact, Notes

**Assignments:** Job (link), Crew Member (link), Date, Hours, Status, Notes

### API Layer

Create a service layer in `lib/airtable.ts` that wraps Airtable API calls:

```typescript
// Example structure
export const jobsService = {
  getAll(filters?: JobFilters): Promise<Job[]>,
  getById(id: string): Promise<Job>,
  create(data: CreateJobInput): Promise<Job>,
  update(id: string, data: UpdateJobInput): Promise<Job>,
  delete(id: string): Promise<void>,
}

export const crewService = {
  getAll(filters?: CrewFilters): Promise<CrewMember[]>,
  getById(id: string): Promise<CrewMember>,
  create(data: CreateCrewInput): Promise<CrewMember>,
  update(id: string, data: UpdateCrewInput): Promise<CrewMember>,
  delete(id: string): Promise<void>,
}

export const assignmentsService = {
  getAll(filters?: AssignmentFilters): Promise<Assignment[]>,
  getByJob(jobId: string): Promise<Assignment[]>,
  getByCrewMember(crewId: string): Promise<Assignment[]>,
  getByDate(date: string): Promise<Assignment[]>,
  create(data: CreateAssignmentInput): Promise<Assignment>,
  update(id: string, data: UpdateAssignmentInput): Promise<Assignment>,
  delete(id: string): Promise<void>,
  checkConflicts(crewId: string, date: string): Promise<boolean>,
}
```

### Environment Variables

```
AIRTABLE_API_KEY=pat...
AIRTABLE_BASE_ID=app...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

### Design Requirements

- Mobile-first responsive design
- Clean, professional UI (not flashy)
- Easy to scan and use quickly (crews use this on job sites)
- Print-friendly daily crew sheet
- Status colors: Green (completed/available), Blue (in progress/on job), Yellow (on hold/on leave), Red (urgent/inactive), Grey (not started)

### Deliverables

1. Working Next.js application with all pages above
2. Airtable integration with full CRUD
3. User authentication
4. Deployed to Vercel
5. README with setup instructions
6. Clean, well-organized code with TypeScript types

### Budget Guidance

- Upwork/Fiverr range: $500-1,500
- Suggested milestone payments:
  - 30% — Project setup + Job management working
  - 30% — Crew management + Scheduling working
  - 40% — Reporting + Auth + Deployment complete

### Timeline

- Expected: 1-2 weeks for an experienced developer
- Maximum: 4 weeks
