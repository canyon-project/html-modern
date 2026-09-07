export function getColor(pct: number): string {
  if (pct >= 80) {
    return "#52c41a";
  }
  if (pct >= 50) {
    return "#faad14";
  }
  return "#ff4d4f";
}
