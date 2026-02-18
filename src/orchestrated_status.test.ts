import { assert, assertEquals } from "@std/assert";
import { assertFinalStatus, validateFinalStatus } from "./orchestrated_status.ts";

const base = {
  status: "done",
  doneTokenEmitted: true,
  validationPassed: true,
  artifacts: {
    filesChanged: ["docs/specs/orchestrated-runner.intent.md"],
    logPath: "artifacts/orchestrated-runner/validation.log",
    testCommand: "deno test src/done_token.test.ts",
    testExitCode: 0,
  },
  summary: {
    changed: ["Updated intent contract"],
    remains: [],
    nextStep: "Open PR",
  },
};

Deno.test("final status validator accepts valid done payload", () => {
  const result = validateFinalStatus(base);
  assertEquals(result, { ok: true });
});

Deno.test("final status validator rejects done without validation", () => {
  const result = validateFinalStatus({ ...base, validationPassed: false });
  assert(result.ok === false);
  assert(result.errors.some((e) => e.includes("validationPassed=true")));
});

Deno.test("final status validator rejects done with non-zero exit code", () => {
  const result = validateFinalStatus({ ...base, artifacts: { ...base.artifacts, testExitCode: 1 } });
  assert(result.ok === false);
  assert(result.errors.some((e) => e.includes("testExitCode=0")));
});

Deno.test("final status validator rejects done without emitted token", () => {
  const result = validateFinalStatus({ ...base, doneTokenEmitted: false });
  assert(result.ok === false);
  assert(result.errors.some((e) => e.includes("doneTokenEmitted=true")));
});

Deno.test("final status validator rejects missing artifacts fields", () => {
  const payload = {
    ...base,
    artifacts: {
      ...base.artifacts,
      testCommand: "",
    },
  };
  const result = validateFinalStatus(payload);
  assert(result.ok === false);
  assert(result.errors.some((e) => e.includes("artifacts.testCommand")));
});

Deno.test("final status validator requires remediation context for blocked", () => {
  const payload = {
    ...base,
    status: "blocked",
    doneTokenEmitted: false,
    validationPassed: false,
    artifacts: { ...base.artifacts, testExitCode: 1 },
    summary: { ...base.summary, remains: [] },
  };
  const result = validateFinalStatus(payload);
  assert(result.ok === false);
  assert(result.errors.some((e) => e.includes("remediation context")));
});

Deno.test("assertFinalStatus passes for valid payload", () => {
  assertFinalStatus(base);
});

Deno.test("assertFinalStatus throws for invalid payload", () => {
  const bad = { ...base, doneTokenEmitted: false };
  let threw = false;
  try {
    assertFinalStatus(bad);
  } catch (err) {
    threw = true;
    assert(String(err).includes("final status validation failed"));
  }
  assert(threw);
});
