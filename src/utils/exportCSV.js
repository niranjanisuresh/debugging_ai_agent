import Papa from 'papaparse';

export function exportLogsToCSV(logs) {
  const csv = Papa.unparse(
    logs.map(log => ({
      Type: log.type,
      Message: log.message,
      Stack: log.stack,
      Timestamp: log.timestamp
    }))
  );

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `debug-logs-${Date.now()}.csv`;
  a.click();

  URL.revokeObjectURL(url);
}
