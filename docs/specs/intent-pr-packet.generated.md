# Intent PR Packet

- branch: proposal/maris-orchestrated-runner
- head: de8a2876
- generatedAt: 2026-02-18T08:49:09.604Z

## Summary
Intent-first contribution bundle for deterministic completion semantics, validation contracts, and contributor DX automation.

## Commits (main..HEAD)
- de8a2876 intent-tests: cover PR packet generator in gate and CI
- f970efa9 intent-dx: add README sync helper for intent command snippet
- d4a144af intent-tests: add status report generator test and gate coverage
- 86646cca intent-ci: publish generated PR packet as workflow artifact
- 68dc9a75 intent-dx: add PR packet generator task
- d18e096b intent-dx: add one-command gate:intent release gate
- 7c478087 intent-dx: add maintainer status report generator task
- bf19b4d0 intent-api: add assertFinalStatus helper and expand invariant tests
- eaac115f intent-ci: extend workflow with emitter tests and add adoption plan
- 2e4f2322 ci: add intent-check workflow for invariants and payload validation
- b54b04e1 intent-dx: add consolidated check:intent task and contributor runbook
- 55d4964f intent-tests: add fixture suite for final-status validation
- a9a550f9 intent-dx: add final-status emitter helper and tests
- 06d5c2b6 intent-tests: expand done-state invariant coverage and add quick verify block
- 1cd597f6 intent-dx: add CLI validator task for final-status payload
- 3be3eb39 intent-dx: export final-status validator and add test:intent task
- 0ebb2fa1 intent-invariants: add final-status validator and tests
- ba792932 intent-spec: add final-status schema artifact and runnable validation block
- d1fd46f8 intent-first: add orchestrated runner intent spec and tighten done-token invariants
- e8a9fb8b proposal+PoC: deterministic orchestrated runner and done-token regression test
- 42ceb0fc docs: propose deterministic orchestrated runner workflow

## Changed files (main..HEAD)
- .github/workflows/intent-check.yml
- README.md
- deno.jsonc
- docs/proposals/maris-orchestrated-runner-demo.md
- docs/proposals/maris-orchestrated-runner.md
- docs/specs/intent-adoption-plan.md
- docs/specs/intent-contrib-runbook.md
- docs/specs/intent-pr-packet.md
- docs/specs/orchestrated-runner.intent.md
- examples/orchestrated_runner/README.md
- examples/orchestrated_runner/execute.deck.md
- examples/orchestrated_runner/finalize.deck.md
- examples/orchestrated_runner/intake.deck.md
- examples/orchestrated_runner/plan.deck.md
- examples/orchestrated_runner/validate.deck.md
- mod.ts
- scripts/emit_final_status.test.ts
- scripts/emit_final_status.ts
- scripts/fixtures/final_status.blocked.valid.json
- scripts/fixtures/final_status.done.invalid.json
- scripts/fixtures/final_status.done.valid.json
- scripts/generate_intent_pr_packet.test.ts
- scripts/generate_intent_pr_packet.ts
- scripts/intent_status_report.test.ts
- scripts/intent_status_report.ts
- scripts/update_intent_readme_snippet.test.ts
- scripts/update_intent_readme_snippet.ts
- scripts/validate_orchestrated_status.fixtures.test.ts
- scripts/validate_orchestrated_status.ts
- src/done_token.test.ts
- src/done_token.ts
- src/orchestrated_status.test.ts
- src/orchestrated_status.ts

## Run before opening PR
```bash
deno task gate:intent
```

## Ready-to-send maintainer note
This branch contains the intent contract, deterministic done invariants, validator/emitter helpers, fixture tests, and one-command release gate. Local gate passes with `deno task gate:intent`.
