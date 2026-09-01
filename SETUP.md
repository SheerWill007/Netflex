# Setup Guide - Netflex

Complete setup guide for the Netflex project.

## 📋 Prerequisites

### Required
- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** v9 or higher (comes with Node.js)

Verify installation:
```powershell
node --version
npm --version
```

### Recommended
- **Git** for version control
- **VS Code** or your preferred code editor
- **Modern browser** (Chrome, Firefox, Edge)

## 🔧 Installation

### Step 1: Get the Code

```powershell
git clone <repository-url>
cd netflex
```

### Step 2: Install Dependencies

**Option A - Use batch file (Windows):**
```
Double-click: install.bat
```

**Option B - Manual install:**
```powershell
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..
```

**Option C - Use single command:**
```powershell
npm run install:all
```

### Step 3: Configure Environment

#### Server Configuration
1. Navigate to server folder:
   ```powershell
   cd server
   ```

2. Copy example file:
   ```powershell
   copy .env.example .env
   ```

3. Edit `server/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   JWT_SECRET=your-secret-key-here
   ```

#### Client Configuration
1. Navigate to client folder:
   ```powershell
   cd client
   ```

2. Copy example file:
   ```powershell
   copy .env.example .env.local
   ```

3. Edit `client/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

### Step 4: Add Your Logo

1. Create or download a logo (64x64px PNG recommended)
2. Name it: `netflex.png`
3. Place in: `/public/netflex.png`

See `/public/HOW-TO-ADD-LOGO.md` for details.

## 🚀 Running the Application

### Development Mode

**Option A - Both services (Recommended):**
```powershell
npm run dev
```
Or double-click: `start-dev.bat`

**Option B - Individual services:**
```powershell
# Backend only
npm run server:dev
# Or: start-server.bat

# Frontend only
npm run client:dev
# Or: start-client.bat
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

## ✅ Verification

### Check Backend
Open: http://localhost:5000/api/health

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-09-01T...",
  "environment": "development"
}
```

### Check Frontend
1. Open: http://localhost:3000
2. You should see:
   - Netflex homepage
   - Hero banner with "Ember & Static"
   - 9 movie categories
   - Interactive movie cards

### Check Browser Console
1. Press F12 to open DevTools
2. Go to Console tab
3. Should have no errors
4. Go to Network tab
5. Refresh page
6. Should see API calls to `/api/movies/*`

## 📦 Building for Production

### Build Both Services
```powershell
npm run build
```

### Build Individually
```powershell
# Build server
npm run server:build

# Build client
npm run client:build
```

### Run Production Build

**Server:**
```powershell
npm run server:start
```

**Client:**
```powershell
npm run client:start
```

## 🐛 Troubleshooting

### Port Already in Use

**Error:** `Port 3000 or 5000 is already in use`

**Solution:**
```powershell
# Find process
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <process-id> /F
```

Or change port in `.env` files.

### Module Not Found

**Error:** `Cannot find module 'next'` or similar

**Solution:**
```powershell
# Clean install
Remove-Item -Recurse -Force node_modules
npm install

# For specific folder
cd client
Remove-Item -Recurse -Force node_modules
npm install
```

### CORS Errors

**Error:** `Access-Control-Allow-Origin` error

**Solution:**
1. Verify `CLIENT_URL` in `server/.env` = `http://localhost:3000`
2. Restart backend server
3. Clear browser cache

### API Connection Failed

**Issue:** Frontend can't connect to backend

**Check:**
1. Backend running? http://localhost:5000/api/health
2. `NEXT_PUBLIC_API_URL` in `client/.env.local` correct?
3. Check browser console for errors

### TypeScript Errors

**Solution:**
```powershell
# Client
cd client
Remove-Item -Recurse -Force .next
npm run build

# Server
cd server
Remove-Item -Recurse -Force dist
npm run build
```

### Blank Page

**Possible causes:**
1. Backend not running
2. Wrong API URL
3. CORS issue

**Debug steps:**
1. Check backend: http://localhost:5000/api/health
2. Check browser console (F12)
3. Check Network tab in DevTools
4. Verify environment variables

## 📝 Development Workflow

### Daily Development
```powershell
# 1. Pull latest changes
git pull

# 2. Install any new dependencies
npm run install:all

# 3. Start development
npm run dev

# 4. Make changes and test
# Frontend hot-reloads automatically
# Backend restarts with nodemon
```

### Adding Features
1. Create feature branch
2. Make changes
3. Test locally
4. Commit and push
5. Create pull request

### Environment Variables

Never commit `.env` or `.env.local` files!

**Tracked (in git):**
- `.env.example`

**Ignored (not in git):**
- `.env`
- `.env.local`

## 🔒 Security Notes

1. Change `JWT_SECRET` in production
2. Never commit sensitive data
3. Use strong secrets
4. Keep dependencies updated

## 📚 Next Steps

After setup:
1. ✅ Read `README.md` for full documentation
2. ✅ Check `CONTRIBUTING.md` for contribution guidelines
3. ✅ Explore the codebase
4. ✅ Start building features!

## 🆘 Getting Help

- **Quick Start**: `START-HERE.md`
- **Full Docs**: `README.md`
- **Project Structure**: Check folder organization
- **API Docs**: `README.md` API section

## ✅ Setup Checklist

- [ ] Node.js v18+ installed
- [ ] npm v9+ installed
- [ ] Dependencies installed
- [ ] `server/.env` configured
- [ ] `client/.env.local` configured
- [ ] Logo added to `/public/netflex.png`
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] http://localhost:5000/api/health returns OK
- [ ] http://localhost:3000 displays app
- [ ] No errors in browser console

If all checked, you're ready! 🎉
