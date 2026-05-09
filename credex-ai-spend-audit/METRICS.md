# Metrics

**North Star Metric**: **Total Annual Savings Identified ($)**
*Why*: This perfectly aligns the user's core desire (saving money) with our business objective (finding leads with high savings potential). If we identify $1,000,000 in aggregate savings, we are providing immense value and generating a massive pool of high-quality leads for Credex. DAU (Daily Active Users) is irrelevant because this is a tool users might use once a quarter or once a year.

**Input Metrics**:
1. **Audit Completion Rate (%)**: Percentage of visitors who start the form and successfully click "Generate Audit".
2. **Lead Capture Conversion (%)**: Percentage of completed audits where the user submits their email to save the report.
3. **High-Savings Lead Volume (#)**: Absolute number of captured leads with >$500/mo in identified savings. (These are the ICP for Credex).

**What to Instrument First**:
- Plausible or PostHog to track the funnel: `Page View` -> `Form Started` -> `Audit Generated` -> `Email Captured`.
- Custom event property on `Audit Generated` capturing the `Total Savings Amount` (anonymously).

**Pivot Decision Trigger**:
If the **Audit Completion Rate is under 15%** after 1,000 visitors.
*Why*: If people hit the page, see the form, and bounce, it means the perceived effort of typing in their tools is higher than the perceived value of the savings. We would pivot to a simpler input (e.g., "Just upload your credit card statement CSV") or narrow the target audience to people actively complaining about spend.
