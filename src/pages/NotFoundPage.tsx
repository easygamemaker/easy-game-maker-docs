import { Link } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { Footer } from '@/components/layout/Footer'
import { useGameType } from '@/context/GameTypeContext'
import { useLang } from '@/context/LangContext'

export function NotFoundPage() {
  const { t } = useLang()
  const { type } = useGameType()
  const links = [
    { to: '/introduction', label: t('Introduction', 'Introdução') },
    { to: `/${type}/overview`, label: t(`${type.toUpperCase()} engine overview`, `Visão geral da engine ${type.toUpperCase()}`) },
    { to: '/examples', label: t('Examples', 'Exemplos') },
    { to: '/', label: t('Home', 'Início') },
  ]
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-6 pt-14">
        <div className="max-w-md text-center">
          <p className="font-mono text-sm text-[#8b85ff]">404</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#f0f0f8]">{t('Page not found', 'Página não encontrada')}</h1>
          <p className="mt-3 text-[#8888aa]">{t('This address does not exist in the documentation. Try one of these:', 'Este endereço não existe na documentação. Tente um destes:')}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="rounded-lg border border-[#1e1e2a] bg-[#111118]/80 px-3 py-1.5 text-sm text-[#a5a5bd] transition-colors hover:border-[#6c63ff66] hover:text-[#8b85ff]">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
