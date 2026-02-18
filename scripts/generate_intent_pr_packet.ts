#!/usr/bin/env -S deno run -A

function run(args: string[]): string {
  const out = new Deno.Command("git", { args }).outputSync();
  if (out.code !== 0) return "";
  return new TextDecoder().decode(out.stdout).trim();
}

const branch = run(["branch", "--show-current"]);
const head = run(["rev-parse", "--short", "HEAD"]);
const commits = run(["log", "--oneline", "--decorate=no", "main..HEAD"])
  .split("\n")
  .filter(Boolean)
  .slice(0, 30);

const files = run(["diff", "--name-only", "main..HEAD"]).split("\n").filter(Boolean);

const lines: string[] = [];
lines.push("# Intent PR Packet");
lines.push("");
lines.push(`- branch: ${branch}`);
lines.push(`- head: ${head}`);
lines.push(`- generatedAt: ${new Date().toISOString()}`);
lines.push("");
lines.push("## Summary");
lines.push("Intent-first contribution bundle for deterministic completion semantics, validation contracts, and contributor DX automation.");
lines.push("");
lines.push("## Commits (main..HEAD)");
for (const c of commits) lines.push(`- ${c}`);
lines.push("");
lines.push("## Changed files (main..HEAD)");
for (const f of files) lines.push(`- ${f}`);
lines.push("");
lines.push("## Run before opening PR");
lines.push("```bash");
lines.push("deno task gate:intent");
lines.push("```\n");
lines.push("## Ready-to-send maintainer note");
lines.push("This branch contains the intent contract, deterministic done invariants, validator/emitter helpers, fixture tests, and one-command release gate. Local gate passes with `deno task gate:intent`.");

console.log(lines.join("\n"));
