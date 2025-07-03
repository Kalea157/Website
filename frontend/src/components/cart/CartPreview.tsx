import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Plus, Minus, X, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

interface CartPreviewProps {
  onClose: () => void
}

const CartPreview: React.FC<CartPreviewProps> = ({ onClose }) => {
  const { cart, updateQuantity, removeItem } = useCart()

  if (cart.items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        className="absolute right-0 top-full mt-2 w-80 glass rounded-lg border border-dark-700/50 shadow-xl z-50"
      >
        <div className="p-6 text-center">
          <ShoppingCart className="w-12 h-12 text-dark-500 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-white mb-2">
            Ihr Warenkorb ist leer
          </h3>
          <p className="text-sm text-dark-400 mb-4">
            Entdecken Sie unsere exklusiven Parfüms
          </p>
          <Link
            to="/products"
            onClick={onClose}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Jetzt einkaufen</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="absolute right-0 top-full mt-2 w-96 glass rounded-lg border border-dark-700/50 shadow-xl z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-dark-700/50">
        <h3 className="text-lg font-semibold text-white">
          Warenkorb ({cart.items.length})
        </h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-1 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700 transition-colors duration-200"
          aria-label="Warenkorb-Vorschau schließen"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Items */}
      <div className="max-h-64 overflow-y-auto p-4 space-y-3">
        {cart.items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-dark-800/50 transition-colors duration-200"
          >
            {/* Product Image */}
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">
                {item.product.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
              </span>
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white truncate">
                {item.product.name}
              </h4>
              <p className="text-xs text-dark-400">
                {item.product.price.toFixed(2)}€
              </p>
              
              {/* Variants */}
              {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                <div className="text-xs text-dark-500 mt-1">
                  {Object.entries(item.selectedVariants).map(([key, value]) => (
                    <span key={key} className="inline-block mr-2">
                      {key}: {value}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-6 h-6 rounded-full bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white flex items-center justify-center transition-colors duration-200"
                aria-label={`Menge von ${item.product.name} verringern`}
              >
                <Minus className="w-3 h-3" />
              </motion.button>
              
              <span className="text-sm font-medium text-white w-8 text-center">
                {item.quantity}
              </span>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-6 h-6 rounded-full bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white flex items-center justify-center transition-colors duration-200"
                aria-label={`Menge von ${item.product.name} erhöhen`}
              >
                <Plus className="w-3 h-3" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeItem(item.id)}
                className="w-6 h-6 rounded-full bg-red-600/20 text-red-400 hover:bg-red-600/30 hover:text-red-300 flex items-center justify-center transition-colors duration-200 ml-2"
                aria-label={`${item.product.name} entfernen`}
              >
                <X className="w-3 h-3" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-dark-700/50 p-4 space-y-4">
        {/* Price Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-dark-400">Zwischensumme:</span>
            <span className="text-white">{cart.subtotal.toFixed(2)}€</span>
          </div>
          
          {cart.shipping > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Versand:</span>
              <span className="text-white">{cart.shipping.toFixed(2)}€</span>
            </div>
          )}
          
          {cart.shipping === 0 && cart.subtotal > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Versand:</span>
              <span className="text-green-400">Kostenlos</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm border-t border-dark-700/50 pt-2">
            <span className="text-dark-400">MwSt. (19%):</span>
            <span className="text-white">{cart.tax.toFixed(2)}€</span>
          </div>
          
          <div className="flex justify-between font-semibold text-white border-t border-dark-700/50 pt-2">
            <span>Gesamtsumme:</span>
            <span>{cart.total.toFixed(2)}€</span>
          </div>
        </div>

        {/* Discount Info */}
        {cart.discount && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
            <p className="text-sm text-green-400">
              {cart.discount.description}
            </p>
          </div>
        )}

        {/* Free Shipping Progress */}
        {cart.subtotal < 50 && cart.subtotal > 0 && (
          <div className="bg-primary-900/20 border border-primary-500/30 rounded-lg p-3">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-primary-400">Kostenloser Versand ab 50€</span>
              <span className="text-white">
                Noch {(50 - cart.subtotal).toFixed(2)}€
              </span>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((cart.subtotal / 50) * 100, 100)}%` }}
                className="bg-primary-500 h-2 rounded-full"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link
            to="/cart"
            onClick={onClose}
            className="btn-secondary flex-1 text-center"
          >
            Warenkorb
          </Link>
          <Link
            to="/checkout"
            onClick={onClose}
            className="btn-primary flex-1 text-center inline-flex items-center justify-center space-x-2"
          >
            <span>Zur Kasse</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default CartPreview