import { create } from 'zustand'
import type { Product, ProductCategory, ProductsData } from '@/types'

interface ProductState {
  products: Product[]
  isLoading: boolean
  error: string | null
  selectedCategory: ProductCategory | 'all'

  // Actions
  loadProducts: () => Promise<void>
  setCategory: (category: ProductCategory | 'all') => void

  // Computed (as functions)
  getFilteredProducts: () => Product[]
  getFeaturedProducts: () => Product[]
  getProductById: (id: string) => Product | undefined
  getAvailableProducts: () => Product[]
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  selectedCategory: 'all',

  loadProducts: async () => {
    // Prevent multiple loads
    if (get().products.length > 0 || get().isLoading) return

    set({ isLoading: true, error: null })

    try {
      const response = await fetch('/assets/data/products.json')

      if (!response.ok) {
        throw new Error('Failed to load products')
      }

      const data: ProductsData = await response.json()
      set({ products: data.products, isLoading: false })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'שגיאה בטעינת המוצרים'
      set({ error: message, isLoading: false })
      console.error('Error loading products:', error)
    }
  },

  setCategory: (category: ProductCategory | 'all') => {
    set({ selectedCategory: category })
  },

  getFilteredProducts: () => {
    const { products, selectedCategory } = get()
    const availableProducts = products.filter(p => p.available)

    if (selectedCategory === 'all') {
      return availableProducts
    }

    return availableProducts.filter(p => p.category === selectedCategory)
  },

  getFeaturedProducts: () => {
    return get().products.filter(p => p.featured && p.available)
  },

  getProductById: (id: string) => {
    return get().products.find(p => p.id === id)
  },

  getAvailableProducts: () => {
    return get().products.filter(p => p.available)
  },
}))
