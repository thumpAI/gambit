# Intent PR Packet

Generate fresh packet before opening upstream PR:

```bash
deno task packet:intent > docs/specs/intent-pr-packet.generated.md
```

Then run full gate:

```bash
deno task gate:intent
```

Attach generated packet content in PR body/comment if maintainers request compressed context.
