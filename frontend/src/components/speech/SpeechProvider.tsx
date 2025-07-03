import React, { createContext, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSpeech } from '../../hooks/useSpeech'
import { useCart } from '../../hooks/useCart'
import { SpeechCommand } from '../../types'
import toast from 'react-hot-toast'

interface SpeechContextType {
  isListening: boolean
  isSupported: boolean
  transcript: string
  confidence: number
  error: string | null
  startListening: () => void
  stopListening: () => void
  speak: (text: string) => void
}

const SpeechContext = createContext<SpeechContextType | null>(null)

interface SpeechProviderProps {
  children: React.ReactNode
}

const SpeechProvider: React.FC<SpeechProviderProps> = ({ children }) => {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const speechHook = useSpeech()

  // Handle speech commands
  useEffect(() => {
    const handleSpeechCommand = (event: CustomEvent<SpeechCommand>) => {
      const command = event.detail
      
      try {
        switch (command.action) {
          case 'navigate':
            if (command.parameters?.to) {
              navigate(command.parameters.to)
              speechHook.speak(`Navigiere zu ${getPageName(command.parameters.to)}`)
            }
            break
            
          case 'search':
            if (command.parameters?.query) {
              // Navigate to products page with search query
              navigate(`/products?search=${encodeURIComponent(command.parameters.query)}`)
              speechHook.speak(`Suche nach ${command.parameters.query}`)
            }
            break
            
          case 'add_to_cart':
            if (command.parameters?.product) {
              // This would need to be connected to actual product data
              handleAddToCartByVoice(command.parameters.product)
            }
            break
            
          case 'remove_from_cart':
            // Handle cart item removal
            handleRemoveFromCartByVoice()
            break
            
          case 'checkout':
            navigate('/checkout')
            speechHook.speak('Gehe zur Kasse')
            break
            
          default:
            speechHook.speak('Befehl nicht erkannt. Versuchen Sie es erneut.')
        }
      } catch (error) {
        console.error('Error executing speech command:', error)
        speechHook.speak('Fehler beim Ausführen des Befehls')
        toast.error('Sprachbefehl konnte nicht ausgeführt werden')
      }
    }

    window.addEventListener('speechCommand', handleSpeechCommand)
    
    return () => {
      window.removeEventListener('speechCommand', handleSpeechCommand)
    }
  }, [navigate, addItem, speechHook])

  // Handle microphone permission request
  useEffect(() => {
    const requestMicrophonePermission = async () => {
      if (!speechHook.isSupported) return

      try {
        // Check if we already have permission
        const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName })
        
        if (permission.state === 'denied') {
          showMicrophonePermissionDialog()
        } else if (permission.state === 'prompt') {
          // Request permission by trying to access microphone
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
          stream.getTracks().forEach(track => track.stop())
          
          toast.success('Mikrofonzugriff gewährt - Sprachsteuerung verfügbar!')
        }
      } catch (error) {
        console.warn('Microphone permission check failed:', error)
      }
    }

    requestMicrophonePermission()
  }, [speechHook.isSupported])

  // Show microphone permission dialog
  const showMicrophonePermissionDialog = () => {
    const shouldRequest = confirm(
      'Möchten Sie die Sprachsteuerung aktivieren?\n\n' +
      'Diese Funktion benötigt Zugriff auf Ihr Mikrofon und ermöglicht:\n' +
      '• Navigation per Sprachbefehl\n' +
      '• Produktsuche per Sprache\n' +
      '• Barrierefreie Bedienung\n\n' +
      'Ihre Sprachdaten werden nicht gespeichert oder übertragen.\n\n' +
      'Datenschutz: Alle Sprachbefehle werden lokal verarbeitet.'
    )

    if (shouldRequest) {
      requestMicrophoneAccess()
    } else {
             toast('Sprachsteuerung deaktiviert. Sie können sie jederzeit in den Einstellungen aktivieren.', { icon: 'ℹ️' })
    }
  }

  // Request microphone access
  const requestMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(track => track.stop())
      
      toast.success(
        'Sprachsteuerung aktiviert! Klicken Sie auf das Mikrofon-Symbol oder sagen Sie "Hey Liyana" um zu beginnen.',
        { duration: 5000 }
      )
      
      speechHook.speak('Sprachsteuerung ist jetzt aktiv. Sagen Sie zum Beispiel "Gehe zu Produkten" oder "Suche nach Parfüm".')
    } catch (error) {
      toast.error('Mikrofonzugriff verweigert. Sprachsteuerung ist nicht verfügbar.')
      console.error('Microphone access denied:', error)
    }
  }

  // Get human-readable page name
  const getPageName = (path: string): string => {
    const pageNames: { [key: string]: string } = {
      '/': 'Startseite',
      '/products': 'Produktseite',
      '/cart': 'Warenkorb',
      '/checkout': 'Kasse',
      '/about': 'Über uns',
      '/contact': 'Kontakt',
      '/privacy': 'Datenschutz'
    }
    
    return pageNames[path] || 'Seite'
  }

  // Handle adding product to cart by voice
  const handleAddToCartByVoice = (productName: string) => {
    // This would need to search for the product by name
    // For now, we'll just show a message
    speechHook.speak(`Suche nach ${productName} zum Hinzufügen in den Warenkorb`)
         toast(`Suche nach "${productName}"...`, { icon: '🔍' })
    
    // Navigate to products with search
    navigate(`/products?search=${encodeURIComponent(productName)}`)
  }

  // Handle removing from cart by voice
  const handleRemoveFromCartByVoice = () => {
    // Navigate to cart page
    navigate('/cart')
    speechHook.speak('Öffne Warenkorb zum Entfernen von Artikeln')
  }

  const contextValue: SpeechContextType = {
    isListening: speechHook.isListening,
    isSupported: speechHook.isSupported,
    transcript: speechHook.transcript,
    confidence: speechHook.confidence,
    error: speechHook.error,
    startListening: speechHook.startListening,
    stopListening: speechHook.stopListening,
    speak: speechHook.speak
  }

  return (
    <SpeechContext.Provider value={contextValue}>
      {children}
    </SpeechContext.Provider>
  )
}

// Hook to use speech context
export const useSpeechContext = (): SpeechContextType => {
  const context = useContext(SpeechContext)
  if (!context) {
    throw new Error('useSpeechContext must be used within a SpeechProvider')
  }
  return context
}

export default SpeechProvider