import { useLanguage } from '@/context/LanguageContext'

export default function LanguageToggle() {
  const { lang, t, toggleLang } = useLanguage()
  const isKo = lang === 'ko'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isKo}
      aria-label={t.a11y.switchLanguage}
      onClick={toggleLang}
      className="relative grid h-6 w-16 shrink-0 grid-cols-2 items-center rounded-full bg-ink/[0.07] text-[10px] font-bold tracking-wide before:absolute before:-inset-2 before:content-['']"
    >
      <span
        aria-hidden
        className={`absolute inset-y-[2px] left-[2px] w-[calc(50%-2px)] rounded-full bg-lg-red shadow-[0_2px_6px_rgba(165,0,52,0.35)] transition-transform duration-300 ease-out ${
          isKo ? 'translate-x-full' : ''
        }`}
      />
      <span className={`relative text-center transition-colors duration-300 ${isKo ? 'text-ink-mute' : 'text-white'}`}>
        ENG
      </span>
      <span className={`relative text-center transition-colors duration-300 ${isKo ? 'text-white' : 'text-ink-mute'}`}>
        KOR
      </span>
    </button>
  )
}
