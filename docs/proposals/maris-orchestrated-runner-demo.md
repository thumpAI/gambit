# Maris Orchestrated Runner Demo (90 seconds)

## Goal
Show deterministic completion: no `done` until validation passes.

## Script
1. Start with a task and validation command.
2. Show one blocked/failed validation attempt.
3. Show fix + rerun.
4. Show final status JSON and exact done token line.

## Suggested commands
```bash
# run workflow (placeholder)
npx @bolt-foundry/gambit run examples/orchestrated_runner/finalize.deck.md

# run regression test
deno test src/done_token.test.ts
```

## Capture
Use QuickTime screen recording and include terminal + final status output.
