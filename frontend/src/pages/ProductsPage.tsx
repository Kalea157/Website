import React from 'react'
import { motion } from 'framer-motion'

const ProductsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <h1 className="text-4xl font-serif font-bold text-white mb-4">
            Unsere <span className="text-gradient">Parfüms</span>
          </h1>
          <p className="text-lg text-dark-300 mb-8">
            Entdecken Sie unsere exklusive Kollektion
          </p>
          <div className="text-dark-400">
            <p>Diese Seite wird derzeit entwickelt.</p>
            <p className="mt-2">Kommen Sie bald wieder!</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductsPage