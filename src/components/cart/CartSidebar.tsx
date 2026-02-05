import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/stores/cartStore'
import { CartItem } from './CartItem'
import { getButtonClasses } from '@/components/ui/Button'
import { formatPrice } from '@/lib/formatters'
import { cn } from '@/lib/utils'

export function CartSidebar() {
  const { items, isOpen, closeCart, getTotalPrice, getTotalCount } = useCartStore()
  const totalPrice = getTotalPrice()
  const totalCount = getTotalCount()
  const isEmpty = items.length === 0

  // Close cart on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeCart])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[var(--z-modal-backdrop)]"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'fixed top-0 left-0 h-full w-full max-w-md',
              'bg-cream-white/95 backdrop-blur-heavy',
              'shadow-2xl border-r border-rose-water/30',
              'z-[var(--z-cart-sidebar)]',
              'flex flex-col'
            )}
            role="dialog"
            aria-modal="true"
            aria-label="עגלת קניות"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-rose-water/30">
              <h2 className="text-xl font-semibold text-rich-cocoa flex items-center gap-2">
                <span>🛒</span>
                <span>העגלה שלי</span>
                {totalCount > 0 && (
                  <span className="text-sm font-normal text-delicate-gray">
                    ({totalCount} פריטים)
                  </span>
                )}
              </h2>

              <button
                onClick={closeCart}
                className="p-2 rounded-lg hover:bg-rose-water/50 transition-colors"
                aria-label="סגור עגלה"
              >
                <svg
                  className="w-6 h-6 text-rich-cocoa"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-6xl mb-4">🍨</span>
                  <p className="text-lg text-rich-cocoa mb-2">העגלה שלכם ריקה</p>
                  <p className="text-delicate-gray mb-6">
                    הוסיפו מלאבי טעים לעגלה!
                  </p>
                  <Link
                    to="/menu"
                    onClick={closeCart}
                    className={getButtonClasses('outline', 'md')}
                  >
                    עיינו בתפריט
                  </Link>
                </div>
              ) : (
                <motion.div layout className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* Footer - Only show if cart has items */}
            {!isEmpty && (
              <div className="border-t border-rose-water/30 p-4 space-y-4 bg-white/50">
                {/* Total */}
                <div className="flex items-center justify-between text-lg">
                  <span className="text-rich-cocoa">סה״כ:</span>
                  <span className="font-bold text-deep-pomegranate">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/order"
                  onClick={closeCart}
                  className={getButtonClasses('primary', 'md', 'w-full')}
                >
                  להשלמת ההזמנה
                  <span className="mr-2">←</span>
                </Link>

                {/* Continue Shopping */}
                <Link
                  to="/menu"
                  onClick={closeCart}
                  className={getButtonClasses('ghost', 'md', 'w-full')}
                >
                  המשך לקנות
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
