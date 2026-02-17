# Implementation Guide — 2-Week DIY Build Plan

Follow this guide step-by-step to build the Motu crew management system yourself.

---

## Prerequisites

- Node.js 18+ installed ([nodejs.org](https://nodejs.org))
- Git installed
- A code editor (VS Code recommended)
- An Airtable account with the base set up (see `QUICK_START.md`)
- A GitHub account
- A Vercel account ([vercel.com](https://vercel.com))

---

## Week 1: Foundation

### Day 1-2: Project Setup

```bash
# Clone and enter the project
git clone https://github.com/jabbaboth/Motu.git
cd Motu

# Initialize Next.js
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Install dependencies
npm install airtable next-auth
npm install -D @types/node

# Create environment file
cp .env.local.example .env.local
# Edit .env.local with your Airtable credentials
```

**Project structure to create:**

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Dashboard
│   ├── jobs/
│   │   ├── page.tsx          # Job list
│   │   ├── new/page.tsx      # Create job
│   │   └── [id]/page.tsx     # Job detail
│   ├── crew/
│   │   ├── page.tsx          # Crew list
│   │   ├── new/page.tsx      # Add crew member
│   │   └── [id]/page.tsx     # Crew detail
│   ├── schedule/
│   │   ├── page.tsx          # Calendar view
│   │   └── daily/page.tsx    # Daily crew sheet
│   ├── reports/
│   │   └── page.tsx          # Reports
│   └── api/
│       ├── jobs/route.ts
│       ├── crew/route.ts
│       └── assignments/route.ts
├── lib/
│   ├── airtable.ts           # Airtable client setup
│   ├── jobs.ts               # Job service
│   ├── crew.ts               # Crew service
│   └── assignments.ts        # Assignment service
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navigation.tsx
│   ├── jobs/
│   │   ├── JobCard.tsx
│   │   ├── JobForm.tsx
│   │   └── JobList.tsx
│   ├── crew/
│   │   ├── CrewCard.tsx
│   │   ├── CrewForm.tsx
│   │   └── CrewList.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       └── StatusBadge.tsx
└── types/
    └── index.ts              # TypeScript type definitions
```

### Day 2-3: Airtable Service Layer

Create `src/lib/airtable.ts`:

```typescript
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!);

export const jobsTable = base('Jobs');
export const crewTable = base('Crew Members');
export const assignmentsTable = base('Assignments');
```

Create type definitions in `src/types/index.ts`:

```typescript
export interface Job {
  id: string;
  name: string;
  client: string;
  address: string;
  status: 'Not Started' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled';
  startDate: string;
  endDate: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  budget?: number;
  notes?: string;
}

export interface CrewMember {
  id: string;
  name: string;
  role: 'Foreman' | 'Labourer' | 'Operator' | 'Subcontractor';
  phone: string;
  email: string;
  status: 'Available' | 'On Job' | 'On Leave' | 'Inactive';
  skills: string[];
  dailyRate: number;
  notes?: string;
}

export interface Assignment {
  id: string;
  jobId: string;
  crewMemberId: string;
  date: string;
  hours: number;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes?: string;
}
```

### Day 3-4: Job Management

Build these in order:
1. Job list page with table view
2. Job detail page
3. Create job form
4. Edit job form
5. Search and filter functionality
6. Status badges and color coding

### Day 4-5: Crew Management

Same pattern as jobs:
1. Crew list page
2. Crew detail page
3. Add/edit crew member forms
4. Skills display and filtering
5. Availability indicators

---

## Week 2: Scheduling & Polish

### Day 6-7: Assignments & Scheduling

1. Create assignment form (select job + crew member + date)
2. Assignment list view
3. Daily crew sheet (who goes where today)
4. Conflict detection (prevent double-booking)

### Day 8-9: Calendar & Daily View

1. Calendar component showing assignments
2. Day/week/month views
3. Printable daily crew sheet (use `@media print` CSS)
4. Click-to-create assignments from calendar

### Day 10: Reporting

1. Dashboard with summary stats (total jobs, active jobs, crew utilization)
2. Jobs by status chart
3. Hours logged per crew member
4. CSV export button

### Day 11-12: Auth & Deployment

1. Set up NextAuth.js with credentials provider
2. Protect routes with middleware
3. Role-based access (admin vs crew view)
4. Deploy to Vercel:
   ```bash
   npm install -g vercel
   vercel
   # Follow prompts, add environment variables in Vercel dashboard
   ```

### Day 13-14: Testing & Polish

1. Test all CRUD operations
2. Test on mobile devices
3. Fix responsive layout issues
4. Add loading states and error handling
5. Write README with setup instructions

---

## Tips

- **Start simple** — Get basic CRUD working before adding fancy features
- **Mobile first** — Test on your phone early and often
- **Commit often** — Small, frequent commits make it easy to undo mistakes
- **Use Airtable's UI** — For quick data fixes, use the Airtable interface directly
- **Don't perfectionism** — A working app beats a perfect plan
