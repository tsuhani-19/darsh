import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'flex h-12 w-full rounded-xl border border-line bg-white px-4 text-[0.95rem] text-ink-900',
      'placeholder:text-ink-300',
      'transition-[border-color,box-shadow] duration-200',
      'focus-visible:border-brand-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100',
      'disabled:cursor-not-allowed disabled:opacity-60',
      className,
    )}
    {...props}
  />
))
Input.displayName = 'Input'

export { Input }
