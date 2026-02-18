#!/usr/bin/env -S deno run -A

const target = "docs/specs/intent-pr-packet.generated.md";

const gen = new Deno.Command("deno", {
  args: ["run", "-A", "scripts/generate_intent_pr_packet.ts"],
}).outputSync();

if (gen.code !== 0) {
  console.error("failed to generate fresh packet preview");
  Deno.exit(gen.code || 1);
}

function normalizePacket(text: string): string {
  return text
    .split("\n")
    .filter((line) => !line.startsWith("- generatedAt:"))
    .join("\n")
    .trimEnd();
}

const fresh = normalizePacket(new TextDecoder().decode(gen.stdout));
let existing = "";
try {
  existing = normalizePacket(await Deno.readTextFile(target));
} catch {
  console.error(`missing generated packet file: ${target}`);
  Deno.exit(1);
}

if (fresh !== existing) {
  console.error("intent packet is stale: run `deno task packet:intent:file`");
  Deno.exit(1);
}

console.log("check intent packet is fresh");
