import { EVENT_TIMEZONE } from '@/data/content'

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: EVENT_TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

/** Calendar date (YYYY-MM-DD) and minutes since midnight, both in the event's time zone. */
export function getEventZoneTime(date: Date): { ymd: string; minutes: number } {
  const p = Object.fromEntries(fmt.formatToParts(date).map((x) => [x.type, x.value]))
  return {
    ymd: `${p.year}-${p.month}-${p.day}`,
    minutes: Number(p.hour) * 60 + Number(p.minute),
  }
}
