import type { HoursSchedule, SiteSettings } from "@/sanity/types";

const TIME_ZONE = "America/Moncton";
const OPENING_SOON_DAYS = 30;

export type ScheduleRow = {
  label: string;
  hours: string;
  days: number[];
  openMinutes: number;
  closeMinutes: number;
};

export type HoursBlock = {
  title: string;
  rows: ScheduleRow[];
};

export type SeasonPhase = "in-season" | "opening-soon" | "closed-for-season";

export type OpenStatus = {
  isOpen: boolean;
  statusText: "Open Now" | "Closed Now";
  detail: string;
  heading: string;
  phase: SeasonPhase;
};

type CalendarDate = {
  year: number;
  month: number;
  day: number;
};

type AtlanticDateTime = CalendarDate & {
  weekday: number;
  secondsSinceMidnight: number;
};

type ResolvedSchedule = HoursSchedule & {
  effectiveEnd: CalendarDate;
};

function parseIsoDate(iso: string): CalendarDate {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day };
}

function toComparable({ year, month, day }: CalendarDate): number {
  return year * 10_000 + month * 100 + day;
}

function isBetweenInclusive(today: CalendarDate, start: CalendarDate, end: CalendarDate): boolean {
  const value = toComparable(today);
  return value >= toComparable(start) && value <= toComparable(end);
}

function addDays(date: CalendarDate, days: number): CalendarDate {
  const next = new Date(Date.UTC(date.year, date.month - 1, date.day + days));
  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day: next.getUTCDate(),
  };
}

function getAtlanticCalendarDate(date = new Date()): CalendarDate {
  const formatted = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  const [year, month, day] = formatted.split("-").map(Number);
  return { year, month, day };
}

function getAtlanticDateTime(date = new Date()): AtlanticDateTime {
  const calendar = getAtlanticCalendarDate(date);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const hours = Number(values.hour);
  const minutes = Number(values.minute);
  const seconds = Number(values.second);

  return {
    ...calendar,
    weekday: weekdayMap[values.weekday] ?? 0,
    secondsSinceMidnight: hours * 3600 + minutes * 60 + seconds,
  };
}

function getSeasonDates(settings: SiteSettings): {
  opensOn: CalendarDate;
  closesOn: CalendarDate;
} {
  return {
    opensOn: parseIsoDate(settings.seasonOpensOn),
    closesOn: parseIsoDate(settings.seasonClosesOn),
  };
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatOpeningAnnouncement(opensOn: CalendarDate | string): string {
  const date = typeof opensOn === "string" ? parseIsoDate(opensOn) : opensOn;
  const month = MONTH_NAMES[date.month - 1] ?? "April";
  return `Opening ${month} ${date.day}, ${date.year}`;
}

export function formatOpensOnDetail(opensOn: CalendarDate | string): string {
  const announcement = formatOpeningAnnouncement(opensOn);
  return announcement.replace(/^Opening\s+/i, "Opens ");
}

export function getSeasonPhase(settings: SiteSettings, date = new Date()): SeasonPhase {
  const today = getAtlanticCalendarDate(date);
  const { opensOn, closesOn } = getSeasonDates(settings);
  const todayValue = toComparable(today);
  const opensValue = toComparable(opensOn);
  const closesValue = toComparable(closesOn);
  const openingSoonStart = toComparable(addDays(opensOn, -OPENING_SOON_DAYS));

  if (todayValue >= opensValue && todayValue <= closesValue) {
    return "in-season";
  }

  if (todayValue >= openingSoonStart && todayValue < opensValue) {
    return "opening-soon";
  }

  return "closed-for-season";
}

export function getHoursHeading(settings: SiteSettings, date = new Date()): string {
  const phase = getSeasonPhase(settings, date);

  if (phase === "in-season") {
    return "Our Hours";
  }

  if (phase === "opening-soon") {
    return formatOpeningAnnouncement(getSeasonDates(settings).opensOn);
  }

  return "Closed for the Season";
}

function parseTimeToMinutes(value: string): number {
  const match = value.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!match) {
    return 0;
  }

  let hours = Number(match[1]) % 12;
  const minutes = Number(match[2] ?? 0);
  if (match[3].toUpperCase() === "PM") {
    hours += 12;
  }

  return hours * 60 + minutes;
}

function formatMinutes(minutes: number): string {
  const hours24 = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;
  return mins === 0 ? `${hours12}${period}` : `${hours12}:${String(mins).padStart(2, "0")}${period}`;
}

