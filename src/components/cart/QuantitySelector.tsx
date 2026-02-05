import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface QuantitySelectorProps {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  min?: number
  max?: number
  size?: 'sm' | 'md'
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = 'sm',
}: QuantitySelectorProps) {
  const canDecrease = quantity > min
  const canIncrease = quantity < max

  const buttonClasses = cn(
    'flex items-center justify-center',
    'rounded-lg transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-malabi-400 focus-visible:ring-offset-1',
    'disabled:opacity-40 disabled:cursor-not-allowed',
    size === 'sm' ? 'w-7 h-7 text-sm' : 'w-9 h-9 text-base'
  )

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1',
        'bg-rose-water/30 rounded-lg',
        size === 'sm' ? 'p-0.5' : 'p-1'
      )}
    >
      <motion.button
        onClick={onDecrease}
        disabled={!canDecrease}
        className={cn(
          buttonClasses,
          'bg-white/80 text-rich-cocoa',
          canDecrease && 'hover:bg-white hover:text-deep-pomegranate'
        )}
        whileTap={canDecrease ? { scale: 0.9 } : undefined}
        aria-label="הפחת כמות"
      >
        −
      </motion.button>

      <span
        className={cn(
          'font-medium text-rich-cocoa min-w-[2rem] text-center',
          size === 'sm' ? 'text-sm' : 'text-base'
        )}
        aria-label={`כמות: ${quantity}`}
      >
        {quantity}
      </span>

      <motion.button
        onClick={onIncrease}
        disabled={!canIncrease}
        className={cn(
          buttonClasses,
          'bg-white/80 text-rich-cocoa',
          canIncrease && 'hover:bg-white hover:text-deep-pomegranate'
        )}
        whileTap={canIncrease ? { scale: 0.9 } : undefined}
        aria-label="הוסף כמות"
      >
        +
      </motion.button>
    </div>
  )
}
