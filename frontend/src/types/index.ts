// Product Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discountPercentage?: number
  images: ProductImage[]
  category: string
  subcategory?: string
  inStock: boolean
  stockQuantity: number
  rating: number
  reviewCount: number
  variants?: ProductVariant[]
  tags: string[]
  seoSlug: string
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  order: number
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  price?: number
  inStock: boolean
  stockQuantity: number
}

// Cart Types
export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  selectedVariants?: { [key: string]: string }
  addedAt: string
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  discount?: Discount | null
  appliedCoupons: string[]
}

export interface Discount {
  type: 'percentage' | 'fixed' | 'shipping'
  value: number
  description: string
  minOrderValue?: number
  freeProducts?: Product[]
}

// User Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  addresses: Address[]
  preferences: UserPreferences
  createdAt: string
}

export interface Address {
  id: string
  type: 'billing' | 'shipping'
  firstName: string
  lastName: string
  company?: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

export interface UserPreferences {
  language: 'de' | 'en' | 'fr'
  currency: 'EUR' | 'USD'
  newsletter: boolean
  speechEnabled: boolean
  highContrast: boolean
  reducedMotion: boolean
}

// Order Types
export interface Order {
  id: string
  userId: string
  items: CartItem[]
  billingAddress: Address
  shippingAddress: Address
  paymentMethod: PaymentMethod
  status: OrderStatus
  subtotal: number
  shipping: number
  tax: number
  total: number
  discount?: Discount
  trackingNumber?: string
  createdAt: string
  updatedAt: string
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

// Payment Types
export interface PaymentMethod {
  id: string
  type: PaymentType
  provider: string
  last4?: string
  expiryMonth?: number
  expiryYear?: number
  cardType?: 'visa' | 'mastercard' | 'amex'
  isDefault: boolean
}

export type PaymentType = 
  | 'credit_card'
  | 'paypal'
  | 'apple_pay'
  | 'google_pay'
  | 'klarna'
  | 'sofort'
  | 'sepa'
  | 'crypto'
  | 'cash_on_delivery'

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: PaymentStatus
  clientSecret?: string
  metadata: { [key: string]: string }
}

export type PaymentStatus = 
  | 'requires_payment_method'
  | 'requires_confirmation'
  | 'requires_action'
  | 'processing'
  | 'succeeded'
  | 'cancelled'

// Speech Types
export interface SpeechCommand {
  command: string
  action: string
  parameters?: { [key: string]: any }
  confidence: number
}

export interface SpeechSettings {
  enabled: boolean
  language: string
  autoListen: boolean
  confirmActions: boolean
  speakFeedback: boolean
  voiceRate: number
  voicePitch: number
  voiceVolume: number
}

// API Types
export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
  pagination?: Pagination
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ApiError {
  code: string
  message: string
  details?: { [key: string]: any }
}

// Search Types
export interface SearchFilters {
  category?: string
  priceRange?: [number, number]
  inStock?: boolean
  rating?: number
  tags?: string[]
  sortBy?: 'name' | 'price' | 'rating' | 'newest'
  sortOrder?: 'asc' | 'desc'
}

export interface SearchResults {
  products: Product[]
  total: number
  filters: SearchFilters
  suggestions?: string[]
}

// Form Types
export interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  newsletter: boolean
}

export interface NewsletterForm {
  email: string
  firstName?: string
  preferences: string[]
}

// Notification Types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  actions?: NotificationAction[]
  persistent?: boolean
}

export interface NotificationAction {
  label: string
  action: () => void
  variant?: 'primary' | 'secondary'
}