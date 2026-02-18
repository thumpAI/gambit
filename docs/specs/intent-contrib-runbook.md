# Intent Contribution Runbook

Use this runbook before opening an intent-first PR.

## Commands

1. Run invariant tests:
```bash
deno task test:intent
```

2. Run fixture contract tests:
```bash
deno task test:intent:fixtures
```

3. Run full intent check in one command:
```bash
deno task check:intent
```

4. Generate status report for maintainers:
```bash
deno task report:intent
```

5. Run full release gate in one command:
```bash
deno task gate:intent
```

6. Verify generated PR packet is fresh:
```bash
deno task check:intent:packet:fresh
```

7. Validate a concrete final-status payload:
```bash
deno task validate:intent /tmp/orchestrated-runner-final-status.json
```

8. Emit a compliant payload template:
```bash
deno task emit:intent --status done --done-token-emitted true --validation-passed true --files-changed '["docs/specs/orchestrated-runner.intent.md"]' --log-path artifacts/orchestrated-runner/validation.log --test-command "deno task test:intent" --test-exit-code 0 --changed '["Updated intent contract"]' --remains '[]' --next-step "Emit ORCHESTRATOR_DONE on its own line."
```

9. Refresh packet file explicitly (optional):
```bash
deno task packet:intent:file
```

## Reviewer checklist
- Does `status=done` always imply validation passed?
- Is done-token matching exact-line only?
- Are blocked states actionable?
- Is output machine-readable and contract-compliant?
