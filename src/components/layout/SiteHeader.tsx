import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'
import { AREAS, areaHome, areaLabel, areaOfSlug } from '@/data/navigation'
import { useGameType } from '@/context/GameTypeContext'
import { GameTypeSwitch } from './GameTypeSwitch'
import { LANGS } from '@/lib/i18n'
import { useLang } from '@/context/LangContext'
import { cn } from '@/lib/utils'
import { SearchPalette } from './SearchPalette'
import { Sidebar } from './Sidebar'

export const GITHUB_ORG = 'https://github.com/easygamemaker'
export const NPM_URL = 'https://www.npmjs.com/package/easy-game-maker'

function GithubMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

/** The switch is the same everywhere (docs and home), so the language never depends on the page you are on. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLanguage, t } = useLang()
  return (
    <div role="group" aria-label={t('Language', 'Idioma')} className={cn('flex rounded-lg border border-[#1e1e2a] bg-[#0d0d14] p-0.5', className)}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLanguage(l.code)}
          aria-pressed={lang === l.code}
          title={l.label}
          className={cn(
            'rounded-md px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors',
            lang === l.code ? 'bg-[#6c63ff] text-white' : 'text-[#8888aa] hover:text-[#f0f0f8]',
          )}
        >
          {l.code}
        </button>
      ))}
    </div>
  )
}

export function SiteHeader() {
  const { lang, t } = useLang()
  const { type } = useGameType()
  const { pathname } = useLocation()
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeArea = pathname === '/' ? null : areaOfSlug(pathname)

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-[#1e1e2a] bg-[#0a0a0f]/90 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-[1500px] items-center gap-4 px-4">
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Easy Game Maker">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6c63ff] text-sm font-bold text-white shadow-[0_0_18px_#6c63ff55]">E</span>
            <span className="hidden text-sm font-semibold text-[#f0f0f8] sm:block">
              EGM <span className="font-normal text-[#8888aa]">Docs</span>
            </span>
            <span className="hidden rounded-md border border-[#6c63ff44] bg-[#6c63ff11] px-1.5 py-0.5 font-mono text-[10px] text-[#8b85ff] md:block">v0.2</span>
          </Link>

          <nav className="ml-2 hidden items-center gap-1 lg:flex" aria-label={t('Documentation areas', 'Áreas da documentação')}>
            {AREAS.map((area) => (
              <Link
                key={area.id}
                to={areaHome(area, type)}
                aria-current={activeArea === area.id ? 'page' : undefined}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm transition-colors',
                  activeArea === area.id ? 'bg-[#6c63ff18] text-[#8b85ff]' : 'text-[#8888aa] hover:bg-[#ffffff06] hover:text-[#f0f0f8]',
                )}
              >
                {areaLabel(area, type, lang)}
              </Link>
            ))}
          </nav>

          <GameTypeSwitch className="ml-1 hidden md:flex" />

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-9 items-center gap-2 rounded-lg border border-[#1e1e2a] bg-[#0d0d14] px-3 text-sm text-[#55556a] transition-colors hover:border-[#2a2a3a] hover:text-[#8888aa] sm:w-56"
              aria-label={t('Search the documentation', 'Buscar na documentação')}
            >
              <Search size={14} />
              <span className="hidden flex-1 text-left sm:block">{t('Search docs…', 'Buscar…')}</span>
              <kbd className="hidden rounded border border-[#2a2a3a] px-1.5 font-mono text-[10px] sm:block">⌘K</kbd>
            </button>
            <LanguageSwitch />
            <a href={GITHUB_ORG} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hidden rounded-lg p-2 text-[#8888aa] transition-colors hover:bg-[#ffffff06] hover:text-[#f0f0f8] sm:block">
              <GithubMark />
            </a>
            <button onClick={() => setMenuOpen((v) => !v)} aria-label={t('Menu', 'Menu')} aria-expanded={menuOpen} className="rounded-lg p-2 text-[#8888aa] hover:bg-[#ffffff06] lg:hidden">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto bg-[#0a0a0f]/97 px-4 py-4 backdrop-blur-md lg:hidden">
          <GameTypeSwitch className="mb-4 md:hidden" />
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {AREAS.map((area) => (
              <Link key={area.id} to={areaHome(area, type)} className={cn('rounded-lg border px-3 py-2.5 text-sm', activeArea === area.id ? 'border-[#6c63ff66] bg-[#6c63ff18] text-[#8b85ff]' : 'border-[#1e1e2a] text-[#8888aa]')}>
                {areaLabel(area, type, lang)}
              </Link>
            ))}
          </div>
          {activeArea && <Sidebar area={activeArea} />}
        </div>
      )}

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
