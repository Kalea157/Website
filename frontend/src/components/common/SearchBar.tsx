import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Mic, MicOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSpeechContext } from '../speech/SpeechProvider'

interface SearchBarProps {
  onClose: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('')
  const [suggestions] = useState([
    'Liyana Nour Rouge',
    'Liyana Nour Intense',
    'Liyana Nour Classic',
    'Liyana Nour Gold',
    'Liyana Nour Midnight'
  ])
  const navigate = useNavigate()
  const { isListening, startListening, stopListening, speak } = useSpeechContext()

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      onClose()
      speak(`Suche nach ${searchQuery}`)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    handleSearch(suggestion)
  }

  const toggleVoiceSearch = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
      speak('Sprechen Sie Ihren Suchbegriff')
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'Enter') {
        handleSearch()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [query, onClose])

  // Auto-focus search input
  useEffect(() => {
    const input = document.getElementById('search-input')
    if (input) {
      input.focus()
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
      role="dialog"
      aria-modal="true"
      aria-label="Produktsuche"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -50 }}
        className="w-full max-w-2xl mx-4"
      >
        {/* Search Input */}
        <div className="glass rounded-lg border border-dark-700/50 shadow-xl">
          <div className="flex items-center p-4">
            <Search className="w-5 h-5 text-dark-400 mr-3" />
            
            <input
              id="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Suchen Sie nach Parfüms..."
              className="flex-1 bg-transparent text-white placeholder-dark-400 focus:outline-none text-lg"
              aria-label="Suchfeld für Parfüms"
            />

            {/* Voice Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleVoiceSearch}
              className={`p-2 rounded-lg ml-2 transition-all duration-200 ${
                isListening 
                  ? 'bg-red-500 text-white speech-active' 
                  : 'bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white'
              }`}
              aria-label={isListening ? 'Sprachsuche beenden' : 'Sprachsuche starten'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </motion.button>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 rounded-lg ml-2 bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white transition-all duration-200"
              aria-label="Suche schließen"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Voice Search Indicator */}
          <AnimatePresence>
            {isListening && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pb-4"
              >
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center space-x-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Mic className="w-5 h-5 text-red-500" />
                  </motion.div>
                  <span className="text-sm text-red-400">
                    Hört zu... Sprechen Sie Ihren Suchbegriff
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Suggestions */}
          {query.length === 0 && !isListening && (
            <div className="border-t border-dark-700/50 p-4">
              <h3 className="text-sm font-medium text-dark-300 mb-3">
                Beliebte Suchanfragen
              </h3>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="block w-full text-left px-3 py-2 rounded-lg text-sm text-dark-300 hover:bg-dark-700 hover:text-white transition-colors duration-200"
                  >
                    <Search className="w-4 h-4 inline mr-2 text-dark-500" />
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results Preview */}
          {query.length > 0 && !isListening && (
            <div className="border-t border-dark-700/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-dark-300">
                  Suchergebnisse für "{query}"
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSearch()}
                  className="btn-primary text-sm px-4 py-2"
                >
                  Alle Ergebnisse anzeigen
                </motion.button>
              </div>
              
              {/* Quick Results */}
              <div className="space-y-2">
                {suggestions
                  .filter(s => s.toLowerCase().includes(query.toLowerCase()))
                  .slice(0, 3)
                  .map((result, index) => (
                    <motion.button
                      key={result}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSuggestionClick(result)}
                      className="block w-full text-left px-3 py-2 rounded-lg text-sm text-dark-300 hover:bg-dark-700 hover:text-white transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">
                            {result.split(' ').map(word => word[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{result}</p>
                          <p className="text-xs text-dark-500">Premium Parfüm</p>
                        </div>
                      </div>
                    </motion.button>
                  ))
                }
              </div>
            </div>
          )}

          {/* Search Tips */}
          <div className="border-t border-dark-700/50 p-4 bg-dark-800/50">
            <div className="text-xs text-dark-400 space-y-1">
              <p><strong>Tipps:</strong></p>
              <p>• Verwenden Sie das Mikrofon für Sprachsuche</p>
              <p>• Drücken Sie Enter zum Suchen</p>
              <p>• ESC zum Schließen</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SearchBar