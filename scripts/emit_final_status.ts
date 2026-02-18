#!/usr/bin/env -S deno run -A

import { validateFinalStatus, type FinalStatus } from "../src/orchestrated_status.ts";

function parseArg(name: string): string | undefined {
  const idx = Deno.args.indexOf(name);
  if (idx === -1) return undefined;
  return Deno.args[idx + 1];
}

function parseJsonArrayArg(name: string): string[] {
  const raw = parseArg(name);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) return parsed;
  } catch {
    // ignore and fallback
  }
  return raw.split(",").map((x) => x.trim()).filter(Boolean);
}

function required(name: string): string {
  const v = parseArg(name);
  if (!v) {
    console.error(`missing required arg: ${name}`);
    Deno.exit(2);
  }
  return v;
}

function toBool(v: string | undefined, fallback = false): boolean {
  if (v == null) return fallback;
  return ["1", "true", "yes", "y", "on"].includes(v.toLowerCase());
}

const status = required("--status") as FinalStatus["status"];
const doneTokenEmitted = toBool(parseArg("--done-token-emitted"), false);
const validationPassed = toBool(parseArg("--validation-passed"), false);
const filesChanged = parseJsonArrayArg("--files-changed");
const changed = parseJsonArrayArg("--changed");
const remains = parseJsonArrayArg("--remains");

const payload: FinalStatus = {
  status,
  doneTokenEmitted,
  validationPassed,
  artifacts: {
    filesChanged,
    logPath: required("--log-path"),
    testCommand: required("--test-command"),
    testExitCode: Number(required("--test-exit-code")),
  },
  summary: {
    changed,
    remains,
    nextStep: required("--next-step"),
  },
};

const result = validateFinalStatus(payload);
if (!result.ok) {
  console.error("final status payload invalid:");
  for (const err of result.errors) console.error(`- ${err}`);
  Deno.exit(1);
}

console.log(JSON.stringify(payload, null, 2));
