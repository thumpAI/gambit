import { assertEquals } from "@std/assert";

const checkScript = new URL("./check_intent_packet_fresh.ts", import.meta.url).pathname;
const writeScript = new URL("./write_intent_packet_file.ts", import.meta.url).pathname;

Deno.test({
  name: "check_intent_packet_fresh exits zero when packet is current",
  permissions: { run: true, read: true, write: true },
}, async () => {
  const regen = new Deno.Command("deno", {
    args: ["run", "-A", writeScript],
  });
  const regenOut = await regen.output();
  assertEquals(regenOut.code, 0);

  const cmd = new Deno.Command("deno", {
    args: ["run", "-A", checkScript],
  });
  const out = await cmd.output();
  assertEquals(out.code, 0);
});
