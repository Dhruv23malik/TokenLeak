# Build Reflection

Building TokenLeak was an exercise in rigorous constraint and deep product empathy.

## What Went Well
1. **The Decoupled Engine**: Deciding early to completely separate the financial math (`lib/audit-engine`) from the React component tree paid off immensely. It allowed for true test-driven development and made the resulting architecture feel like a robust backend, rather than a fragile frontend script.
2. **Visual Restraint**: The temptation with AI-focused applications is to use heavy blur effects, neon borders, and complex animations. By rigidly adhering to a "fintech-first" design language—using minimal gradients, high-contrast dark mode, and strict whitespace—the product feels significantly more authoritative.
3. **The Persistence Adapter**: Implementing the hybrid Supabase + LocalStorage adapter ensured that shareable links work instantaneously, eliminating the "empty state" risk during live demos or code reviews.

## What Could Be Improved
1. **Real-Time Data Pipelines**: Currently, the engine uses static heuristics to estimate seat utilization and API inefficiency. In a true production environment, integrating via OAuth to AWS, GitHub, and OpenAI to pull live usage logs would drastically increase confidence scores.
2. **More Granular Benchmarking**: The benchmarking logic is functional but generic. Gathering a massive dataset of startup spend profiles to provide peer-to-peer benchmarking (e.g., "You spend 40% more on coding assistants than other Series A companies") would be a massive value-add.

## Final Thoughts
TokenLeak isn't just a dashboard; it's a narrative device. By changing the language from "Savings" to "Recovered Runway", and from "Unused Seats" to "Idle AI Capital", the app shifts the user's mindset from IT management to strategic finance. That psychological shift is what differentiates a utility from a highly valued SaaS platform.
