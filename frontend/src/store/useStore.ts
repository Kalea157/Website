import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Product, Cart, User, CartItem, CartUpdateRequest } from '../../../shared/types'

interface AppState {
  // User State
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void

  // Cart State
  cart: Cart | null
  addToCart: (product: Product, volumeId: string, quantity: number) => void
  updateCartItem: (itemId: string, quantity: number) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
  calculateCartTotals: () => void

  // Products State
  products: Product[]
  selectedProduct: Product | null
  isLoadingProducts: boolean
  setProducts: (products: Product[]) => void
  setSelectedProduct: (product: Product | null) => void
  setIsLoadingProducts: (loading: boolean) => void

  // Voice Control State
  isVoiceEnabled: boolean
  isListening: boolean
  voiceTranscript: string
  setVoiceEnabled: (enabled: boolean) => void
  setListening: (listening: boolean) => void
  setVoiceTranscript: (transcript: string) => void

  // Privacy Consent State
  hasAcceptedPrivacy: boolean
  hasAcceptedMicrophone: boolean
  setPrivacyConsent: (accepted: boolean) => void
  setMicrophoneConsent: (accepted: boolean) => void
}

const useStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial states
        user: null,
        isAuthenticated: false,
        cart: null,
        products: [],
        selectedProduct: null,
        isLoadingProducts: false,
        isVoiceEnabled: false,
        isListening: false,
        voiceTranscript: '',
        hasAcceptedPrivacy: false,
        hasAcceptedMicrophone: false,

        // User actions
        setUser: (user) => set({ user, isAuthenticated: !!user }),
        logout: () => set({ user: null, isAuthenticated: false }),

        // Cart actions
        addToCart: (product, volumeId, quantity) => {
          const state = get()
          const volume = product.volume.find(v => v.id === volumeId)
          if (!volume) return

          const newItem: CartItem = {
            id: `${product.id}-${volumeId}-${Date.now()}`,
            productId: product.id,
            product,
            volumeId,
            volume,
            quantity,
            price: volume.price,
            discountPrice: product.discountPrice,
            subtotal: quantity * (product.discountPrice || volume.price),
            addedAt: new Date()
          }

          const currentCart = state.cart || {
            id: `cart-${Date.now()}`,
            sessionId: `session-${Date.now()}`,
            items: [],
            subtotal: 0,
            discount: null,
            shipping: null,
            tax: 0,
            total: 0,
            currency: 'EUR',
            createdAt: new Date(),
            updatedAt: new Date()
          }

          const existingItemIndex = currentCart.items.findIndex(
            item => item.productId === product.id && item.volumeId === volumeId
          )

          if (existingItemIndex > -1) {
            currentCart.items[existingItemIndex].quantity += quantity
            currentCart.items[existingItemIndex].subtotal = 
              currentCart.items[existingItemIndex].quantity * 
              (currentCart.items[existingItemIndex].discountPrice || currentCart.items[existingItemIndex].price)
          } else {
            currentCart.items.push(newItem)
          }

          set({ cart: currentCart })
          get().calculateCartTotals()
        },

        updateCartItem: (itemId, quantity) => {
          const state = get()
          if (!state.cart) return

          const updatedCart = { ...state.cart }
          const itemIndex = updatedCart.items.findIndex(item => item.id === itemId)
          
          if (itemIndex > -1) {
            if (quantity <= 0) {
              updatedCart.items.splice(itemIndex, 1)
            } else {
              updatedCart.items[itemIndex].quantity = quantity
              updatedCart.items[itemIndex].subtotal = 
                quantity * (updatedCart.items[itemIndex].discountPrice || updatedCart.items[itemIndex].price)
            }
            set({ cart: updatedCart })
            get().calculateCartTotals()
          }
        },

        removeFromCart: (itemId) => {
          const state = get()
          if (!state.cart) return

          const updatedCart = { ...state.cart }
          updatedCart.items = updatedCart.items.filter(item => item.id !== itemId)
          
          set({ cart: updatedCart })
          get().calculateCartTotals()
        },

        clearCart: () => {
          set({ cart: null })
        },

        calculateCartTotals: () => {
          const state = get()
          if (!state.cart) return

          const cart = { ...state.cart }
          
          // Calculate subtotal
          cart.subtotal = cart.items.reduce((sum, item) => sum + item.subtotal, 0)
          
          // Apply discount rules
          if (cart.subtotal >= 50) {
            cart.shipping = {
              method: 'STANDARD' as any,
              cost: 0,
              estimatedDays: 3
            }
          } else {
            cart.shipping = {
              method: 'STANDARD' as any,
              cost: 5.99,
              estimatedDays: 3
            }
          }

          // Calculate tax (19% MwSt)
          cart.tax = cart.subtotal * 0.19

          // Calculate total
          cart.total = cart.subtotal + (cart.shipping?.cost || 0) + cart.tax - (cart.discount?.appliedAmount || 0)
          
          cart.updatedAt = new Date()
          
          set({ cart })
        },

        // Products actions
        setProducts: (products) => set({ products }),
        setSelectedProduct: (product) => set({ selectedProduct: product }),
        setIsLoadingProducts: (loading) => set({ isLoadingProducts: loading }),

        // Voice Control actions
        setVoiceEnabled: (enabled) => set({ isVoiceEnabled: enabled }),
        setListening: (listening) => set({ isListening: listening }),
        setVoiceTranscript: (transcript) => set({ voiceTranscript: transcript }),

        // Privacy actions
        setPrivacyConsent: (accepted) => set({ hasAcceptedPrivacy: accepted }),
        setMicrophoneConsent: (accepted) => set({ hasAcceptedMicrophone: accepted }),
      }),
      {
        name: 'liyana-nour-store',
        partialize: (state) => ({
          cart: state.cart,
          hasAcceptedPrivacy: state.hasAcceptedPrivacy,
          hasAcceptedMicrophone: state.hasAcceptedMicrophone,
          user: state.user,
        })
      }
    )
  )
)

export default useStore