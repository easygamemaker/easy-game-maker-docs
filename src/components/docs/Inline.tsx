import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

/**
 * Tiny inline markup for content strings: `code`, **bold**, and [label](/internal-or-https://external).
 * Anything else is plain text, so content authors never write JSX.
 */
const TOKEN = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g

export function Inline({ text }: { text: string }): ReactNode {
  const parts = text.split(TOKEN)
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="rounded bg-[#ffffff0d] px-1.5 py-0.5 font-mono text-[0.85em] text-[#c9c5ff]">
              {part.slice(1, -1)}
            </code>
          )
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-[#f0f0f8]">
              {part.slice(2, -2)}
            </strong>
          )
        }
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
        if (link) {
          const [, label, href] = link
          const cls = 'text-[#8b85ff] underline decoration-[#6c63ff55] underline-offset-2 hover:decoration-[#8b85ff]'
          return href!.startsWith('/') ? (
            <Link key={i} to={href!} className={cls}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
              {label}
            </a>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}
