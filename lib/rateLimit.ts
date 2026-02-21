/**
 * In-memory rate limiter (per server instance).
 * On serverless (e.g. Vercel) each instance has its own map; for stricter global limits use Upstash Redis.
 */

const WINDOW_MS = 60_000; // 1 minute

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

function now() {
  return Date.now();
}

export function checkRateLimit(key: string, limit: number): boolean {
  const entry = store.get(key);
  const n = now();

  if (!entry) {
    store.set(key, { count: 1, resetAt: n + WINDOW_MS });
    return false; // not limited
  }

  if (n >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: n + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  if (entry.count > limit) {
    return true; // limited
  }
  return false;
}

export const RATE_LIMITS = {
  gamification: 30,  // per minute (XP / game completion)
  profile: 5,        // per minute (profile updates)
  leaderboard: 20,   // per minute (leaderboard fetches – limit scraping)
} as const;
