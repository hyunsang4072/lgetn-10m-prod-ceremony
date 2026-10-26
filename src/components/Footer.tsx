import emblem from '@/assets/images/emblem_10m.webp'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="px-6 pb-[calc(4.75rem+env(safe-area-inset-bottom))] pt-2 text-center">
      {/* Official seal: width-only sizing keeps the emblem's aspect ratio */}
      <div className="mx-auto mb-4 flex max-w-[330px] items-center gap-3.5">
        <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-champagne-gold/70" />
        <img
          src={emblem}
          alt={t.a11y.emblemAlt}
          width={1184}
          height={661}
          loading="lazy"
          decoding="async"
          className="block h-auto w-[72px] shrink-0 object-contain drop-shadow-[0_3px_8px_rgba(129,11,37,0.18)]"
        />
        <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-champagne-gold/70" />
      </div>
      <p className="mx-auto text-balance text-[clamp(10px,2.9vw,11.5px)] leading-relaxed tracking-[0.02em] text-ink-mute">
        {t.footer.line}
      </p>
    </footer>
  )
}
