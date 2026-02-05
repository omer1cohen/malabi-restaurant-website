import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/stores/cartStore'
import { formatPrice } from '@/lib/formatters'
import { CONFIG } from '@/lib/constants'

export function OrderSummary() {
  const { items, getTotalPrice, getTotalCount } = useCartStore()
  const subtotal = getTotalPrice()
  const totalCount = getTotalCount()
  const total = subtotal + CONFIG.DELIVERY_FEE

  if (items.length === 0) {
    return (
      <div className="card p-6 text-center">
        <span className="text-5xl mb-4 block">🛒</span>
        <h3 className="text-lg font-medium text-rich-cocoa mb-2">
          העגלה שלכם ריקה
        </h3>
        <p className="text-delicate-gray mb-4">
          הוסיפו מלאבי טעים לפני שתמשיכו להזמנה
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-malabi-600 hover:text-malabi-700 font-medium"
        >
          <span>לתפריט</span>
          <span>←</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="card p-6 space-y-4">
      <h3 className="font-semibold text-lg text-rich-cocoa border-b border-rose-water/30 pb-3">
        סיכום הזמנה ({totalCount} פריטים)
      </h3>

      {/* Items List */}
      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {items.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover bg-rose-water/20"
                onError={e => {
                  e.currentTarget.src = '/assets/images/placeholder-malabi.svg'
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-rich-cocoa truncate">{item.name}</p>
                <p className="text-sm text-delicate-gray">
                  {item.quantity} × {formatPrice(item.price)}
                </p>
              </div>
              <span className="font-semibold text-rich-cocoa">
                {formatPrice(item.price * item.quantity)}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Totals */}
      <div className="border-t border-rose-water/30 pt-4 space-y-2">
        <div className="flex justify-between text-soft-charcoal">
          <span>סה״כ מוצרים</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-soft-charcoal">
          <span>דמי משלוח</span>
          <span>{formatPrice(CONFIG.DELIVERY_FEE)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-rich-cocoa pt-2 border-t border-rose-water/30">
          <span>סה״כ לתשלום</span>
          <span className="text-deep-pomegranate">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Edit Cart Link */}
      <Link
        to="/menu"
        className="block text-center text-sm text-malabi-600 hover:text-malabi-700 font-medium"
      >
        עריכת העגלה ←
      </Link>
    </div>
  )
}
