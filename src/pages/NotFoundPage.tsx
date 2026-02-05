import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageContainer } from '@/components/layout/PageContainer'
import { getButtonClasses } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <PageContainer>
      <div className="container-custom flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-8xl mb-6 block">🍨</span>

          <h1 className="font-display text-5xl md:text-6xl font-light text-rich-cocoa mb-4">
            404
          </h1>

          <h2 className="text-2xl text-soft-charcoal mb-4">
            העמוד לא נמצא
          </h2>

          <p className="text-delicate-gray mb-8 max-w-md mx-auto">
            נראה שהמלאבי הזה נאכל... אבל אל דאגה, יש לנו עוד הרבה טעמים טעימים!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className={getButtonClasses('primary', 'md')}>
              חזרה לדף הבית
            </Link>

            <Link to="/menu" className={getButtonClasses('outline', 'md')}>
              לתפריט שלנו
            </Link>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  )
}
