# MeridianByte API

Shared backend infrastructure powering MeridianByte applications and services.

The API layer provides centralized business capabilities, data access, authentication, and communication patterns used across MeridianByte products.

---

## Purpose

`apps/api` provides the backend foundation for MeridianByte.

Its responsibilities include:

- API endpoints
- Business operations
- Authentication integration
- Data access
- Application services
- Backend workflows

Applications consume these capabilities instead of implementing backend logic independently.

---

## Role in the Ecosystem

MeridianByte applications share common backend capabilities:

```
              MeridianByte API

                    |
        +-----------+-----------+
        |                       |
      Atlas                   Web
        |
        |
   Future products
```

The API layer enables products to share infrastructure while maintaining independent experiences.

---

## Architecture Principles

### Centralized Business Logic

Core backend behavior belongs in the API layer rather than individual applications.

Examples:

- User management
- Permissions
- Data operations
- Domain workflows

---

### Shared Domain Services

The API exposes reusable capabilities for MeridianByte products.

Examples:

- Authentication
- User profiles
- Notifications
- Search
- Synchronization
- Analytics

---

### Modular Design

Backend functionality is organized by domain.

Example:

```
/api
  /auth
  /users
  /notes
  /tasks
  /calendar
  /finance
  /health
```

Each domain can evolve independently while sharing common infrastructure.

---

## Data Layer

The API integrates with MeridianByte's shared database layer:

```
apps/api
     |
     |
packages/db
     |
     |
PostgreSQL
```

Database schemas, migrations, and shared models are maintained through the shared database package.

---

## Services

The API works together with supporting services:

```
services
  /sync
  /search
  /notifications
```

These services provide specialized capabilities without increasing API complexity.

---

## Technology

- Runtime: Node.js
- API: API routes / service architecture
- Database: PostgreSQL
- ORM: Prisma
- Validation: Shared schemas
- Tooling: pnpm, Turborepo

---

## Development

From the repository root:

Install dependencies:

```bash
pnpm install
```

Run the API:

```bash
pnpm --filter api dev
```

---

## Environment

Required variables:

```bash
DATABASE_URL=
REDIS_URL=
```

Additional environment variables may be required depending on enabled services.

---

## Relationship With Applications

### Atlas

Atlas uses the API layer for:

- Authentication
- Data operations
- Domain workflows
- Future automation features

### Web

The public web application uses API services for:

- User onboarding
- Public content
- Account flows

---

## Status

Early-stage. The MeridianByte API platform is under active development as the shared foundation for current and future products.
