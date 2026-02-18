#!/usr/bin/env -S deno run -A

const branch = (new Deno.Command("git", { args: ["branch", "--show-current"] })).outputSync();
const commit = (new Deno.Command("git", { args: ["rev-parse", "--short", "HEAD"] })).outputSync();
const branchName = new TextDecoder().decode(branch.stdout).trim();
const commitSha = new TextDecoder().decode(commit.stdout).trim();

const checks = [
  "deno task check:intent",
  "deno test -A scripts/emit_final_status.test.ts",
  "deno task validate:intent scripts/fixtures/final_status.done.valid.json",
];

const lines: string[] = [];
lines.push("# Intent Status Report");
lines.push("");
lines.push(`- branch: ${branchName}`);
lines.push(`- commit: ${commitSha}`);
lines.push(`- generatedAt: ${new Date().toISOString()}`);
lines.push("");
lines.push("## Required checks");
for (const c of checks) lines.push(`- ${c}`);
lines.push("");
lines.push("## Contract scope");
lines.push("- intent contract + proposal docs");
lines.push("- done-token exact-line invariant");
lines.push("- final-status validator + assertion helper");
lines.push("- fixture-based contract tests");
lines.push("- emitter + validator CLI helpers");
lines.push("- CI intent-check workflow");

console.log(lines.join("\n"));
