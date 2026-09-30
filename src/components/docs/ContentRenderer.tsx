import { ExternalLink } from 'lucide-react'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { Callout } from '@/components/docs/ApiSection'
import { PropTable } from '@/components/docs/PropTable'
import { Inline } from '@/components/docs/Inline'
import { useLang } from '@/context/LangContext'
import type { Block, DocSection } from '@/content/types'

function DemoFrame({ example, caption }: { example: string; caption?: string }) {
  const { t } = useLang()
  const src = `/demos/${example}/index.html`
  return (
    <figure className="overflow-hidden rounded-xl border border-[#1e1e2a] bg-[#0d0d14]">
      <div className="flex items-center justify-between border-b border-[#1e1e2a] bg-[#0a0a0f] px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#8888aa]">{t('Live example', 'Exemplo ao vivo')}</span>
        <a href={src} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-[#8b85ff] hover:underline">
          {t('Open in a new tab', 'Abrir em nova aba')} <ExternalLink size={12} />
        </a>
      </div>
      <iframe src={src} title={example} loading="lazy" allow="gamepad *; autoplay" className="aspect-[16/10] w-full border-0 bg-black" />
      {caption && <figcaption className="px-4 py-2.5 text-xs text-[#8888aa]">{caption}</figcaption>}
    </figure>
  )
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  const { lang } = useLang()

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return (
              <p key={i} className="text-[15px] leading-7 text-[#a5a5bd]">
                <Inline text={block.text[lang]} />
              </p>
            )
          case 'h':
            return (
              <h3 key={i} id={block.id} className="scroll-mt-20 pt-4 text-base font-semibold text-[#f0f0f8]">
                <Inline text={block.text[lang]} />
              </h3>
            )
          case 'list': {
            const Tag = block.ordered ? 'ol' : 'ul'
            return (
              <Tag key={i} className={`space-y-1.5 pl-5 text-[15px] leading-7 text-[#a5a5bd] marker:text-[#6c63ff] ${block.ordered ? 'list-decimal' : 'list-disc'}`}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Inline text={item[lang]} />
                  </li>
                ))}
              </Tag>
            )
          }
          case 'code':
            return (
              <div key={i}>
                {block.title && <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8888aa]">{block.title[lang]}</p>}
                <CodeBlock code={block.code} lang={block.lang ?? 'ts'} filename={block.filename} />
              </div>
            )
          case 'props':
            return (
              <PropTable
                key={i}
                title={block.title?.[lang]}
                props={block.rows.map((r) => ({
                  name: r.name,
                  type: r.type,
                  default: r.default,
                  required: r.required,
                  readonly: r.readonly,
                  description: r.description[lang],
                }))}
              />
            )
          case 'table':
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-[#1e1e2a]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1e1e2a] bg-[#111118]">
                      {block.head.map((h, j) => (
                        <th key={j} className="px-4 py-2.5 text-left font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8888aa]">
                          {h[lang]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="border-b border-[#1e1e2a] last:border-0">
                        {row.map((cell, c) => (
                          <td key={c} className="px-4 py-2.5 align-top text-[#a5a5bd]">
                            <Inline text={cell[lang]} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'callout':
            return (
              <Callout key={i} type={block.kind} title={block.title?.[lang]}>
                <Inline text={block.text[lang]} />
              </Callout>
            )
          case 'demo':
            return <DemoFrame key={i} example={block.example} caption={block.caption?.[lang]} />
          case 'image':
            return (
              <figure key={i} className="overflow-hidden rounded-xl border border-[#1e1e2a]">
                <img src={block.src} alt={block.alt[lang]} loading="lazy" className="w-full" />
                {block.caption && <figcaption className="px-4 py-2.5 text-xs text-[#8888aa]">{block.caption[lang]}</figcaption>}
              </figure>
            )
        }
      })}
    </div>
  )
}

export function Sections({ sections }: { sections: DocSection[] }) {
  const { lang } = useLang()
  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-20">
          <h2 className="mb-1 text-xl font-semibold tracking-tight text-[#f0f0f8]">{section.title[lang]}</h2>
          {section.description && (
            <p className="mb-4 text-sm leading-relaxed text-[#8888aa]">
              <Inline text={section.description[lang]} />
            </p>
          )}
          <div className={section.description ? '' : 'mt-4'}>
            <Blocks blocks={section.blocks} />
          </div>
        </section>
      ))}
    </div>
  )
}
