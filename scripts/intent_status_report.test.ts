import { assert, assertEquals } from "@std/assert";

const script = new URL("./intent_status_report.ts", import.meta.url).pathname;

Deno.test({
  name: "intent_status_report emits expected sections",
  permissions: { run: true, read: true },
}, async () => {
  const cmd = new Deno.Command("deno", {
    args: ["run", "-A", script],
  });
  const out = await cmd.output();
  assertEquals(out.code, 0);
  const text = new TextDecoder().decode(out.stdout);
  assert(text.includes("# Intent Status Report"));
  assert(text.includes("## Required checks"));
  assert(text.includes("## Contract scope"));
  assert(text.includes("deno task check:intent"));
});
