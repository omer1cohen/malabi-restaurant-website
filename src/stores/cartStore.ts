import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS, CONFIG } from '@/lib/constants'
import type { CartItem, OrderData, Product } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void

  // Computed (as functions)
  getTotalPrice: () => number
  getTotalCount: () => number
  hasProduct: (productId: string) => boolean
  getProductQuantity: (productId: string) => number
  getOrderData: () => OrderData
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product) => {
        if (!product.available) return

        set(state => {
          const existingItem = state.items.find(item => item.id === product.id)

          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }

          return {
            items: [
              ...state.items,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image,
              },
            ],
          }
        })
      },

      removeItem: (productId: string) => {
        set(state => ({
          items: state.items.filter(item => item.id !== productId),
        }))
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set(state => ({
          items: state.items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      openCart: () => {
        set({ isOpen: true })
        document.body.classList.add('cart-open')
      },

      closeCart: () => {
        set({ isOpen: false })
        document.body.classList.remove('cart-open')
      },

      toggleCart: () => {
        const { isOpen, openCart, closeCart } = get()
        if (isOpen) {
          closeCart()
        } else {
          openCart()
        }
      },

      // Computed values
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },

      getTotalCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },

      hasProduct: (productId: string) => {
        return get().items.some(item => item.id === productId)
      },

      getProductQuantity: (productId: string) => {
        const item = get().items.find(item => item.id === productId)
        return item?.quantity ?? 0
      },

      getOrderData: (): OrderData => {
        const { items, getTotalPrice } = get()
        const subtotal = getTotalPrice()

        return {
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
          })),
          subtotal,
          deliveryFee: CONFIG.DELIVERY_FEE,
          totalAmount: subtotal + CONFIG.DELIVERY_FEE,
          itemCount: get().getTotalCount(),
        }
      },
    }),
    {
      name: STORAGE_KEYS.CART,
      // Only persist items, not UI state
      partialize: state => ({ items: state.items }),
    }
  )
)
