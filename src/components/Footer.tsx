import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="px-6 pb-[calc(4.75rem+env(safe-area-inset-bottom))] pt-2 text-center">
      <div aria-hidden className="mx-auto mb-4 flex max-w-[200px] items-center gap-2.5">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-champagne-gold/70" />
        <span className="h-1 w-1 rotate-45 bg-champagne-gold" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-champagne-gold/70" />
      </div>
      <p className="mx-auto text-balance text-[clamp(10px,2.9vw,11.5px)] leading-relaxed tracking-[0.02em] text-ink-mute">
        {t.footer.line}
      </p>
    </footer>
  )
}
