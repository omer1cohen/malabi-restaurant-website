import type { CategoryTab, DeliveryArea } from '@/types'

// Application Configuration
export const CONFIG = {
  WHATSAPP_BUSINESS_NUMBER: '972501234567',
  SITE_URL: 'https://malabipalace.co.il',
  DELIVERY_FEE: 10,
  MIN_ORDER_AMOUNT: 30,
  CURRENCY: '₪',
  CURRENCY_CODE: 'ILS',
} as const

// Delivery Areas
export const DELIVERY_AREAS: DeliveryArea[] = [
  'תל אביב',
  'רמת גן',
  'גבעתיים',
  'בני ברק',
  'פתח תקווה',
  'הרצליה',
  'רעננה',
]

// Product Categories
export const CATEGORIES: CategoryTab[] = [
  { id: 'all', label: 'הכל', icon: '🍨' },
  { id: 'classic', label: 'קלאסי', icon: '🥛' },
  { id: 'chocolate', label: 'שוקולד', icon: '🍫' },
  { id: 'pistachio', label: 'פיסטוק', icon: '🥜' },
  { id: 'seasonal', label: 'עונתי', icon: '🌸' },
  { id: 'knafeh', label: 'כנאפה', icon: '🍯' },
]

// Delivery Time Slots
export const DELIVERY_TIME_SLOTS = [
  { value: 'asap', label: 'בהקדם האפשרי' },
  { value: '10:00-12:00', label: '10:00 - 12:00' },
  { value: '12:00-14:00', label: '12:00 - 14:00' },
  { value: '14:00-16:00', label: '14:00 - 16:00' },
  { value: '16:00-18:00', label: '16:00 - 18:00' },
  { value: '18:00-20:00', label: '18:00 - 20:00' },
  { value: '20:00-22:00', label: '20:00 - 22:00' },
]

// localStorage Keys
export const STORAGE_KEYS = {
  CART: 'malabiPalaceCart', // Keep same key for backward compatibility
} as const

// Animation Variants
export const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
} as const

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const

export const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
} as const
