import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
}

const variants: Record<Variant, string> = {
  primary: 'bg-[#6c63ff] hover:bg-[#8b85ff] text-white shadow-lg shadow-[#6c63ff33]',
  secondary: 'bg-[#18181f] hover:bg-[#1e1e2a] text-[#f0f0f8] border border-[#1e1e2a]',
  ghost: 'hover:bg-[#ffffff08] text-[#8888aa] hover:text-[#f0f0f8]',
  outline: 'border border-[#1e1e2a] hover:border-[#6c63ff] text-[#f0f0f8] hover:text-[#8b85ff]',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({ variant = 'secondary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-150 cursor-pointer',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
