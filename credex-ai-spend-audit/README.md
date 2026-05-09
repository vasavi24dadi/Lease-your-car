# Credex AI Spend Audit

The Credex AI Spend Audit is a free tool designed for startup founders and engineering managers to quickly analyze their current AI tool subscriptions and uncover potential savings. By inputting their tech stack (e.g., Cursor, Claude, ChatGPT), users receive an instant, personalized audit showing where they are overspending and actionable steps to optimize their costs.

## Screenshots
*(Provide screenshots here)*

## Quick Start

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
Create a `.env.local` file with the following keys:
```
ANTHROPIC_API_KEY=your_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_key
```

### Run Locally
```bash
npm run dev
```

### Deploy
Deploy via Vercel by linking the repository. Ensure all environment variables are added in the Vercel dashboard.

## Decisions

1. **Next.js App Router**: Chosen for its seamless integration of frontend React components and backend API routes, enabling us to handle the Anthropic API call and Supabase logic in one codebase.
2. **Tailwind CSS + shadcn/ui**: Allowed for rapid, highly-polished, and accessible component building without the overhead of creating complex components from scratch.
3. **Hardcoded Pricing Engine**: Instead of relying on an LLM to hallucinate savings, the audit engine uses deterministic math based on verified pricing data. This guarantees defensible and accurate audits.
4. **LLM for Summarization Only**: The LLM is restricted to generating a punchy, personalized summary of the math the engine calculated, preventing hallucinated numbers.
5. **Supabase for Lead Capture**: Provides a robust, scalable PostgreSQL database with minimal setup time, perfect for a fast launch.

## Live URL
[Insert Live URL Here]
