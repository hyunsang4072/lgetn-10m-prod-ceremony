import { useEffect, useState } from 'react'
import { EVENT_START_ISO } from '@/data/content'
import { getEventZoneTime } from '@/utils/eventTime'

export type DDay = { status: 'upcoming'; days: number } | { status: 'today' } | { status: 'ended' }

const dateInEventZone = (date: Date) => getEventZoneTime(date).ymd

export function getDDay(now: Date = new Date()): DDay {
  const toUtcDay = (ymd: string) => {
    const [y, m, d] = ymd.split('-').map(Number)
    return Date.UTC(y, m - 1, d)
  }
  const diff = Math.round(
    (toUtcDay(dateInEventZone(new Date(EVENT_START_ISO))) - toUtcDay(dateInEventZone(now))) /
      86_400_000,
  )
  if (diff > 0) return { status: 'upcoming', days: diff }
  if (diff === 0) return { status: 'today' }
  return { status: 'ended' }
}

/** Re-evaluates every minute so the label flips right after midnight (event zone). */
export function useDDay(): DDay {
  const [dday, setDDay] = useState<DDay>(() => getDDay())

  useEffect(() => {
    const id = window.setInterval(() => {
      const next = getDDay()
      setDDay((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next))
    }, 60_000)
    return () => window.clearInterval(id)
  }, [])

  return dday
}
