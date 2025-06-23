export function groupByError(logs) {
  const groups = {};
  logs.forEach(log => {
    const key = log.message?.split(':')[0]?.trim() || 'Unknown';
    if (!groups[key]) groups[key] = [];
    groups[key].push(log);
  });
  return groups;
}
