import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-8 flex items-center justify-center">
      <div className="text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-8xl font-bold text-gradient mb-4">404</div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
            Seite nicht gefunden
          </h1>
          <p className="text-lg text-dark-300 mb-8 max-w-md mx-auto">
            Die gesuchte Seite existiert nicht oder wurde verschoben.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/" className="btn-primary inline-flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Zur Startseite</span>
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zurück</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFoundPage