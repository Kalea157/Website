import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '@/store/useStore'
import { useSpeechSynthesis } from './useSpeechSynthesis'
import toast from 'react-hot-toast'

interface VoiceCommand {
  patterns: string[]
  action: (params?: any) => void
  response?: string
}

export function useVoiceCommands() {
  const navigate = useNavigate()
  const { speak } = useSpeechSynthesis()
  const {
    products,
    selectedProduct,
    setSelectedProduct,
    addToCart,
    cart,
    clearCart
  } = useStore()

  const commands: VoiceCommand[] = [
    // Navigation commands
    {
      patterns: ['zeige produkte', 'alle produkte', 'produkte anzeigen', 'zur produktseite'],
      action: () => navigate('/products'),
      response: 'Ich zeige Ihnen unsere Produkte'
    },
    {
      patterns: ['startseite', 'zur startseite', 'home', 'anfang'],
      action: () => navigate('/'),
      response: 'Zurück zur Startseite'
    },
    {
      patterns: ['warenkorb', 'zum warenkorb', 'warenkorb anzeigen', 'mein warenkorb'],
      action: () => navigate('/cart'),
      response: 'Hier ist Ihr Warenkorb'
    },
    {
      patterns: ['zur kasse', 'bezahlen', 'checkout', 'bestellen'],
      action: () => navigate('/checkout'),
      response: 'Ich bringe Sie zur Kasse'
    },

    // Product selection commands
    {
      patterns: ['zeige mir', 'ich möchte', 'was ist', 'erzähle mir über'],
      action: (params) => {
        const productName = params.toLowerCase()
        const product = products.find(p => 
          p.name.toLowerCase().includes(productName)
        )
        if (product) {
          setSelectedProduct(product)
          navigate(`/products/${product.id}`)
          speak(`Hier ist ${product.name}. ${product.shortDescription}`)
        } else {
          speak('Dieses Produkt konnte ich nicht finden')
        }
      }
    },

    // Cart commands
    {
      patterns: ['in den warenkorb', 'kaufen', 'hinzufügen', 'ich nehme'],
      action: () => {
        if (selectedProduct) {
          const defaultVolume = selectedProduct.volume.find(v => v.isDefault) || selectedProduct.volume[0]
          addToCart(selectedProduct, defaultVolume.id, 1)
          speak(`${selectedProduct.name} wurde zum Warenkorb hinzugefügt`)
          toast.success('Produkt hinzugefügt')
        } else {
          speak('Bitte wählen Sie zuerst ein Produkt aus')
        }
      }
    },
    {
      patterns: ['warenkorb leeren', 'alles löschen', 'warenkorb löschen'],
      action: () => {
        clearCart()
        speak('Der Warenkorb wurde geleert')
      }
    },

    // Information commands
    {
      patterns: ['hilfe', 'was kann ich sagen', 'befehle', 'kommandos'],
      action: () => {
        speak('Sie können Befehle wie "Zeige Produkte", "In den Warenkorb", "Zur Kasse" oder "Hilfe" verwenden. Nennen Sie einfach ein Produkt, um mehr darüber zu erfahren.')
      }
    },
    {
      patterns: ['preis', 'was kostet', 'wie teuer'],
      action: () => {
        if (selectedProduct) {
          const defaultVolume = selectedProduct.volume.find(v => v.isDefault) || selectedProduct.volume[0]
          speak(`${selectedProduct.name} kostet ${defaultVolume.price} Euro`)
        } else if (cart && cart.items.length > 0) {
          speak(`Ihr Warenkorb enthält Artikel im Wert von ${cart.total.toFixed(2)} Euro`)
        } else {
          speak('Bitte wählen Sie ein Produkt aus')
        }
      }
    },

    // Scroll commands
    {
      patterns: ['nach oben', 'scrollen nach oben', 'hoch'],
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        speak('Nach oben gescrollt')
      }
    },
    {
      patterns: ['nach unten', 'scrollen nach unten', 'runter'],
      action: () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        speak('Nach unten gescrollt')
      }
    }
  ]

  const processCommand = useCallback((transcript: string) => {
    const lowerTranscript = transcript.toLowerCase().trim()
    
    // Find matching command
    for (const command of commands) {
      for (const pattern of command.patterns) {
        if (lowerTranscript.includes(pattern)) {
          // Extract parameters if needed
          const params = lowerTranscript.replace(pattern, '').trim()
          command.action(params)
          
          if (command.response) {
            speak(command.response)
          }
          return
        }
      }
    }

    // If no command matched, try to find a product
    const matchedProduct = products.find(p => 
      lowerTranscript.includes(p.name.toLowerCase())
    )
    
    if (matchedProduct) {
      setSelectedProduct(matchedProduct)
      navigate(`/products/${matchedProduct.id}`)
      speak(`Ich zeige Ihnen ${matchedProduct.name}`)
    } else {
      speak('Entschuldigung, ich habe Sie nicht verstanden. Sagen Sie "Hilfe" für verfügbare Befehle.')
    }
  }, [commands, products, setSelectedProduct, navigate, speak])

  return { processCommand }
}