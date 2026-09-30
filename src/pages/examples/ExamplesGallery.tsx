import { Link } from 'react-router-dom'
import { DocLayout, PageHeader } from '@/components/layout/DocLayout'
import { ExampleCard } from '@/components/examples/ExampleCard'
import { EXAMPLES, EXAMPLES_REPO } from '@/data/examples'
import { useGameType } from '@/context/GameTypeContext'
import { useLang } from '@/context/LangContext'

export function ExamplesGallery() {
  const { t } = useLang()
  const { type } = useGameType()
  const items = EXAMPLES.filter((e) => e.type === type)

  return (
    <DocLayout>
      <PageHeader
        title={t(`${type.toUpperCase()} examples`, `Exemplos ${type.toUpperCase()}`)}
        description={t(
          'Complete games you can play here and read on GitHub. Each page lists the engine features the game uses and how to run it.',
          'Jogos completos que você pode jogar aqui e ler no GitHub. Cada página lista os recursos da engine que o jogo usa e como executá-lo.',
        )}
        badge={t('Gallery', 'Galeria')}
      />

      {items.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((e) => (
            <ExampleCard key={e.slug} example={e} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#2a2a3a] bg-[#0d0d14]/80 p-8">
          <h2 className="text-lg font-semibold text-[#f0f0f8]">{t('3D examples are on the way', 'Os exemplos 3D estão a caminho')}</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#8888aa]">
            {t(
              'The 2D games below are complete projects. For 3D, start with the quick start and the recipes: every snippet in them is checked against the published package.',
              'Os jogos 2D são projetos completos. Para o 3D, comece pelo início rápido e pelas receitas: cada trecho de código deles é verificado contra o pacote publicado.',
            )}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to="/3d/quickstart" className="rounded-lg bg-[#6c63ff] px-4 py-2 text-sm font-medium text-white hover:bg-[#8b85ff]">{t('3D quick start', 'Início rápido 3D')}</Link>
            <Link to="/guide/recipes-3d" className="rounded-lg border border-[#2a2a3a] px-4 py-2 text-sm text-[#a5a5bd] hover:border-[#6c63ff66]">{t('3D recipes', 'Receitas 3D')}</Link>
          </div>
        </div>
      )}

      <p className="mt-10 text-sm text-[#55556a]">
        {t('All the source is in', 'Todo o código está em')}{' '}
        <a href={EXAMPLES_REPO} target="_blank" rel="noopener noreferrer" className="text-[#8b85ff] underline decoration-[#6c63ff55] underline-offset-2">
          easy-game-maker-examples
        </a>
        .
      </p>
    </DocLayout>
  )
}
