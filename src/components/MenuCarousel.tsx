import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import type { MenuItem } from '@/data/content'

function UtensilsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 shrink-0 text-lg-red" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v7a2 2 0 0 0 2 2v9M10 3v7a2 2 0 0 1-2 2M8 3v5M17 21V3c-2 1.5-3 4-3 7 0 2 1 3 3 3" />
    </svg>
  )
}

function MenuCard({ item, index, total, eager }: { item: MenuItem; index: number; total: number; eager: boolean }) {
  return (
    <li
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} / ${total}`}
      className="flex shrink-0 basis-full snap-start snap-always flex-col overflow-hidden rounded-[20px] border border-white/80 bg-white/70 shadow-glass"
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-[#F6EEE6]">
        <img
          src={item.image}
          alt={item.imageAlt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3 text-left">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[15px] font-bold leading-tight text-ink">{item.label}</h3>
          {item.tagline && (
            <span className="rounded-full border border-champagne-gold/60 bg-[#FBF1DA]/80 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-champagne-gold-deep">
              {item.tagline}
            </span>
          )}
        </div>
        <ul className="mt-2 space-y-1.5">
          {item.dishes.map((dish) => (
            <li key={dish.name} className="flex gap-2 text-[13px] leading-snug text-ink">
              <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-champagne-gold" />
              <span>
                <span className="font-medium">{dish.name}</span>
                {dish.note && <span className="text-ink-soft"> · {dish.note}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default function MenuCarousel() {
  const { t } = useLanguage()
  const { sectionTitle, categories } = t.menu
  const trackRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const update = () => {
      frame = 0
      const first = track.children[0] as HTMLElement | undefined
      const second = track.children[1] as HTMLElement | undefined
      if (!first || !second) return
      const step = second.offsetLeft - first.offsetLeft
      setActive(Math.max(0, Math.min(categories.length - 1, Math.round(track.scrollLeft / step))))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [categories.length])

  const onKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const track = trackRef.current
    if (!track || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return
    const first = track.children[0] as HTMLElement
    const second = track.children[1] as HTMLElement
    const step = second.offsetLeft - first.offsetLeft
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: e.key === 'ArrowRight' ? step : -step, behavior: reduce ? 'auto' : 'smooth' })
    e.preventDefault()
  }

  return (
    <section className="px-4 pb-8">
      <h2 className="flex items-center gap-2 text-[13px] text-ink">
        <UtensilsIcon />
        <b className="font-bold tracking-wide">{sectionTitle}</b>
      </h2>

      <div role="region" aria-roledescription="carousel" aria-label={t.a11y.menuCarousel} className="mt-3">
        {/* Full-bleed track: the 16px gap equals the side padding, so the next card never peeks in. */}
        <ul
          ref={trackRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="peer no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 pb-7 pt-3 -mb-4 -mt-2 outline-none"
        >
          {categories.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} total={categories.length} eager={i === 0} />
          ))}
        </ul>

        <div aria-hidden className="mx-auto mt-3 flex w-fit items-center gap-1.5 rounded-full px-2 py-1 peer-focus-visible:ring-2 peer-focus-visible:ring-lg-red/40">
          {categories.map((item, i) => (
            <span
              key={item.id}
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-5 bg-lg-red' : 'w-1.5 bg-champagne-gold/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
