import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ApiSectionProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function ApiSection({ title, description, children, className }: ApiSectionProps) {
  return (
    <section className={cn('mb-10', className)}>
      <h3 className="text-lg font-semibold text-[#f0f0f8] mb-1 flex items-center gap-2">
        {title}
      </h3>
      {description && (
        <p className="text-[#8888aa] text-sm mb-4 leading-relaxed">{description}</p>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  )
}

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'danger'
  title?: string
  children: ReactNode
}

const calloutStyles = {
  info: {
    bg: 'bg-[#60a5fa0d]',
    border: 'border-[#60a5fa33]',
    icon: 'ℹ️',
    title: 'bg-[#60a5fa22] text-[#60a5fa]',
  },
  warning: {
    bg: 'bg-[#fbbf240d]',
    border: 'border-[#fbbf2433]',
    icon: '⚠️',
    title: 'bg-[#fbbf2422] text-[#fbbf24]',
  },
  tip: {
    bg: 'bg-[#34d3990d]',
    border: 'border-[#34d39933]',
    icon: '💡',
    title: 'bg-[#34d39922] text-[#34d399]',
  },
  danger: {
    bg: 'bg-[#f871710d]',
    border: 'border-[#f8717133]',
    icon: '🚨',
    title: 'bg-[#f8717122] text-[#f87171]',
  },
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const s = calloutStyles[type]
  return (
    <div className={cn('rounded-xl border p-4 text-sm', s.bg, s.border)}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-base flex-shrink-0">{s.icon}</span>
        <div>
          {title && (
            <p className={cn('font-semibold text-xs uppercase tracking-wider mb-1', s.title.split(' ')[1])}>
              {title}
            </p>
          )}
          <div className="text-[#8888aa] leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
