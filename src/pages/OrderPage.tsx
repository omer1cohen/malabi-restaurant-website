import { PageContainer } from '@/components/layout/PageContainer'
import { OrderForm } from '@/components/order/OrderForm'
import { OrderSummary } from '@/components/order/OrderSummary'

export function OrderPage() {
  return (
    <PageContainer>
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="font-hebrew text-4xl md:text-5xl font-bold text-rich-cocoa mb-4">
            השלמת הזמנה
          </h1>
          <p className="text-lg text-delicate-gray max-w-xl mx-auto">
            מלאו את פרטיכם ונשלח אליכם מלאבי טרי עד הבית
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <div className="card p-6 md:p-8">
              <h2 className="font-semibold text-xl text-rich-cocoa mb-6">
                פרטי משלוח
              </h2>
              <OrderForm />
            </div>
          </div>

          {/* Order Summary - Sticky on desktop */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
