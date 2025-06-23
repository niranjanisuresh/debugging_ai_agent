export function groupSimilarLogs(logs, threshold = 0.6) {
  const groups = [];

  function similarity(a, b) {
    if (!a || !b) return 0;
    let matches = 0;
    const minLen = Math.min(a.length, b.length);
    for (let i = 0; i < minLen; i++) {
      if (a[i] === b[i]) matches++;
    }
    return matches / minLen;
  }

  logs.forEach(log => {
    const match = groups.find(group =>
      similarity(group.representative.message, log.message) >= threshold
    );

    if (match) {
      match.logs.push(log);
    } else {
      groups.push({ representative: log, logs: [log] });
    }
  });

  return groups;
}