function parseDayNumbers(label: string): number[] {
  const normalized = label.trim().toLowerCase();
  const dayMap: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  if (normalized.includes("–") || normalized.includes("-")) {
    const [startRaw, endRaw] = normalized.split(/[–-]/).map((part) => part.trim());
    const start = dayMap[startRaw];
    const end = dayMap[endRaw];
    if (start === undefined || end === undefined) {
      return [];
    }

    const days: number[] = [];
    for (let day = start; day <= end; day += 1) {
      days.push(day);
    }
    return days;
  }

  const single = dayMap[normalized];
  return single === undefined ? [] : [single];
}

function parseScheduleLine(line: string): ScheduleRow | null {
  const separator = line.indexOf(":");
  if (separator === -1) {
    return null;
  }

  const label = line.slice(0, separator).trim();
  const hoursText = line.slice(separator + 1).trim();
  const rangeMatch = hoursText.match(/^(.+?)\s*[-–]\s*(.+)$/);
  if (!rangeMatch) {
    return null;
  }

  const openMinutes = parseTimeToMinutes(rangeMatch[1]);
  const closeMinutes = parseTimeToMinutes(rangeMatch[2]);

  return {
    label,
    hours: `${rangeMatch[1].trim().replace(/\s+/g, "")} – ${rangeMatch[2].trim().replace(/\s+/g, "")}`,
    days: parseDayNumbers(label),
    openMinutes,
    closeMinutes,
  };
}

export function parseHoursBlock(text: string, titleOverride?: string): HoursBlock {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const [title = "Hours", ...scheduleLines] = lines;

  return {
    title: titleOverride || title,
    rows: scheduleLines
      .map(parseScheduleLine)
      .filter((row): row is ScheduleRow => row !== null),
  };
}

function minutesToSeconds(minutes: number): number {
  return minutes * 60;
}

function formatIsoDate({ year, month, day }: CalendarDate): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function buildLegacySchedules(settings: SiteSettings): HoursSchedule[] {
  const lateStart = settings.lateSeasonHoursStartOn ?? "2026-06-26";
  const mayJuneEnd = addDays(parseIsoDate(lateStart), -1);

  return [
    {
      title: "April",
      startsOn: settings.seasonOpensOn,
      hours: settings.aprilHours ?? "APRIL\nSaturday: 10AM-3PM",
    },
    {
      title: "May–June",
      startsOn: "2026-05-01",
      endsOn: formatIsoDate(mayJuneEnd),
      hours:
        settings.mayJuneHours ??
        "MAY-JUNE\nMonday – Friday: 10AM-7PM\nSaturday: 10AM-5PM\nSunday: 10AM-4PM",
    },
    {
      title: "Summer",
      startsOn: lateStart,
      hours:
        settings.lateSeasonHours ??
        "SUMMER\nMonday – Friday: 10AM-5PM\nSaturday: 10AM-5PM\nSunday: 10AM-4PM",
      noticeDuring: "We close at 5 pm weekdays until closing day. Thank you.",
    },
  ];
}

function getRawSchedules(settings: SiteSettings): HoursSchedule[] {
  if (settings.hoursSchedules?.length) {
    return settings.hoursSchedules;
  }

  if (settings.aprilHours || settings.mayJuneHours || settings.lateSeasonHours) {
    return buildLegacySchedules(settings);
  }

  return [];
}

function resolveSchedules(settings: SiteSettings): ResolvedSchedule[] {
  const { closesOn } = getSeasonDates(settings);
  const sorted = [...getRawSchedules(settings)].sort(
    (a, b) => toComparable(parseIsoDate(a.startsOn)) - toComparable(parseIsoDate(b.startsOn)),
  );

  return sorted.map((schedule, index) => {
    const next = sorted[index + 1];
    let effectiveEnd = closesOn;

    if (schedule.endsOn) {
      effectiveEnd = parseIsoDate(schedule.endsOn);
    } else if (next) {
      effectiveEnd = addDays(parseIsoDate(next.startsOn), -1);
    }

    return { ...schedule, effectiveEnd };
  });
}

function getActiveScheduleForDay(
  settings: SiteSettings,
  today: CalendarDate,
): ResolvedSchedule | null {
  const schedules = resolveSchedules(settings);

  for (const schedule of schedules) {
    const start = parseIsoDate(schedule.startsOn);
    if (isBetweenInclusive(today, start, schedule.effectiveEnd)) {
      return schedule;
    }
  }

  return schedules.at(-1) ?? null;
}

