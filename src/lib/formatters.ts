import { CONFIG } from './constants'

/**
 * Format price in Israeli Shekels
 */
export function formatPrice(price: number): string {
  return `${CONFIG.CURRENCY}${price.toLocaleString('he-IL')}`
}

/**
 * Generate unique order ID
 * Format: timestamp in base36 + random string
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 7)
  return `${timestamp}${randomStr}`.toUpperCase()
}

/**
 * Format current date in Hebrew locale
 */
export function formatDate(date: Date = new Date()): string {
  return date.toLocaleString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format Israeli phone number for display
 * 0501234567 -> 050-123-4567
 */
export function formatPhoneDisplay(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10 && cleaned.startsWith('05')) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

/**
 * Format phone number for WhatsApp (international format)
 * 0501234567 -> 972501234567
 */
export function formatPhoneWhatsApp(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('0')) {
    return `972${cleaned.slice(1)}`
  }
  return cleaned
}
