import { useCallback, useRef, useEffect } from 'react'
import useStore from '@/store/useStore'

export function useSpeechSynthesis() {
  const { isVoiceEnabled } = useStore()
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const voicesRef = useRef<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices()
    }

    loadVoices()
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  const speak = useCallback((text: string, options?: {
    rate?: number
    pitch?: number
    volume?: number
    voice?: string
  }) => {
    if (!isVoiceEnabled || !window.speechSynthesis) {
      return
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text)
    
    // Set options
    utterance.rate = options?.rate || 1
    utterance.pitch = options?.pitch || 1
    utterance.volume = options?.volume || 1
    utterance.lang = 'de-DE'

    // Try to find a German voice
    const germanVoice = voicesRef.current.find(voice => 
      voice.lang.startsWith('de')
    )
    if (germanVoice) {
      utterance.voice = germanVoice
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [isVoiceEnabled])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
  }, [])

  const pause = useCallback(() => {
    window.speechSynthesis.pause()
  }, [])

  const resume = useCallback(() => {
    window.speechSynthesis.resume()
  }, [])

  const getVoices = useCallback(() => {
    return voicesRef.current
  }, [])

  return {
    speak,
    stop,
    pause,
    resume,
    getVoices,
    isSpeaking: window.speechSynthesis?.speaking || false
  }
}