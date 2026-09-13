export type Lang = 'en' | 'pt'

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
]

export function getLang(): Lang {
  const stored = localStorage.getItem('egm-lang') as Lang | null
  if (stored && (stored === 'en' || stored === 'pt')) return stored
  const browser = navigator.language.slice(0, 2)
  return browser === 'pt' ? 'pt' : 'en'
}

export function setLang(lang: Lang) {
  localStorage.setItem('egm-lang', lang)
}
