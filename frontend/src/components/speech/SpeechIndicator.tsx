import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Volume2 } from 'lucide-react'
import { useSpeechContext } from './SpeechProvider'

const SpeechIndicator: React.FC = () => {
  const { isListening, isSupported, transcript, confidence, error } = useSpeechContext()

  if (!isSupported) {
    return null
  }

  return (
    <AnimatePresence>
      {(isListening || transcript || error) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 100 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <div className="glass rounded-lg p-4 border border-dark-700/50 shadow-xl">
            {/* Header */}
            <div className="flex items-center space-x-2 mb-2">
              {isListening ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="flex items-center space-x-2"
                >
                  <Mic className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium text-red-500">
                    Hört zu...
                  </span>
                </motion.div>
              ) : error ? (
                <div className="flex items-center space-x-2">
                  <MicOff className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium text-red-500">
                    Fehler
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-green-500">
                    Erkannt
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2">
              {/* Live transcript */}
              {isListening && transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-800/50 rounded-md p-2"
                >
                  <p className="text-sm text-dark-200">
                    "{transcript}"
                  </p>
                  {confidence > 0 && (
                    <div className="mt-1">
                      <div className="flex items-center justify-between text-xs text-dark-400">
                        <span>Vertrauen</span>
                        <span>{Math.round(confidence * 100)}%</span>
                      </div>
                      <div className="w-full bg-dark-700 rounded-full h-1 mt-1">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${confidence * 100}%` }}
                          className="bg-primary-500 h-1 rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Final transcript result */}
              {!isListening && transcript && !error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-900/20 border border-green-500/30 rounded-md p-2"
                >
                  <p className="text-sm text-green-400">
                    Erkannt: "{transcript}"
                  </p>
                  <p className="text-xs text-green-500 mt-1">
                    Befehl wird verarbeitet...
                  </p>
                </motion.div>
              )}

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-900/20 border border-red-500/30 rounded-md p-2"
                >
                  <p className="text-sm text-red-400">
                    {error}
                  </p>
                </motion.div>
              )}

              {/* Help text */}
              {isListening && !transcript && (
                <div className="text-xs text-dark-400">
                  <p>Probieren Sie:</p>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>"Gehe zu Produkten"</li>
                    <li>"Suche nach Parfüm"</li>
                    <li>"Öffne Warenkorb"</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Progress indicator */}
            {isListening && (
              <div className="mt-3">
                <motion.div
                  className="w-full h-1 bg-dark-700 rounded-full overflow-hidden"
                >
                  <motion.div
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary-500 to-transparent"
                  />
                </motion.div>
              </div>
            )}
          </div>

          {/* Speech tips overlay */}
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-full right-0 mb-2 p-2 bg-dark-800 text-xs text-dark-300 rounded-md border border-dark-700 max-w-xs"
            >
              <p className="font-medium text-primary-400 mb-1">
                Sprachbefehle:
              </p>
              <ul className="space-y-1">
                <li>• "Startseite" - Zur Hauptseite</li>
                <li>• "Produkte" - Produktübersicht</li>
                <li>• "Warenkorb" - Einkaufswagen</li>
                <li>• "Suche nach [Begriff]" - Produktsuche</li>
              </ul>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SpeechIndicator