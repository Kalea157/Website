import { useState, useEffect, useCallback } from 'react'
import { Cart, CartItem, Product, Discount } from '../types'

interface UseCartReturn {
  cart: Cart
  itemCount: number
  isLoading: boolean
  addItem: (product: Product, quantity?: number, variants?: { [key: string]: string }) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  applyCoupon: (code: string) => Promise<boolean>
  removeCoupon: (code: string) => void
  calculateDiscount: () => Discount | null
}

const TAX_RATE = 0.19 // 19% MwSt in Deutschland
const FREE_SHIPPING_THRESHOLD = 50
const SAMPLE_THRESHOLD_1 = 75
const SAMPLE_THRESHOLD_2 = 105

export const useCart = (): UseCartReturn => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    appliedCoupons: []
  })
  const [isLoading, setIsLoading] = useState(false)

  // Calculate cart totals
  const calculateTotals = useCallback((items: CartItem[], appliedCoupons: string[] = []) => {
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    
    // Calculate shipping
    let shipping = 0
    if (subtotal < FREE_SHIPPING_THRESHOLD && subtotal > 0) {
      shipping = 4.99 // Standard shipping cost
    }
    
    // Calculate discount
    const discount = calculateDiscountForItems(items, subtotal, appliedCoupons)
    const discountAmount = discount ? 
      (discount.type === 'percentage' ? subtotal * (discount.value / 100) : discount.value) : 0
    
    // Apply shipping discount if applicable
    if (discount?.type === 'shipping') {
      shipping = 0
    }
    
    const discountedSubtotal = Math.max(0, subtotal - discountAmount)
    const tax = discountedSubtotal * TAX_RATE
    const total = discountedSubtotal + shipping + tax

    return {
      subtotal,
      shipping,
      tax,
      total,
      discount
    }
  }, [])

  // Calculate discount based on cart value and applied coupons
  const calculateDiscountForItems = (items: CartItem[], subtotal: number, coupons: string[]): Discount | null => {
    // Free shipping discount
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      return {
        type: 'shipping',
        value: 0,
        description: 'Versandkostenfrei ab 50€'
      }
    }

    // Volume discounts with free products
    if (subtotal >= SAMPLE_THRESHOLD_2) {
      return {
        type: 'percentage',
        value: 10,
        description: '10% Rabatt + Gratisproben',
        freeProducts: [] // Add sample products here
      }
    } else if (subtotal >= SAMPLE_THRESHOLD_1) {
      return {
        type: 'percentage',
        value: 5,
        description: '5% Rabatt + Gratisproben',
        freeProducts: [] // Add sample products here
      }
    }

    // Check applied coupons
    for (const couponCode of coupons) {
      const discount = getCouponDiscount(couponCode, subtotal)
      if (discount) return discount
    }

    return null
  }

  // Get discount for a specific coupon
  const getCouponDiscount = (code: string, subtotal: number): Discount | null => {
    const coupons: { [key: string]: Discount } = {
      'WELCOME10': {
        type: 'percentage',
        value: 10,
        description: 'Willkommensrabatt 10%',
        minOrderValue: 30
      },
      'SAVE20': {
        type: 'fixed',
        value: 20,
        description: '20€ Rabatt',
        minOrderValue: 100
      },
      'FREESHIP': {
        type: 'shipping',
        value: 0,
        description: 'Kostenloser Versand'
      }
    }

    const coupon = coupons[code.toUpperCase()]
    if (coupon && (!coupon.minOrderValue || subtotal >= coupon.minOrderValue)) {
      return coupon
    }

    return null
  }

  // Add item to cart
  const addItem = useCallback((product: Product, quantity = 1, variants?: { [key: string]: string }) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        item => item.productId === product.id && 
        JSON.stringify(item.selectedVariants) === JSON.stringify(variants)
      )

      let newItems: CartItem[]

      if (existingItemIndex >= 0) {
        // Update existing item
        newItems = [...prevCart.items]
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        }
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          product,
          quantity,
          selectedVariants: variants,
          addedAt: new Date().toISOString()
        }
        newItems = [...prevCart.items, newItem]
      }

      const totals = calculateTotals(newItems, prevCart.appliedCoupons)
      
      return {
        ...prevCart,
        items: newItems,
        ...totals
      }
    })

    // Announce to screen reader
    announceToScreenReader(`${product.name} wurde zum Warenkorb hinzugefügt`)
  }, [calculateTotals])

  // Remove item from cart
  const removeItem = useCallback((itemId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.id !== itemId)
      const totals = calculateTotals(newItems, prevCart.appliedCoupons)
      
      return {
        ...prevCart,
        items: newItems,
        ...totals
      }
    })

    announceToScreenReader('Artikel wurde aus dem Warenkorb entfernt')
  }, [calculateTotals])

  // Update item quantity
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
      const totals = calculateTotals(newItems, prevCart.appliedCoupons)
      
      return {
        ...prevCart,
        items: newItems,
        ...totals
      }
    })

    announceToScreenReader(`Menge wurde auf ${quantity} aktualisiert`)
  }, [calculateTotals, removeItem])

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCart({
      items: [],
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,
      appliedCoupons: []
    })

    announceToScreenReader('Warenkorb wurde geleert')
  }, [])

  // Apply coupon code
  const applyCoupon = useCallback(async (code: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const discount = getCouponDiscount(code, cart.subtotal)
      
      if (discount && !cart.appliedCoupons.includes(code.toUpperCase())) {
        setCart(prevCart => {
          const newCoupons = [...prevCart.appliedCoupons, code.toUpperCase()]
          const totals = calculateTotals(prevCart.items, newCoupons)
          
          return {
            ...prevCart,
            appliedCoupons: newCoupons,
            ...totals
          }
        })

        announceToScreenReader(`Gutschein ${code} wurde angewendet`)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Error applying coupon:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [cart.subtotal, cart.appliedCoupons, calculateTotals])

  // Remove coupon
  const removeCoupon = useCallback((code: string) => {
    setCart(prevCart => {
      const newCoupons = prevCart.appliedCoupons.filter(c => c !== code.toUpperCase())
      const totals = calculateTotals(prevCart.items, newCoupons)
      
      return {
        ...prevCart,
        appliedCoupons: newCoupons,
        ...totals
      }
    })

    announceToScreenReader(`Gutschein ${code} wurde entfernt`)
  }, [calculateTotals])

  // Get current discount
  const calculateDiscount = useCallback((): Discount | null => {
    return calculateDiscountForItems(cart.items, cart.subtotal, cart.appliedCoupons)
  }, [cart.items, cart.subtotal, cart.appliedCoupons])

  // Calculate item count
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart)
        const totals = calculateTotals(parsed.items || [], parsed.appliedCoupons || [])
        setCart({
          ...parsed,
          ...totals
        })
      } catch (error) {
        console.warn('Failed to load cart from localStorage')
      }
    }
  }, [calculateTotals])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Announce to screen readers
  const announceToScreenReader = (message: string) => {
    const announcement = document.getElementById('announcements')
    if (announcement) {
      announcement.textContent = message
    }
  }

  return {
    cart,
    itemCount,
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    calculateDiscount
  }
}