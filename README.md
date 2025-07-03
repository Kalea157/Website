# Liyana Nour Extrait - E-Commerce Platform

Eine moderne, barrierefreie E-Commerce-Webseite für Premium-Parfüms mit innovativer KI-gestützter Sprachsteuerung.

## 🌟 Hauptfunktionen

### 🎙️ Sprachsteuerung
- **Web Speech API Integration**: Vollständige Navigation per Sprachbefehl
- **Barrierefreiheit**: Optimiert für blinde und mobilitätseingeschränkte Nutzer
- **Datenschutz**: Lokale Verarbeitung ohne Datenübertragung
- **Mehrsprachig**: Deutsch (primär), Englisch, Französisch

### 🛍️ E-Commerce Features
- **20 Parfüm-Modelle**: Liyana Nour Rouge, Intense, Classic, Gold, Midnight, etc.
- **Intelligente Rabattlogik**:
  - Versandkostenfrei ab 50€
  - Gratisproben bei 75€ und 105€
  - Automatische Prozentangaben
- **Warenkorb-Management**: Real-time Updates mit Local Storage

### 💳 Zahlungsintegration
- **Standard**: PayPal, Stripe (Visa/Mastercard), Apple Pay, Google Pay
- **DACH-Region**: Sofort Banking, Klarna, SEPA-Lastschrift
- **Modern**: Kryptowährungen (Bitcoin, Ethereum)
- **Nachnahme**: Komplexe DHL-Logik mit Vorauszahlung

### 🎨 Design & UX
- **Modern Dark Theme**: Luxuriöse Optik mit Glasmorphismus
- **Responsive Design**: Optimiert für alle Bildschirmgrößen
- **Animationen**: Framer Motion für beeindruckende 3D/4D/5D-Effekte
- **PWA Support**: Progressive Web App Funktionalität

## 🏗️ Technologie-Stack

### Frontend
- **React 18** + TypeScript
- **Vite** (Build Tool)
- **Tailwind CSS** + Custom Design System
- **Framer Motion** (Animationen)
- **React Query** (State Management)
- **React Router** (Navigation)
- **Web Speech API** (Sprachsteuerung)

### Backend (Geplant)
- **Node.js** + Express
- **PostgreSQL** + Prisma ORM
- **Redis** (Session/Cache)
- **JWT** Authentication

### DevOps
- **Docker** + Docker Compose
- **GitHub Actions** (CI/CD)
- **PM2** (Process Management)

## 🚀 Installation & Setup

### Voraussetzungen
- Node.js >= 18.0.0
- npm >= 9.0.0

### Frontend starten
```bash
# Dependencies installieren
npm install

# Frontend starten
cd frontend
npm install
npm run dev

# Öffnet: http://localhost:3000
```

### Vollständiges Setup
```bash
# Komplettes Projekt starten
npm run dev

# Build für Produktion
npm run build

# Tests ausführen
npm run test

# Linting
npm run lint
```

## 📁 Projektstruktur

```
liyana-nour-extrait/
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/      # React Komponenten
│   │   │   ├── layout/      # Layout Komponenten (Header, Footer)
│   │   │   ├── common/      # Wiederverwendbare Komponenten
│   │   │   ├── product/     # Produkt-spezifische Komponenten
│   │   │   ├── cart/        # Warenkorb Komponenten
│   │   │   ├── payment/     # Zahlungs Komponenten
│   │   │   └── speech/      # Sprachsteuerung Komponenten
│   │   ├── hooks/           # Custom React Hooks
│   │   ├── services/        # API Services
│   │   ├── types/           # TypeScript Typen
│   │   ├── utils/           # Utility Funktionen
│   │   ├── store/           # State Management
│   │   └── pages/           # Route Komponenten
│   ├── public/              # Statische Assets
│   └── dist/                # Build Output
├── backend/                 # Node.js Backend (Geplant)
├── docs/                    # Dokumentation
├── docker/                  # Docker Konfiguration
├── config/                  # Konfigurationsdateien
└── scripts/                 # Build/Deploy Scripts
```

## 🎯 Sprachbefehle

### Navigation
- "Startseite" / "Home"
- "Produkte" / "Parfüms"
- "Warenkorb" / "Einkaufswagen"
- "Über uns"
- "Kontakt"

