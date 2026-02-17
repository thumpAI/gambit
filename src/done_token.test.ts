import { assert, assertFalse } from "@std/assert";
import { hasExactDoneTokenLine } from "./done_token.ts";

Deno.test("done token matches only exact standalone line", () => {
  const token = "ORCHESTRATOR_DONE";
  const output = [
    "Rules:",
    `When complete print ${token} on its own line`,
    "working...",
    token,
  ].join("\n");
  assert(hasExactDoneTokenLine(output, token));
});

Deno.test("done token in sentence does not count", () => {
  const token = "ORCHESTRATOR_DONE";
  const output = `Please print ${token} when complete.`;
  assertFalse(hasExactDoneTokenLine(output, token));
});

Deno.test("done token inside code fence does not count", () => {
  const token = "ORCHESTRATOR_DONE";
  const output = [
    "```txt",
    token,
    "```",
  ].join("\n");
  assertFalse(hasExactDoneTokenLine(output, token));
});

Deno.test("empty output/token returns false", () => {
  assertFalse(hasExactDoneTokenLine("", "ORCHESTRATOR_DONE"));
  assertFalse(hasExactDoneTokenLine("ORCHESTRATOR_DONE", ""));
});
