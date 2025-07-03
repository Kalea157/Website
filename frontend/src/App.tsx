import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'

// Layout components
import Layout from '@/components/Layout/Layout'

// Pages
import HomePage from '@/pages/HomePage'
import ProductsPage from '@/pages/ProductsPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import OrderConfirmationPage from '@/pages/OrderConfirmationPage'
import PrivacyPage from '@/pages/PrivacyPage'
import NotFoundPage from '@/pages/NotFoundPage'

// Voice Control Provider
import { VoiceControlProvider } from '@/components/Voice/VoiceControlProvider'

// Store Provider
import { StoreProvider } from '@/store/StoreProvider'

// Privacy Consent Modal
import { PrivacyConsentModal } from '@/components/UI/PrivacyConsentModal'

function App() {
  useEffect(() => {
    // Initialize app
    console.log('Liyana Nour Extrait - App initialized')
  }, [])

  return (
    <StoreProvider>
      <VoiceControlProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
        
        {/* Global Components */}
        <PrivacyConsentModal />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </VoiceControlProvider>
    </StoreProvider>
  )
}

export default App