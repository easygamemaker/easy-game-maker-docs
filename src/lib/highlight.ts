import { createHighlighter } from 'shiki'

const LANGS = ['typescript', 'tsx', 'javascript', 'bash', 'json', 'html', 'css', 'swift', 'kotlin'] as const

/** Content files use short names; shiki wants full ones. */
const ALIASES: Record<string, string> = { ts: 'typescript', js: 'javascript', text: 'text' }

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null

export async function getHighlighter() {
  if (highlighter) return highlighter
  highlighter = await createHighlighter({ themes: ['github-dark'], langs: [...LANGS] })
  return highlighter
}

export async function highlight(code: string, lang = 'typescript'): Promise<string> {
  const hl = await getHighlighter()
  const resolved = ALIASES[lang] ?? lang
  const known = resolved === 'text' || (LANGS as readonly string[]).includes(resolved)
  return hl.codeToHtml(code, { lang: known ? resolved : 'text', theme: 'github-dark' })
}
