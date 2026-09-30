import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { SiteHeader } from './SiteHeader'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { AREAS, NAVIGATION, areaOfSlug } from '@/data/navigation'
import { useLang } from '@/context/LangContext'
import { cn } from '@/lib/utils'

export interface TocEntry {
  id: string
  title: string
}

interface DocLayoutProps {
  children: ReactNode
  /** "On this page" entries, shown on wide screens. */
  toc?: TocEntry[]
}

function Breadcrumb() {
  const { lang } = useLang()
  const { pathname } = useLocation()
  const section = NAVIGATION.find((s) => s.items.some((i) => i.slug === pathname))
  const item = section?.items.find((i) => i.slug === pathname)
  if (!section || !item) return null
  const area = AREAS.find((a) => a.id === section.area)!

  return (
    <div className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-[#55556a]">
      <span>{area[lang]}</span>
      <ChevronRight size={12} />
      <span>{section[lang]}</span>
      <ChevronRight size={12} />
      <span className="text-[#8888aa]">{item[lang]}</span>
    </div>
  )
}

function OnThisPage({ toc }: { toc: TocEntry[] }) {
  const { t } = useLang()
  return (
    <nav aria-label={t('On this page', 'Nesta página')} className="sticky top-20">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-[#55556a]">{t('On this page', 'Nesta página')}</p>
      <ul className="space-y-2 border-l border-[#1e1e2a] pl-4 text-[13px]">
        {toc.map((entry) => (
          <li key={entry.id}>
            <a href={`#${entry.id}`} className="text-[#8888aa] transition-colors hover:text-[#8b85ff]">
              {entry.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function DocLayout({ children, toc }: DocLayoutProps) {
  const { pathname } = useLocation()
  const area = areaOfSlug(pathname)

  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <SiteHeader />

      <div className="flex flex-1 pt-14">
        <aside className="fixed bottom-0 left-0 top-14 z-30 hidden w-64 border-r border-[#1e1e2a] bg-[#0a0a0f]/85 px-3 backdrop-blur-md lg:block">
          <Sidebar area={area} />
        </aside>

        <main className="min-w-0 flex-1 lg:ml-64">
          <div className={cn('mx-auto flex max-w-6xl gap-10 px-6 py-10', toc && toc.length > 2 ? '' : 'justify-center')}>
            <div className="min-w-0 max-w-3xl flex-1">
              <Breadcrumb />
              {children}
            </div>
            {toc && toc.length > 2 && (
              <aside className="hidden w-48 shrink-0 xl:block">
                <OnThisPage toc={toc} />
              </aside>
            )}
          </div>
        </main>
      </div>

      <div className="lg:ml-64">
        <Footer />
      </div>
    </div>
  )
}

interface PageHeaderProps {
  title: string
  description: string
  badge?: string
  badgeVariant?: 'brand' | 'green' | 'orange' | 'blue'
  className?: string
}

export function PageHeader({ title, description, badge, badgeVariant = 'brand', className }: PageHeaderProps) {
  return (
    <div className={cn('mb-10', className)}>
      {badge && (
        <div className="mb-3">
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider',
              badgeVariant === 'brand' && 'border-[#6c63ff44] bg-[#6c63ff22] text-[#8b85ff]',
              badgeVariant === 'green' && 'border-[#34d39944] bg-[#34d39922] text-[#34d399]',
              badgeVariant === 'orange' && 'border-[#fb923c44] bg-[#fb923c22] text-[#fb923c]',
              badgeVariant === 'blue' && 'border-[#60a5fa44] bg-[#60a5fa22] text-[#60a5fa]',
            )}
          >
            {badge}
          </span>
        </div>
      )}
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-[#f0f0f8]">{title}</h1>
      <p className="max-w-2xl text-base leading-relaxed text-[#8888aa]">{description}</p>
      <div className="mt-6 border-b border-[#1e1e2a]" />
    </div>
  )
}
