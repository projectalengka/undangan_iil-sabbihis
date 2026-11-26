import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCountdown,
  generateIcsContent,
  parseGuestNameFromSearch,
  shouldAutostartFromSearch,
} from './weddingUtils';

test('calculateCountdown computes future days, hours, minutes, seconds accurately', () => {
  const target = '2027-01-09T08:00:00+07:00';
  const targetMs = new Date(target).getTime();
  const offset = ((3 * 86400) + (4 * 3600) + (15 * 60) + 27) * 1000;
  const result = calculateCountdown(target, targetMs - offset);

  assert.equal(result.isPast, false);
  assert.equal(result.days, 3);
  assert.equal(result.hours, 4);
  assert.equal(result.minutes, 15);
  assert.equal(result.seconds, 27);
});

test('calculateCountdown clamps to zero when target date has passed', () => {
  const target = '2026-01-01T00:00:00Z';
  const result = calculateCountdown(target, new Date('2026-05-01T00:00:00Z').getTime());
  assert.equal(result.isPast, true);
  assert.equal(result.days, 0);
  assert.equal(result.hours, 0);
  assert.equal(result.minutes, 0);
  assert.equal(result.seconds, 0);
});

test('parseGuestNameFromSearch extracts and sanitizes guest names', () => {
  assert.equal(parseGuestNameFromSearch('?to=Bapak%20Rizky%20%26%20Ibu'), 'Bapak Rizky & Ibu');
  assert.equal(parseGuestNameFromSearch('?kepada=<b>Siti</b>'), 'bSiti/b');
  assert.equal(parseGuestNameFromSearch(''), 'Tamu Kehormatan');
});

test('shouldAutostartFromSearch detects autostart=1 query flag', () => {
  assert.equal(shouldAutostartFromSearch('?autostart=1'), true);
  assert.equal(shouldAutostartFromSearch('?to=Andi'), false);
});

test('generateIcsContent outputs valid VCALENDAR event block', () => {
  const ics = generateIcsContent({
    title: "Akad Nikah I'il & Sabbihis",
    description: 'Prosesi Akad Nikah',
    location: 'Dsn. Murukan, Kec. Mojoagung, Kab. Jombang',
    startIso: '2027-01-09T08:00:00+07:00',
    endIso: '2027-01-09T10:00:00+07:00',
  });
  assert.ok(ics.includes('BEGIN:VCALENDAR'));
  assert.ok(ics.includes("SUMMARY:Akad Nikah I'il & Sabbihis"));
  assert.ok(ics.includes('END:VCALENDAR'));
});
