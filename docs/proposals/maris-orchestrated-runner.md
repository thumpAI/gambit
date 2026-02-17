# Proposal: Maris Orchestrated Runner (Deterministic Coding Workflow)

## Status
Draft (requesting maintainer feedback)

## Summary
Introduce an **intent-first** Gambit workflow contract for coding tasks that enforces deterministic completion with a hard validation gate and machine-readable final status output.

This proposal addresses a common failure mode in coding-agent loops: runs that summarize early or report completion without objective validation.

## Intent Contract (primary contribution)
- Outcome: reliable completion semantics for coding workflows
- Invariants: completion only after validation + exact token-line match
- Constraints: local-first, structured terminal states, explicit remediation on blocked runs
- Evaluations: machine-checkable tests for token leakage and blocked-state behavior

## Goals
- Deterministic completion semantics
- Explicit validation gate before `done`
- Structured final output schema
- Clear operator progress summaries
- Better blocked-state diagnosis (runtime/network/tooling)

## Non-goals
- Replacing model engines (Codex/Claude/etc.)
- Auto-merge/deploy policy
- Cloud-only dependencies

## Proposed flow
1. `intake.deck`
2. `plan.deck`
3. `execute.deck`
4. `validate.deck`
5. `finalize.deck`

## Completion rule (hard)
`status=done` only if all are true:
- validation passed
- done token emitted
- test exit code is zero (when a test command is configured)

## Suggested final output schema

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

## Error model
- `blocked`: required runtime/tool/network unavailable
- `failed`: execution or validation failed and cannot auto-recover
- `incomplete`: cycle/time budget reached before completion criteria

All non-done states must include an actionable next step.

## Acceptance criteria (machine-checkable)
- no `done` state without validation success
- final output conforms to schema
- blocked state for missing runtime/network includes remediation text
- per-cycle summary includes `changed`, `remains`, `next`
- regression coverage for done-token false-positive behavior
- exact standalone done-token line matching is enforced by tests

## Rollout plan
1. Add proposal doc (this file)
2. Add minimal runner example under `examples/orchestrated_runner/`
3. Add helper + tests for strict token line matching
4. Add short demo guide and run transcript

## Open questions
- Should done token remain required when schema already marks `status=done` + `validationPassed=true`?
- Should validation support command arrays (fail-fast), not just one command?
- Should we standardize artifact manifest file format for CI integrations?
