import { assert } from "@std/assert";

const script = new URL("./generate_intent_pr_packet.ts", import.meta.url).pathname;

Deno.test({
  name: "generate_intent_pr_packet emits required sections",
  permissions: { run: true, read: true },
}, async () => {
  const cmd = new Deno.Command("deno", {
    args: ["run", "-A", script],
  });
  const out = await cmd.output();
  assert(out.code === 0);
  const text = new TextDecoder().decode(out.stdout);
  assert(text.includes("# Intent PR Packet"));
  assert(text.includes("## Summary"));
  assert(text.includes("## Commits (main..HEAD)"));
  assert(text.includes("## Changed files (main..HEAD)"));
  assert(text.includes("deno task gate:intent"));
});
