import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import { useEffect } from 'react'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartSidebar } from '@/components/cart/CartSidebar'

import { HomePage } from '@/pages/HomePage'
import { MenuPage } from '@/pages/MenuPage'
import { OrderPage } from '@/pages/OrderPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

import { useProductStore } from '@/stores/productStore'

export default function App() {
  const location = useLocation()
  const loadProducts = useProductStore(state => state.loadProducts)

  // Load products on app mount
  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-br from-cream-white via-milk-swirl to-silk-cream">
      <Header />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <CartSidebar />

      <Toaster
        position="bottom-center"
        dir="rtl"
        toastOptions={{
          className: 'font-hebrew',
          style: {
            background: '#FFF8F3',
            border: '1px solid #FFE4E8',
            color: '#4A3728',
          },
        }}
      />
    </div>
  )
}
