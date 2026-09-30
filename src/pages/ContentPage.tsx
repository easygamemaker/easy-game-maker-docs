import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { Sections } from '@/components/docs/ContentRenderer'
import { neighbours, ALL_ITEMS } from '@/data/navigation'
import { useGameType } from '@/context/GameTypeContext'
import { useLang } from '@/context/LangContext'
import type { DocPage } from '@/content/types'

/** A page that is in the menu but has no content yet. It says so and offers the way out, instead of showing another page. */
export function PlaceholderPage({ slug }: { slug: string }) {
  const { lang, t } = useLang()
  const item = ALL_ITEMS.find((i) => i.slug === slug)
  return (
    <DocLayout>
      <PageHeader
        title={item ? item[lang] : slug}
        description={t('This page is being written.', 'Esta página está sendo escrita.')}
        badge={t('Coming soon', 'Em breve')}
      />
      <p className="text-sm text-[#8888aa]">
        {t('In the meantime, use the search (⌘K) or the menu to find related pages.', 'Enquanto isso, use a busca (⌘K) ou o menu para achar páginas relacionadas.')}
      </p>
    </DocLayout>
  )
}

export function ContentPage({ page }: { page: DocPage }) {
  const { lang, t } = useLang()
  const { type } = useGameType()
  const { prev, next } = neighbours(page.slug, type)
  const related = (page.related ?? []).flatMap((slug) => ALL_ITEMS.filter((i) => i.slug === slug))

  return (
    <DocLayout toc={page.sections.map((s) => ({ id: s.id, title: s.title[lang] }))}>
      <PageHeader title={page.title[lang]} description={page.description[lang]} badge={page.badge} />

      <Sections sections={page.sections} />

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#8888aa]">{t('Related', 'Relacionados')}</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <Link key={r.slug} to={r.slug} className="rounded-lg border border-[#1e1e2a] bg-[#111118]/80 px-3 py-1.5 text-sm text-[#a5a5bd] transition-colors hover:border-[#6c63ff66] hover:text-[#8b85ff]">
                {r[lang]}
              </Link>
            ))}
          </div>
        </section>
      )}

      {(prev || next) && (
        <nav className="mt-12 grid gap-3 border-t border-[#1e1e2a] pt-6 sm:grid-cols-2" aria-label={t('Previous and next page', 'Página anterior e próxima')}>
          {prev ? (
            <Link to={prev.slug} className="group rounded-xl border border-[#1e1e2a] p-4 transition-colors hover:border-[#6c63ff66]">
              <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#55556a]"><ArrowLeft size={12} /> {t('Previous', 'Anterior')}</span>
              <span className="mt-1 block text-sm font-medium text-[#f0f0f8] group-hover:text-[#8b85ff]">{prev[lang]}</span>
            </Link>
          ) : <span />}
          {next && (
            <Link to={next.slug} className="group rounded-xl border border-[#1e1e2a] p-4 text-right transition-colors hover:border-[#6c63ff66]">
              <span className="flex items-center justify-end gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#55556a]">{t('Next', 'Próxima')} <ArrowRight size={12} /></span>
              <span className="mt-1 block text-sm font-medium text-[#f0f0f8] group-hover:text-[#8b85ff]">{next[lang]}</span>
            </Link>
          )}
        </nav>
      )}
    </DocLayout>
  )
}
