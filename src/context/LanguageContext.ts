import { createContext, useContext } from 'react'
import type { ContentData, Language } from '@/data/content'

export interface LanguageContextValue {
  lang: Language
  t: ContentData
  setLang: (lang: Language) => void
  toggleLang: () => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
