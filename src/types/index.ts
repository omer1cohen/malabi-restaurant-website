// Product Types
export interface Product {
  id: string
  name: string
  nameEn: string
  description: string
  price: number
  image: string
  category: ProductCategory
  ingredients: string[]
  allergens: string[]
  available: boolean
  featured: boolean
}

export type ProductCategory = 'classic' | 'chocolate' | 'pistachio' | 'seasonal'

export interface ProductsData {
  products: Product[]
}

// Cart Types
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface OrderData {
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    total: number
  }>
  subtotal: number
  deliveryFee: number
  totalAmount: number
  itemCount: number
}

// Order Form Types
export interface OrderFormData {
  fullName: string
  phone: string
  address: string
  city: string
  deliveryTime: string
  notes: string
}

// Category Tab Type
export interface CategoryTab {
  id: ProductCategory | 'all'
  label: string
  icon: string
}

// Delivery Area Type
export type DeliveryArea = string

// WhatsApp Message Types
export interface WhatsAppMessageData {
  orderId: string
  customer: OrderFormData
  order: OrderData
  timestamp: string
}
