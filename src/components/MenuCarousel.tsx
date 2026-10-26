import { useCallback, useEffect, useRef, useState } from 'react'
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
      className="flex shrink-0 basis-full snap-center snap-always flex-col overflow-hidden rounded-[20px] border border-white/80 bg-white/70 shadow-glass"
    >
      {/* Image is contained (never stretched or cropped); a blurred copy fills any spare space. */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F6EEE6]">
        <img
          src={item.image}
          alt=""
          aria-hidden
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full scale-125 object-cover opacity-80 blur-xl"
        />
        <img
          src={item.image}
          alt={item.imageAlt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          className="relative h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3 text-left">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[15px] font-bold leading-tight text-ink">{item.label}</h3>
          {item.tagline && (
            <span className="rounded-full border border-champagne-gold/60 bg-[#FBF1DA]/80 px-2 py-0.5 text-[9.5px] font-semibold tracking-wide text-champagne-gold-deep">
              {item.tagline}
            </span>
          )}
        </div>
        <ul className="mt-2 space-y-1.5">
          {item.dishes.map((dish) => (
            <li key={dish.name} className="flex gap-2 text-[12.5px] leading-snug text-ink">
              <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-champagne-gold" />
              <span>
                <span className="font-medium">{dish.name}</span>
                {dish.note && <span className="text-ink-mute"> · {dish.note}</span>}
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
      const mid = track.scrollLeft + track.clientWidth / 2
      let best = 0
      let bestDist = Infinity
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement
        const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid)
        if (dist < bestDist) {
          best = i
          bestDist = dist
        }
      })
      setActive(best)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const goTo = useCallback((i: number) => {
    const track = trackRef.current
    const el = track?.children[i] as HTMLElement | undefined
    if (!track || !el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({
      left: el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }, [])

  return (
    <section className="pb-8">
      <div className="px-4">
        <h2 className="flex items-center gap-2 text-[13px] text-ink">
          <UtensilsIcon />
          <b className="font-bold tracking-wide">{sectionTitle}</b>
        </h2>
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={t.a11y.menuCarousel}
        className="mt-3"
      >
        <ul
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[9%] pb-7 pt-4 -mb-3 -mt-3"
        >
          {categories.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} total={categories.length} eager={i === 0} />
          ))}
        </ul>

        <div className="flex items-center justify-center gap-1.5">
          {categories.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${t.a11y.goToSlide} ${i + 1}`}
              aria-current={i === active}
              className="relative flex h-6 items-center justify-center px-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-5 bg-lg-red' : 'w-1.5 bg-champagne-gold/50'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
