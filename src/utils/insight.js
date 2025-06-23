export function getMostCommonError(logs) {
  const counter = {};
  logs.forEach(log => {
    const msg = log.message ?? 'Unknown';
    counter[msg] = (counter[msg] || 0) + 1;
  });
  return Object.entries(counter).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
}
