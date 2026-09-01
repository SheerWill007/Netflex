# Quick Start - Netflix Clone

Get your Netflix Clone running in 3 steps!

## Prerequisites

- Node.js v18+
- npm v9+

## 3 Steps

### 1. Install
```powershell
npm run install:all
```
Or double-click: `install.bat`

### 2. Configure
Create environment files:

**server/.env:**
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
JWT_SECRET=your-secret
```

**client/.env.local:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start
```powershell
npm run dev
```
Or double-click: `start-dev.bat`

## Access

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## Troubleshooting

**Port in use?**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Module not found?**
```powershell
npm run install:all
```

**API not connecting?**
- Check backend: http://localhost:5000/api/health
- Verify `.env` files

## Next Steps

1. Add logo to `/public/netflix.png`
2. Read `README.md`
3. Start coding!

That's it! 🚀
