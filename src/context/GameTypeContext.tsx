import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { scopeOfSlug, type GameType } from '@/data/navigation'

const STORAGE_KEY = 'egm-game-type'

interface GameTypeContextValue {
  type: GameType
  setType: (t: GameType) => void
}

const GameTypeContext = createContext<GameTypeContextValue | null>(null)

function readStored(): GameType {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === '2d' || stored === '3d') return stored
  } catch {
    /* private mode: fall through to the default */
  }
  return '2d'
}

/**
 * The game type (2D or 3D) scopes the whole site: menu, search, guides and examples show what applies to it.
 * Opening a page that belongs to the other type (from a link or a search result) switches the type, so the menu
 * never disagrees with the page on screen.
 */
export function GameTypeProvider({ children }: { children: ReactNode }) {
  const [type, setTypeState] = useState<GameType>(readStored)
  const { pathname } = useLocation()
  const typeRef = useRef(type)
  typeRef.current = type

  const setType = useCallback((next: GameType) => {
    setTypeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* not persisted, still works for this visit */
    }
  }, [])

  // Only the route drives this. Choosing a type in the header navigates away (see GameTypeSwitch), so the two never fight.
  useEffect(() => {
    const scope = scopeOfSlug(pathname)
    if (scope && scope !== typeRef.current) setType(scope)
  }, [pathname, setType])

  return <GameTypeContext.Provider value={{ type, setType }}>{children}</GameTypeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGameType(): GameTypeContextValue {
  const ctx = useContext(GameTypeContext)
  if (!ctx) throw new Error('useGameType must be used within GameTypeProvider')
  return ctx
}
