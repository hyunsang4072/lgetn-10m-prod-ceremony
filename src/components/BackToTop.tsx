import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

const SHOW_AFTER = 300

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
    </svg>
  )
}

export default function BackToTop() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-app justify-end pr-4">
        <button
          type="button"
          onClick={goTop}
          aria-label={t.a11y.backToTop}
          title={t.a11y.backToTop}
          tabIndex={visible ? 0 : -1}
          aria-hidden={!visible}
          className={`flex h-11 w-11 items-center justify-center rounded-full border border-champagne-gold/60 bg-white/80 text-lg-red shadow-[0_6px_18px_rgba(120,20,50,0.22)] backdrop-blur-xl transition-all duration-300 active:scale-95 ${
            visible ? 'pointer-events-auto translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
        >
          <ArrowUpIcon />
        </button>
      </div>
    </div>
  )
}
