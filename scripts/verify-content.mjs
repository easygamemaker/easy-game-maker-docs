#!/usr/bin/env node
/**
 * Content quality gate (npm run verify:content):
 *  1. every navigation slug (except the examples, which come from data/examples.ts) has a content page;
 *  2. every visible string exists in EN and PT, and PT has no em dash;
 *  3. every `code` block marked check:'compile' (default for ts/tsx) type-checks against the published SDK.
 * Pass --skip-compile to run only the fast structural checks.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { rolldown } from 'rolldown'

const root = resolve(import.meta.dirname, '..')
const SDK_VERSION = process.env.EGM_SDK_VERSION ?? '0.2.3'
const skipCompile = process.argv.includes('--skip-compile')
const work = join(tmpdir(), 'egm-docs-verify')
mkdirSync(work, { recursive: true })

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.ts') ? [p] : []
  })

const pageFiles = walk(join(root, 'src/content/pages'))
const entry = join(work, 'entry.ts')
const imp = (p) => JSON.stringify(resolve(p))
writeFileSync(
  entry,
  [
    ...pageFiles.map((f, i) => `import p${i} from ${imp(f)}`),
    `import { ALL_ITEMS } from ${imp(join(root, 'src/data/navigation.ts'))}`,
    `import { HERO_2D, HERO_3D } from ${imp(join(root, 'src/content/snippets.ts'))}`,
    `export const pages = [${pageFiles.map((_, i) => `p${i}`).join(',')}].flat()`,
    'export { ALL_ITEMS, HERO_2D, HERO_3D }',
  ].join('\n'),
)
const out = join(work, 'bundle.mjs')
const bundle = await rolldown({ input: entry, logLevel: 'silent' })
await bundle.write({ file: out, format: 'esm' })
const { pages, ALL_ITEMS, HERO_2D, HERO_3D } = await import(`${pathToFileURL(out).href}?t=${Date.now()}`)

const problems = []
const bySlug = new Map()
for (const page of pages) {
  if (bySlug.has(page.slug)) problems.push(`duplicate page for ${page.slug}`)
  bySlug.set(page.slug, page)
}

const isL10n = (v) => v && typeof v === 'object' && typeof v.en === 'string' && typeof v.pt === 'string'
const checkL10n = (where, v) => {
  if (!isL10n(v)) return problems.push(`${where}: not an {en, pt} pair`)
  if (!v.en.trim() || !v.pt.trim()) problems.push(`${where}: empty ${v.en.trim() ? 'pt' : 'en'}`)
  if (v.pt.includes('—')) problems.push(`${where}: em dash in pt`)
  if (v.en.includes('—')) problems.push(`${where}: em dash in en`)
}

const snippets = []
for (const page of pages) {
  const at = (s) => `${page.slug} ${s}`
  checkL10n(at('title'), page.title)
  checkL10n(at('description'), page.description)
  if (!page.sections?.length) problems.push(at('has no sections'))
  for (const sec of page.sections ?? []) {
    checkL10n(at(`section ${sec.id} title`), sec.title)
    sec.blocks.forEach((b, i) => {
      const w = at(`${sec.id}[${i}] ${b.type}`)
      if (b.type === 'p' || b.type === 'h' || b.type === 'callout') checkL10n(w, b.text)
      else if (b.type === 'list') b.items.forEach((it, j) => checkL10n(`${w}.${j}`, it))
      else if (b.type === 'props') b.rows.forEach((r) => checkL10n(`${w} ${r.name}`, r.description))
      else if (b.type === 'table') {
        b.head.forEach((h, j) => checkL10n(`${w} head.${j}`, h))
        b.rows.forEach((row, j) => row.forEach((c, k) => checkL10n(`${w} r${j}c${k}`, c)))
      } else if (b.type === 'code') {
        const compile = (b.check ?? (['ts', 'tsx', undefined].includes(b.lang) ? 'compile' : 'skip')) === 'compile'
        if (compile && (b.lang === 'ts' || b.lang === undefined)) snippets.push({ id: w, code: (b.setup ? `${b.setup}\n` : '') + b.code })
      }
    })
  }
  for (const r of page.related ?? []) if (!ALL_ITEMS.some((i) => i.slug === r)) problems.push(at(`related points to unknown slug ${r}`))
}

const missing = ALL_ITEMS.filter((i) => !i.slug.startsWith('/examples') && !bySlug.has(i.slug)).map((i) => i.slug)
for (const s of bySlug.keys()) if (!ALL_ITEMS.some((i) => i.slug === s)) problems.push(`page ${s} is not in the navigation`)
snippets.push({ id: 'HERO_2D', code: HERO_2D.code }, { id: 'HERO_3D', code: HERO_3D.code })

console.log(`pages: ${pages.length}/${ALL_ITEMS.filter((i) => !i.slug.startsWith('/examples')).length} nav slugs, ${snippets.length} snippets to compile`)
if (missing.length) console.log(`missing pages (${missing.length}): ${missing.join(' ')}`)

if (!skipCompile) {
  const proj = join(work, `sdk-${SDK_VERSION}`)
  if (!existsSync(join(proj, 'node_modules/easy-game-maker'))) {
    mkdirSync(proj, { recursive: true })
    writeFileSync(join(proj, 'package.json'), JSON.stringify({ name: 'verify', private: true, type: 'module' }))
    execFileSync('npm', ['install', `easy-game-maker@${SDK_VERSION}`, 'three@0.185.1', 'typescript', '@types/three@0.185', '--no-audit', '--no-fund'], { cwd: proj, stdio: 'inherit' })
  }
  const src = join(proj, 'snippets')
  mkdirSync(src, { recursive: true })
  for (const f of readdirSync(src)) execFileSync('rm', [join(src, f)])
  snippets.forEach((s, i) => writeFileSync(join(src, `s${String(i).padStart(3, '0')}.ts`), `${s.code}\nexport {}\n`))
  writeFileSync(
    join(proj, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: { target: 'ES2022', module: 'ESNext', moduleResolution: 'Bundler', strict: true, noEmit: true, skipLibCheck: true, lib: ['ES2022', 'DOM', 'DOM.Iterable'], types: [] },
      include: ['snippets'],
    }),
  )
  try {
    execFileSync(join(proj, 'node_modules/.bin/tsc'), ['-p', proj], { encoding: 'utf8', stdio: 'pipe' })
  } catch (e) {
    const text = `${e.stdout ?? ''}${e.stderr ?? ''}`
    for (const line of text.split('\n').filter((l) => /error TS/.test(l))) {
      const m = line.match(/snippets\/s(\d+)\.ts\((\d+),\d+\): (.*)/)
      problems.push(m ? `${snippets[Number(m[1])]?.id} line ${m[2]}: ${m[3]}` : line)
    }
  }
}

if (missing.length) problems.push(`${missing.length} nav slugs without a page`)
if (problems.length) {
  console.error(`\n${problems.length} problem(s):`)
  for (const p of problems) console.error(` - ${p}`)
  process.exit(1)
}
console.log(`ok (${relative(process.cwd(), work) || work})`)
