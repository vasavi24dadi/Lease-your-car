# Architecture

## System Diagram

```mermaid
graph TD
    User([User]) -->|Inputs Form Data| Client[Next.js Client Components]
    Client -->|Stores in| LocalStorage[(localStorage)]
    Client -->|Sends Data for Audit| Engine[Audit Engine Logic]
    Engine -->|Audit Results| Client
    Client -->|Generate Summary| API1[/api/audit/generate-summary]
    API1 -->|Prompt + Data| Anthropic[Anthropic API]
    Anthropic -->|Personalized Summary| API1
    API1 -->|Summary Text| Client
    Client -->|Submits Lead| API2[/api/leads/capture]
    API2 -->|Save Lead Data| DB[(Supabase Postgres)]
    API2 -->|Trigger Email| Resend[Resend API]
    API2 -->|Success| Client
    Client -->|Anonymize & Share| ShareView[Public Share URL]
```

## Data Flow
1. **Input**: A user visits the landing page and inputs their tools, spend, seats, use case, and team size. This data is persisted in `localStorage`.
2. **Audit Engine**: Upon clicking "Generate Audit", the deterministic Audit Engine (client-side) evaluates the input against hardcoded pricing data, finding optimal plans, alternative tools, and calculating potential savings.
3. **Summarization**: The client makes a `POST` request to `/api/audit/generate-summary` with the calculated audit. The server formats this into a prompt and calls the Anthropic API to return a personalized 100-word summary.
4. **Lead Capture**: If the user decides to capture the full report, they submit their email. The client sends a `POST` to `/api/leads/capture`, which writes the lead details to Supabase and dispatches an email via Resend.
5. **Sharing**: A unique URL is generated that strips personal details and displays the audit results using Open Graph tags for rich link previews.

## Stack Justification
- **Next.js**: Provides both the React frontend and serverless API functions required for secure API keys (Anthropic, Resend, Supabase Service Role).
- **TypeScript**: Catches bugs at compile-time and ensures our audit calculations are strictly typed (e.g., preventing mismatched tool string references).
- **Tailwind & shadcn/ui**: The assignment requires a visually high-quality output without pre-built templates. `shadcn/ui` gives us accessible primitives we can style extensively to achieve a premium look.

## Scaling to 10k Audits/Day
If this tool scaled to 10,000 audits per day:
1. **Database Connection Pooling**: Direct Postgres connections might exhaust. We would need to ensure we use Supabase's PgBouncer or connection pooling.
2. **LLM Fallbacks & Caching**: 10k API calls to Anthropic might hit rate limits or become expensive. We'd implement semantic caching (e.g., Redis) so identical audit configurations return a cached summary, and add OpenAI as a fallback provider for downtime.
3. **Background Jobs**: Moving the Resend email dispatch from a synchronous API route block to an async background queue (e.g., Inngest or Upstash) to prevent timeouts and handle retries gracefully.
