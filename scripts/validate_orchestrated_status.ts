#!/usr/bin/env -S deno run -A

import { assertFinalStatus, validateFinalStatus } from "../src/orchestrated_status.ts";

async function main() {
  const file = Deno.args[0];
  if (!file) {
    console.error("Usage: deno run -A scripts/validate_orchestrated_status.ts <status.json>");
    Deno.exit(2);
  }

  const raw = await Deno.readTextFile(file);
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    console.error(`invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
    Deno.exit(2);
  }

  const result = validateFinalStatus(parsed);
  if (result.ok) {
    assertFinalStatus(parsed);
    console.log("check final status payload is valid");
    Deno.exit(0);
  }

  console.error("final status validation failed:");
  for (const err of result.errors) console.error(`- ${err}`);
  Deno.exit(1);
}

if (import.meta.main) main();
