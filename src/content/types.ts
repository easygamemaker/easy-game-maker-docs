/** A string in both languages. Every piece of visible text in a documentation page is one of these. */
export interface L10n {
  en: string
  pt: string
}

export type CalloutKind = 'info' | 'warning' | 'tip' | 'danger'

export interface PropRow {
  name: string
  type: string
  default?: string
  required?: boolean
  readonly?: boolean
  description: L10n
}

/**
 * `check` controls the code verification script (npm run verify:content):
 * - 'compile' (default for ts/tsx): the snippet is type-checked against the published SDK, so it must be complete
 *   (imports included) or wrapped by `setup`.
 * - 'skip': a fragment, a shell command or output that is not meant to compile.
 */
export type CodeCheck = 'compile' | 'skip'

export type Block =
  | { type: 'p'; text: L10n }
  | { type: 'h'; text: L10n; id?: string }
  | { type: 'list'; items: L10n[]; ordered?: boolean }
  | {
      type: 'code'
      code: string
      lang?: 'ts' | 'tsx' | 'js' | 'json' | 'bash' | 'html' | 'css' | 'swift' | 'kotlin' | 'text'
      filename?: string
      title?: L10n
      check?: CodeCheck
      /** Source lines prepended when the snippet is compiled (not shown to readers). */
      setup?: string
    }
  | { type: 'props'; title?: L10n; rows: PropRow[] }
  | { type: 'table'; head: L10n[]; rows: L10n[][] }
  | { type: 'callout'; kind: CalloutKind; title?: L10n; text: L10n }
  /** A live, playable example from the examples repository, embedded in the page. */
  | { type: 'demo'; example: string; caption?: L10n }
  | { type: 'image'; src: string; alt: L10n; caption?: L10n }

export interface DocSection {
  /** Anchor id, also used by the "on this page" index. */
  id: string
  title: L10n
  description?: L10n
  blocks: Block[]
}

export interface DocPage {
  /** Must match a slug in navigation.ts. */
  slug: string
  title: L10n
  description: L10n
  badge?: string
  sections: DocSection[]
  /** Slugs of pages worth reading next. */
  related?: string[]
  /** Path inside the SDK repository this page documents, shown as a source link. */
  source?: string
}

/** Helper so content files read compactly: t('English', 'Português'). */
export const t = (en: string, pt: string): L10n => ({ en, pt })
