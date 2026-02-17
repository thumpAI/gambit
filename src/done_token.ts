export function hasExactDoneTokenLine(output: string, token: string): boolean {
  if (!output || !token) return false;
  const lines = output.split(/\r?\n/);
  let inFence = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (!inFence && line === token) return true;
  }
  return false;
}
