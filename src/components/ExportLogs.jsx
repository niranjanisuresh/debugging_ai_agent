import React from 'react';
import Papa from 'papaparse';

function ExportLogs() {
  const handleExport = () => {
    const logs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
    if (logs.length === 0) {
      alert('No logs to export.');
      return;
    }

    const csv = Papa.unparse(logs);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'debug_logs.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return <button onClick={handleExport}>📁 Export Crash Logs to CSV</button>;
}

export default ExportLogs;
