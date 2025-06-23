export function logError(error, context = 'unknown') {
  const timestamp = new Date().toISOString();
  return {
    time: timestamp,
    context,
    message: error?.message || String(error),
    stack: error?.stack || null,
  };
}
