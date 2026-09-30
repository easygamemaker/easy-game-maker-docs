import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { visibleSections, type AreaId } from '@/data/navigation'
import { useGameType } from '@/context/GameTypeContext'
import { useLang } from '@/context/LangContext'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

/** The left menu of one area (Guide, 2D, 3D, Tools or Examples). */
export function Sidebar({ area }: { area: AreaId }) {
  const { lang } = useLang()
  const { type } = useGameType()
  const { pathname } = useLocation()
  const sections = visibleSections(area, type)
  const activeId = sections.find((s) => s.items.some((i) => i.slug === pathname))?.id ?? sections[0]?.id
  const [open, setOpen] = useState<string[]>(activeId ? [activeId] : [])

  // Follow the route: opening a page from search or a link reveals its section.
  // The game type can change right after the first render (it syncs with the route), so the trigger is the
  // active section itself, not only the path.
  const [lastActive, setLastActive] = useState(`${pathname}|${activeId}`)
  if (`${pathname}|${activeId}` !== lastActive) {
    setLastActive(`${pathname}|${activeId}`)
    if (activeId && !open.includes(activeId)) setOpen([...open, activeId])
  }

  const toggle = (id: string) => setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  const allOpen = open.length === sections.length

  return (
    <nav className="h-full overflow-y-auto py-5 pr-2" aria-label="Documentation">
      {sections.length > 3 && (
        <button
          onClick={() => setOpen(allOpen ? (activeId ? [activeId] : []) : sections.map((s) => s.id))}
          className="mb-2 px-3 font-mono text-[10px] uppercase tracking-wider text-[#55556a] transition-colors hover:text-[#8b85ff]"
        >
          {allOpen ? (lang === 'en' ? 'Collapse all' : 'Recolher tudo') : lang === 'en' ? 'Expand all' : 'Expandir tudo'}
        </button>
      )}
      <div className="space-y-1">
        {sections.map((section) => {
          const isOpen = open.includes(section.id)
          const hasActive = section.id === activeId && section.items.some((i) => i.slug === pathname)
          return (
            <div key={section.id}>
              <button
                onClick={() => toggle(section.id)}
                aria-expanded={isOpen}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  hasActive ? 'bg-[#ffffff06] text-[#f0f0f8]' : 'text-[#8888aa] hover:bg-[#ffffff04] hover:text-[#f0f0f8]',
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{section.icon}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider">{section[lang]}</span>
                </span>
                <ChevronDown size={14} className={cn('text-[#55556a] transition-transform duration-200', isOpen && 'rotate-180')} />
              </button>

              {isOpen && (
                <div className="ml-4 mt-1 space-y-0.5 border-l border-[#1e1e2a] pl-3">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.slug}
                      end
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors',
                          isActive ? 'bg-[#6c63ff11] text-[#8b85ff]' : 'text-[#8888aa] hover:bg-[#ffffff04] hover:text-[#f0f0f8]',
                        )
                      }
                    >
                      <span>{item[lang]}</span>
                      {item.badge && (
                        <Badge variant={item.badge === 'BETA' ? 'orange' : 'green'} className="text-[9px]">
                          {item.badge}
                        </Badge>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
