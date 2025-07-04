import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Mic,
  MicOff,
  Heart
} from 'lucide-react'
import { useSpeech } from '../../hooks/useSpeech'
import { useCart } from '../../hooks/useCart'
import SearchBar from '../common/SearchBar'
import CartPreview from '../cart/CartPreview'

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false)
  
  const { isListening, isSupported, startListening, stopListening } = useSpeech()
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Parfüms', href: '/products', current: location.pathname === '/products' },
    { name: 'Über uns', href: '/about', current: location.pathname === '/about' },
    { name: 'Kontakt', href: '/contact', current: location.pathname === '/contact' },
  ]

  const toggleSpeech = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
              aria-label="Zur Startseite"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-xl">L</span>
              </motion.div>
              <span className="text-xl font-serif font-semibold text-gradient">
                Liyana Nour
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-400 focus:text-primary-400 ${
                  item.current 
                    ? 'text-primary-500' 
                    : 'text-dark-300'
                }`}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Speech Control */}
            {isSupported && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSpeech}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isListening 
                    ? 'bg-red-500 text-white speech-active' 
                    : 'bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white'
                }`}
                aria-label={isListening ? 'Sprachsteuerung beenden' : 'Sprachsteuerung starten'}
                title={isListening ? 'Sprachsteuerung aktiv - Klicken zum Beenden' : 'Sprachsteuerung starten'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </motion.button>
            )}

            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white transition-all duration-200"
              aria-label="Suche öffnen"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/wishlist')}
              className="p-2 rounded-lg bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white transition-all duration-200"
              aria-label="Wunschliste"
            >
              <Heart className="w-5 h-5" />
            </motion.button>

            {/* Cart */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartPreviewOpen(!isCartPreviewOpen)}
                className="p-2 rounded-lg bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white transition-all duration-200 relative"
                aria-label={`Warenkorb mit ${itemCount} Artikeln`}
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </motion.span>
                )}
              </motion.button>
              
              <AnimatePresence>
                {isCartPreviewOpen && (
                  <CartPreview onClose={() => setIsCartPreviewOpen(false)} />
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/profile')}
              className="p-2 rounded-lg bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white transition-all duration-200"
              aria-label="Benutzerprofil"
            >
              <User className="w-5 h-5" />
            </motion.button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white transition-all duration-200"
                aria-label="Menü öffnen"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-dark-700/50 glass"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                    item.current
                      ? 'text-primary-500 bg-primary-500/10'
                      : 'text-dark-300 hover:text-white hover:bg-dark-700'
                  }`}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <SearchBar onClose={() => setIsSearchOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header