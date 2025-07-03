# Liyana Nour Extrait - Projektstruktur

## Übersicht
Modulare E-Commerce-Plattform mit KI-gestützter Sprachsteuerung und barrierefreiem Design.

## Architektur

### Frontend-Module
```
frontend/
├── src/
│   ├── components/
│   │   ├── Product/         # Produktgalerie, Detailansichten, 3D-Animationen
│   │   ├── Cart/            # Warenkorb-Logik, Rabattberechnung
│   │   ├── Payment/         # Zahlungsintegration (Stripe, PayPal, Crypto, etc.)
│   │   ├── Voice/           # Sprachsteuerung & Barrierefreiheit
│   │   ├── Layout/          # Header, Footer, Navigation
│   │   ├── UI/              # Wiederverwendbare UI-Komponenten
│   │   └── Animations/      # 3D/4D/5D-Animationskomponenten
│   ├── pages/               # Hauptseiten der Anwendung
│   ├── services/            # API-Calls, Externe Services
│   ├── hooks/               # Custom React Hooks
│   ├── utils/               # Hilfsfunktionen
│   ├── store/               # State Management (Zustand/Redux)
│   ├── types/               # TypeScript Definitionen
│   └── constants/           # Konstanten, Konfiguration
```

### Backend-Module
```
backend/
├── src/
│   ├── controllers/         # Request Handler
│   ├── models/              # Datenmodelle
│   ├── routes/              # API-Routen
│   ├── services/            # Business Logic
│   ├── middleware/          # Auth, Validation, Error Handling
│   └── config/              # Konfiguration, Umgebungsvariablen
```

### Hauptagenten

1. **Frontend-Agent**
   - Produktpräsentation mit 20 Parfüm-Modellen
   - 3D/4D/5D-Animationen
   - Responsive Design

2. **Sprachsteuerungs-Agent**
   - Web Speech API Integration
   - Barrierefreie Navigation
   - Datenschutz-Dialoge

3. **Zahlungs-Agent**
   - Multi-Payment-Gateway Integration
   - Nachnahme-Logik
   - Transportkostenberechnung

4. **Backend-Agent**
   - RESTful API
   - Datenbankoperationen
   - DSGVO-Compliance

5. **Test-Agent**
   - Unit Tests
   - Integration Tests
   - E2E Tests mit Cypress

## Technologie-Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, PostgreSQL
- **Sprache**: Web Speech API, Speech Recognition
- **Zahlungen**: Stripe, PayPal, Web3 für Crypto
- **Testing**: Jest, React Testing Library, Cypress
- **DevOps**: Docker, GitHub Actions, Vercel/AWS

## Sicherheit & Compliance

- DSGVO-konforme Datenverarbeitung
- SSL/TLS-Verschlüsselung
- PCI-DSS für Zahlungen
- WCAG 2.1 AA für Barrierefreiheit