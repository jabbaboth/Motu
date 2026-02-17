# CLAUDE.md — AI Assistant Guide for Motu

This file provides context and conventions for AI assistants (such as Claude) working in this repository.

## Project Overview

**Motu** is a new project under the `jabbaboth` GitHub organization. The repository is in its initial setup phase.

> **Note:** This CLAUDE.md should be updated as the project evolves — adding build commands, architecture details, testing instructions, and coding conventions as they are established.

## Repository Structure

```
Motu/
├── CLAUDE.md          # This file — AI assistant guide
└── (project files)    # To be added as the project develops
```

## Getting Started

### Prerequisites

- Git

### Setup

```bash
git clone https://github.com/jabbaboth/Motu.git
cd Motu
```

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

> To be defined as the project takes shape. Update this section with:
> - Language and framework choices
> - Linting and formatting rules
> - File and directory naming conventions
> - Import ordering
> - Error handling patterns

## Testing

> To be defined. Update this section with:
> - Test framework(s) used
> - How to run tests
> - Coverage requirements
> - Test file naming conventions

## Build & Deploy

> To be defined. Update this section with:
> - Build commands
> - CI/CD pipeline details
> - Deployment targets and procedures

## Key Architectural Decisions

> Document significant architectural choices here as they are made, including rationale and trade-offs.

## AI Assistant Guidelines

When working in this repository, AI assistants should:

1. **Read before editing** — Always read a file before proposing changes to it
2. **Minimal changes** — Only modify what is directly requested; avoid unnecessary refactoring
3. **No over-engineering** — Keep solutions simple and focused on the task at hand
4. **Security first** — Never introduce vulnerabilities (XSS, SQL injection, command injection, etc.)
5. **Update this file** — When new conventions, tools, or architecture decisions are established, update this CLAUDE.md accordingly
6. **Test changes** — Run existing tests after making changes; add tests for new functionality
7. **Respect existing patterns** — Follow the conventions already established in the codebase
