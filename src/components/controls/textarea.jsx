import * as React from 'react'

import { cn } from '@/lib/utils'

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-[8rem] w-full resize-y rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] leading-relaxed text-ink-900',
      'placeholder:text-ink-300',
      'transition-[border-color,box-shadow] duration-200',
      'focus-visible:border-brand-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100',
      'disabled:cursor-not-allowed disabled:opacity-60',
      className,
    )}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

export { Textarea }
