import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useStore from '@/store/useStore'
import HeroSection from '@/components/Home/HeroSection'
import FeaturedProducts from '@/components/Home/FeaturedProducts'
import BrandStory from '@/components/Home/BrandStory'
import VoiceFeature from '@/components/Home/VoiceFeature'

export default function HomePage() {
  const navigate = useNavigate()
  const { setProducts } = useStore()

  useEffect(() => {
    // Load mock products for demo
    loadMockProducts()
  }, [])

  const loadMockProducts = () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Liyana Nour Rouge',
        description: 'Ein leidenschaftlicher Duft, der Eleganz und Verführung vereint. Mit Noten von roten Beeren, Jasmin und Sandelholz.',
        shortDescription: 'Leidenschaftlich und verführerisch',
        price: 149,
        discountPrice: 129,
        discountPercentage: 13,
        images: [
          {
            id: '1',
            url: '/images/products/rouge.jpg',
            alt: 'Liyana Nour Rouge',
            isPrimary: true,
            order: 0
          }
        ],
        fragrance: {
          topNotes: ['Rote Beeren', 'Bergamotte', 'Pink Pepper'],
          heartNotes: ['Jasmin', 'Rose', 'Iris'],
          baseNotes: ['Sandelholz', 'Vanille', 'Moschus'],
          sillage: 'heavy' as const,
          longevity: 'long lasting' as const,
          season: ['autumn', 'winter'] as any,
          occasion: ['Abend', 'Besondere Anlässe']
        },
        volume: [
          {
            id: '1-50',
            volume: 50,
            price: 149,
            stock: 50,
            isDefault: true
          },
          {
            id: '1-100',
            volume: 100,
            price: 249,
            stock: 30,
            isDefault: false
          }
        ],
        stock: 80,
        category: 'POUR_FEMME' as any,
        tags: ['Bestseller', 'Elegant', 'Verführerisch'],
        features: ['Langanhaltend', 'Intensive Sillage', 'Handgefertigt'],
        isNew: false,
        isBestseller: true,
        isLimited: false,
        rating: 4.8,
        reviewCount: 124,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Liyana Nour Intense',
        description: 'Ein kraftvoller, maskuliner Duft mit holzigen und würzigen Noten. Perfekt für den selbstbewussten Mann.',
        shortDescription: 'Kraftvoll und maskulin',
        price: 159,
        images: [
          {
            id: '2',
            url: '/images/products/intense.jpg',
            alt: 'Liyana Nour Intense',
            isPrimary: true,
            order: 0
          }
        ],
        fragrance: {
          topNotes: ['Zitrone', 'Lavendel', 'Kardamom'],
          heartNotes: ['Zedernholz', 'Geranium', 'Nelke'],
          baseNotes: ['Vetiver', 'Patchouli', 'Amber'],
          sillage: 'enormous' as const,
          longevity: 'eternal' as const,
          season: ['autumn', 'winter'] as any,
          occasion: ['Business', 'Abend']
        },
        volume: [
          {
            id: '2-50',
            volume: 50,
            price: 159,
            stock: 40,
            isDefault: true
          },
          {
            id: '2-100',
            volume: 100,
            price: 269,
            stock: 20,
            isDefault: false
          }
        ],
        stock: 60,
        category: 'POUR_HOMME' as any,
        tags: ['Neu', 'Maskulin', 'Holzig'],
        features: ['Extra langanhaltend', 'Projektion++', 'Limitiert'],
        isNew: true,
        isBestseller: false,
        isLimited: false,
        rating: 4.9,
        reviewCount: 89,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        name: 'Liyana Nour Gold',
        description: 'Luxuriös und opulent - ein Duft, der puren Luxus verkörpert. Mit goldenen Akzenten und orientalischen Noten.',
        shortDescription: 'Luxuriös und opulent',
        price: 299,
        discountPrice: 249,
        discountPercentage: 17,
        images: [
          {
            id: '3',
            url: '/images/products/gold.jpg',
            alt: 'Liyana Nour Gold',
            isPrimary: true,
            order: 0
          }
        ],
        fragrance: {
          topNotes: ['Safran', 'Orange', 'Davana'],
          heartNotes: ['Oud', 'Rose', 'Weihrauch'],
          baseNotes: ['Amber', 'Sandelholz', 'Weißer Moschus'],
          sillage: 'enormous' as const,
          longevity: 'eternal' as const,
          season: ['autumn', 'winter'] as any,
          occasion: ['Gala', 'Luxus-Events', 'Besondere Momente']
        },
        volume: [
          {
            id: '3-50',
            volume: 50,
            price: 299,
            stock: 15,
            isDefault: true
          }
        ],
        stock: 15,
        category: 'EXCLUSIVE' as any,
        tags: ['Limited Edition', 'Luxus', 'Oriental'],
        features: ['24K Gold Flakes', 'Handnummeriert', 'Sammlerstück'],
        isNew: false,
        isBestseller: false,
        isLimited: true,
        rating: 5.0,
        reviewCount: 42,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    setProducts(mockProducts as any)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <HeroSection />
      <FeaturedProducts />
      <VoiceFeature />
      <BrandStory />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-400 to-gold-600">
        <div className="container text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-white mb-6">
              Entdecken Sie Ihre Signatur
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Finden Sie den perfekten Duft, der Ihre Persönlichkeit unterstreicht
            </p>
            <button
              onClick={() => navigate('/products')}
              className="bg-white text-gold-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Zur Kollektion
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}