import { createHighlighter } from 'shiki'

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null

export async function getHighlighter() {
  if (highlighter) return highlighter
  highlighter = await createHighlighter({
    themes: ['github-dark'],
    langs: ['typescript', 'javascript', 'bash', 'json'],
  })
  return highlighter
}

export async function highlight(code: string, lang = 'typescript'): Promise<string> {
  const hl = await getHighlighter()
  return hl.codeToHtml(code, { lang, theme: 'github-dark' })
}
