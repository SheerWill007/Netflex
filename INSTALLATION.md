# Complete Installation Guide

## 🚀 Full Setup (Including Clerk Auth)

### Step 1: Install Dependencies

```powershell
# From root directory
npm run install:all
```

This installs:
- Root dependencies (concurrently)
- Server dependencies (Express, TypeScript, etc.)
- Client dependencies (Next.js, React, **@clerk/nextjs**, etc.)

### Step 2: Configure Backend

Edit `server/.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
JWT_SECRET=your-secret-key
```

### Step 3: Configure Frontend + Clerk

1. **Get Clerk Keys**:
   - Visit: https://dashboard.clerk.com/
   - Select app: `app_3IipyaTC3BNZrVEcDFovhAPWBss`
   - Go to **API Keys**
   - Copy **Publishable Key** and **Secret Key**

2. **Edit `client/.env.local`**:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Clerk Authentication - REQUIRED!
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_here

# Clerk URLs (already configured)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### Step 4: Add Netflix Logo

1. Create or download Netflix logo (64x64px PNG)
2. Save as `netflix.png`
3. Place in `/public/` folder

### Step 5: Start Development

```powershell
npm run dev
```

Or double-click: `start-dev.bat`

### Step 6: Test Everything

1. **Backend**: http://localhost:5000/api/health
   - Should return: `{"status":"OK",...}`

2. **Frontend**: http://localhost:3000
   - Should see Netflix clone
   - Should see "Sign In" and "Sign Up" buttons

3. **Test Auth**: Click "Sign Up"
   - Create an account
   - Verify you see user profile button
   - Click profile button to see options

## ✅ Verification Checklist

- [ ] Dependencies installed (no errors)
- [ ] `server/.env` configured
- [ ] `client/.env.local` configured with **Clerk keys**
- [ ] Logo added to `/public/netflix.png`
- [ ] Backend runs: http://localhost:5000
- [ ] Frontend runs: http://localhost:3000
- [ ] Sign Up button visible
- [ ] Can create account
- [ ] User button appears after sign-up

## 🔧 Troubleshooting

### "Clerk keys not found"

**Issue**: App won't start or auth doesn't work

**Solution**:
1. Get keys from https://dashboard.clerk.com/
2. Add to `client/.env.local`
3. Restart server: `npm run dev`

### Port Already in Use

**Solution**:
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module Not Found

**Solution**:
```powershell
cd client
Remove-Item -Recurse -Force node_modules
npm install
```

## 📚 Next Steps

1. ✅ Test sign-up flow
2. ✅ Test sign-in flow  
3. ✅ Read `CLERK-SETUP.md` for customization
4. ✅ Explore Clerk Dashboard
5. ✅ Start building features!

## 🆘 Need Help?

- **Quick Auth Setup**: `CLERK-QUICKSTART.md`
- **Full Auth Guide**: `CLERK-SETUP.md`
- **Project Guide**: `START-HERE.md`
- **Clerk Docs**: https://clerk.com/docs/nextjs

---

**Ready to code!** 🎉
