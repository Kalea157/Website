import { ReactNode, useEffect, useCallback, useRef } from 'react'
import useStore from '@/store/useStore'
import { useVoiceCommands } from '@/hooks/useVoiceCommands'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import toast from 'react-hot-toast'

interface VoiceControlProviderProps {
  children: ReactNode
}

// Web Speech API types
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export function VoiceControlProvider({ children }: VoiceControlProviderProps) {
  const {
    isVoiceEnabled,
    isListening,
    setListening,
    setVoiceTranscript,
    hasAcceptedMicrophone
  } = useStore()

  const recognitionRef = useRef<any>(null)
  const { processCommand } = useVoiceCommands()
  const { speak } = useSpeechSynthesis()

  const startListening = useCallback(() => {
    if (!hasAcceptedMicrophone) {
      toast.error('Bitte erlauben Sie zunächst den Mikrofonzugriff')
      return
    }

    if (!recognitionRef.current) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        toast.error('Ihr Browser unterstützt keine Spracherkennung')
        return
      }

      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'de-DE'

      recognitionRef.current.onstart = () => {
        setListening(true)
        speak('Ich höre zu. Wie kann ich Ihnen helfen?')
      }

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        setVoiceTranscript(transcript)

        if (event.results[current].isFinal) {
          processCommand(transcript)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setListening(false)
        
        if (event.error === 'not-allowed') {
          toast.error('Mikrofonzugriff wurde verweigert')
        } else {
          toast.error('Fehler bei der Spracherkennung')
        }
      }

      recognitionRef.current.onend = () => {
        setListening(false)
      }
    }

    try {
      recognitionRef.current.start()
    } catch (error) {
      console.error('Error starting speech recognition:', error)
      toast.error('Konnte Spracherkennung nicht starten')
    }
  }, [hasAcceptedMicrophone, setListening, setVoiceTranscript, processCommand, speak])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setListening(false)
      speak('Sprachsteuerung beendet')
    }
  }, [isListening, setListening, speak])

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }, [isListening, startListening, stopListening])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  // Expose methods globally for voice control
  useEffect(() => {
    if (isVoiceEnabled) {
      (window as any).voiceControl = {
        start: startListening,
        stop: stopListening,
        toggle: toggleListening
      }
    }
  }, [isVoiceEnabled, startListening, stopListening, toggleListening])

  return (
    <>
      {children}
      {isVoiceEnabled && (
        <button
          onClick={toggleListening}
          className={`voice-indicator ${isListening ? 'active' : ''}`}
          aria-label={isListening ? 'Sprachsteuerung beenden' : 'Sprachsteuerung starten'}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </button>
      )}
    </>
  )
}