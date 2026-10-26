import { useEffect, useState } from 'react'
import { EVENT_START_ISO, type ScheduleItem } from '@/data/content'
import { getEventZoneTime } from '@/utils/eventTime'

const RANGE = /(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/

/** Index of the session running right now (event day, event time zone), or -1. */
export function getActiveIndex(items: ScheduleItem[], now: Date = new Date()): number {
  const { ymd, minutes } = getEventZoneTime(now)
  if (ymd !== getEventZoneTime(new Date(EVENT_START_ISO)).ymd) return -1

  return items.findIndex((item) => {
    const m = RANGE.exec(item.time)
    if (!m) return false
    const start = Number(m[1]) * 60 + Number(m[2])
    const end = Number(m[3]) * 60 + Number(m[4])
    return minutes >= start && minutes < end
  })
}

export function useActiveSession(items: ScheduleItem[]): number {
  const [active, setActive] = useState(() => getActiveIndex(items))

  useEffect(() => {
    const tick = () => setActive(getActiveIndex(items))
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [items])

  return active
}
