import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAVIGATION } from '@/data/navigation'
import { useLang } from '@/context/LangContext'
import { Badge } from '@/components/ui/Badge'

export function Sidebar() {
  const { lang } = useLang()
  const location = useLocation()
  const currentPath = location.pathname

  const openSectionId = NAVIGATION.find(s =>
    s.items.some(i => i.slug === currentPath)
  )?.id ?? NAVIGATION[0].id

  const [open, setOpen] = useState<string[]>([openSectionId])

  const toggle = (id: string) =>
    setOpen(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <nav className="h-full overflow-y-auto py-6 pr-2">
      <div className="space-y-1">
        {NAVIGATION.map(section => {
          const isOpen = open.includes(section.id)
          const hasActive = section.items.some(i => i.slug === currentPath)

          return (
            <div key={section.id}>
              <button
                onClick={() => toggle(section.id)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  hasActive
                    ? 'text-[#f0f0f8] bg-[#ffffff06]'
                    : 'text-[#8888aa] hover:text-[#f0f0f8] hover:bg-[#ffffff04]',
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{section.icon}</span>
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    {lang === 'en' ? section.en : section.pt}
                  </span>
                </span>
                <ChevronDown
                  size={14}
                  className={cn(
                    'transition-transform duration-200 text-[#55556a]',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>

              {isOpen && (
                <div className="mt-1 ml-4 space-y-0.5 border-l border-[#1e1e2a] pl-3">
                  {section.items.map(item => (
                    <NavLink
                      key={item.id}
                      to={item.slug}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between py-1.5 px-2 rounded-md text-sm transition-colors',
                          isActive
                            ? 'text-[#8b85ff] bg-[#6c63ff11]'
                            : 'text-[#8888aa] hover:text-[#f0f0f8] hover:bg-[#ffffff04]',
                        )
                      }
                    >
                      <span>{lang === 'en' ? item.en : item.pt}</span>
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
