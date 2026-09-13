import { cn } from '@/lib/utils'

type Variant = 'brand' | 'green' | 'yellow' | 'red' | 'blue' | 'orange' | 'muted'

interface BadgeProps {
  children: React.ReactNode
  variant?: Variant
  className?: string
}

const variants: Record<Variant, string> = {
  brand: 'bg-[#6c63ff22] text-[#8b85ff] border border-[#6c63ff44]',
  green: 'bg-[#34d39922] text-[#34d399] border border-[#34d39944]',
  yellow: 'bg-[#fbbf2422] text-[#fbbf24] border border-[#fbbf2444]',
  red: 'bg-[#f8717122] text-[#f87171] border border-[#f8717144]',
  blue: 'bg-[#60a5fa22] text-[#60a5fa] border border-[#60a5fa44]',
  orange: 'bg-[#fb923c22] text-[#fb923c] border border-[#fb923c44]',
  muted: 'bg-[#ffffff0a] text-[#8888aa] border border-[#ffffff11]',
}

export function Badge({ children, variant = 'brand', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider font-mono',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
