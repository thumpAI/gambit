# Proposal: Maris Orchestrated Runner (Deterministic Coding Workflow)

## Status
Draft

## Summary
Introduce a Gambit workflow pattern for coding tasks that enforces deterministic completion with a hard validation gate and machine-readable final status output.

## Goals
- Deterministic completion semantics
- Explicit validation gate before done
- Structured final output schema
- Clear operator progress summaries

## Proposed flow
1. intake.deck
2. plan.deck
3. execute.deck
4. validate.deck
5. finalize.deck

## Completion rule
`status=done` only if validation passed and done token emitted.

## Acceptance criteria
- no done state without validation success
- final output conforms to schema
- blocked state for missing runtime/network
- regression coverage for token false-positive behavior
