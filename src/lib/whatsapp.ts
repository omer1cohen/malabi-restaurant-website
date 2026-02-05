import { CONFIG } from './constants'
import { formatDate, formatPrice, generateOrderId, formatPhoneDisplay } from './formatters'
import type { WhatsAppMessageData, OrderFormData, OrderData } from '@/types'

/**
 * Generate WhatsApp message for order
 */
export function generateOrderMessage(data: WhatsAppMessageData): string {
  const { orderId, customer, order, timestamp } = data

  const itemsList = order.items
    .map(item => `• ${item.name} × ${item.quantity} = ${formatPrice(item.total)}`)
    .join('\n')

  const message = `
🍨 *הזמנה חדשה - מיסטר מלבי* 🍨

📋 *מספר הזמנה:* ${orderId}
📅 *תאריך:* ${timestamp}

👤 *פרטי לקוח:*
שם: ${customer.fullName}
טלפון: ${formatPhoneDisplay(customer.phone)}

📍 *פרטי משלוח:*
כתובת: ${customer.address}, ${customer.city}
זמן משלוח: ${customer.deliveryTime === 'asap' ? 'בהקדם האפשרי' : customer.deliveryTime}
${customer.notes ? `הערות: ${customer.notes}` : ''}

🛒 *פריטים:*
${itemsList}

💰 *סיכום:*
סה״כ מוצרים: ${formatPrice(order.subtotal)}
דמי משלוח: ${formatPrice(order.deliveryFee)}
━━━━━━━━━━━━━━━━━━
*סה״כ לתשלום: ${formatPrice(order.totalAmount)}*

תודה שבחרתם במיסטר מלבי! 🙏
`.trim()

  return message
}

/**
 * Create WhatsApp deep link URL
 */
export function createWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${CONFIG.WHATSAPP_BUSINESS_NUMBER}?text=${encodedMessage}`
}

/**
 * Open WhatsApp with order message
 * Returns true if successful, false if fallback needed
 */
export function openWhatsApp(customer: OrderFormData, order: OrderData): boolean {
  const orderId = generateOrderId()
  const timestamp = formatDate()

  const messageData: WhatsAppMessageData = {
    orderId,
    customer,
    order,
    timestamp,
  }

  const message = generateOrderMessage(messageData)
  const whatsappUrl = createWhatsAppUrl(message)

  // Try to open WhatsApp
  try {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    return true
  } catch {
    return false
  }
}

/**
 * Copy order message to clipboard
 * Fallback when WhatsApp doesn't open
 */
export async function copyOrderToClipboard(
  customer: OrderFormData,
  order: OrderData
): Promise<boolean> {
  const orderId = generateOrderId()
  const timestamp = formatDate()

  const messageData: WhatsAppMessageData = {
    orderId,
    customer,
    order,
    timestamp,
  }

  const message = generateOrderMessage(messageData)

  try {
    await navigator.clipboard.writeText(message)
    return true
  } catch {
    return false
  }
}

/**
 * Get WhatsApp phone number for manual contact
 */
export function getWhatsAppPhoneDisplay(): string {
  const phone = CONFIG.WHATSAPP_BUSINESS_NUMBER
  // Format: 972501234567 -> 050-123-4567
  if (phone.startsWith('972')) {
    const local = '0' + phone.slice(3)
    return `${local.slice(0, 3)}-${local.slice(3, 6)}-${local.slice(6)}`
  }
  return phone
}
