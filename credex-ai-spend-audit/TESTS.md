# Tests

## Automated Tests

The automated tests are written using `jest` and cover the core deterministic math of the `AuditEngine`.

### How to run them
Run the following command from the repository root:
```bash
npm run test
```

### Covered Cases
1. **`__tests__/engine.test.ts`**:
   - *Tests over-provisioned plans*: Verifies that a user on ChatGPT Team with only 1 seat is recommended to downgrade to ChatGPT Plus.
   - *Tests cheaper alternatives*: Verifies that a user strictly "coding" on ChatGPT Enterprise is recommended to switch to Cursor Pro or Windsurf.
   - *Tests retail vs credit pricing*: Verifies that an Anthropic API direct user is flagged as paying retail, and the savings are calculated based on Credex's average discount rate.
   - *Tests savings aggregation*: Ensures that the `calculateTotalSavings` correctly sums up the monthly and annual savings across multiple tools in the stack.
   - *Tests optimal state*: Verifies that if a user is on the most cost-effective plan for their use case (e.g. Cursor Pro for 1 developer), the engine returns no manufactured savings and tells them they are optimal.