export function getHoursNotice(settings: SiteSettings, date = new Date()): string | null {
  if (getSeasonPhase(settings, date) !== "in-season") {
    return null;
  }

  const today = getAtlanticCalendarDate(date);
  const { closesOn } = getSeasonDates(settings);

  if (toComparable(today) > toComparable(closesOn)) {
    return null;
  }

  const active = getActiveScheduleForDay(settings, today);
  if (active?.noticeDuring && isBetweenInclusive(today, parseIsoDate(active.startsOn), active.effectiveEnd)) {
    return active.noticeDuring;
  }

  for (const schedule of resolveSchedules(settings)) {
    const start = parseIsoDate(schedule.startsOn);
    if (
      schedule.noticeBefore &&
      toComparable(today) < toComparable(start) &&
      today.month === start.month
    ) {
      return schedule.noticeBefore;
    }
  }

  return null;
}

function getActiveRows(settings: SiteSettings, now: AtlanticDateTime): ScheduleRow[] {
  const active = getActiveScheduleForDay(settings, now);
  if (!active) {
    return [];
  }

  return parseHoursBlock(active.hours, active.title).rows;
}

function findTodayRow(rows: ScheduleRow[], weekday: number): ScheduleRow | undefined {
  return rows.find((row) => row.days.includes(weekday));
}

function findNextOpenRow(
  rows: ScheduleRow[],
  weekday: number,
): { row: ScheduleRow; daysUntil: number } | null {
  for (let offset = 1; offset <= 7; offset += 1) {
    const day = (weekday + offset) % 7;
    const row = rows.find((entry) => entry.days.includes(day));
    if (row) {
      return { row, daysUntil: offset };
    }
  }

  return null;
}

const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getClosedSeasonStatus(settings: SiteSettings, phase: SeasonPhase, date = new Date()): OpenStatus {
  const { opensOn } = getSeasonDates(settings);

  return {
    isOpen: false,
    statusText: "Closed Now",
    detail: formatOpensOnDetail(opensOn),
    heading: getHoursHeading(settings, date),
    phase,
  };
}

export function getOpenStatus(settings: SiteSettings, date = new Date()): OpenStatus {
  const phase = getSeasonPhase(settings, date);
  const heading = getHoursHeading(settings, date);
  const { opensOn } = getSeasonDates(settings);

  if (phase !== "in-season") {
    return getClosedSeasonStatus(settings, phase, date);
  }

  const now = getAtlanticDateTime(date);
  const activeRows = getActiveRows(settings, now);

  if (activeRows.length === 0) {
    return {
      isOpen: false,
      statusText: "Closed Now",
      detail: "Check back for updated hours",
      heading,
      phase,
    };
  }

  const todayRow = findTodayRow(activeRows, now.weekday);
  const openSeconds = todayRow ? minutesToSeconds(todayRow.openMinutes) : null;
  const closeSeconds = todayRow ? minutesToSeconds(todayRow.closeMinutes) : null;

  if (
    todayRow &&
    openSeconds !== null &&
    closeSeconds !== null &&
    now.secondsSinceMidnight >= openSeconds &&
    now.secondsSinceMidnight < closeSeconds
  ) {
    return {
      isOpen: true,
      statusText: "Open Now",
      detail: `Closes at ${formatMinutes(todayRow.closeMinutes)}`,
      heading,
      phase,
    };
  }

  if (todayRow && openSeconds !== null && now.secondsSinceMidnight < openSeconds) {
    return {
      isOpen: false,
      statusText: "Closed Now",
      detail: `Opens today at ${formatMinutes(todayRow.openMinutes)}`,
      heading,
      phase,
    };
  }

  if (todayRow && closeSeconds !== null && now.secondsSinceMidnight >= closeSeconds) {
    const next = findNextOpenRow(activeRows, now.weekday);
    if (next) {
      const dayLabel =
        next.daysUntil === 1 ? "tomorrow" : weekdayNames[(now.weekday + next.daysUntil) % 7];
      return {
        isOpen: false,
        statusText: "Closed Now",
        detail: `Opens ${dayLabel} at ${formatMinutes(next.row.openMinutes)}`,
        heading,
        phase,
      };
    }
  }

  const next = findNextOpenRow(activeRows, now.weekday);
  if (next) {
    const dayLabel =
      next.daysUntil === 1 ? "tomorrow" : weekdayNames[(now.weekday + next.daysUntil) % 7];
    return {
      isOpen: false,
      statusText: "Closed Now",
      detail: `Opens ${dayLabel} at ${formatMinutes(next.row.openMinutes)}`,
      heading,
      phase,
    };
  }

  return {
    isOpen: false,
    statusText: "Closed Now",
    detail: formatOpensOnDetail(opensOn),
    heading,
    phase,
  };
}

