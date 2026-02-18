# Intent Adoption Plan

## Goal
Move contribution quality from implementation-style review to contract + invariant review.

## Phase 1 (current)
- Define intent contract
- Add deterministic done invariants
- Add validator + emitter helpers
- Add local test tasks and fixture suite

## Phase 2 (next)
- Wire final-status validator into runtime completion path
- Fail completion when contract validation fails
- Emit standardized status payload in CLI output mode

## Phase 3
- Add CI-required status check (`intent-check`)
- Add maintainer review checklist for intent PRs
- Add repository examples for blocked/incomplete remediation
- Standardize one-command release gate (`deno task gate:intent`)

## Success metrics
1. False completion incidents trend to zero.
2. Every done run has machine-validated final status.
3. Review time decreases due to standardized checks.
4. New contributors can execute `deno task check:intent` and pass on first attempt.
