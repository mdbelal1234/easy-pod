# Easy Pod — Deployment Guide (Hostinger VPS)

## Prerequisites

- Ubuntu 22.04+ VPS
- Node.js 22+
- PostgreSQL 16+
- Nginx
- PM2
- SSL Certificate (Let's Encrypt)

---

## 1. Initial VPS Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y
```

---

## 2. Database Setup

```bash
sudo -u postgres psql

CREATE DATABASE easypod;
CREATE USER easypoduser WITH ENCRYPTED PASSWORD 'your_strong_password';
GRANT ALL PRIVILEGES ON DATABASE easypod TO easypoduser;
\q
```

---

## 3. Application Setup

```bash
# Create app directory
sudo mkdir -p /var/www/easy-pod
sudo chown $USER:$USER /var/www/easy-pod

# Create log directory
sudo mkdir -p /var/log/easy-pod
sudo chown $USER:$USER /var/log/easy-pod

# Clone/upload your project to /var/www/easy-pod
cd /var/www/easy-pod

# Copy environment file
cp .env.example .env.local

# Edit environment variables
nano .env.local
```

---

## 4. Environment Variables

Edit `/var/www/easy-pod/.env.local`:

```env
DATABASE_URL="postgresql://easypoduser:your_strong_password@localhost:5432/easypod"
AUTH_SECRET="generate-with-openssl-rand-base64-32"
AUTH_URL="https://easypod.studio"
RESEND_API_KEY="re_xxxxxxxxxxxx"
RESEND_FROM_EMAIL="noreply@easypod.studio"
ADMIN_EMAIL="admin@easypod.studio"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_WHATSAPP_NUMBER="8801XXXXXXXXX"
NEXT_PUBLIC_SITE_URL="https://easypod.studio"
```

Generate AUTH_SECRET:
```bash
openssl rand -base64 32
```

---

## 5. Build & Deploy

```bash
cd /var/www/easy-pod

# Install dependencies
npm ci

# Generate Prisma client
npm run db:generate

# Run database migrations
npx prisma migrate deploy

# Seed initial data
npm run db:seed

# Build the application
npm run build

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## 6. Nginx Configuration

```bash
# Copy nginx config
sudo cp /var/www/easy-pod/nginx.conf /etc/nginx/sites-available/easypod

# Enable site
sudo ln -s /etc/nginx/sites-available/easypod /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 7. SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d easypod.studio -d www.easypod.studio
```

---

## 8. PM2 Commands

```bash
# View logs
pm2 logs easy-pod

# Restart app
pm2 restart easy-pod

# Stop app
pm2 stop easy-pod

# Monitor
pm2 monit
```

---

## 9. Deployment Updates

```bash
cd /var/www/easy-pod

# Pull latest code
git pull origin main

# Install new dependencies
npm ci

# Run any new migrations
npx prisma migrate deploy

# Rebuild
npm run build

# Restart PM2
pm2 restart easy-pod
```

---

## 10. Admin Panel

After deployment, access the admin panel at:
`https://easypod.studio/admin`

Default credentials (change after first login):
- Email: `admin@easypod.studio`
- Password: `Admin@123`

**Change the password immediately after first login.**
