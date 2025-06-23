/**
 * Logs a runtime or component error to localStorage
 * for future analysis and debugging.
 * 
 * @param {string} type - A label like 'Component Error' or 'Global JS Error'
 * @param {string} message - The error message
 * @param {string} stack - The stack trace or contextual info
 */
 export function logError(type, message, stack) {
  const logEntry = {
    type,
    message,
    stack,
    timestamp: new Date().toISOString()
  };

  try {
    const previousLogs = JSON.parse(localStorage.getItem('debug_logs') || '[]');
    localStorage.setItem('debug_logs', JSON.stringify([...previousLogs, logEntry]));
  } catch (err) {
    console.error('Failed to store debug log:', err);
  }
}
