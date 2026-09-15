import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('inline-flex flex-wrap items-center gap-1 rounded-full border border-line bg-white p-1', className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

/**
 * Trigger with the active pill shared between tabs via a layout animation, so
 * the indicator slides between them instead of blinking.
 *
 * `layoutGroup` scopes that shared element — two tab sets on one page would
 * otherwise animate the pill across the gap between them.
 */
const TabsTrigger = React.forwardRef(({ className, children, layoutGroup = 'tabs', ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'group relative rounded-full px-4 py-2 text-[0.85rem] font-medium text-ink-500 outline-none',
      'transition-colors duration-200 hover:text-ink-900',
      'focus-visible:ring-4 focus-visible:ring-brand-100',
      'data-[state=active]:text-white',
      className,
    )}
    {...props}
  >
    <span className="absolute inset-0 hidden group-data-[state=active]:block">
      <motion.span
        layoutId={layoutGroup}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        className="block h-full w-full rounded-full bg-ink-900"
      />
    </span>
    <span className="relative flex items-center gap-1.5">{children}</span>
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('outline-none focus-visible:ring-4 focus-visible:ring-brand-100', className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
