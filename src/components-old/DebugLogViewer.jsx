import React from 'react';

function DebugLogViewer() {
  const logs = JSON.parse(localStorage.getItem('errorLogs') || '[]');

  return (
    <div>
      <h3>🗃️ Crash Log Viewer</h3>
      {logs.length === 0 ? (
        <p>No crash logs yet.</p>
      ) : (
        <ul>
          {logs.map((log, i) => (
            <li key={i}>
              <strong>{log.timestamp}</strong>: {log.message}
              <pre>{log.stack}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DebugLogViewer;
