export type OrchestratedStatus = "done" | "incomplete" | "blocked" | "failed";

export interface FinalStatus {
  status: OrchestratedStatus;
  doneTokenEmitted: boolean;
  validationPassed: boolean;
  artifacts: {
    filesChanged: string[];
    logPath: string;
    testCommand: string;
    testExitCode: number;
  };
  summary: {
    changed: string[];
    remains: string[];
    nextStep: string;
  };
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

export function validateFinalStatus(input: unknown): { ok: true } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  if (!input || typeof input !== "object") return { ok: false, errors: ["root must be an object"] };

  const v = input as Record<string, unknown>;
  const allowedStatus = new Set(["done", "incomplete", "blocked", "failed"]);

  if (!allowedStatus.has(String(v.status))) errors.push("status must be one of done|incomplete|blocked|failed");
  if (typeof v.doneTokenEmitted !== "boolean") errors.push("doneTokenEmitted must be boolean");
  if (typeof v.validationPassed !== "boolean") errors.push("validationPassed must be boolean");

  const a = v.artifacts as Record<string, unknown> | undefined;
  if (!a || typeof a !== "object") {
    errors.push("artifacts must be object");
  } else {
    if (!isStringArray(a.filesChanged)) errors.push("artifacts.filesChanged must be string[]");
    if (typeof a.logPath !== "string" || !a.logPath) errors.push("artifacts.logPath must be non-empty string");
    if (typeof a.testCommand !== "string" || !a.testCommand) errors.push("artifacts.testCommand must be non-empty string");
    if (!Number.isInteger(a.testExitCode)) errors.push("artifacts.testExitCode must be integer");
  }

  const s = v.summary as Record<string, unknown> | undefined;
  if (!s || typeof s !== "object") {
    errors.push("summary must be object");
  } else {
    if (!isStringArray(s.changed)) errors.push("summary.changed must be string[]");
    if (!isStringArray(s.remains)) errors.push("summary.remains must be string[]");
    if (typeof s.nextStep !== "string" || !s.nextStep) errors.push("summary.nextStep must be non-empty string");
  }

  if (String(v.status) === "done") {
    if (v.validationPassed !== true) errors.push("status=done requires validationPassed=true");
    if (v.doneTokenEmitted !== true) errors.push("status=done requires doneTokenEmitted=true");
    if (a && a.testExitCode !== 0) errors.push("status=done requires artifacts.testExitCode=0");
  }

  if (String(v.status) === "blocked" && (!s || !Array.isArray(s.remains) || s.remains.length === 0)) {
    errors.push("status=blocked requires summary.remains to include remediation context");
  }

  return errors.length ? { ok: false, errors } : { ok: true };
}

export function assertFinalStatus(input: unknown): asserts input is FinalStatus {
  const result = validateFinalStatus(input);
  if (!result.ok) {
    throw new Error(`final status validation failed: ${result.errors.join("; ")}`);
  }
}
