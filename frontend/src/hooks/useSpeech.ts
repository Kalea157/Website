import { useState, useEffect, useCallback, useRef } from 'react'
import { SpeechCommand, SpeechSettings } from '../types'

interface UseSpeechReturn {
  isListening: boolean
  isSupported: boolean
  transcript: string
  confidence: number
  error: string | null
  startListening: () => void
  stopListening: () => void
  speak: (text: string, options?: Partial<SpeechSynthesisUtterance>) => void
  settings: SpeechSettings
  updateSettings: (newSettings: Partial<SpeechSettings>) => void
}

const defaultSettings: SpeechSettings = {
  enabled: true,
  language: 'de-DE',
  autoListen: false,
  confirmActions: true,
  speakFeedback: true,
  voiceRate: 1,
  voicePitch: 1,
  voiceVolume: 1,
}

export const useSpeech = (): UseSpeechReturn => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [settings, setSettings] = useState<SpeechSettings>(defaultSettings)
  
  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)
  
  // Check browser support
  const isSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

  // Initialize speech recognition
  useEffect(() => {
    if (!isSupported) return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = settings.language
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsListening(true)
      setError(null)
      announceToScreenReader('Sprachsteuerung gestartet')
    }

    recognition.onend = () => {
      setIsListening(false)
      announceToScreenReader('Sprachsteuerung beendet')
    }

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1]
      const transcript = result[0].transcript.trim()
      const confidence = result[0].confidence
      
      setTranscript(transcript)
      setConfidence(confidence)
      
      if (result.isFinal && confidence > 0.7) {
        processCommand(transcript, confidence)
      }
    }

    recognition.onerror = (event) => {
      setError(`Spracherkennungsfehler: ${event.error}`)
      setIsListening(false)
      
      // Handle specific errors
      switch (event.error) {
        case 'no-speech':
          announceToScreenReader('Keine Sprache erkannt. Bitte versuchen Sie es erneut.')
          break
        case 'audio-capture':
          announceToScreenReader('Mikrofonzugriff fehlgeschlagen. Bitte überprüfen Sie Ihre Mikrofonberechtigung.')
          break
        case 'not-allowed':
          announceToScreenReader('Mikrofonzugriff verweigert. Bitte erlauben Sie den Mikrofonzugriff.')
          break
        default:
          announceToScreenReader('Spracherkennungsfehler aufgetreten.')
      }
    }

    recognitionRef.current = recognition

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis
    }

    return () => {
      recognition.stop()
    }
  }, [isSupported, settings.language])

  // Process voice commands
  const processCommand = useCallback((transcript: string, confidence: number) => {
    const command = parseCommand(transcript)
    
    if (command) {
      executeCommand(command)
      
      if (settings.speakFeedback) {
        speak(`Befehl "${command.action}" wird ausgeführt`)
      }
    }
  }, [settings.speakFeedback])

  // Parse natural language commands
  const parseCommand = (transcript: string): SpeechCommand | null => {
    const text = transcript.toLowerCase()
    
    // Navigation commands
    if (text.includes('startseite') || text.includes('home')) {
      return { command: transcript, action: 'navigate', parameters: { to: '/' }, confidence }
    }
    
    if (text.includes('produkte') || text.includes('parfüm')) {
      return { command: transcript, action: 'navigate', parameters: { to: '/products' }, confidence }
    }
    
    if (text.includes('warenkorb') || text.includes('einkaufswagen')) {
      return { command: transcript, action: 'navigate', parameters: { to: '/cart' }, confidence }
    }
    
    // Product commands
    if (text.includes('kaufen') || text.includes('in den warenkorb')) {
      const productMatch = text.match(/(.+?)\s+(kaufen|in den warenkorb)/)
      if (productMatch) {
        return { 
          command: transcript, 
          action: 'add_to_cart', 
          parameters: { product: productMatch[1] }, 
          confidence 
        }
      }
    }
    
    // Search commands
    if (text.includes('suche') || text.includes('finde')) {
      const searchMatch = text.match(/(suche|finde)\s+(.+)/)
      if (searchMatch) {
        return { 
          command: transcript, 
          action: 'search', 
          parameters: { query: searchMatch[2] }, 
          confidence 
        }
      }
    }
    
    // Cart commands
    if (text.includes('entfernen') || text.includes('löschen')) {
      return { command: transcript, action: 'remove_from_cart', parameters: {}, confidence }
    }
    
    // Form commands
    if (text.includes('bestellen') || text.includes('checkout')) {
      return { command: transcript, action: 'checkout', parameters: {}, confidence }
    }
    
    return null
  }

  // Execute parsed commands
  const executeCommand = (command: SpeechCommand) => {
    // Dispatch custom event for command handling
    const event = new CustomEvent('speechCommand', { detail: command })
    window.dispatchEvent(event)
  }

  // Start listening
  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current || isListening) return
    
    try {
      recognitionRef.current.start()
    } catch (err) {
      setError('Sprachsteuerung konnte nicht gestartet werden')
    }
  }, [isSupported, isListening])

  // Stop listening
  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) return
    
    recognitionRef.current.stop()
  }, [isListening])

  // Text-to-speech
  const speak = useCallback((text: string, options?: Partial<SpeechSynthesisUtterance>) => {
    if (!synthesisRef.current || !settings.speakFeedback) return

    // Cancel any ongoing speech
    synthesisRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = settings.language
    utterance.rate = settings.voiceRate
    utterance.pitch = settings.voicePitch
    utterance.volume = settings.voiceVolume

    // Apply custom options
    if (options) {
      Object.assign(utterance, options)
    }

    utterance.onend = () => {
      announceToScreenReader('Sprachausgabe beendet')
    }

    utterance.onerror = () => {
      announceToScreenReader('Fehler bei der Sprachausgabe')
    }

    synthesisRef.current.speak(utterance)
  }, [settings])

  // Update settings
  const updateSettings = useCallback((newSettings: Partial<SpeechSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
    
    // Save to localStorage
    localStorage.setItem('speechSettings', JSON.stringify({ ...settings, ...newSettings }))
  }, [settings])

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('speechSettings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings(prev => ({ ...prev, ...parsed }))
      } catch (err) {
        console.warn('Failed to parse saved speech settings')
      }
    }
  }, [])

  // Announce to screen readers
  const announceToScreenReader = (message: string) => {
    const announcement = document.getElementById('announcements')
    if (announcement) {
      announcement.textContent = message
    }
  }

  return {
    isListening,
    isSupported,
    transcript,
    confidence,
    error,
    startListening,
    stopListening,
    speak,
    settings,
    updateSettings,
  }
}

// Global speech command event type
declare global {
  interface WindowEventMap {
    speechCommand: CustomEvent<SpeechCommand>
  }
  
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}