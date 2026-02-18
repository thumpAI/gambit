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
- `deno test src/orchestrated_status.test.ts`
- `deno task test:intent`
- `deno task validate:intent /tmp/orchestrated-runner-final-status.json`
- Schema conformance test for final status object using the artifact below
- Blocked-state test for missing runtime

## Schema-conformance test artifact (final status)
Use this artifact as the canonical `done` terminal payload for conformance validation.

```json
{
  "status": "done",
  "doneTokenEmitted": true,
  "validationPassed": true,
  "artifacts": {
    "filesChanged": [
      "docs/specs/orchestrated-runner.intent.md"
    ],
    "logPath": "artifacts/orchestrated-runner/validation.log",
    "testCommand": "deno test src/done_token.test.ts",
    "testExitCode": 0
  },
  "summary": {
    "changed": [
      "Added schema-conformance test artifact for final status",
      "Added runnable validation command block to proposal"
    ],
    "remains": [],
    "nextStep": "Emit ORCHESTRATOR_DONE on its own line after successful validation."
  }
}
```

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

## Proposal
Adopt a lightweight JSON Schema validation gate for the final status object and fail completion if schema validation fails.

### Runnable validation command
```bash
cat <<'JSON' >/tmp/orchestrated-runner-final-status.json
{
  "status": "done",
  "doneTokenEmitted": true,
  "validationPassed": true,
  "artifacts": {
    "filesChanged": ["docs/specs/orchestrated-runner.intent.md"],
    "logPath": "artifacts/orchestrated-runner/validation.log",
    "testCommand": "deno test src/done_token.test.ts",
    "testExitCode": 0
  },
  "summary": {
    "changed": ["Spec and proposal updated"],
    "remains": [],
    "nextStep": "Emit ORCHESTRATOR_DONE on its own line."
  }
}
JSON

cat <<'JSON' >/tmp/orchestrated-runner-final-status.schema.json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["status", "doneTokenEmitted", "validationPassed", "artifacts", "summary"],
  "additionalProperties": false,
  "properties": {
    "status": { "enum": ["done", "incomplete", "blocked", "failed"] },
    "doneTokenEmitted": { "type": "boolean" },
    "validationPassed": { "type": "boolean" },
    "artifacts": {
      "type": "object",
      "required": ["filesChanged", "logPath", "testCommand", "testExitCode"],
      "additionalProperties": false,
      "properties": {
        "filesChanged": {
          "type": "array",
          "items": { "type": "string" }
        },
        "logPath": { "type": "string", "minLength": 1 },
        "testCommand": { "type": "string", "minLength": 1 },
        "testExitCode": { "type": "integer" }
      }
    },
    "summary": {
      "type": "object",
      "required": ["changed", "remains", "nextStep"],
      "additionalProperties": false,
      "properties": {
        "changed": {
          "type": "array",
          "items": { "type": "string" }
        },
        "remains": {
          "type": "array",
          "items": { "type": "string" }
        },
        "nextStep": { "type": "string", "minLength": 1 }
      }
    }
  }
}
JSON

npx -y ajv-cli validate -s /tmp/orchestrated-runner-final-status.schema.json -d /tmp/orchestrated-runner-final-status.json --spec=draft2020
```