### Produktsuche
- "Suche nach [Begriff]"
- "Finde [Produktname]"

### Warenkorb
- "[Produktname] kaufen"
- "[Produktname] in den Warenkorb"
- "Artikel entfernen"
- "Zur Kasse" / "Bestellen"

## 🎨 Design System

### Farben
- **Primary**: Violett-Gradient (#8B5CF6 - #7C3AED)
- **Gold**: Luxus-Akzente (#F59E0B - #D97706)
- **Dark**: Elegantes Dunkles Theme (#111827 - #1F2937)

### Typografie
- **Serif**: Playfair Display (Headlines)
- **Sans**: Inter (Body Text)
- **Mono**: JetBrains Mono (Code)

### Animationen
- **Framer Motion**: Fluid, natürliche Übergänge
- **Glasmorphismus**: Moderne transparente Effekte
- **Hover States**: Interactive Feedback

## 🔒 Sicherheit & Compliance

### DSGVO Compliance
- **Datenschutzkonforme Sprachverarbeitung**
- **Cookie Consent Management**
- **Transparente Datennutzung**

### Technische Sicherheit
- **HTTPS/TLS 1.3**
- **CSRF Protection**
- **Rate Limiting**
- **Input Validation**

## ♿ Barrierefreiheit

### WCAG 2.1 AA Konform
- **Screen Reader Optimierung**
- **Keyboard Navigation**
- **High Contrast Mode**
- **Voice Control**
- **Fokus-Management**

### Sprachsteuerung Features
- **Vollständige Navigation**
- **Formular-Ausfüllung**
- **Produktsuche**
- **Warenkorb-Management**

## 📊 Performance

### Optimierungen
- **Code Splitting**: Lazy Loading von Komponenten
- **Image Optimization**: WebP Format
- **Service Worker**: Intelligentes Caching
- **Bundle Analysis**: Optimierte Asset-Größen

### Metriken Ziele
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Accessibility Score**: > 95

## 🧪 Testing

### Test Strategie
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: API Endpoints
- **E2E Tests**: Cypress (Geplant)
- **Accessibility Tests**: axe-core
- **Performance Tests**: Lighthouse CI

## 📈 Roadmap

### Phase 1: Foundation ✅
- [x] Projektstruktur aufsetzen
- [x] Design System implementieren
- [x] Sprachsteuerung Grundfunktionen
- [x] Responsive Layout
- [x] Navigation & Routing

### Phase 2: Core Features (In Arbeit)
- [ ] Produktkatalog mit 20 Parfüms
- [ ] Vollständige Warenkorb-Funktionalität
- [ ] Benutzerauthentifizierung
- [ ] Checkout-Prozess

### Phase 3: Payment & Backend
- [ ] Backend API Entwicklung
- [ ] Zahlungsintegration (Stripe, PayPal, etc.)
- [ ] Kryptowährungs-Support
- [ ] Nachnahme-Logik mit DHL

### Phase 4: Advanced Features
- [ ] KI-gestützte Produktempfehlungen
- [ ] Erweiterte Sprachbefehle
- [ ] Multi-Language Support
- [ ] Analytics & Tracking

### Phase 5: Production
- [ ] Security Audit
- [ ] Performance Optimierung
- [ ] SEO Optimierung
- [ ] Deployment & Monitoring

## 🤝 Entwicklung

### Code Style
- **ESLint**: Airbnb Configuration
- **Prettier**: Code Formatting
- **TypeScript**: Strict Mode
- **Commit Convention**: Conventional Commits

### Git Workflow
```bash
# Feature entwickeln
git checkout -b feature/neue-funktion
git commit -m "feat: neue Funktion hinzugefügt"
git push origin feature/neue-funktion

# Pull Request erstellen
# Code Review
# Merge nach main
```

## 📞 Support & Kontakt

### Entwicklung
- **GitHub**: [Repository](https://github.com/liyana-nour/extrait)
- **Issues**: [Bug Reports & Feature Requests](https://github.com/liyana-nour/extrait/issues)

### Business
- **E-Mail**: info@liyana-nour.com
- **Telefon**: +49 (0) 30 12345678
- **Adresse**: Berlin, Deutschland

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

---

**Liyana Nour Extrait** - Luxury Perfumes with Intelligent Voice Control
*Entwickelt mit ❤️ in Berlin*