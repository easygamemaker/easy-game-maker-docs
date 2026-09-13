import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, GitBranch, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLang } from '@/context/LangContext'
import { LANGS } from '@/lib/i18n'
import { NAVIGATION } from '@/data/navigation'
import { Sidebar } from './Sidebar'

export function Navbar() {
  const { lang, setLanguage } = useLang()
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<{ slug: string; en: string; pt: string; section: string }[]>([])
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (q: string) => {
    setSearch(q)
    if (!q.trim()) { setResults([]); return }
    const lower = q.toLowerCase()
    const found: typeof results = []
    for (const section of NAVIGATION) {
      for (const item of section.items) {
        if (
          item.en.toLowerCase().includes(lower) ||
          item.pt.toLowerCase().includes(lower)
        ) {
          found.push({
            slug: item.slug,
            en: item.en,
            pt: item.pt,
            section: lang === 'en' ? section.en : section.pt,
          })
        }
      }
    }
    setResults(found.slice(0, 8))
  }

  const go = (slug: string) => {
    navigate(slug)
    setSearch('')
    setResults([])
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-[#1e1e2a] bg-[#0a0a0f]/90 backdrop-blur-md flex items-center px-4 gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-7 h-7 rounded-lg bg-[#6c63ff] flex items-center justify-center shadow-lg shadow-[#6c63ff44]">
            <span className="text-white text-xs font-bold">E</span>
          </div>
          <span className="font-bold text-[#f0f0f8] text-sm tracking-tight">
            EGM <span className="text-[#8888aa] font-normal">Docs</span>
          </span>
          <span className="hidden sm:inline text-[#6c63ff] text-[10px] font-mono bg-[#6c63ff11] border border-[#6c63ff33] px-1.5 py-0.5 rounded">
            v0.1
          </span>
        </Link>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="flex items-center gap-2 bg-[#111118] border border-[#1e1e2a] rounded-lg px-3 py-1.5 text-sm focus-within:border-[#6c63ff55] transition-colors">
            <Search size={13} className="text-[#55556a] flex-shrink-0" />
            <input
              value={search}
              onChange={e => handleSearch(e.target.value)}
              placeholder={lang === 'en' ? 'Search docs...' : 'Pesquisar docs...'}
              className="bg-transparent outline-none text-[#f0f0f8] placeholder-[#55556a] w-full text-sm"
            />
            <kbd className="hidden sm:inline text-[#55556a] text-[10px] font-mono border border-[#1e1e2a] rounded px-1 py-0.5">
              ⌘K
            </kbd>
          </div>
          {results.length > 0 && (
            <div className="absolute top-full mt-1.5 w-full bg-[#111118] border border-[#1e1e2a] rounded-xl shadow-2xl overflow-hidden z-50">
              {results.map(r => (
                <button
                  key={r.slug}
                  onClick={() => go(r.slug)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#ffffff06] transition-colors"
                >
                  <span className="text-[#6c63ff] text-xs font-mono">{r.section}</span>
                  <span className="text-[#f0f0f8] text-sm">{lang === 'en' ? r.en : r.pt}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Language switcher */}
          <div className="flex rounded-lg border border-[#1e1e2a] overflow-hidden">
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={cn(
                  'px-2.5 py-1.5 text-xs font-medium transition-colors',
                  lang === l.code
                    ? 'bg-[#6c63ff] text-white'
                    : 'text-[#8888aa] hover:text-[#f0f0f8] hover:bg-[#ffffff06]',
                )}
              >
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>

          <a
            href="https://github.com/easy-game-maker/egm"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-[#8888aa] hover:text-[#f0f0f8] hover:bg-[#ffffff06] transition-colors"
          >
            <GitBranch size={16} />
          </a>

          <button
            className="sm:hidden p-2 rounded-lg text-[#8888aa] hover:text-[#f0f0f8]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-sm sm:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute left-0 top-14 bottom-0 w-72 bg-[#111118] border-r border-[#1e1e2a] px-3 overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
      )}
    </>
  )
}