function getMillisecondsUntilMidnight(date = new Date()): number {
  const now = getAtlanticDateTime(date);
  return (24 * 60 * 60 - now.secondsSinceMidnight) * 1000;
}

function getMillisecondsUntilDate(target: CalendarDate, date = new Date()): number {
  const today = getAtlanticCalendarDate(date);
  const todayMs = Date.UTC(today.year, today.month - 1, today.day);
  const targetMs = Date.UTC(target.year, target.month - 1, target.day);
  const diffDays = Math.round((targetMs - todayMs) / (24 * 60 * 60 * 1000));

  if (diffDays <= 0) {
    return getMillisecondsUntilMidnight(date);
  }

  const now = getAtlanticDateTime(date);
  const secondsUntilMidnight = 24 * 60 * 60 - now.secondsSinceMidnight;
  return (diffDays * 24 * 60 * 60 - (24 * 60 * 60 - secondsUntilMidnight)) * 1000;
}

function getMillisecondsUntilNextScheduleChange(settings: SiteSettings, date = new Date()): number | null {
  const today = getAtlanticCalendarDate(date);
  const schedules = resolveSchedules(settings);
  let soonest: number | null = null;

  for (const schedule of schedules) {
    const start = parseIsoDate(schedule.startsOn);
    const end = addDays(schedule.effectiveEnd, 1);

    for (const boundary of [start, end]) {
      const value = toComparable(boundary);
      if (value <= toComparable(today)) {
        continue;
      }

      const delay = getMillisecondsUntilDate(boundary, date);
      soonest = soonest === null ? delay : Math.min(soonest, delay);
    }
  }

  return soonest;
}

export function getMillisecondsUntilNextStatusChange(
  settings: SiteSettings,
  date = new Date(),
): number {
  const phase = getSeasonPhase(settings, date);
  const { opensOn, closesOn } = getSeasonDates(settings);
  const openingSoonStart = addDays(opensOn, -OPENING_SOON_DAYS);

  if (phase === "closed-for-season") {
    return Math.min(getMillisecondsUntilDate(openingSoonStart, date), 60 * 60 * 1000);
  }

  if (phase === "opening-soon") {
    return Math.min(getMillisecondsUntilDate(opensOn, date), 60 * 60 * 1000);
  }

  const now = getAtlanticDateTime(date);
  const activeRows = getActiveRows(settings, now);
  const todayRow = findTodayRow(activeRows, now.weekday);
  const scheduleChangeDelay = getMillisecondsUntilNextScheduleChange(settings, date);

  if (todayRow) {
    const openSeconds = minutesToSeconds(todayRow.openMinutes);
    const closeSeconds = minutesToSeconds(todayRow.closeMinutes);

    if (now.secondsSinceMidnight < openSeconds) {
      const openDelay = (openSeconds - now.secondsSinceMidnight) * 1000;
      return scheduleChangeDelay === null
        ? openDelay
        : Math.min(openDelay, scheduleChangeDelay);
    }

    if (now.secondsSinceMidnight < closeSeconds) {
      const closeDelay = (closeSeconds - now.secondsSinceMidnight) * 1000;
      return scheduleChangeDelay === null
        ? closeDelay
        : Math.min(closeDelay, scheduleChangeDelay);
    }
  }

  const tomorrow = getAtlanticCalendarDate(date);
  const nextDay = addDays(tomorrow, 1);
  const closesTomorrow = toComparable(nextDay) > toComparable(closesOn);

  if (closesTomorrow) {
    return getMillisecondsUntilDate(addDays(closesOn, 1), date);
  }

  const midnightDelay = getMillisecondsUntilMidnight(date);
  return scheduleChangeDelay === null
    ? midnightDelay
    : Math.min(midnightDelay, scheduleChangeDelay);
}

export function getAllHoursBlocks(settings: SiteSettings): HoursBlock[] {
  return resolveSchedules(settings).map((schedule) =>
    parseHoursBlock(schedule.hours, schedule.title),
  );
}

/** Hours blocks currently in effect (excludes past and future schedules). */
export function getHoursBlocks(settings: SiteSettings, date = new Date()): HoursBlock[] {
  const today = getAtlanticCalendarDate(date);

  return resolveSchedules(settings)
    .filter((schedule) => {
      const start = parseIsoDate(schedule.startsOn);
      return isBetweenInclusive(today, start, schedule.effectiveEnd);
    })
    .map((schedule) => parseHoursBlock(schedule.hours, schedule.title));
}
