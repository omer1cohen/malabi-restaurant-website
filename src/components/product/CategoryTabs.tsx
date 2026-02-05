import { motion } from 'framer-motion'
import { useProductStore } from '@/stores/productStore'
import { CATEGORIES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { ProductCategory } from '@/types'

export function CategoryTabs() {
  const { selectedCategory, setCategory } = useProductStore()

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {CATEGORIES.map(category => {
        const isActive = selectedCategory === category.id
        return (
          <motion.button
            key={category.id}
            onClick={() => setCategory(category.id as ProductCategory | 'all')}
            className={cn(
              'relative px-5 py-2.5 rounded-full font-medium text-sm',
              'transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-malabi-400 focus-visible:ring-offset-2',
              isActive
                ? 'text-white'
                : 'text-rich-cocoa bg-white/60 hover:bg-white/80 border border-rose-water/30'
            )}
            whileTap={{ scale: 0.97 }}
          >
            {/* Active background */}
            {isActive && (
              <motion.span
                layoutId="categoryTabBg"
                className="absolute inset-0 bg-gradient-to-r from-deep-pomegranate to-malabi-400 rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}

            {/* Content */}
            <span className="relative flex items-center gap-2">
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
