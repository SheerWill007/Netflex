# Quick Start Guide 🚀

Get your Netflix Clone up and running in 5 minutes!

## Prerequisites Check ✅

Open PowerShell or Command Prompt and verify:

```powershell
node --version
# Should show v18 or higher

npm --version
# Should show v9 or higher
```

If not installed, download Node.js from: https://nodejs.org/

## Installation Steps

### 1. Install Root Dependencies

```powershell
npm install
```

### 2. Install Server Dependencies

```powershell
cd server
npm install
cd ..
```

### 3. Install Client Dependencies

```powershell
cd client
npm install
cd ..
```

**Or use the all-in-one command:**
```powershell
npm run install:all
```

## Running the Application

### Start Both Services (Easiest Method)

From the root directory:

```powershell
npm run dev
```

This will start:
- ✅ Backend API on http://localhost:5000
- ✅ Frontend on http://localhost:5173

**Wait for both to finish starting (about 10-20 seconds), then open your browser to:**
```
http://localhost:5173
```

### Alternative: Run Services Separately

**Terminal 1 - Start Backend:**
```powershell
npm run server:dev
```

Wait for: "🚀 Server running on http://localhost:5000"

**Terminal 2 - Start Frontend:**
```powershell
npm run client:dev
```

Wait for: "Local: http://localhost:5173"

## Verify Everything Works

1. **Backend Health Check**
   - Open: http://localhost:5000/api/health
   - Should see: `{"status":"OK","timestamp":"..."}`

2. **Frontend**
   - Open: http://localhost:5173
   - Should see Netflix clone homepage with:
     - Navigation bar at top
     - Hero section with "Ember & Static"
     - Multiple rows of movies
     - Hover over movie cards to see details

3. **API Connection**
   - Open browser DevTools (Press F12)
   - Go to Network tab
   - Refresh the page
   - Should see successful API calls to `/api/movies/hero` and `/api/movies/categories`

## What You Should See

### Terminal Output (Backend)
```
🚀 Server running on http://localhost:5000
📊 Environment: development
```

### Terminal Output (Frontend)
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Browser
- Netflix-style interface
- Red "NETFLIX-CLONE" logo
- Featured show "Ember & Static"
- Movie categories with scrollable rows
- Hover effects on movie cards

## Troubleshooting

### PowerShell Execution Policy Error

If you see: "running scripts is disabled on this system"

**Option 1 - Temporary Fix (Current session only):**
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

**Option 2 - Use Command Prompt (cmd):**
Open Command Prompt instead of PowerShell and run the same commands.

**Option 3 - Run commands with full path:**
```powershell
C:\Windows\System32\cmd.exe /c npm install
```

### Port Already in Use

If you see "Port 5000 is already in use":

```powershell
# Find what's using the port
netstat -ano | findstr :5000

# Kill the process (replace XXXX with the PID from above)
taskkill /PID XXXX /F
```

Or change the port in `server\.env`:
```env
PORT=5001
```

And update `client\.env`:
```env
VITE_API_URL=http://localhost:5001/api
```

### "Cannot find module" Error

```powershell
# Clean install
Remove-Item -Recurse -Force node_modules
npm install
```

### Blank Page or Loading Error

1. Verify backend is running: http://localhost:5000/api/health
2. Check `client\.env` has: `VITE_API_URL=http://localhost:5000/api`
3. Open browser DevTools (F12) and check Console tab for errors
4. Clear browser cache (Ctrl + Shift + Delete)

## Quick Test

Run this in PowerShell to test the API:

```powershell
# Test health endpoint
Invoke-WebRequest -Uri "http://localhost:5000/api/health" | Select-Object -Expand Content

# Test movies endpoint
Invoke-WebRequest -Uri "http://localhost:5000/api/movies/hero" | Select-Object -Expand Content
```

## Next Steps

✅ **You're all set!** Here's what you can do:

1. **Browse the Code**
   - Check out `client/src/components/` for React components
   - Look at `server/src/routes/` for API endpoints
   - Explore `server/src/data/movies.ts` for mock data

2. **Make Changes**
   - Edit any component and see hot-reload in action
   - Modify movie data in `server/src/data/movies.ts`
   - Add new features

3. **Build for Production**
   ```powershell
   npm run build
   ```

4. **Read Full Documentation**
   - See `README.md` for complete details
   - Check `SETUP.md` for in-depth setup guide
   - Review `CONTRIBUTING.md` to contribute

## Need Help?

- 📖 Read the full `README.md`
- 🔧 Check `SETUP.md` for detailed troubleshooting
- 🐛 Look at browser Console (F12) for errors
- 🔍 Check terminal output for error messages

---

**Happy Coding! 🎉**
