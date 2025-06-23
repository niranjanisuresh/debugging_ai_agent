export function exportToCSV(data, filename = 'debug_logs.csv') {
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','), // header row
    ...data.map(row => headers.map(field => JSON.stringify(row[field] ?? '')).join(',')),
  ];
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
