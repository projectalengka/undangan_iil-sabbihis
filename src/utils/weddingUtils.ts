export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const GUEST_NAME_MAX_LENGTH = 60;

export const WEDDING_TARGET_ISO = '2027-01-09T08:00:00+07:00';

export function calculateCountdown(targetIso: string, nowMs: number): CountdownParts {
  const targetMs = new Date(targetIso).getTime();
  if (Number.isNaN(targetMs)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const diffMs = targetMs - nowMs;
  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, isPast: false };
}

export function parseGuestNameFromSearch(search: string): string {
  const params = new URLSearchParams(search);
  const raw = params.get('to') || params.get('kepada') || '';
  const cleaned = raw.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();
  if (!cleaned) {
    return 'Tamu Kehormatan';
  }
  return cleaned.slice(0, GUEST_NAME_MAX_LENGTH);
}

export function shouldAutostartFromSearch(search: string): boolean {
  const params = new URLSearchParams(search);
  return params.get('autostart') === '1';
}

export interface CalendarEventInput {
  title: string;
  description: string;
  location: string;
  startIso: string;
  endIso: string;
}

function formatIcsUtc(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    'T' +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    'Z'
  );
}

export function generateIcsContent(event: CalendarEventInput): string {
  const escapeText = (val: string) =>
    val.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

  const dtStart = formatIcsUtc(event.startIso);
  const dtEnd = formatIcsUtc(event.endIso);
  const uid = `iil-sabbihis-${dtStart}@undangan-digital`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//IilSabbihisWedding//UndanganDigital//ID',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStart}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    `LOCATION:${escapeText(event.location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
