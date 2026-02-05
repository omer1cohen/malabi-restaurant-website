import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { PAGE_TRANSITION } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: ReactNode
  className?: string
  withPadding?: boolean
}

export function PageContainer({
  children,
  className,
  withPadding = true,
}: PageContainerProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={PAGE_TRANSITION}
      className={cn(
        'min-h-[calc(100dvh-4rem)]',
        withPadding && 'py-8 md:py-12',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
