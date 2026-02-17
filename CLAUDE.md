# CLAUDE.md — AI Assistant Guide for Motu

This file provides context and conventions for AI assistants (such as Claude) working in this repository.

## Project Overview

**Motu** is a crew management system for a construction/trades business, built under the `jabbaboth` GitHub organization. The system manages approximately 264 jobs, replacing manual Excel-based tracking with a modern web application for crew scheduling, job management, and operational oversight.

### Tech Stack

- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Database:** Airtable (via REST API)
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **Deployment:** Vercel

### Key Entities

- **Jobs** — Construction projects with status, client, dates, priority
- **Crew Members** — Workers with roles, skills, availability, pay rates
- **Assignments** — Links crew members to jobs on specific dates

## Repository Structure

```
Motu/
├── ACTION_PLAN.md                     # Project roadmap with three build paths
├── QUICK_START.md                     # 1-hour getting started guide
├── CLAUDE.md                          # This file — AI assistant guide
├── setup-repo.sh                      # Automated directory structure setup
├── package.json.template              # Pre-configured dependencies
├── docs/
│   ├── crew_management_system_requirements.md  # Full requirements & data model
│   ├── developer_prompt.md            # Brief for hiring devs or prompting AI
│   ├── implementation_guide.md        # 2-week DIY build plan
│   └── github_setup_guide.md          # Repo organization & deployment
├── scripts/
│   └── import-excel-to-airtable.js    # CSV-to-Airtable data import tool
└── src/                               # Application code (created during build)
    ├── app/                           # Next.js App Router pages
    ├── components/                    # React components
    ├── lib/                           # Service layer (Airtable API)
    └── types/                         # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Git
- Node.js 18+
- An Airtable account

### Setup

```bash
git clone https://github.com/jabbaboth/Motu.git
cd Motu
bash setup-repo.sh
cp .env.local.example .env.local
# Edit .env.local with your Airtable credentials
npm install
npm run dev
```

See `QUICK_START.md` for the full getting-started guide.

## Development Workflow

### Branch Naming

- Feature branches: `feature/<description>`
- Bug fixes: `fix/<description>`
- Documentation: `docs/<description>`

### Commit Messages

- Use clear, imperative-mood messages (e.g., "Add user authentication module")
- Keep the subject line under 72 characters
- Reference issue numbers when applicable (e.g., "Fix login timeout (#42)")

### Pull Requests

- Provide a clear description of changes
- Reference related issues
- Ensure all checks pass before requesting review

## Coding Conventions

- **Language:** TypeScript (strict mode)
- **Framework:** Next.js 14+ with App Router
- **Styling:** Tailwind CSS — utility-first, mobile-first responsive design
- **Linting:** ESLint with `eslint-config-next`
- **File naming:** kebab-case for files, PascalCase for React components
- **Import ordering:** React/Next imports, third-party libraries, local modules, types
- **Error handling:** Try/catch at API boundaries, user-friendly error messages in UI

## Testing

> To be defined as the application is built. Planned:
> - Testing framework: Jest + React Testing Library
> - Run tests: `npm test`
> - Test file convention: `*.test.ts` / `*.test.tsx` alongside source files

## Build & Deploy

- **Dev server:** `npm run dev` (localhost:3000)
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Deploy:** Vercel (auto-deploys from `main` branch)
- **CI/CD:** GitHub Actions workflow at `.github/workflows/ci.yml`

## Key Architectural Decisions

1. **Airtable as database** — Chosen for easy setup, visual interface, and built-in API. Migration path to PostgreSQL (Supabase) exists if the system outgrows Airtable.
2. **Next.js App Router** — Server-side rendering for fast page loads, API routes in the same project for simplicity.
3. **Service layer pattern** — All Airtable calls go through `src/lib/` service modules, not called directly from components.
4. **Mobile-first design** — Crew members use phones on job sites, so the UI must work well on small screens.

## AI Assistant Guidelines

When working in this repository, AI assistants should:

1. **Read before editing** — Always read a file before proposing changes to it
2. **Minimal changes** — Only modify what is directly requested; avoid unnecessary refactoring
3. **No over-engineering** — Keep solutions simple and focused on the task at hand
4. **Security first** — Never introduce vulnerabilities (XSS, SQL injection, command injection, etc.)
5. **Update this file** — When new conventions, tools, or architecture decisions are established, update this CLAUDE.md accordingly
6. **Test changes** — Run existing tests after making changes; add tests for new functionality
7. **Respect existing patterns** — Follow the conventions already established in the codebase
