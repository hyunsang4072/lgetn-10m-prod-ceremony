import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { content, type Language } from '@/data/content'
import { LanguageContext, type LanguageContextValue } from './LanguageContext'

const STORAGE_KEY = 'lgetn-10m:lang'

function isLanguage(value: unknown): value is Language {
  return value === 'en' || value === 'ko'
}

function getInitialLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isLanguage(stored)) return stored
  } catch {
    // Storage can be blocked (private mode / in-app browsers).
  }
  return navigator.language?.toLowerCase().startsWith('ko') ? 'ko' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLanguage)

  const setLang = useCallback((next: Language) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Ignore: the choice still applies for this session.
    }
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'ko' : 'en')
  }, [lang, setLang])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = content[lang].meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', content[lang].meta.description)
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, t: content[lang], setLang, toggleLang }),
    [lang, setLang, toggleLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
