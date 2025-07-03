import React from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <h1 className="text-4xl font-serif font-bold text-white mb-4">
            Produkt <span className="text-gradient">Details</span>
          </h1>
          <p className="text-lg text-dark-300 mb-8">
            Produkt ID: {id}
          </p>
          <div className="text-dark-400">
            <p>Diese Seite wird derzeit entwickelt.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetailPage