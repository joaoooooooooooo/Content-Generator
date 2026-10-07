/** Keep the five largest named entities and combine the remainder with Others. */
export function groupChartEntities(data, limit = 5) {
  const ranked = data.filter(item => item.kind !== "others").sort((a, b) => b.value - a.value);
  const others = [...ranked.slice(limit), ...data.filter(item => item.kind === "others")];
  return [
    ...ranked.slice(0, limit),
    ...(others.length ? [{ channel: "others", label: "Others", kind: "others", role: "comparison", isCompetitor: false, value: others.reduce((sum, item) => sum + item.value, 0) }] : []),
  ];
}
