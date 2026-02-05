import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useCartStore } from '@/stores/cartStore'
import { useProductStore } from '@/stores/productStore'
import { QuantitySelector } from '@/components/cart/QuantitySelector'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/formatters'
import { STAGGER_ITEM } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, hasProduct, getProductQuantity, updateQuantity } = useCartStore()
  const getProductById = useProductStore(state => state.getProductById)

  const inCart = hasProduct(product.id)
  const quantity = getProductQuantity(product.id)

  const handleAddToCart = () => {
    const p = getProductById(product.id)
    if (p) {
      addItem(p)
      toast.success(`${product.name} נוסף לעגלה`)
    }
  }

  const handleIncrease = () => {
    const p = getProductById(product.id)
    if (p) {
      updateQuantity(product.id, quantity + 1)
    }
  }

  const handleDecrease = () => {
    updateQuantity(product.id, quantity - 1)
  }

  return (
    <motion.article
      variants={STAGGER_ITEM}
      layout
      className={cn(
        'card overflow-hidden group',
        !product.available && 'opacity-60'
      )}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-rose-water/20">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={e => {
            e.currentTarget.src = '/assets/images/placeholder-malabi.svg'
          }}
        />

        {/* Unavailable Badge */}
        {!product.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="bg-white/90 px-4 py-2 rounded-lg text-rich-cocoa font-medium">
              לא זמין
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {product.featured && product.available && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-golden-saffron to-deep-pomegranate text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
            מומלץ ⭐
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-rich-cocoa leading-tight">
            {product.name}
          </h3>
          <p className="text-sm text-delicate-gray mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-deep-pomegranate">
            {formatPrice(product.price)}
          </span>

          {product.available && (
            <>
              {inCart ? (
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  size="md"
                />
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddToCart}
                  leftIcon={<span>🛒</span>}
                >
                  הוסף
                </Button>
              )}
            </>
          )}
        </div>

        {/* Allergens */}
        {product.allergens.length > 0 && (
          <p className="text-xs text-delicate-gray">
            <span className="font-medium">אלרגנים:</span> {product.allergens.join(', ')}
          </p>
        )}
      </div>
    </motion.article>
  )
}
