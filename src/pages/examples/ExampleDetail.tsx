import { Link } from 'react-router-dom'
import { ExternalLink, Play } from 'lucide-react'
import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { Blocks } from '@/components/docs/ContentRenderer'
import { ExampleCard } from '@/components/examples/ExampleCard'
import { EXAMPLES, EXAMPLES_REPO, SDK_DOCS, type Example } from '@/data/examples'
import { t as tt, type Block } from '@/content/types'
import { useLang } from '@/context/LangContext'

export function ExampleDetail({ example }: { example: Example }) {
  const { lang, t } = useLang()
  const repoPath = `${EXAMPLES_REPO}/tree/main/${example.folder}`
  const others = EXAMPLES.filter((e) => e.type === example.type && e.slug !== example.slug).slice(0, 3)

  const run: Block[] = [
    {
      type: 'code',
      lang: 'bash',
      check: 'skip',
      code: `git clone ${EXAMPLES_REPO}.git\ncd easy-game-maker-examples/${example.folder}\nnpm install\negm simulate`,
    },
    {
      type: 'p',
      text: tt(
        'The simulator opens with live reload. To package the game, run `egm build desktop`: desktop is the only build target available for now.',
        'O simulador abre com recarga ao vivo. Para empacotar o jogo, rode `egm build desktop`: por enquanto o desktop é o único alvo de build disponível.',
      ),
    },
  ]

  return (
    <DocLayout>
      <PageHeader title={example.name[lang]} description={example.tagline[lang]} badge={example.genre[lang]} />

      <div className="mb-10 overflow-hidden rounded-2xl border border-[#1e1e2a] bg-[#0d0d14]">
        {example.demo ? (
          <>
            <div className="flex items-center justify-between border-b border-[#1e1e2a] bg-[#0a0a0f] px-4 py-2">
              <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#8b85ff]"><Play size={11} fill="currentColor" /> {t('Play it here', 'Jogue aqui')}</span>
              <a href={`/demos/${example.demo}/index.html`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-[#8888aa] hover:text-[#8b85ff]">
                {t('Full screen', 'Tela cheia')} <ExternalLink size={12} />
              </a>
            </div>
            <iframe src={`/demos/${example.demo}/index.html`} title={example.name[lang]} allow="gamepad *; autoplay" className="h-[560px] w-full border-0 bg-black" />
          </>
        ) : (
          <img src={example.image} alt={example.name[lang]} width={800} height={500} className="w-full bg-[#070710] object-contain" />
        )}
      </div>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold text-[#f0f0f8]">{t('About this game', 'Sobre este jogo')}</h2>
        <p className="text-[15px] leading-7 text-[#a5a5bd]">{example.about[lang]}</p>
        <ul className="mt-4 space-y-1.5 pl-5 text-[15px] leading-7 text-[#a5a5bd] marker:text-[#6c63ff] list-disc">
          {example.highlights.map((h, i) => <li key={i}>{h[lang]}</li>)}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold text-[#f0f0f8]">{t('Controls', 'Controles')}</h2>
        <div className="overflow-hidden rounded-xl border border-[#1e1e2a]">
          <table className="w-full text-sm">
            <tbody>
              {example.controls.map((c, i) => (
                <tr key={i} className="border-b border-[#1e1e2a] last:border-0">
                  <td className="w-44 whitespace-nowrap px-4 py-2.5"><kbd className="rounded-md border border-[#2a2a3a] bg-[#111118] px-2 py-0.5 font-mono text-xs text-[#c9c5ff]">{c.input[lang]}</kbd></td>
                  <td className="px-4 py-2.5 text-[#a5a5bd]">{c.action[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-1 text-xl font-semibold text-[#f0f0f8]">{t('Engine features it uses', 'Recursos da engine que usa')}</h2>
        <p className="mb-4 text-sm text-[#8888aa]">{t('Extracted from the imports of the game’s source. Click one to read its reference.', 'Extraídos dos imports do código do jogo. Clique em um para ler a referência.')}</p>
        <div className="flex flex-wrap gap-2">
          {example.sdk.map((s) =>
            SDK_DOCS[s] ? (
              <Link key={s} to={SDK_DOCS[s]!} className="rounded-lg border border-[#2a2a3a] bg-[#111118]/80 px-2.5 py-1 font-mono text-xs text-[#c9c5ff] transition-colors hover:border-[#6c63ff88] hover:text-white">{s}</Link>
            ) : (
              <span key={s} className="rounded-lg border border-[#1e1e2a] px-2.5 py-1 font-mono text-xs text-[#8888aa]">{s}</span>
            ),
          )}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold text-[#f0f0f8]">{t('The project', 'O projeto')}</h2>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: tt('Canvas', 'Canvas'), value: example.canvas },
            { label: tt('Source files', 'Arquivos de código'), value: String(example.files) },
            { label: tt('Lines of TypeScript', 'Linhas de TypeScript'), value: example.lines.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US') },
            { label: tt('Test files', 'Arquivos de teste'), value: String(example.tests) },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl border border-[#1e1e2a] bg-[#0d0d14]/80 p-3">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-[#55556a]">{stat.label[lang]}</dt>
              <dd className="mt-1 text-lg font-semibold text-[#f0f0f8]">{stat.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-3 flex flex-wrap gap-2">
          {example.extras.map((x, i) => <span key={i} className="rounded-md bg-[#ffffff08] px-2 py-0.5 font-mono text-[11px] text-[#8888aa]">{x[lang]}</span>)}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold text-[#f0f0f8]">{t('Run it yourself', 'Execute você mesmo')}</h2>
        <Blocks blocks={run} />
        <a href={repoPath} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#8b85ff] hover:underline">
          {t('View the source on GitHub', 'Ver o código no GitHub')} <ExternalLink size={13} />
        </a>
      </section>

      {others.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-[#f0f0f8]">{t('More examples', 'Mais exemplos')}</h2>
          <div className="grid gap-5 sm:grid-cols-3">{others.map((e) => <ExampleCard key={e.slug} example={e} />)}</div>
        </section>
      )}
    </DocLayout>
  )
}
