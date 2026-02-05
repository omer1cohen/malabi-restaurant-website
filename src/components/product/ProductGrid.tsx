import { motion } from 'framer-motion'
import { ProductCard } from './ProductCard'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'
import { STAGGER_CONTAINER } from '@/lib/constants'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  emptyMessage?: string
}

export function ProductGrid({
  products,
  isLoading = false,
  emptyMessage = 'לא נמצאו מוצרים',
}: ProductGridProps) {
  if (isLoading) {
    return <ProductGridSkeleton count={8} />
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-5xl mb-4 block">🍨</span>
        <p className="text-lg text-delicate-gray">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={STAGGER_CONTAINER}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  )
}
