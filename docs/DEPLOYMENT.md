# Deployment Guide - Liyana Nour Extrait

## Übersicht

Diese Anleitung beschreibt das Deployment der Liyana Nour Extrait E-Commerce-Plattform in verschiedenen Umgebungen.

## Voraussetzungen

- Node.js >= 18.0.0
- PostgreSQL oder MongoDB
- Redis (für Caching)
- SSL-Zertifikat
- Domain mit DNS-Konfiguration

## 1. Local Development

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

## 2. Production Build

### Frontend Build
```bash
cd frontend
npm run build
# Output in frontend/dist
```

### Backend Build
```bash
cd backend
npm run build
# Output in backend/dist
```

## 3. Docker Deployment

### Docker Compose Setup

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - REACT_APP_API_URL=https://api.liyana-nour.com
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=liyana_nour
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### Docker Commands

```bash
# Build und Start
docker-compose up -d --build

# Logs anzeigen
docker-compose logs -f

# Stop
docker-compose down
```

## 4. Vercel Deployment (Frontend)

1. Vercel CLI installieren:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd frontend
vercel --prod
```

3. Environment Variables in Vercel Dashboard setzen:
- `REACT_APP_API_URL`
- `REACT_APP_STRIPE_PUBLIC_KEY`
- etc.

## 5. AWS Deployment

### EC2 Setup

1. EC2 Instance erstellen (Ubuntu 22.04)
2. Security Groups konfigurieren:
   - Port 80 (HTTP)
   - Port 443 (HTTPS)
   - Port 22 (SSH)

3. Server Setup:
```bash
# System Updates
sudo apt update && sudo apt upgrade -y

# Node.js installieren
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 installieren
sudo npm install -g pm2

# Nginx installieren
sudo apt install nginx -y

# PostgreSQL installieren
sudo apt install postgresql postgresql-contrib -y

# Redis installieren
sudo apt install redis-server -y
```

4. Application Deploy:
```bash
# Code clonen
git clone https://github.com/your-repo/liyana-nour-extrait.git
cd liyana-nour-extrait

# Dependencies installieren
npm install

# Build
npm run build

# PM2 starten
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name liyana-nour.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name liyana-nour.com;

    ssl_certificate /etc/letsencrypt/live/liyana-nour.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/liyana-nour.com/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 6. Database Migration

```bash
# Prisma Migrations
npx prisma migrate deploy

# Seed Database (optional)
npm run db:seed
```

## 7. SSL Certificate (Let's Encrypt)

```bash
# Certbot installieren
sudo apt install certbot python3-certbot-nginx -y

# Certificate generieren
sudo certbot --nginx -d liyana-nour.com -d www.liyana-nour.com
```

## 8. Monitoring & Logging

### PM2 Monitoring
```bash
# Status anzeigen
pm2 status

# Logs anzeigen
pm2 logs

# Monitoring Dashboard
pm2 monit
```

### Application Logging
- Logs werden in `/logs` gespeichert
- Winston Logger für strukturierte Logs
- Sentry für Error Tracking

## 9. Backup Strategy

### Database Backup
```bash
# PostgreSQL Backup
pg_dump -U postgres liyana_nour > backup_$(date +%Y%m%d).sql

# Automated Backup Script
0 2 * * * /home/ubuntu/backup.sh
```

### File Backup
- Uploads Ordner
- Environment Files
- SSL Certificates

## 10. Performance Optimization

1. **CDN Setup** (CloudFlare)
   - Static Assets cachen
   - DDoS Protection
   - SSL Termination

2. **Redis Caching**
   - Session Storage
   - API Response Caching
   - Rate Limiting

3. **Image Optimization**
   - WebP Format
   - Responsive Images
   - Lazy Loading

## 11. Security Checklist

- [ ] Environment Variables gesichert
- [ ] Database Credentials rotiert
- [ ] SSL Certificate aktiv
- [ ] Firewall konfiguriert
- [ ] Rate Limiting aktiviert
- [ ] CORS korrekt konfiguriert
- [ ] Security Headers gesetzt
- [ ] Regular Security Updates

## 12. Rollback Procedure

```bash
# PM2 Rollback
pm2 reload ecosystem.config.js --update-env

# Database Rollback
psql -U postgres liyana_nour < backup_20240115.sql

# Git Rollback
git checkout <previous-version>
npm install
npm run build
pm2 restart all
```

## Support

Bei Problemen:
- Logs überprüfen: `pm2 logs`
- System Status: `pm2 status`
- Nginx Logs: `/var/log/nginx/`
- Application Logs: `./logs/`