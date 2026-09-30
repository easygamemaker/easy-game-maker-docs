import { useLocation, useNavigate } from 'react-router-dom'
import { GAME_TYPES, AREAS, areaHome, areaOfSlug, scopeOfSlug, type GameType } from '@/data/navigation'
import { useGameType } from '@/context/GameTypeContext'
import { useLang } from '@/context/LangContext'
import { cn } from '@/lib/utils'

/**
 * Picks the game type the whole site is scoped to. If the page on screen only exists for the other type, the reader
 * is taken to the equivalent starting point of the new type instead of being left on a page the menu no longer lists.
 */
export function useSwitchGameType(): (next: GameType) => void {
  const { setType } = useGameType()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (next) => {
    setType(next)
    const scope = scopeOfSlug(pathname)
    if (!scope || scope === next) return
    const area = areaOfSlug(pathname)
    if (area === 'engine') navigate(areaHome(AREAS.find((a) => a.id === 'engine')!, next))
    else if (area === 'examples') navigate('/examples')
    else navigate('/introduction')
  }
}

export function GameTypeSwitch({ className }: { className?: string }) {
  const { type } = useGameType()
  const { t } = useLang()
  const switchType = useSwitchGameType()

  return (
    <div role="group" aria-label={t('Game type', 'Tipo de jogo')} className={cn('flex items-center gap-2', className)}>
      <span className="hidden font-mono text-[10px] uppercase tracking-wider text-[#55556a] xl:block">{t('Game type', 'Tipo de jogo')}</span>
      <div className="flex rounded-lg border border-[#1e1e2a] bg-[#0d0d14] p-0.5">
        {GAME_TYPES.map((g) => (
          <button
            key={g.id}
            onClick={() => switchType(g.id)}
            aria-pressed={type === g.id}
            title={g.tagline.en}
            className={cn(
              'rounded-md px-3 py-1 text-xs font-bold tracking-wide transition-colors',
              type === g.id ? 'bg-[#6c63ff] text-white shadow-[0_0_12px_#6c63ff66]' : 'text-[#8888aa] hover:text-[#f0f0f8]',
            )}
          >
            {g.id.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}
