import { createContext, useContext, useState, type ReactNode } from 'react'
import { type Lang, getLang, setLang } from '@/lib/i18n'

interface LangContextValue {
  lang: Lang
  setLanguage: (l: Lang) => void
  t: (en: string, pt: string) => string
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getLang)

  const setLanguage = (l: Lang) => {
    setLang(l)
    setLangState(l)
  }

  const t = (en: string, pt: string) => (lang === 'en' ? en : pt)

  return (
    <LangContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LangContext.Provider>
  )
}

// Context hooks must be exported with the provider for consumers throughout the portal.
// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
