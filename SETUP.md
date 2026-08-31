# Setup Guide - Netflix Clone

This guide will walk you through setting up the Netflix Clone project step by step.

## 📋 Prerequisites

### Required Software

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (v9 or higher) - comes with Node.js
   - Verify installation: `npm --version`

3. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

### Recommended Tools

- **VS Code** - Code editor
- **Postman** or **Thunder Client** - API testing
- **Chrome DevTools** - Debugging

## 🔧 Installation Steps

### Step 1: Get the Code

If using Git:
```bash
git clone <repository-url>
cd netflix
```

Or download and extract the ZIP file.

### Step 2: Install Dependencies

From the root directory:

```bash
# Install dependencies for both client and server
npm run install:all
```

This will:
- Install server dependencies in `server/node_modules`
- Install client dependencies in `client/node_modules`
- Install root-level dependencies

**Expected output:**
```
✓ Server dependencies installed
✓ Client dependencies installed
✓ Root dependencies installed
```

### Step 3: Configure Environment Variables

#### Server Configuration

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Copy the example environment file:
   ```bash
   copy .env.example .env
   ```

3. Open `server/.env` and verify the settings:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

#### Client Configuration

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Copy the example environment file:
   ```bash
   copy .env.example .env
   ```

3. Open `client/.env` and verify:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Step 4: Verify TypeScript Configuration

The project includes pre-configured TypeScript settings:

**Server** (`server/tsconfig.json`)
- Target: ES2020
- Module: CommonJS
- Strict mode enabled

**Client** (`client/tsconfig.json`)
- Target: ES2020
- Module: ESNext
- React JSX support
- Strict mode enabled

No changes needed unless you have specific requirements.

### Step 5: Start the Development Servers

#### Option A: Run Both Services (Recommended)

From the root directory:
```bash
npm run dev
```

This starts:
- **Backend API**: http://localhost:5000
- **Frontend**: http://localhost:5173

#### Option B: Run Services Separately

**Terminal 1 - Backend:**
```bash
npm run server:dev
```

**Terminal 2 - Frontend:**
```bash
npm run client:dev
```

### Step 6: Verify Installation

1. **Check Backend**
   - Open: http://localhost:5000/api/health
   - Expected response: `{"status":"OK","timestamp":"..."}`

2. **Check Frontend**
   - Open: http://localhost:5173
   - You should see the Netflix clone homepage

3. **Check API Connection**
   - The frontend should display movie categories
   - Open browser DevTools (F12) → Network tab
   - Verify API calls to `/api/movies/*`

## 🧪 Testing Your Setup

### Test Backend API

Use PowerShell, curl, or Postman:

```powershell
# Health check
Invoke-RestMethod -Uri "http://localhost:5000/api/health"

# Get hero content
Invoke-RestMethod -Uri "http://localhost:5000/api/movies/hero"

# Get categories
Invoke-RestMethod -Uri "http://localhost:5000/api/movies/categories"
```

### Test Frontend

1. Open http://localhost:5173
2. Check that:
   - Navbar appears at the top
   - Hero section loads with content
   - Movie rows display categories
   - Cards show on hover
   - Page is responsive

## 🐛 Common Issues and Solutions

### Issue: Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
1. Find and kill the process:
   ```powershell
   netstat -ano | findstr :5000
   taskkill /PID <process-id> /F
   ```

2. Or change the port in `server/.env`:
   ```env
   PORT=5001
   ```
   And update `client/.env`:
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

### Issue: Module Not Found

**Error:** `Cannot find module 'express'` or similar

**Solution:**
```bash
# Reinstall dependencies
cd server
Remove-Item -Recurse -Force node_modules
npm install

cd ../client
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue: CORS Errors

**Error:** `Access-Control-Allow-Origin` error

**Solution:**
1. Verify `CLIENT_URL` in `server/.env` matches your frontend URL
2. Restart the backend server
3. Clear browser cache

### Issue: TypeScript Errors

**Error:** TypeScript compilation errors

**Solution:**
1. Check Node.js version: `node --version` (should be v18+)
2. Reinstall TypeScript:
   ```bash
   npm install -D typescript@latest
   ```
3. Clean and rebuild:
   ```bash
   npm run build
   ```

### Issue: Blank Page on Frontend

**Possible causes:**
1. Backend not running
2. Incorrect API URL
3. CORS issue

**Solution:**
1. Check backend is running: http://localhost:5000/api/health
2. Check browser console for errors (F12)
3. Verify `VITE_API_URL` in `client/.env`
4. Check Network tab in DevTools

## 📦 Building for Production

### Build Both Services

```bash
npm run build
```

This will:
1. Compile TypeScript in `server/` to JavaScript in `server/dist/`
2. Build optimized React app in `client/dist/`

### Test Production Build

1. **Start production server:**
   ```bash
   npm start
   ```

2. **Preview client build:**
   ```bash
   npm run client:preview
   ```

## 🔄 Updating Dependencies

Check for outdated packages:

```bash
# Check server dependencies
cd server
npm outdated

# Check client dependencies
cd ../client
npm outdated
```

Update packages:

```bash
# Update all packages
npm update

# Update specific package
npm install package-name@latest
```

## 📝 Next Steps

After successful setup:

1. ✅ Explore the codebase
2. ✅ Read the main README.md
3. ✅ Try modifying components
4. ✅ Add new features
5. ✅ Check CONTRIBUTING.md for guidelines

## 🆘 Getting Help

If you encounter issues:

1. Check this guide thoroughly
2. Review error messages in terminal
3. Check browser console (F12)
4. Search for similar issues online
5. Open an issue on the repository

## ✅ Setup Checklist

- [ ] Node.js v18+ installed
- [ ] npm v9+ installed
- [ ] Dependencies installed (`npm run install:all`)
- [ ] Environment files created (`.env` in both server and client)
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] http://localhost:5000/api/health returns OK
- [ ] http://localhost:5173 displays the app
- [ ] Movie categories load on homepage
- [ ] No errors in browser console

If all items are checked, you're ready to develop! 🎉
