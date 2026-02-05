import { motion } from 'framer-motion'
import { useCartStore } from '@/stores/cartStore'
import { QuantitySelector } from './QuantitySelector'
import { formatPrice } from '@/lib/formatters'
import type { CartItem as CartItemType } from '@/types'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCartStore()
  const itemTotal = item.price * item.quantity

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4 p-3 bg-white/70 rounded-xl border border-rose-water/30"
    >
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-rose-water/20">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={e => {
            e.currentTarget.src = '/assets/images/placeholder-malabi.svg'
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-rich-cocoa truncate">{item.name}</h3>
          <button
            onClick={() => removeItem(item.id)}
            className="p-1 rounded-md hover:bg-red-50 text-delicate-gray hover:text-red-500 transition-colors flex-shrink-0"
            aria-label={`הסר ${item.name} מהעגלה`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        <p className="text-sm text-delicate-gray mt-1">
          {formatPrice(item.price)} ליחידה
        </p>

        <div className="flex items-center justify-between mt-2">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
          />
          <span className="font-semibold text-deep-pomegranate">
            {formatPrice(itemTotal)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
