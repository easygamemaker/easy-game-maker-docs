import { Link } from 'react-router-dom'
import { AREAS, areaHome, areaLabel } from '@/data/navigation'
import { useGameType } from '@/context/GameTypeContext'
import { useLang } from '@/context/LangContext'
import { GITHUB_ORG, NPM_URL } from './SiteHeader'

export function Footer() {
  const { lang, t } = useLang()
  const { type } = useGameType()
  const repos = [
    { name: 'easy-game-maker', label: t('SDK and CLI', 'SDK e CLI') },
    { name: 'easy-game-maker-examples', label: t('Example games', 'Jogos de exemplo') },
    { name: 'easy-game-maker-docs', label: t('This site', 'Este site') },
  ]
  return (
    <footer className="relative z-10 border-t border-[#1e1e2a] bg-[#0a0a0f]/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6c63ff] text-sm font-bold text-white">E</span>
            <span className="text-sm font-semibold text-[#f0f0f8]">Easy Game Maker</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#8888aa]">
            {t('A TypeScript-first engine for 2D and 3D games.', 'Uma engine em TypeScript para jogos 2D e 3D.')}
          </p>
          <p className="mt-4 font-mono text-xs text-[#55556a]">{t('MIT licensed', 'Licença MIT')}</p>
        </div>

        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-[#55556a]">{t('Documentation', 'Documentação')}</p>
          <ul className="space-y-2 text-sm">
            {AREAS.map((a) => (
              <li key={a.id}>
                <Link to={areaHome(a, type)} className="text-[#8888aa] transition-colors hover:text-[#f0f0f8]">{areaLabel(a, type, lang)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-[#55556a]">{t('Project', 'Projeto')}</p>
          <ul className="space-y-2 text-sm">
            {repos.map((r) => (
              <li key={r.name}>
                <a href={`${GITHUB_ORG}/${r.name}`} target="_blank" rel="noopener noreferrer" className="text-[#8888aa] transition-colors hover:text-[#f0f0f8]">
                  {r.label}
                </a>
              </li>
            ))}
            <li>
              <a href={NPM_URL} target="_blank" rel="noopener noreferrer" className="text-[#8888aa] transition-colors hover:text-[#f0f0f8]">npm</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-[#55556a]">{t('Status', 'Situação')}</p>
          <p className="text-sm leading-relaxed text-[#8888aa]">
            {t(
              'Desktop builds are available today. Other platforms are under review ahead of the upcoming EGM Marketplace.',
              'Os builds de desktop já estão disponíveis. As demais plataformas estão em revisão antes do futuro EGM Marketplace.',
            )}
          </p>
        </div>
      </div>
      <div className="border-t border-[#1e1e2a] py-4 text-center font-mono text-[11px] text-[#55556a]">
        © {new Date().getFullYear()} Easy Game Maker
      </div>
    </footer>
  )
}
