#!/usr/bin/env -S deno run -A

const readmePath = "README.md";
const markerStart = "<!-- intent-tools:start -->";
const markerEnd = "<!-- intent-tools:end -->";

const snippet = `${markerStart}
## Intent Contribution Quick Commands

\`\`\`bash
# Full release readiness gate
deno task gate:intent

# Generate maintainer packet
deno task packet:intent
\`\`\`
${markerEnd}`;

const current = await Deno.readTextFile(readmePath);
let next = current;
if (current.includes(markerStart) && current.includes(markerEnd)) {
  const re = new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`);
  next = current.replace(re, snippet);
} else {
  next = `${current.trimEnd()}\n\n${snippet}\n`;
}

if (next !== current) {
  await Deno.writeTextFile(readmePath, next);
  console.log("check README intent snippet updated");
} else {
  console.log("check README intent snippet already current");
}
