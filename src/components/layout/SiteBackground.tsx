import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const POSTER = '/images/docs-bg.webp'

type NetworkInformationLike = { saveData?: boolean }

/** The video is decoration: skip it for people who ask for less motion or less data. */
function canPlayVideo(): boolean {
  if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return false
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection
  return !connection?.saveData
}

/**
 * Full-page background, fixed behind the whole site. Only the landing page plays the looping video; the reading
 * pages show the still poster, so the video is not decoded while people read. A dark scrim keeps the text readable:
 * strong on the reading pages, lighter on the home page where the scene is part of the hero.
 */
export function SiteBackground() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [playVideo, setPlayVideo] = useState(false)

  useEffect(() => {
    setPlayVideo(canPlayVideo())
    const query = window.matchMedia(REDUCED_MOTION_QUERY)
    const onChange = () => setPlayVideo(canPlayVideo())
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0f]" aria-hidden="true">
      {isHome && playVideo ? (
        <video
          className="h-full w-full object-cover"
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
        >
          <source src="/videos/docs-bg.webm" type="video/webm" />
          <source src="/videos/docs-bg.mp4" type="video/mp4" />
        </video>
      ) : (
        <img src={POSTER} alt="" width={1920} height={1080} className="h-full w-full object-cover" />
      )}

      <div className={cn('absolute inset-0 transition-colors duration-500', isHome ? 'bg-[#0a0a0f]/40' : 'bg-[#0a0a0f]/78')} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0a0a0f_100%)]" />
      {/* Home only: extra darkness behind the hero copy at the top, so the scene and the running ninja stay visible below it. */}
      {isHome && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_32%_at_50%_24%,rgba(10,10,15,0.66),transparent_100%)]" />
      )}
    </div>
  )
}
