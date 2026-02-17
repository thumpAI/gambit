# Intent Spec: Orchestrated Runner

## Objective
Enable deterministic coding-task completion where `done` is only emitted after objective validation succeeds.

## Constraints
- Local-first execution preferred
- No destructive actions by default
- Deterministic completion semantics
- Machine-readable final status

## Non-goals
- Replacing underlying model providers
- Auto-deploy/auto-merge policy
- Forcing one runtime stack

## Invariants (must always hold)
1. `status=done` only if validation passed.
2. Completion token only counts when emitted as an exact standalone line.
3. Missing runtime/network/tooling must return `blocked` with remediation.
4. Every cycle summary must include: changed, remains, next step.

## Forbidden behaviors
- Marking done from token mention in prompt/context.
- Silent pass when validation command fails.
- Returning unstructured terminal state.

## Acceptance checks
- `deno test src/done_token.test.ts`
- Schema conformance test for final status object
- Blocked-state test for missing runtime

## Output contract
```json
{
  "status": "done|incomplete|blocked|failed",
  "doneTokenEmitted": true,
  "validationPassed": true,
  "artifacts": {
    "filesChanged": ["string"],
    "logPath": "string",
    "testCommand": "string",
    "testExitCode": 0
  },
  "summary": {
    "changed": ["string"],
    "remains": ["string"],
    "nextStep": "string"
  }
}
```
