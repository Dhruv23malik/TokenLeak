<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/droplet.svg" width="60" alt="TokenLeak Logo" />
  <h1>TokenLeak</h1>
  <p><strong>The AI Spend Intelligence Platform for Modern Startups.</strong></p>

  <p>
    <a href="#why-this-exists">Why This Exists</a> •
    <a href="#features">Features</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#documentation">Documentation</a>
  </p>
</div>

---

## Why This Exists

Most startups treat AI subscriptions like invisible operating expenses. 

Between ChatGPT Enterprise, GitHub Copilot, Claude Pro, Cursor, Midjourney, and dozens of API keys, the modern engineering stack has fractured. Over-provisioned tiers, idle seats, and massive workflow redundancies are silently bleeding runway.

**TokenLeak** was built to surface hidden AI infrastructure waste before it silently compounds into runway loss. We turn passive subscription tracking into active **financial intelligence**.

## Core Features

- **Leak Radar**: Signature multi-axis risk analysis visualizing Stack Complexity, Workflow Redundancy, and Idle Capital.
- **Narrative Dashboard**: Translates raw metrics into a highly curated, executive-ready financial report focused on runway recovery.
- **Decoupled Audit Engine**: Pure business logic separated from the UI, executing heuristics on seat utilization, tier inflation, and pricing inefficiencies.
- **Intelligent Persistence**: Hybrid storage adapter falling back to local session state to guarantee seamless, shareable audit reports even without active database connections.

## Architecture Snapshot

TokenLeak is built on a modern, robust, and scalable foundation:

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 with highly refined, fintech-grade design tokens (minimal gradients, strict typography hierarchy).
- **State Management**: Zustand with persistent middleware.
- **Data Persistence Adapter**: Intelligent `saveAudit`/`getAudit` pattern attempting Supabase first, falling back to `localStorage`.
- **Testing**: Vitest for core engine heuristics.
- **Visualizations**: Recharts and Framer Motion.

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Dhruv23malik/TokenLeak.git
   cd TokenLeak
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables (Optional):
   Create a `.env.local` file for Supabase integration if desired:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   *Note: TokenLeak uses a robust Persistence Adapter. If these variables are not provided, the application will seamlessly fall back to Local Storage to ensure full functionality during evaluation.*

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000` to start analyzing AI spend.

## Documentation

For deeper insights into the product and technical strategy behind TokenLeak, please review the included documentation:

- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - Deep dive into the decoupled engine and state patterns.
- [GTM.md](docs/GTM.md) - Go-To-Market strategy and user acquisition thesis.
- [ECONOMICS.md](docs/ECONOMICS.md) - Unit economics and the business model of spend intelligence.
- [REFLECTION.md](docs/REFLECTION.md) - Retrospective on building a fintech-grade experience.

---

<div align="center">
  <sub>Built for the founders who care about capital efficiency.</sub>
</div>
