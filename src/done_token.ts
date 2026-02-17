export function hasExactDoneTokenLine(output: string, token: string): boolean {
  if (!output || !token) return false;
  const lines = output.split(/\r?\n/);
  return lines.some((line) => line.trim() === token);
}
