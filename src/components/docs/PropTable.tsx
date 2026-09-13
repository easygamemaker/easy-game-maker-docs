import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { useLang } from '@/context/LangContext'

export interface PropDef {
  name: string
  type: string
  default?: string
  required?: boolean
  readonly?: boolean
  description?: string
  description_en?: string
  description_pt?: string
}

interface PropTableProps {
  props: PropDef[]
  title?: string
  className?: string
}

export function PropTable({ props, title, className }: PropTableProps) {
  const { lang } = useLang()

  return (
    <div className={cn('overflow-hidden rounded-xl border border-[#1e1e2a]', className)}>
      {title && <div className="border-b border-[#1e1e2a] bg-[#111118] px-4 py-3 text-sm font-semibold text-[#f0f0f8]">{title}</div>}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#1e1e2a] bg-[#111118]">
            <th className="text-left px-4 py-3 text-[#8888aa] font-medium text-xs uppercase tracking-wider w-1/4">Property</th>
            <th className="text-left px-4 py-3 text-[#8888aa] font-medium text-xs uppercase tracking-wider w-1/4">Type</th>
            <th className="text-left px-4 py-3 text-[#8888aa] font-medium text-xs uppercase tracking-wider w-1/6">Default</th>
            <th className="text-left px-4 py-3 text-[#8888aa] font-medium text-xs uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p, i) => (
            <tr
              key={p.name}
              className={cn(
                'border-b border-[#1e1e2a] last:border-0 transition-colors hover:bg-[#ffffff04]',
                i % 2 === 0 ? 'bg-[#0a0a0f]' : 'bg-[#0d0d14]',
              )}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <code className="text-[#8b85ff] font-mono text-xs bg-[#6c63ff11] px-1.5 py-0.5 rounded">
                    {p.name}
                  </code>
                  {p.required && <Badge variant="orange">required</Badge>}
                  {p.readonly && <Badge variant="muted">readonly</Badge>}
                </div>
              </td>
              <td className="px-4 py-3">
                <code className="text-[#60a5fa] font-mono text-xs">{p.type}</code>
              </td>
              <td className="px-4 py-3">
                {p.default ? (
                  <code className="text-[#34d399] font-mono text-xs">{p.default}</code>
                ) : (
                  <span className="text-[#55556a] text-xs">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-[#8888aa] text-xs leading-relaxed">
                {p.description ?? (lang === 'en' ? p.description_en : p.description_pt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
