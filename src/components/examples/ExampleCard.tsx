import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import type { Example } from '@/data/examples'
import { useLang } from '@/context/LangContext'
import { cn } from '@/lib/utils'

export function ExampleCard({ example, className }: { example: Example; className?: string }) {
  const { lang, t } = useLang()
  return (
    <Link
      to={`/examples/${example.slug}`}
      className={cn('group relative flex flex-col overflow-hidden rounded-2xl border border-[#1e1e2a] bg-[#0d0d14]/90 transition-all hover:-translate-y-0.5 hover:border-[#6c63ff66] hover:shadow-[0_8px_40px_-12px_#6c63ff55]', className)}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#070710]">
        <img src={example.image} alt="" loading="lazy" width={800} height={500} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]" />
        {example.demo && (
          <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-[#6c63ff] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
            <Play size={10} fill="currentColor" /> {t('Playable', 'Jogável')}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#8b85ff]">{example.genre[lang]}</p>
        <h3 className="mt-1 text-base font-semibold text-[#f0f0f8]">{example.name[lang]}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#8888aa]">{example.tagline[lang]}</p>
        <p className="mt-3 font-mono text-[11px] text-[#55556a]">
          {example.files} {t('files', 'arquivos')} · {example.lines.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')} {t('lines', 'linhas')}
        </p>
      </div>
    </Link>
  )
}
