export function dedupeLogs(logs) {
  const seen = new Set();
  return logs.filter(log => {
    const signature = JSON.stringify(log.message);
    if (seen.has(signature)) return false;
    seen.add(signature);
    return true;
  });
}
