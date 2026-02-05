import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { useCartStore } from '@/stores/cartStore'
import { orderFormSchema } from '@/lib/validation'
import { openWhatsApp, copyOrderToClipboard, getWhatsAppPhoneDisplay } from '@/lib/whatsapp'
import { DELIVERY_AREAS, DELIVERY_TIME_SLOTS } from '@/lib/constants'
import type { OrderFormData } from '@/types'

const initialFormData: OrderFormData = {
  fullName: '',
  phone: '',
  address: '',
  city: '',
  deliveryTime: '',
  notes: '',
}

export function OrderForm() {
  const [formData, setFormData] = useState<OrderFormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { getOrderData, clearCart, items } = useCartStore()
  const hasItems = items.length > 0

  const handleChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!hasItems) {
      toast.error('העגלה ריקה. אנא הוסיפו מוצרים לפני ההזמנה.')
      return
    }

    // Validate form
    const result = orderFormSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof OrderFormData, string>> = {}
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof OrderFormData
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      toast.error('אנא תקנו את השגיאות בטופס')
      return
    }

    setIsSubmitting(true)
    const orderData = getOrderData()

    // Try to open WhatsApp
    const whatsappOpened = openWhatsApp(result.data as OrderFormData, orderData)

    if (whatsappOpened) {
      toast.success('וואטסאפ נפתח! השלימו את ההזמנה שם.')
      clearCart()
      setFormData(initialFormData)
    } else {
      // Fallback: Copy to clipboard
      const copied = await copyOrderToClipboard(result.data as OrderFormData, orderData)

      if (copied) {
        toast.success(
          `ההזמנה הועתקה! שלחו אותה ל-${getWhatsAppPhoneDisplay()}`,
          { duration: 5000 }
        )
        clearCart()
        setFormData(initialFormData)
      } else {
        toast.error('שגיאה בשליחת ההזמנה. אנא נסו שוב או צרו קשר ישירות.')
      }
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <Input
        label="שם מלא"
        name="fullName"
        value={formData.fullName}
        onChange={e => handleChange('fullName', e.target.value)}
        placeholder="ישראל ישראלי"
        error={errors.fullName}
        required
        autoComplete="name"
      />

      {/* Phone */}
      <Input
        label="טלפון נייד"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={e => handleChange('phone', e.target.value)}
        placeholder="050-1234567"
        error={errors.phone}
        required
        autoComplete="tel"
        dir="ltr"
        className="text-left"
      />

      {/* Address */}
      <Input
        label="כתובת למשלוח"
        name="address"
        value={formData.address}
        onChange={e => handleChange('address', e.target.value)}
        placeholder="רחוב ומספר בית"
        error={errors.address}
        required
        autoComplete="street-address"
      />

      {/* City */}
      <Select
        label="עיר"
        name="city"
        value={formData.city}
        onChange={e => handleChange('city', e.target.value)}
        placeholder="בחרו עיר"
        error={errors.city}
        required
        options={DELIVERY_AREAS.map(area => ({ value: area, label: area }))}
      />

      {/* Delivery Time */}
      <Select
        label="זמן משלוח מועדף"
        name="deliveryTime"
        value={formData.deliveryTime}
        onChange={e => handleChange('deliveryTime', e.target.value)}
        placeholder="בחרו זמן משלוח"
        error={errors.deliveryTime}
        required
        options={DELIVERY_TIME_SLOTS}
      />

      {/* Notes */}
      <Textarea
        label="הערות להזמנה"
        name="notes"
        value={formData.notes}
        onChange={e => handleChange('notes', e.target.value)}
        placeholder="הערות מיוחדות, הוראות הגעה וכו'"
        error={errors.notes}
        rows={3}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isSubmitting}
        disabled={!hasItems}
      >
        {hasItems ? (
          <>
            <span>שלח הזמנה בוואטסאפ</span>
            <span className="text-lg">💬</span>
          </>
        ) : (
          'העגלה ריקה'
        )}
      </Button>

      {/* WhatsApp Info */}
      <p className="text-sm text-center text-delicate-gray">
        ההזמנה תישלח ישירות לוואטסאפ שלנו: {getWhatsAppPhoneDisplay()}
      </p>
    </form>
  )
}
