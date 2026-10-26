import { useEffect, useState } from 'react'
import logo from '@/assets/images/lg_logo.webp'
import { useLanguage } from '@/context/LanguageContext'
import { useDDay } from '@/hooks/useDDay'
import LanguageToggle from './LanguageToggle'

function CrownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-3 w-3 shrink-0" fill="currentColor">
      <path d="M3 7.5 7.5 11 12 4l4.5 7L21 7.5 19.2 18H4.8L3 7.5Zm2.2 12.5h13.6v1.6H5.2V20Z" />
    </svg>
  )
}

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

export default function Header() {
  const { t } = useLanguage()
  const dday = useDDay()
  const scrolled = useScrolled()

  const ddayLabel =
    dday.status === 'upcoming'
      ? `${t.header.dayPrefix}${dday.days}`
      : dday.status === 'today'
        ? t.header.dDay
        : t.header.ended

  return (
    <header
      className={`sticky top-0 z-50 pt-safe-top transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? 'border-b border-champagne-gold/25 bg-white/75 shadow-[0_6px_20px_rgba(120,20,50,0.07)] backdrop-blur-xl'
          : 'border-b border-transparent bg-white/30 backdrop-blur-md'
      }`}
    >
      <div className="flex items-center justify-between pl-safe-left pr-3">
        {/* Brand clear space: 16px on every side of the logo */}
        <div className="shrink-0 p-4">
          <img src={logo} alt={t.a11y.logoAlt} className="block h-4 w-auto" width={107} height={16} />
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <span className="inline-flex h-8 shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-champagne-gold/60 bg-gradient-to-b from-white/90 to-[#FBF1DA]/90 px-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-champagne-gold-deep shadow-glass-sm max-[339px]:hidden">
            <CrownIcon />
            <span className="max-[384px]:sr-only">{t.header.vipAccess}</span>
          </span>

          <div className="glass-sm flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full pl-2 pr-1">
            <span className="text-[11px] font-semibold tabular-nums tracking-wide text-ink">{ddayLabel}</span>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
