import { PageContainer } from '@/components/layout/PageContainer'
import { MenuHero } from '@/components/menu'
import { CategoryTabs } from '@/components/product/CategoryTabs'
import { ProductGrid } from '@/components/product/ProductGrid'
import { useProductStore } from '@/stores/productStore'

export function MenuPage() {
  const { getFilteredProducts, isLoading, error } = useProductStore()
  const products = getFilteredProducts()

  return (
    <PageContainer>
      {/* Hero Section */}
      <MenuHero />

      {/* Main Content with subtle gradient background */}
      <div className="relative bg-gradient-to-b from-transparent via-cream-white/50 to-cream-white">
        {/* Floating Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-rose-water/20 blur-3xl" />
          <div className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-pistachio-mint/15 blur-3xl" />
        </div>

        <div className="container-custom relative z-10 py-12">
          {/* Category Filter */}
          <div data-menu-grid>
            <CategoryTabs />
          </div>

          {/* Error State */}
          {error && (
            <div className="text-center py-12 bg-red-50 rounded-xl">
              <span className="text-4xl mb-4 block">😕</span>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Products Grid */}
          {!error && (
            <ProductGrid
              products={products}
              isLoading={isLoading}
              emptyMessage="לא נמצאו מוצרים בקטגוריה זו"
            />
          )}
        </div>
      </div>
    </PageContainer>
  )
}
