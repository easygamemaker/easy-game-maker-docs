import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CornerDownLeft, Search } from 'lucide-react'
import { AREAS, NAVIGATION, areaLabel, type AreaId, type GameType } from '@/data/navigation'
import { useGameType } from '@/context/GameTypeContext'
import { allPages } from '@/content/registry'
import { useLang } from '@/context/LangContext'
import { cn } from '@/lib/utils'
import type { Lang } from '@/lib/i18n'

interface Entry {
  slug: string
  area: AreaId
  /** The game type the page applies to; undefined means both. */
  scope?: GameType
  section: { en: string; pt: string }
  title: { en: string; pt: string }
  summary: { en: string; pt: string }
  /** Lowercased, accent-free text per language, searched for matches in the body. */
  body: { en: string; pt: string }
}

const fold = (s: string): string => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

/** Built once from the navigation and every registered page: title, summary, section titles and paragraphs. */
function buildIndex(): Entry[] {
  const pages = new Map(allPages().map((p) => [p.slug, p]))
  return NAVIGATION.flatMap((section) =>
    section.items.map((item): Entry => {
      const page = pages.get(item.slug)
      const text = (lang: Lang): string =>
        page
          ? [
              page.description[lang],
              ...page.sections.flatMap((s) => [
                s.title[lang],
                ...s.blocks.flatMap((b) => (b.type === 'p' || b.type === 'h' ? [b.text[lang]] : [])),
              ]),
            ].join(' ')
          : ''
      return {
        slug: item.slug,
        area: section.area,
        scope: item.scope ?? section.scope,
        section: { en: section.en, pt: section.pt },
        title: { en: item.en, pt: item.pt },
        summary: page?.description ?? { en: '', pt: '' },
        body: { en: fold(text('en')), pt: fold(text('pt')) },
      }
    }),
  )
}

function baseScore(entry: Entry, query: string, lang: Lang): number {
  const title = fold(entry.title[lang])
  const otherTitle = fold(entry.title[lang === 'en' ? 'pt' : 'en'])
  if (title === query) return 120
  if (title.startsWith(query)) return 100
  if (title.includes(query) || otherTitle.includes(query)) return 70
  if (fold(entry.section[lang]).includes(query)) return 40
  if (entry.body[lang].includes(query)) return 15
  return 0
}

/** Pages of the chosen game type (and the shared ones) outrank the other type's pages for the same match. */
function score(entry: Entry, query: string, lang: Lang, type: GameType): number {
  const base = baseScore(entry, query, lang)
  return base === 0 ? 0 : base + (!entry.scope || entry.scope === type ? 25 : 0)
}

export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang, t } = useLang()
  const { type } = useGameType()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const index = useMemo(buildIndex, [])

  const results = useMemo(() => {
    const q = fold(query.trim())
    if (!q) {
      const starters = ['/introduction', '/installation', type === '3d' ? '/3d/quickstart' : '/first-game', `/${type}/overview`, '/examples', '/cli/new']
      return starters.flatMap((slug) => index.filter((e) => e.slug === slug))
    }
    return index
      .map((entry) => ({ entry, s: score(entry, q, lang, type) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => r.entry)
  }, [index, query, lang, type])

  useEffect(() => {
    if (open) {
      setQuery('')
      setCursor(0)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  useEffect(() => setCursor(0), [query])

  if (!open) return null

  const go = (slug: string) => {
    navigate(slug)
    onClose()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => Math.min(c + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(c - 1, 0))
    } else if (e.key === 'Enter' && results[cursor]) go(results[cursor]!.slug)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label={t('Search the documentation', 'Buscar na documentação')}>
      <button aria-label={t('Close search', 'Fechar busca')} className="absolute inset-0 bg-[#05050a]/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#2a2a3a] bg-[#0d0d14] shadow-2xl shadow-black/60" onKeyDown={onKeyDown}>
        <div className="flex items-center gap-3 border-b border-[#1e1e2a] px-4">
          <Search size={16} className="text-[#55556a]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('Search classes, guides, examples…', 'Buscar classes, guias, exemplos…')}
            className="h-12 flex-1 bg-transparent text-sm text-[#f0f0f8] outline-none placeholder:text-[#55556a]"
          />
          <kbd className="rounded border border-[#2a2a3a] px-1.5 py-0.5 font-mono text-[10px] text-[#55556a]">esc</kbd>
        </div>

        <ul className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-[#55556a]">{t('No results for', 'Nada encontrado para')} “{query}”</li>
          )}
          {results.map((entry, i) => {
            const area = AREAS.find((a) => a.id === entry.area)!
            return (
              <li key={entry.slug}>
                <button
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => go(entry.slug)}
                  className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left', i === cursor ? 'bg-[#6c63ff18]' : 'hover:bg-[#ffffff05]')}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-[#f0f0f8]">{entry.title[lang]}</span>
                    <span className="block truncate text-xs text-[#55556a]">{entry.summary[lang] || entry.section[lang]}</span>
                  </span>
                  <span className="shrink-0 rounded-md border border-[#2a2a3a] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#8888aa]">
                    {areaLabel(area, entry.scope, lang)}
                  </span>
                  {i === cursor && <CornerDownLeft size={13} className="shrink-0 text-[#8b85ff]" />}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
