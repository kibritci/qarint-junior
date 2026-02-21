/**
 * Weekly streak (zinciri kırma): Monday–Sunday, which days are "active" from current_streak + last_activity_date.
 */

/** Monday of the week containing `date` (ISO week). */
export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d);
  monday.setDate(diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/** Monday of the week containing `date`, as YYYY-MM-DD (local). */
export function getWeekStartString(date: Date): string {
  const m = getWeekStart(date);
  const y = m.getFullYear();
  const mon = String(m.getMonth() + 1).padStart(2, '0');
  const day = String(m.getDate()).padStart(2, '0');
  return `${y}-${mon}-${day}`;
}

/** Seven dates (Mon–Sun) for the week containing `date`, as YYYY-MM-DD. */
export function getCurrentWeekDates(date: Date = new Date()): string[] {
  const monday = getWeekStart(date);
  return getWeekDatesFromMonday(monday.toISOString().split('T')[0]);
}

/** Seven dates (Mon–Sun) for the week that starts on `mondayYyyyMmDd`. */
export function getWeekDatesFromMonday(mondayYyyyMmDd: string): string[] {
  const monday = new Date(mondayYyyyMmDd + 'T12:00:00Z');
  const out: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);
    out.push(d.toISOString().split('T')[0]);
  }
  return out;
}

/** Kısa hafta etiketi, örn. "17–23 Feb". Locale for month (e.g. "en", "tr"). */
export function getWeekLabel(mondayYyyyMmDd: string, locale: string = 'en-GB'): string {
  const monday = new Date(mondayYyyyMmDd + 'T12:00:00Z');
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  const mon = monday.getUTCDate();
  const sun = sunday.getUTCDate();
  const shortMonth = sunday.toLocaleDateString(locale, { month: 'short' });
  return `${mon}–${sun} ${shortMonth}`;
}

/** Short weekday names Mon–Sun for the given locale (Monday first). */
export function getShortWeekdayLabels(locale: string): string[] {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const base = new Date('2024-01-01T12:00:00Z'); // Monday
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base);
    d.setUTCDate(base.getUTCDate() + i);
    return formatter.format(d);
  });
}

/** Set of date strings (YYYY-MM-DD) that count as "active" from streak. */
export function getActiveDatesInStreak(
  lastActivityDate: string | null,
  currentStreak: number,
  today: string
): Set<string> {
  const set = new Set<string>();
  if (!lastActivityDate || currentStreak <= 0) return set;
  const last = new Date(lastActivityDate + 'T12:00:00Z');
  for (let i = 0; i < currentStreak; i++) {
    const d = new Date(last);
    d.setDate(last.getDate() - i);
    const key = d.toISOString().split('T')[0];
    if (key <= today) set.add(key);
  }
  return set;
}

export type ChainLinkType = 'inactive' | 'start' | 'mid' | 'end' | 'single';

/**
 * For each of 7 week days, returns the link type: inactive, start, mid, end, or single (one active day alone).
 * locale: optional, for day labels (e.g. "en", "tr").
 */
export function getWeeklyChainLinkTypes(
  weekDates: string[],
  activeSet: Set<string>,
  today: string,
  locale?: string
): { date: string; active: boolean; linkType: ChainLinkType; dayLabel: string }[] {
  const dayLabels = locale ? getShortWeekdayLabels(locale) : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return weekDates.map((date, i) => {
    const active = activeSet.has(date);
    const prevActive = i > 0 && activeSet.has(weekDates[i - 1]);
    const nextActive = i < 6 && activeSet.has(weekDates[i + 1]);
    let linkType: ChainLinkType = 'inactive';
    if (active) {
      if (prevActive && nextActive) linkType = 'mid';
      else if (!prevActive && nextActive) linkType = 'start';
      else if (prevActive && !nextActive) linkType = 'end';
      else linkType = 'single';
    }
    return {
      date,
      active,
      linkType,
      dayLabel: dayLabels[i],
    };
  });
}
