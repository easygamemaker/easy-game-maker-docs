import type { DocPage } from './types'

/**
 * Every file under content/pages default-exports one DocPage or an array of them. Adding a file is all it takes to
 * publish a page: the route, the search index and the previous/next links are derived from the registry.
 */
const modules = import.meta.glob<{ default: DocPage | DocPage[] }>('./pages/**/*.ts', { eager: true })

const pages = new Map<string, DocPage>()
for (const mod of Object.values(modules)) {
  const exported = mod.default
  for (const page of Array.isArray(exported) ? exported : [exported]) pages.set(page.slug, page)
}

export const getPage = (slug: string): DocPage | undefined => pages.get(slug)
export const allPages = (): DocPage[] => [...pages.values()]
