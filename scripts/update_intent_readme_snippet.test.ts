import { assert } from "@std/assert";

const script = new URL("./update_intent_readme_snippet.ts", import.meta.url).pathname;

Deno.test({
  name: "update_intent_readme_snippet executes",
  permissions: { run: true, read: true, write: true },
}, async () => {
  const cmd = new Deno.Command("deno", {
    args: ["run", "-A", script],
  });
  const out = await cmd.output();
  assert(out.code === 0);
});
