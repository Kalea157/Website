import React from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import SpeechIndicator from '../speech/SpeechIndicator'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-container min-h-screen flex flex-col">
      <Header />
      
      <main 
        id="main-content" 
        className="flex-1 pt-20"
        role="main"
        aria-label="Hauptinhalt"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-full"
        >
          {children}
        </motion.div>
      </main>
      
      <Footer />
      
      {/* Speech Controls - Always accessible */}
      <SpeechIndicator />
      
      {/* Accessibility helper */}
      <div 
        id="live-region" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      />
    </div>
  )
}

export default Layout