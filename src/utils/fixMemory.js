export function saveFix(message, fixNote) {
  const stored = JSON.parse(localStorage.getItem('fix_notes') || '{}');
  stored[message] = fixNote;
  localStorage.setItem('fix_notes', JSON.stringify(stored));
}

export function getFix(message) {
  const stored = JSON.parse(localStorage.getItem('fix_notes') || '{}');
  return stored[message];
}
