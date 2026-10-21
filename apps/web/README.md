# MeridianByte Web

The public-facing web application for the MeridianByte ecosystem.

This application provides the entry point for users, customers, and visitors to discover MeridianByte products, learn about solutions, and begin their journey into the ecosystem.

---

## Purpose

`apps/web` serves as the external-facing layer of MeridianByte.

Its responsibilities include:

- Company website
- Product marketing pages
- Public documentation
- Landing pages
- User onboarding flows
- Public content

The web application is separate from individual MeridianByte products, allowing it to evolve independently.

---

## Role in the Ecosystem

MeridianByte consists of multiple products and services.

The web application acts as the gateway into these experiences:

```
meridianbyte.com
        |
        |
        +-- Atlas
        +-- Future products
        +-- Services
```

It introduces users to the ecosystem while product applications handle authenticated experiences.

---

## Architecture

The web application follows MeridianByte's thin application principle.

It focuses on:

- Page composition
- Routing
- User experience
- Content presentation

Business logic and shared capabilities are provided through MeridianByte packages and services.

---

## Features

Current and future capabilities include:

### Marketing

- Company information
- Product showcases
- Feature explanations
- Public announcements

### Onboarding

- Account creation flows
- Product introductions
- User activation experiences

### Public Content

- Documentation
- Guides
- Resources
- Blog or announcements

---

## Technology

- Framework: Next.js
- UI: MeridianByte Design System
- Styling: Tailwind / Mantine
- Tooling: pnpm, Turborepo

---

## Development

From the repository root:

Install dependencies:

```bash
pnpm install
```

Run the web application:

```bash
pnpm --filter web dev
```

The application will start in development mode.

---

## Environment

Required environment variables:

```bash
NEXT_PUBLIC_*
```

Additional variables may be added as new features are introduced.

---

## Relationship With Other Applications

### Atlas

Atlas is the primary MeridianByte product application.

The web application provides discovery and onboarding, while Atlas provides the authenticated product experience.

### API

The web application communicates with MeridianByte backend services through shared APIs.

---

## Status

Early-stage. The MeridianByte web experience is under active development.
