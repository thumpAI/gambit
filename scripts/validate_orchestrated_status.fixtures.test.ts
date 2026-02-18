import { assert, assertEquals } from "@std/assert";

const script = new URL("./validate_orchestrated_status.ts", import.meta.url).pathname;
const fixtures = new URL("./fixtures/", import.meta.url).pathname;

async function runFixture(file: string) {
  const cmd = new Deno.Command("deno", {
    args: ["run", "-A", script, `${fixtures}${file}`],
  });
  return await cmd.output();
}

Deno.test({
  name: "fixture valid done payload passes",
  permissions: { run: true, read: true },
}, async () => {
  const out = await runFixture("final_status.done.valid.json");
  assertEquals(out.code, 0);
});

Deno.test({
  name: "fixture invalid done payload fails",
  permissions: { run: true, read: true },
}, async () => {
  const out = await runFixture("final_status.done.invalid.json");
  assert(out.code !== 0);
});

Deno.test({
  name: "fixture valid blocked payload passes",
  permissions: { run: true, read: true },
}, async () => {
  const out = await runFixture("final_status.blocked.valid.json");
  assertEquals(out.code, 0);
});
