import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Mic, 
  ShoppingCart, 
  Star, 
  Sparkles,
  Heart,
  Award,
  Truck,
  Shield
} from 'lucide-react'
import { useSpeechContext } from '../components/speech/SpeechProvider'

const HomePage: React.FC = () => {
  const { speak } = useSpeechContext()

  const featuredProducts = [
    {
      id: 'liyana-nour-rouge',
      name: 'Liyana Nour Rouge',
      price: 89.99,
      originalPrice: 109.99,
      image: '/images/parfum-rouge.jpg',
      rating: 4.8,
      reviews: 124,
      description: 'Ein verführerischer Duft mit roten Beeren und samtigen Rosen',
      isNew: true,
      gradient: 'from-red-500 to-pink-600'
    },
    {
      id: 'liyana-nour-intense',
      name: 'Liyana Nour Intense',
      price: 99.99,
      image: '/images/parfum-intense.jpg',
      rating: 4.9,
      reviews: 89,
      description: 'Kraftvolle Intensität mit warmen Gewürzen und Amber',
      isBestseller: true,
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 'liyana-nour-classic',
      name: 'Liyana Nour Classic',
      price: 79.99,
      image: '/images/parfum-classic.jpg',
      rating: 4.7,
      reviews: 203,
      description: 'Zeitlose Eleganz mit floralen Noten und dezenter Vanille',
      gradient: 'from-primary-500 to-purple-600'
    }
  ]

  const features = [
    {
      icon: Mic,
      title: 'Sprachsteuerung',
      description: 'Navigieren Sie mit Ihrer Stimme durch unser gesamtes Sortiment',
      color: 'text-primary-500'
    },
    {
      icon: Shield,
      title: 'Barrierefreiheit',
      description: 'Vollständig zugänglich für Menschen mit Behinderungen',
      color: 'text-green-500'
    },
    {
      icon: Award,
      title: 'Premium Qualität',
      description: 'Nur die feinsten Inhaltsstoffe für außergewöhnliche Düfte',
      color: 'text-gold-500'
    },
    {
      icon: Truck,
      title: 'Kostenloser Versand',
      description: 'Ab 50€ Bestellwert versandkostenfrei nach Deutschland',
      color: 'text-blue-500'
    }
  ]

  const handleLearnMore = () => {
    speak('Erfahren Sie mehr über unsere einzigartige Sprachsteuerung')
  }

  const handleAddToWishlist = (productName: string) => {
    speak(`${productName} wurde zu Ihren Favoriten hinzugefügt`)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-primary-900/20 to-gold-900/20" />
        
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-gold-500/10 to-orange-500/10 rounded-full blur-3xl"
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/30 rounded-full px-4 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium text-primary-400">
                Neue KI-gestützte Sprachsteuerung
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
              <span className="text-gradient">Liyana Nour</span>
              <br />
              <span className="text-4xl md:text-5xl text-dark-300">Extrait</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-dark-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Entdecken Sie exklusive Parfüms mit revolutionärer Sprachsteuerung. 
              Barrierefreies Shopping für alle Sinne.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Jetzt entdecken</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLearnMore}
                className="btn-secondary inline-flex items-center space-x-2 text-lg px-8 py-4"
              >
                <Mic className="w-5 h-5" />
                <span>Sprachsteuerung testen</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-500 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Warum <span className="text-gradient">Liyana Nour</span>?
            </h2>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
              Innovative Technologie trifft auf luxuriöse Düfte
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="card text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full bg-dark-700 flex items-center justify-center group-hover:bg-dark-600 transition-colors duration-300`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-dark-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Unsere <span className="text-gold-gradient">Bestseller</span>
            </h2>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
              Entdecken Sie die beliebtesten Düfte unserer Kollektion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="card-hover group relative overflow-hidden rounded-xl"
              >
                {/* Product Image */}
                <div className={`relative aspect-square bg-gradient-to-br ${product.gradient} rounded-lg mb-4 overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {product.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Badges */}
                  {product.isNew && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Neu
                    </div>
                  )}
                  
                  {product.isBestseller && (
                    <div className="absolute top-3 left-3 bg-gold-500 text-dark-900 text-xs font-semibold px-2 py-1 rounded-full">
                      Bestseller
                    </div>
                  )}

                  {product.originalPrice && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </div>
                  )}

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAddToWishlist(product.name)}
                      className="btn-primary"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Zu Favoriten
                    </motion.button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-gold-500 fill-current'
                              : 'text-dark-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-dark-400">
                      ({product.reviews} Bewertungen)
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-dark-400">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-white">
                        {product.price.toFixed(2)}€
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-dark-500 line-through">
                          {product.originalPrice.toFixed(2)}€
                        </span>
                      )}
                    </div>
                    
                    <Link
                      to={`/product/${product.id}`}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center mt-12"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <span>Alle Produkte ansehen</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Erleben Sie das <span className="text-gradient">Neue</span> Shopping
            </h2>
            <p className="text-lg text-dark-300 mb-8 max-w-2xl mx-auto">
              Testen Sie unsere revolutionäre Sprachsteuerung und entdecken Sie 
              wie einfach und barrierefrei Online-Shopping sein kann.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Jetzt entdecken</span>
              </Link>
              
              <Link to="/about" className="btn-secondary inline-flex items-center space-x-2">
                <span>Mehr erfahren</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage