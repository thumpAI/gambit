import { assert, assertEquals } from "@std/assert";

const script = new URL("./emit_final_status.ts", import.meta.url).pathname;

Deno.test({
  name: "emit_final_status prints valid payload JSON",
  permissions: { run: true, read: true },
}, async () => {
  const cmd = new Deno.Command("deno", {
    args: [
      "run",
      "-A",
      script,
      "--status",
      "done",
      "--done-token-emitted",
      "true",
      "--validation-passed",
      "true",
      "--files-changed",
      "[\"a.ts\",\"b.ts\"]",
      "--log-path",
      "artifacts/run.log",
      "--test-command",
      "deno task test:intent",
      "--test-exit-code",
      "0",
      "--changed",
      "[\"added validator\"]",
      "--remains",
      "[]",
      "--next-step",
      "Open PR",
    ],
  });

  const out = await cmd.output();
  assertEquals(out.code, 0);
  const parsed = JSON.parse(new TextDecoder().decode(out.stdout));
  assertEquals(parsed.status, "done");
  assertEquals(parsed.validationPassed, true);
  assertEquals(parsed.doneTokenEmitted, true);
});

Deno.test({
  name: "emit_final_status exits non-zero for invalid done payload",
  permissions: { run: true, read: true },
}, async () => {
  const cmd = new Deno.Command("deno", {
    args: [
      "run",
      "-A",
      script,
      "--status",
      "done",
      "--done-token-emitted",
      "false",
      "--validation-passed",
      "false",
      "--files-changed",
      "[]",
      "--log-path",
      "artifacts/run.log",
      "--test-command",
      "deno task test:intent",
      "--test-exit-code",
      "1",
      "--changed",
      "[]",
      "--remains",
      "[]",
      "--next-step",
      "Fix",
    ],
  });

  const out = await cmd.output();
  assert(out.code !== 0);
});
