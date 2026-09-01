# Clerk Authentication - Quick Start

## 🚀 3 Steps to Enable Auth

### Step 1: Install Dependencies
```powershell
cd client
npm install
```

### Step 2: Get Clerk Keys

1. Go to: https://dashboard.clerk.com/
2. Select app: `app_3IipyaTC3BNZrVEcDFovhAPWBss`
3. Copy **Publishable Key** and **Secret Key**

### Step 3: Add Keys to Environment

Edit `client/.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here
```

**Save and restart server!**

## ✅ Test It

1. Start app: `npm run dev`
2. Open: http://localhost:3000
3. Click **"Sign Up"** in navbar
4. Create account
5. See your profile button! ✨

## 🎯 Where to Find Keys

**Clerk Dashboard** → **API Keys** section:
- Copy: **Publishable Key** → starts with `pk_test_`
- Copy: **Secret Key** → starts with `sk_test_`

## 📚 Full Guide

See `CLERK-SETUP.md` for:
- Detailed setup
- Customization options
- Troubleshooting
- Using auth in your code

## 🔒 Security Note

⚠️ **NEVER** commit secret keys to git!
✅ `.env.local` is already in `.gitignore`

---

**That's it!** Your Netflex now has authentication! 🎉
