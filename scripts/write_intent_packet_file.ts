#!/usr/bin/env -S deno run -A

const outPath = Deno.args[0] || "docs/specs/intent-pr-packet.generated.md";

const packet = new Deno.Command("deno", {
  args: ["run", "-A", "scripts/generate_intent_pr_packet.ts"],
}).outputSync();

if (packet.code !== 0) {
  console.error("failed to generate packet");
  Deno.exit(packet.code || 1);
}

const content = new TextDecoder().decode(packet.stdout);
await Deno.writeTextFile(outPath, content);
console.log(`check wrote ${outPath}`);
