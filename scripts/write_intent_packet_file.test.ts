import { assert } from "@std/assert";

const script = new URL("./write_intent_packet_file.ts", import.meta.url).pathname;
const outFile = "/tmp/intent-pr-packet.generated.test.md";

Deno.test({
  name: "write_intent_packet_file creates packet file",
  permissions: { run: true, read: true, write: true },
}, async () => {
  try { await Deno.remove(outFile); } catch {}
  const cmd = new Deno.Command("deno", {
    args: ["run", "-A", script, outFile],
  });
  const out = await cmd.output();
  assert(out.code === 0);
  const text = await Deno.readTextFile(outFile);
  assert(text.includes("# Intent PR Packet"));
});
