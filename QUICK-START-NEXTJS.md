# 🚀 Quick Start - Next.js Netflix Clone

Get your Next.js-powered Netflix Clone running in 3 simple steps!

---

## Prerequisites

- ✅ Node.js v18+ installed
- ✅ npm v9+ installed

Check with:
```powershell
node --version
npm --version
```

---

## 3 Steps to Success

### Step 1: Install
```powershell
npm run install:all
```

Or double-click: `install.bat`

### Step 2: Start
```powershell
npm run dev
```

Or double-click: `start-dev.bat`

### Step 3: Open Browser
```
http://localhost:3000
```

**That's it!** 🎉

---

## What You'll See

- ✅ **Frontend**: http://localhost:3000 (Next.js)
- ✅ **Backend**: http://localhost:5000 (Express API)

### In Your Browser
- Netflix-style homepage
- Hero banner with "Ember & Static"
- 9 movie categories
- Hover effects on cards
- Fully responsive design

---

## 📁 Add Your Netflix Logo

1. Create or download a 64x64px PNG logo
2. Save as `netflix.png`
3. Place in `/public/` folder
4. Refresh browser

Guide: `/public/HOW-TO-ADD-LOGO.md`

---

## 🎯 Key Differences from Vite

| Feature | Vite | Next.js |
|---------|------|---------|
| **Port** | 5173 | **3000** |
| **Rendering** | Client-only | **SSR + Client** |
| **SEO** | Basic | **Optimized** |
| **Fonts** | Manual | **Auto-optimized** |

---

## 📝 Scripts

```powershell
# Development
npm run dev              # Start both services
npm run client:dev       # Next.js only (port 3000)
npm run server:dev       # Express only (port 5000)

# Production
npm run build            # Build both
npm start                # Start production

# Maintenance
npm run install:all      # Install all dependencies
npm run lint             # Check code quality
```

---

## 🌐 Environment Variables

### Client (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Server (`.env`)
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**⚠️ Important**: Update `CLIENT_URL` from 5173 to **3000**!

---

## ✨ Next.js Features

- **SSR** - Server-side rendering for better SEO
- **App Router** - Modern file-based routing
- **Font Optimization** - Google Fonts auto-optimized
- **Code Splitting** - Automatic bundle optimization
- **Fast Refresh** - Instant updates while coding

---

## 🔧 Troubleshooting

### Port Already in Use?
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### API Not Connecting?
1. Check backend is running: http://localhost:5000/api/health
2. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
3. Update `CLIENT_URL` in server `.env` to 3000

### Build Errors?
```powershell
cd client
Remove-Item -Recurse -Force .next
npm run build
```

---

## 📚 Documentation

- 📘 **Main README**: `README.md`
- 🎯 **Migration Guide**: `NEXTJS-MIGRATION.md`
- 🏗️ **Project Structure**: `PROJECT-STRUCTURE.md`
- 🚀 **Quick Start**: This file!
- 📖 **Setup Guide**: `SETUP.md`

---

## 🎉 You're Ready!

Your Next.js Netflix Clone is ready to run.

```powershell
npm run dev
```

Open: **http://localhost:3000**

Happy coding! 🚀

---

*Powered by Next.js 14, React 18, TypeScript & Express*
