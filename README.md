# Liyana Nour Extrait - KI-gestützte E-Commerce-Plattform

Eine moderne, barrierefreie und skalierbare E-Commerce-Webseite für exklusive Parfüm-Kollektionen mit innovativer KI-gestützter Sprachsteuerung.

## 🌟 Features

### Frontend-Features
- **Responsive Produktgalerie** mit 20 verschiedenen Parfüm-Modellen
- **3D/4D/5D-Animationen** für beeindruckende visuelle Effekte
- **Sprachsteuerung** - Navigation und Bestellungen per Sprache
- **Barrierefreiheit** - WCAG 2.1 AA konform
- **Multi-Language Support** - Deutsch, Englisch, Französisch

### Backend-Features
- **RESTful API** mit Express.js und TypeScript
- **Echtzeit-Kommunikation** über WebSockets
- **Multi-Payment-Integration** (Stripe, PayPal, Crypto, etc.)
- **DSGVO-konforme** Datenverarbeitung
- **Automatisierte Bestellabwicklung**

### Zahlungsmethoden
- Kreditkarte (Visa, Mastercard)
- PayPal
- Apple Pay / Google Pay
- Sofort Banking
- Klarna
- Kryptowährungen (BTC, ETH, USDT)
- Überweisung
- Lastschrift
- Nachnahme mit spezieller Logik

## 🚀 Quick Start

### Voraussetzungen
- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL oder MongoDB
- Redis (optional, für Caching)

### Installation

1. Repository klonen:
```bash
git clone https://github.com/your-username/liyana-nour-extrait.git
cd liyana-nour-extrait
```

2. Dependencies installieren:
```bash
npm install
```

3. Umgebungsvariablen einrichten:
```bash
cp .env.example .env
# .env Datei mit Ihren Werten bearbeiten
```

4. Datenbank einrichten:
```bash
# PostgreSQL
npm run db:migrate
npm run db:seed

# oder für MongoDB
npm run db:setup
```

5. Entwicklungsserver starten:
```bash
npm run dev
```

Die Anwendung läuft nun auf:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📁 Projektstruktur

```
liyana-nour-extrait/
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── components/     # React Komponenten
│   │   ├── pages/         # Seiten-Komponenten
│   │   ├── services/      # API Services
│   │   ├── hooks/         # Custom Hooks
│   │   ├── store/         # State Management
│   │   └── styles/        # CSS/Tailwind Styles
├── backend/                # Node.js Backend
│   ├── src/
│   │   ├── controllers/   # Request Handler
│   │   ├── models/        # Datenmodelle
│   │   ├── routes/        # API Routen
│   │   ├── services/      # Business Logic
│   │   └── middleware/    # Express Middleware
├── shared/                 # Gemeinsame Types/Utils
└── tests/                  # Test-Dateien
```

## 🎯 Hauptfunktionen

### Sprachsteuerung
Die innovative Sprachsteuerung ermöglicht:
- Freihändige Navigation
- Produktsuche per Sprache
- Bestellungen aufgeben
- Warenkorb verwalten
- Informationen abrufen

Beispielbefehle:
- "Zeige mir Liyana Nour Rouge"
- "In den Warenkorb"
- "Zur Kasse gehen"
- "Was kostet das Produkt?"

### Rabattlogik
- Versandkostenfrei ab 50€
- Gratisproben bei 75€ und 105€
- Prozentuale Rabatte bei Aktionen
- VIP-Kundenrabatte

### Nachnahme-System
- Transportkosten werden vorberechnet (10-20€)
- Vorauszahlung wird bei Lieferung abgezogen
- Minimierung von Verlusten durch Rücksendungen

## 🛠️ Technologie-Stack

### Frontend
- React 18 mit TypeScript
- Tailwind CSS für Styling
- Framer Motion für Animationen
- Three.js für 3D-Grafiken
- Zustand für State Management
- Vite als Build Tool

### Backend
- Node.js mit Express
- TypeScript
- Prisma ORM
- PostgreSQL/MongoDB
- Redis für Caching
- Socket.io für WebSockets

### DevOps
- Docker für Containerisierung
- GitHub Actions für CI/CD
- Vercel/AWS für Deployment
- Monitoring mit Sentry

## 🧪 Testing

Tests ausführen:
```bash
# Unit Tests
npm run test

# Integration Tests
npm run test:integration

# E2E Tests
npm run test:e2e

# Alle Tests mit Coverage
npm run test:coverage
```

## 📝 API Dokumentation

Die API-Dokumentation ist verfügbar unter:
- Development: http://localhost:5000/api-docs
- Production: https://api.liyana-nour.com/docs

### Beispiel-Endpoints

```bash
# Produkte abrufen
GET /api/products

# Produkt-Details
GET /api/products/:id

# Warenkorb aktualisieren
POST /api/cart/update

# Bestellung aufgeben
POST /api/orders/create
```

## 🔒 Sicherheit

- SSL/TLS-Verschlüsselung
- JWT-basierte Authentifizierung
- Rate Limiting
- Input Validation
- XSS/CSRF-Schutz
- DSGVO-konforme Datenverarbeitung

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
docker-compose up -d
```

### Environment-spezifisches Deployment
```bash
# Staging
npm run deploy:staging

# Production
npm run deploy:production
```

## 🤝 Contributing

Beiträge sind willkommen! Bitte lesen Sie unsere [Contributing Guidelines](CONTRIBUTING.md).

1. Fork das Projekt
2. Feature Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request öffnen

## 📄 Lizenz

Dieses Projekt ist lizenziert unter der MIT License - siehe [LICENSE](LICENSE) für Details.

## 📞 Support

- Email: support@liyana-nour.com
- Dokumentation: https://docs.liyana-nour.com
- Issues: https://github.com/your-username/liyana-nour-extrait/issues

## 🙏 Danksagungen

- React Team für das großartige Framework
- Tailwind CSS für das utility-first CSS Framework
- Three.js Community für die 3D-Bibliothek
- Alle Contributors und Tester

---

Made with ❤️ by Liyana Nour Team