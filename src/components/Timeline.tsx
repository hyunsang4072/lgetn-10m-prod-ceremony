import { useLayoutEffect, useRef, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useActiveSession } from '@/hooks/useActiveSession'
import type { ScheduleItem } from '@/data/content'

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 shrink-0 text-lg-red" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  )
}

function Dot({ highlight, active }: { highlight?: boolean; active: boolean }) {
  const size = highlight ? 'h-[14px] w-[14px]' : 'h-[11px] w-[11px]'
  return (
    <span
      aria-hidden
      className={`absolute left-[9px] top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 ${size}`}
    >
      {active && <span className="absolute inset-0 animate-ping rounded-full bg-lg-red/50" />}
      <span
        className={`relative block h-full w-full rounded-full border-[2.5px] border-lg-red bg-white ${
          highlight
            ? 'shadow-[0_0_0_3px_rgba(245,185,66,0.35),0_0_12px_rgba(165,0,52,0.55)]'
            : 'shadow-[0_0_0_3px_rgba(165,0,52,0.10),0_0_8px_rgba(165,0,52,0.45)]'
        }`}
      />
    </span>
  )
}

function SessionCard({ item, active }: { item: ScheduleItem; active: boolean }) {
  if (item.highlight) {
    return (
      <div className="rounded-2xl border border-champagne-gold/80 bg-gradient-to-b from-[#FFFCF3] to-[#FFF1D4] px-3 py-[11px] text-left shadow-glow">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13px] tabular-nums text-ink-soft">{item.time}</span>
          {item.badge && (
            <span className="whitespace-nowrap rounded-full bg-gradient-to-r from-[#F5B942] to-[#F9D888] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-lg-red-dark">
              {item.badge}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-[15px] font-bold leading-tight text-ink">{item.title}</p>
        <div className="mt-0.5 flex items-start justify-between gap-3 text-[13px] leading-snug text-ink-soft">
          <span className="min-w-0">{item.description}</span>
          <span className="max-w-[40%] shrink-0 text-right">{item.location}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`glass-sm rounded-2xl px-3 py-[11px] text-left ${active ? 'ring-2 ring-lg-red/40' : ''}`}
    >
      <p className="flex flex-wrap items-baseline gap-x-2 leading-tight">
        <span className="whitespace-nowrap text-[13px] tabular-nums text-ink-soft">{item.time}</span>
        <span className="text-[14px] font-semibold text-ink">{item.title}</span>
      </p>
      <div className="mt-0.5 flex items-start justify-between gap-3 text-[13px] leading-snug text-ink-soft">
        <span className="min-w-0">{item.description}</span>
        <span className="max-w-[40%] shrink-0 text-right">{item.location}</span>
      </div>
    </div>
  )
}

export default function Timeline() {
  const { t } = useLanguage()
  const { items, sectionTitle, sessionCount, liveSync } = t.schedule
  const active = useActiveSession(items)
  const listRef = useRef<HTMLOListElement>(null)
  const [line, setLine] = useState({ top: 0, height: 0 })

  // One continuous line from the first dot to the last dot, whatever the card heights are.
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const first = list.firstElementChild as HTMLElement
      const last = list.lastElementChild as HTMLElement
      const top = first.offsetTop + first.offsetHeight / 2
      setLine({ top, height: last.offsetTop + last.offsetHeight / 2 - top })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(list)
    return () => ro.disconnect()
  }, [items])

  return (
    <section className="px-4 pb-8">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="glass-sm flex items-center gap-2 rounded-full px-3 py-1 text-[13px] text-ink">
          <CalendarIcon />
          <span>
            <b className="font-bold tracking-wide">{sectionTitle}</b>
            <span className="text-ink-mute">
              {' '}
              • {sessionCount.replace('{count}', String(items.length))}
            </span>
          </span>
        </h2>
        <span className="glass-sm inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
          <span className={`h-1.5 w-1.5 rounded-full bg-champagne-gold-bright ${active >= 0 ? 'animate-pulse' : ''}`} />
          {liveSync}
        </span>
      </div>

      <div className="relative">
        <span
          aria-hidden
          style={line}
          className="absolute left-[9px] w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-lg-red-deep via-lg-red to-lg-red shadow-[0_0_8px_rgba(165,0,52,0.4)]"
        />
        <ol aria-label={t.a11y.scheduleList} ref={listRef}>
          {items.map((item, i) => (
            <li
              key={item.id}
              aria-current={i === active ? 'step' : undefined}
              className="relative pl-8 [&:not(:last-child)]:mb-2.5"
            >
            <span
              aria-hidden
              className={`absolute left-[9px] top-1/2 h-[2px] w-[23px] -translate-y-1/2 ${
                item.highlight ? 'bg-lg-red' : 'bg-lg-red/35'
              }`}
            />
            <Dot highlight={item.highlight} active={i === active} />
            <SessionCard item={item} active={i === active} />
          </li>
        ))}
        </ol>
      </div>
    </section>
  )
}
