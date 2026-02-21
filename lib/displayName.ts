/**
 * Masks a display name for public display (e.g. leaderboard).
 * "Abdurrahim Kibritis" -> "Abdurrahim K."
 * Single word is returned as-is. Null/empty returns null.
 */
export function maskDisplayName(displayName: string | null): string | null {
  if (displayName == null || typeof displayName !== 'string') return null;
  const trimmed = displayName.trim();
  if (!trimmed) return null;
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    const first = parts[0];
    const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
    return `${first} ${lastInitial}.`;
  }
  return parts[0] ?? null;
}
