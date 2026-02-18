# Intent PR Packet

Generate fresh packet before opening upstream PR:

```bash
deno task packet:intent:file
```

This writes:
- `docs/specs/intent-pr-packet.generated.md`

Then run full gate:

```bash
deno task gate:intent
```

And verify packet freshness explicitly (if needed):

```bash
deno task check:intent:packet:fresh
```

Attach generated packet content in PR body/comment if maintainers request compressed context.
