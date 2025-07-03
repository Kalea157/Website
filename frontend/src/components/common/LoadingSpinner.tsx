import React from 'react'
import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'white' | 'gold'
  text?: string
  fullScreen?: boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text = 'Laden...',
  fullScreen = false
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const colorClasses = {
    primary: 'border-primary-500',
    white: 'border-white',
    gold: 'border-gold-500'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
        className={`
          ${sizeClasses[size]} 
          border-2 border-transparent 
          ${colorClasses[color]} 
          border-t-transparent 
          rounded-full
        `}
        role="progressbar"
        aria-label={text}
      />

      {/* Loading text */}
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`
            ${textSizeClasses[size]} 
            font-medium 
            ${color === 'white' ? 'text-white' : 'text-dark-300'}
          `}
          aria-live="polite"
        >
          {text}
        </motion.p>
      )}

      {/* Accessibility: Screen reader announcement */}
      <span className="sr-only" aria-live="assertive">
        Inhalt wird geladen, bitte warten...
      </span>
    </div>
  )

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center z-50"
        role="dialog"
        aria-modal="true"
        aria-label="Ladevorgang"
      >
        {spinner}
      </motion.div>
    )
  }

  return (
    <div className="flex items-center justify-center p-8">
      {spinner}
    </div>
  )
}

export default LoadingSpinner