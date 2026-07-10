/**
 * IST (Indian Standard Time) Date Utilities
 * IST = UTC + 5 hours 30 minutes
 */

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // 19800000 ms

/**
 * Get a UTC Date representing IST midnight for `daysAgo` days back.
 * daysAgo = 0 → today's IST midnight
 * daysAgo = 1 → yesterday's IST midnight
 * daysAgo = -1 → tomorrow's IST midnight
 */
export function getISTMidnightUTC(daysAgo: number = 0): Date {
  const now = new Date();
  // Shift to IST to know the "IST calendar day"
  const istNow = new Date(now.getTime() + IST_OFFSET_MS);

  // Build IST midnight for the target day (in UTC-compatible Date arithmetic)
  const istMidnight = new Date(
    Date.UTC(
      istNow.getUTCFullYear(),
      istNow.getUTCMonth(),
      istNow.getUTCDate() - daysAgo,
      0,
      0,
      0,
      0
    )
  );

  // Convert IST midnight → actual UTC equivalent
  return new Date(istMidnight.getTime() - IST_OFFSET_MS);
}

/**
 * Return a "YYYY-MM-DD" label for a UTC-stored Date, interpreted in IST.
 */
export function utcToISTDateLabel(utcDate: Date): string {
  const istDate = new Date(utcDate.getTime() + IST_OFFSET_MS);
  const y = istDate.getUTCFullYear();
  const m = String(istDate.getUTCMonth() + 1).padStart(2, "0");
  const d = String(istDate.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Return an array of "YYYY-MM-DD" labels for `count` days ending today (IST),
 * ordered oldest → newest.
 */
export function getISTDateLabels(count: number): string[] {
  const labels: string[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const utcMidnight = getISTMidnightUTC(i);
    // Add IST offset back to read the IST calendar date
    labels.push(utcToISTDateLabel(new Date(utcMidnight.getTime() + IST_OFFSET_MS)));
  }
  return labels;
}

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

/**
 * Get IST year boundaries as UTC Dates.
 * start → Jan 1 00:00:00 IST  (= Dec 31 18:30:00 UTC of previous year)
 * end   → Dec 31 23:59:59.999 IST  (= Jan 1 18:29:59.999 UTC of next year)
 */
export function getISTYearBoundsUTC(year: number): { start: Date; end: Date } {
  const start = new Date(Date.UTC(year, 0, 1) - IST_OFFSET_MS);
  const end = new Date(Date.UTC(year + 1, 0, 1) - IST_OFFSET_MS - 1);
  return { start, end };
}
