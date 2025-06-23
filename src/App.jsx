import React from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './components/Dashboard';
import CrashSimulator from './components/CrashSimulator';
import ExportLogs from './components/ExportLogs';




function App() {
  return (
    <div className="App">
      <header style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1> Debugging AI Agent</h1>
        <p>Your friendly bug catcher that logs, clusters, and learns.</p>
      </header>

      <main style={{ padding: '20px' }}>
        <ErrorBoundary>
          <Dashboard />
          <CrashSimulator />
        </ErrorBoundary>

        <div style={{ marginTop: '40px' }}>
          <ExportLogs />
        </div>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '60px', fontSize: '0.9rem', color: '#888' }}>
        <p>
          Built by <a href="https://github.com/niranjanisuresh" target="_blank" rel="noreferrer">Niranjani</a> using React + Vite.
        </p>
      </footer>
    </div>
  );
}

export default App;
