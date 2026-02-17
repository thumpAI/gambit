# Orchestrated Runner (minimal PoC)

This example demonstrates a deterministic coding workflow pattern:

1. Intake normalized input
2. Plan work
3. Execute changes
4. Validate with a command
5. Finalize with machine-readable status

## Why this example exists

To show how Gambit can enforce `done` only after objective validation passes, and avoid false completion from token leakage in prompt text.

## Files

- `intake.deck.md`
- `plan.deck.md`
- `execute.deck.md`
- `validate.deck.md`
- `finalize.deck.md`

## Notes

This is intentionally minimal and docs-first. It is a scaffold for maintainers/contributors to align on contracts before wiring runtime integrations.
