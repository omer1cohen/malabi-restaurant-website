import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProductStore } from '@/stores/productStore'
import { ProductGrid } from '@/components/product/ProductGrid'
import { getButtonClasses } from '@/components/ui/Button'

export function FeaturedProducts() {
  const { getFeaturedProducts, isLoading } = useProductStore()
  const featuredProducts = getFeaturedProducts()

  return (
    <section className="section bg-gradient-to-br from-cream-white via-milk-swirl to-silk-cream relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 liquid-bg opacity-40 pointer-events-none" />

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">המומלצים שלנו</h2>
        </motion.div>

        <ProductGrid products={featuredProducts} isLoading={isLoading} />

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/menu" className={getButtonClasses('outline', 'lg')}>
            לכל התפריט
            <span className="mr-2">←</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
