import { motion } from 'framer-motion'
import { useProductStore } from '@/stores/productStore'
import { CATEGORIES } from '@/lib/constants'
import type { ProductCategory } from '@/types'

interface CategoryPreviewCardProps {
  icon: string
  label: string
  categoryId: ProductCategory | 'all'
  count: number
  index: number
  onClick: () => void
}

function CategoryPreviewCard({
  icon,
  label,
  count,
  index,
  onClick,
}: CategoryPreviewCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.4, ease: 'easeOut' }}
      onClick={onClick}
      className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-luxury border border-rose-water/20 transition-all duration-200 hover:scale-105 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-malabi-400 focus-visible:ring-offset-2"
      whileTap={{ scale: 0.97 }}
    >
      {/* Icon */}
      <span className="text-3xl mb-2 block transition-transform duration-200 group-hover:scale-110">
        {icon}
      </span>

      {/* Label */}
      <span className="text-sm font-medium text-rich-cocoa block mb-1">
        {label}
      </span>

      {/* Count Badge */}
      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-rose-water/30 text-deep-pomegranate">
        {count} מוצרים
      </span>
    </motion.button>
  )
}

export function MenuHero() {
  const { products, setCategory } = useProductStore()

  // Get product counts per category (only available products)
  const getCategoryCount = (categoryId: ProductCategory | 'all') => {
    if (categoryId === 'all') {
      return products.filter(p => p.available).length
    }
    return products.filter(p => p.category === categoryId && p.available).length
  }

  // Handle category click - scroll to grid and select category
  const handleCategoryClick = (categoryId: ProductCategory | 'all') => {
    setCategory(categoryId)
    // Small delay to allow state update, then scroll
    setTimeout(() => {
      const gridElement = document.querySelector('[data-menu-grid]')
      if (gridElement) {
        gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  // Filter categories for preview (exclude 'all')
  const previewCategories = CATEGORIES.filter(cat => cat.id !== 'all')

  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-white via-rose-water/30 to-pistachio-mint/20">
        {/* Watercolor Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: 'url(/assets/images/pink-watercolor-bg.png)',
          }}
        />

        {/* Floating Animated Circles */}
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 rounded-full bg-pistachio-mint/30 blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-rose-water/40 blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-golden-saffron/20 blur-3xl"
          animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="container-custom relative z-10 py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-deep-pomegranate font-medium text-sm mb-6 border border-rose-water/30"
          >
            🍨 תפריט הקינוחים שלנו
          </motion.span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4"
          >
            <span className="text-gradient-primary animate-gradient bg-[length:200%_200%]">
              התפריט
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-soft-charcoal mb-8 max-w-xl mx-auto"
          >
            גלו את מגוון טעמי המלאבי שלנו - מהקלאסי ועד היצירות המיוחדות
          </motion.p>

          {/* Category Preview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {previewCategories.map((category, index) => (
              <CategoryPreviewCard
                key={category.id}
                icon={category.icon}
                label={category.label}
                categoryId={category.id}
                count={getCategoryCount(category.id)}
                index={index}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Optional Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-4 right-1/2 translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-rich-cocoa/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-rich-cocoa/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
