import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '@/store/useStore'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'

export function PrivacyConsentModal() {
  const {
    hasAcceptedPrivacy,
    hasAcceptedMicrophone,
    setPrivacyConsent,
    setMicrophoneConsent,
    setVoiceEnabled
  } = useStore()

  const { speak } = useSpeechSynthesis()
  const [showModal, setShowModal] = useState(false)
  const [currentStep, setCurrentStep] = useState<'privacy' | 'microphone'>('privacy')

  useEffect(() => {
    if (!hasAcceptedPrivacy) {
      setShowModal(true)
      setCurrentStep('privacy')
    } else if (!hasAcceptedMicrophone) {
      setShowModal(true)
      setCurrentStep('microphone')
    }
  }, [hasAcceptedPrivacy, hasAcceptedMicrophone])

  const handlePrivacyAccept = () => {
    setPrivacyConsent(true)
    if (!hasAcceptedMicrophone) {
      setCurrentStep('microphone')
    } else {
      setShowModal(false)
    }
  }

  const handleMicrophoneAccept = async () => {
    try {
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(track => track.stop())
      
      setMicrophoneConsent(true)
      setVoiceEnabled(true)
      setShowModal(false)
      
      speak('Willkommen bei Liyana Nour. Die Sprachsteuerung ist jetzt aktiviert. Sagen Sie "Hilfe" um verfügbare Befehle zu erfahren.')
    } catch (error) {
      console.error('Microphone permission denied:', error)
      handleMicrophoneDecline()
    }
  }

  const handleMicrophoneDecline = () => {
    setMicrophoneConsent(false)
    setVoiceEnabled(false)
    setShowModal(false)
  }

  const handleDecline = () => {
    if (currentStep === 'privacy') {
      // User must accept privacy policy to use the site
      window.location.href = 'https://google.com'
    } else {
      handleMicrophoneDecline()
    }
  }

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {currentStep === 'privacy' ? (
              <div className="p-8">
                <h2 className="text-3xl font-serif font-bold mb-6">Datenschutz & Nutzungsbedingungen</h2>
                
                <div className="prose prose-gray max-w-none mb-6">
                  <p className="text-gray-600 mb-4">
                    Willkommen bei Liyana Nour Extrait. Bevor Sie fortfahren, bitten wir Sie, unsere Datenschutzbestimmungen zu akzeptieren.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Ihre Daten sind sicher</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Wir verwenden Ihre Daten ausschließlich für die Bestellabwicklung</li>
                    <li>Keine Weitergabe an Dritte ohne Ihre Zustimmung</li>
                    <li>SSL-verschlüsselte Datenübertragung</li>
                    <li>DSGVO-konforme Datenverarbeitung</li>
                    <li>Recht auf Auskunft, Berichtigung und Löschung</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Cookies</h3>
                  <p className="text-gray-600">
                    Wir verwenden notwendige Cookies für den Betrieb der Website. 
                    Marketing-Cookies werden nur mit Ihrer Zustimmung gesetzt.
                  </p>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={handleDecline}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Ablehnen & Seite verlassen
                  </button>
                  <button
                    onClick={handlePrivacyAccept}
                    className="btn-primary"
                  >
                    Akzeptieren & Fortfahren
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <h2 className="text-3xl font-serif font-bold mb-6">Sprachsteuerung aktivieren</h2>
                
                <div className="bg-gold-50 border border-gold-200 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    Innovatives Einkaufserlebnis
                  </h3>
                  <p className="text-gray-700">
                    Erleben Sie die Zukunft des Online-Shoppings mit unserer KI-gestützten Sprachsteuerung:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-600">
                    <li>Freihändige Navigation durch unseren Shop</li>
                    <li>Sprachgesteuerte Produktauswahl</li>
                    <li>Barrierefreies Einkaufen für alle</li>
                    <li>Einfache Bestellungen per Sprachbefehl</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-2">Datenschutz bei Sprachsteuerung</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Sprachaufnahmen werden nicht gespeichert</li>
                    <li>• Verarbeitung erfolgt lokal in Ihrem Browser</li>
                    <li>• Keine Übertragung an externe Server</li>
                    <li>• Jederzeit deaktivierbar</li>
                  </ul>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={handleMicrophoneDecline}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Ohne Sprachsteuerung fortfahren
                  </button>
                  <button
                    onClick={handleMicrophoneAccept}
                    className="btn-primary flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    Sprachsteuerung aktivieren
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}