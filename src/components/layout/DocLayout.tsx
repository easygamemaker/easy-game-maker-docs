import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { NAVIGATION } from '@/data/navigation'
import { useLang } from '@/context/LangContext'
import { cn } from '@/lib/utils'

interface DocLayoutProps {
  children: ReactNode
}

function Breadcrumb() {
  const { lang } = useLang()
  const location = useLocation()
  const currentPath = location.pathname

  const section = NAVIGATION.find(s => s.items.some(i => i.slug === currentPath))
  const item = section?.items.find(i => i.slug === currentPath)

  if (!section || !item) return null

  return (
    <div className="flex items-center gap-1.5 text-xs text-[#55556a] mb-6">
      <span>{lang === 'en' ? section.en : section.pt}</span>
      <ChevronRight size={12} />
      <span className="text-[#8888aa]">{lang === 'en' ? item.en : item.pt}</span>
    </div>
  )
}

export function DocLayout({ children }: DocLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside className="hidden sm:block fixed left-0 top-14 bottom-0 w-60 border-r border-[#1e1e2a] bg-[#0a0a0f] px-3 z-30">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 sm:ml-60 min-w-0">
          <div className="max-w-4xl mx-auto px-6 py-10">
            <Breadcrumb />
            {children}
          </div>
        </main>
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
          <span className={cn(
            'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider font-mono border',
            badgeVariant === 'brand' && 'bg-[#6c63ff22] text-[#8b85ff] border-[#6c63ff44]',
            badgeVariant === 'green' && 'bg-[#34d39922] text-[#34d399] border-[#34d39944]',
            badgeVariant === 'orange' && 'bg-[#fb923c22] text-[#fb923c] border-[#fb923c44]',
            badgeVariant === 'blue' && 'bg-[#60a5fa22] text-[#60a5fa] border-[#60a5fa44]',
          )}>
            {badge}
          </span>
        </div>
      )}
      <h1 className="text-3xl font-bold text-[#f0f0f8] tracking-tight mb-3">{title}</h1>
      <p className="text-[#8888aa] text-base leading-relaxed max-w-2xl">{description}</p>
      <div className="mt-6 border-b border-[#1e1e2a]" />
    </div>
  )
}
