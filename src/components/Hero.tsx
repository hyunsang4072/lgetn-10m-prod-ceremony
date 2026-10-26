import { useLanguage } from '@/context/LanguageContext'
import SwirlBand from './SwirlBand'

const rise = (delay: number) => ({ animationDelay: `${delay}ms` })

export default function Hero() {
  const { t } = useLanguage()
  const { hero } = t

  return (
    <section className="relative px-4 pb-[120px] pt-3 text-center">
      <span
        className="animate-fade-up inline-flex items-center rounded-full border border-champagne-gold/70 bg-gradient-to-b from-[#F9EBC4] via-[#F0D49C] to-[#E4BA68] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-lg-red-dark shadow-[0_3px_12px_rgba(217,164,65,0.35),inset_0_1px_0_rgba(255,255,255,0.85)]"
        style={rise(0)}
      >
        {hero.milestoneBadge}
      </span>

      <h1 className="mt-2 flex flex-col items-center">
        <span
          className="animate-fade-up hero-title-top inline-block bg-title-gradient bg-clip-text font-display font-medium leading-[1.02] text-transparent"
          style={rise(90)}
        >
          {hero.titleTop}
        </span>
        <span
          className="animate-fade-up hero-title-bottom inline-block font-medium uppercase leading-tight text-ink"
          style={rise(180)}
        >
          {hero.titleBottom}
        </span>
      </h1>

      <div className="animate-fade-up mt-2.5 space-y-0.5 text-ink" style={rise(270)}>
        <p className="mx-auto text-balance text-[clamp(11px,3vw,13px)] leading-snug tracking-[-0.012em] [html:lang(ko)_&]:text-[clamp(12px,3.4vw,14px)] [html:lang(ko)_&]:tracking-normal">
          {hero.keyMessage} <span className="px-0.5 text-ink-mute">/</span> {hero.location}
        </p>
        <p className="text-[clamp(12px,3.4vw,14px)] font-medium leading-snug">
          {hero.date} <span className="px-1.5 font-normal text-ink-mute">|</span> {hero.time}
        </p>
      </div>

      <div className="animate-fade-up mx-auto mt-3.5 flex max-w-[330px] items-center gap-2.5" style={rise(450)}>
        <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-champagne-gold/70" />
        <p className="font-display text-[12.5px] italic leading-snug tracking-[0.02em] text-lg-red-deep [html:lang(ko)_&]:font-sans [html:lang(ko)_&]:not-italic">
          {hero.slogan}
        </p>
        <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-champagne-gold/70" />
      </div>

      <SwirlBand />
    </section>
  )
}
