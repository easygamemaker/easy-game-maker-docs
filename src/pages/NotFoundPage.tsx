import { Link } from 'react-router-dom'
import { useLang } from '@/context/LangContext'
import { Button } from '@/components/ui/Button'
import { Navbar } from '@/components/layout/Navbar'

export function NotFoundPage() {
  const { lang } = useLang()
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-[#6c63ff] font-mono text-6xl font-bold mb-4">404</p>
          <h1 className="text-2xl font-bold text-[#f0f0f8] mb-2">
            {lang === 'en' ? 'Page not found' : 'Página não encontrada'}
          </h1>
          <p className="text-[#8888aa] text-sm mb-6">
            {lang === 'en' ? 'This page does not exist.' : 'Esta página não existe.'}
          </p>
          <Link to="/"><Button variant="primary">← {lang === 'en' ? 'Back to docs' : 'Voltar para docs'}</Button></Link>
        </div>
      </div>
    </div>
  )
}
