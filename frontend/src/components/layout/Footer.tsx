import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  Shield,
  Truck,
  CreditCard
} from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'Über uns', href: '/about' },
      { name: 'Unsere Geschichte', href: '/story' },
      { name: 'Karriere', href: '/careers' },
      { name: 'Presse', href: '/press' },
    ],
    customer: [
      { name: 'Kontakt', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Versand & Rückgabe', href: '/shipping' },
      { name: 'Größenberatung', href: '/size-guide' },
    ],
    legal: [
      { name: 'Datenschutz', href: '/privacy' },
      { name: 'AGB', href: '/terms' },
      { name: 'Impressum', href: '/imprint' },
      { name: 'Widerrufsrecht', href: '/returns' },
    ],
    products: [
      { name: 'Alle Parfüms', href: '/products' },
      { name: 'Neuheiten', href: '/products?filter=new' },
      { name: 'Bestseller', href: '/products?filter=bestseller' },
      { name: 'Sets & Geschenke', href: '/products?category=sets' },
    ]
  }

  const socialLinks = [
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/liyana.nour', 
      icon: Instagram,
      color: 'hover:text-pink-400'
    },
    { 
      name: 'Facebook', 
      href: 'https://facebook.com/liyana.nour', 
      icon: Facebook,
      color: 'hover:text-blue-400'
    },
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/liyana_nour', 
      icon: Twitter,
      color: 'hover:text-blue-300'
    },
  ]

  const features = [
    {
      icon: Truck,
      title: 'Kostenloser Versand',
      description: 'Ab 50€ Bestellwert'
    },
    {
      icon: Shield,
      title: '100% Sicher',
      description: 'SSL-verschlüsselt'
    },
    {
      icon: CreditCard,
      title: 'Flexible Zahlung',
      description: 'Viele Zahlungsarten'
    },
    {
      icon: Heart,
      title: 'Persönlich',
      description: 'Individuelle Beratung'
    }
  ]

  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      {/* Features Section */}
      <div className="border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary-500" />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-dark-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-xl font-serif font-semibold text-gradient">
                Liyana Nour
              </span>
            </Link>
            
            <p className="text-dark-300 text-sm mb-6 max-w-md">
              Entdecken Sie die Welt exklusiver Parfüms mit unserer innovativen 
              Sprachsteuerung. Barrierefreies Shopping für alle Sinne.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2 text-sm text-dark-400">
                <Mail className="w-4 h-4" />
                <span>info@liyana-nour.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-dark-400">
                <Phone className="w-4 h-4" />
                <span>+49 (0) 30 12345678</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-dark-400">
                <MapPin className="w-4 h-4" />
                <span>Berlin, Deutschland</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 bg-dark-800 hover:bg-dark-700 rounded-lg flex items-center justify-center text-dark-400 ${social.color} transition-colors duration-200`}
                  aria-label={`${social.name} folgen`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Unternehmen
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-dark-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Kundenservice
            </h3>
            <ul className="space-y-2">
              {footerLinks.customer.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-dark-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Rechtliches
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-dark-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:max-w-md">
              <h3 className="text-lg font-semibold text-white mb-2">
                Newsletter abonnieren
              </h3>
              <p className="text-sm text-dark-400">
                Erhalten Sie exklusive Angebote und Neuigkeiten
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 md:max-w-md md:flex-1 md:ml-8">
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Ihre E-Mail-Adresse"
                  className="input-primary flex-1"
                  aria-label="E-Mail-Adresse für Newsletter"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-6"
                >
                  Abonnieren
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-dark-400">
              © {currentYear} Liyana Nour Extrait. Alle Rechte vorbehalten.
            </div>
            
            <div className="mt-2 md:mt-0">
              <div className="flex items-center space-x-2 text-sm text-dark-400">
                <span>Gemacht mit</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>in Berlin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer