# Prompts

## AI Spend Audit Summary Prompt

**Purpose**: Generate a ~100-word personalized summary paragraph based on the user's AI spend audit.

### Prompt Template

```text
You are an expert financial auditor for AI tools. A startup has just run an AI spend audit.
Here is their current setup:
- Total Monthly Spend: ${totalSpend}
- Team Size: ${teamSize}
- Primary Use Case: ${useCase}
- Tools: ${tools.map(t => `${t.name} (${t.plan} plan) for ${t.seats} seats at $${t.monthlySpend}/mo`).join(', ')}

Here are our audit recommendations:
${audits.map(a => `- ${a.tool}: ${a.action} - ${a.reason} (Savings: $${a.savings}/mo)`).join('\n')}

Write a single personalized paragraph (around 100 words) summarizing their current situation and why they should optimize. Maintain a professional, slightly punchy tone. Do not use bullet points. Focus on the total potential savings and the most impactful recommendation. If their savings are over $500/mo, emphasize that they have significant optimization opportunities.
```

### Why I wrote it this way
I structured the prompt to clearly separate the user's inputs (the "current setup") from the hard-coded audit logic recommendations. By feeding the pre-calculated recommendations into the LLM, I ensure the LLM doesn't try to "hallucinate" math or pricing, but simply acts as a natural language synthesizer. The constraint "Do not use bullet points" ensures it remains a paragraph, and the tone constraints keep it feeling like an expert advisor rather than a generic bot.

### What I tried that didn't work
Initially, I just passed the user's raw inputs to the LLM and asked it to both audit and summarize. This failed because the LLM would occasionally get pricing data wrong, make up non-existent plans, or hallucinate different alternatives than our internal engine. The separation of concerns (Engine does math, LLM does prose) fixed this.
