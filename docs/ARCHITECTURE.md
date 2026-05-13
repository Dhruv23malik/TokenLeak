# Architecture & Engineering Decisions

TokenLeak is built with a focus on maintainability, scalability, and separation of concerns—a crucial requirement for any enterprise-grade SaaS platform.

## The Decoupled Audit Engine

One of the most significant architectural choices in TokenLeak was to completely separate the business logic (the "Audit Engine") from the React UI components.

Located in `lib/audit-engine/`, the core heuristics run in pure TypeScript functions:
- `calculateSavings.ts`: Evaluates pricing tiers vs. seat usage and startup stage.
- `detectOverlap.ts`: Flags redundancy across similar tool categories (e.g., GitHub Copilot vs. Cursor).
- `generateInsights.ts`: The orchestrator that processes the raw context and returns a highly structured `AuditResult` payload.

**Why this matters:**
1. **Testability**: The core financial math can be unit-tested using Vitest without mocking any React context or DOM elements.
2. **Reusability**: If TokenLeak were to build a Slack bot or a Node.js cron job to analyze spending via APIs, the exact same engine could be imported.

## State Persistence Strategy

The application uses a dual-layer persistence strategy:

1. **Global Session State**: `zustand` is used for ultra-fast, cross-component state management during the audit setup.
2. **Hybrid Storage Adapter**: The `lib/persistence/saveAudit.ts` implements a resilience pattern. It attempts to save data to a remote Supabase instance. If the database is unreachable or unconfigured, it gracefully falls back to `localStorage`.

This guarantees that the user experience is never interrupted. When an audit is generated, a unique UUID is assigned, and the shareable URL (`/audit/[id]`) works instantly via the adapter pulling from local storage.

## Visual Framework

We intentionally avoided UI bloat.
- **Tailwind CSS v4** is used for strict utility-class styling.
- **Recharts** is used for the signature "Leak Radar" because SVG-based charts are accessible, responsive, and performant.
- **Framer Motion** is used sparingly to simulate intelligence and pacing (e.g., the staggered feed of insights) without causing layout thrash.
