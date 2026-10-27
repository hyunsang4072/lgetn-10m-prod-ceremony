import { useLanguage } from '@/context/LanguageContext'

const rise = (delay: number) => ({ animationDelay: `${delay}ms` })

export default function Hero() {
  const { t } = useLanguage()
  const { hero } = t

  return (
    <section className="relative px-4 pt-5 text-center">
      <h1 className="flex flex-col items-center">
        <span
          className="animate-fade-up hero-title-top inline-block bg-title-gradient bg-clip-text font-display font-medium leading-[1.02] text-transparent"
          style={rise(0)}
        >
          {hero.titleTop}
        </span>
        <span
          className="animate-fade-up hero-title-bottom inline-block font-medium uppercase leading-tight text-ink"
          style={rise(90)}
        >
          {hero.titleBottom}
        </span>
      </h1>

      <div
        aria-hidden
        className="animate-fade-up mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-champagne-gold to-transparent"
        style={rise(180)}
      />

      <p
        className="animate-fade-up mt-4 text-[clamp(13px,4.3vw,18px)] font-medium leading-snug text-ink"
        style={rise(270)}
      >
        {hero.date} <span className="px-1.5 font-normal text-ink-mute">|</span> {hero.time}
      </p>
    </section>
  )
}
