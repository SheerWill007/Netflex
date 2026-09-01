# Clerk Authentication Setup Guide

## 🔐 Overview

Your Netflix Clone now has Clerk authentication integrated! Follow these steps to complete the setup.

## 📋 What's Been Added

✅ **@clerk/nextjs** package added to dependencies
✅ **ClerkProvider** wrapping the app in layout.tsx
✅ **Middleware** for route protection
✅ **Sign In/Sign Up buttons** in Navbar (when signed out)
✅ **UserButton** in Navbar (when signed in)
✅ **Environment variables** configured

## 🚀 Setup Steps

### Step 1: Install Dependencies

```powershell
cd client
npm install
```

This will install `@clerk/nextjs` that was added to package.json.

### Step 2: Get Your Clerk Keys

1. **Go to Clerk Dashboard**: https://dashboard.clerk.com/
2. **Select your application**: `app_3IipyaTC3BNZrVEcDFovhAPWBss`
3. **Go to API Keys** section
4. **Copy your keys**:
   - **Publishable Key** (starts with `pk_test_...` or `pk_live_...`)
   - **Secret Key** (starts with `sk_test_...` or `sk_live_...`)

### Step 3: Update Environment Variables

Edit `client/.env.local` and replace the placeholder keys:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Clerk Authentication - REPLACE THESE!
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_key_here

# Clerk URLs (already configured)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

**⚠️ IMPORTANT:**
- Never commit `.env.local` to git (it's already in .gitignore)
- The Secret Key should NEVER be exposed in client-side code
- Update `.env.example` with placeholder keys for other developers

### Step 4: Configure Clerk Application

In your Clerk Dashboard:

1. **Set Allowed URLs**:
   - **Development**: `http://localhost:3000`
   - **Production**: Your deployed URL

2. **Configure Sign-in/Sign-up Options**:
   - Email + Password (recommended)
   - Social logins (Google, GitHub, etc.)
   - Phone number (optional)

3. **Customize Appearance** (optional):
   - Match Netflix theme colors
   - Upload logo
   - Customize button styles

### Step 5: Start the Application

```powershell
# From root directory
npm run dev
```

Or:
```
Double-click: start-dev.bat
```

### Step 6: Test Authentication

1. **Open**: http://localhost:3000
2. **Click "Sign Up"** in the top-right navbar
3. **Create an account** with your email
4. **Verify** you see a user button (your profile picture)
5. **Click the user button** to see:
   - Manage account
   - Sign out
   - Other options

## 🎨 What's Integrated

### Navbar Components

The Navbar now includes:

**When Signed Out:**
- "Sign In" button (opens Clerk modal)
- "Sign Up" button (opens Clerk modal, red Netflix style)

**When Signed In:**
- User profile button (Clerk UserButton)
- Manage account dropdown
- Sign out option

### Middleware Protection

The middleware (`client/src/middleware.ts`) protects routes:

```typescript
// Public routes (no auth required)
- / (home page)
- /sign-in
- /sign-up
- /api/* (API routes)

// Protected routes (auth required)
- All other routes require sign-in
```

### Layout Integration

`ClerkProvider` wraps the entire app in `app/layout.tsx`:

```tsx
<ClerkProvider>
  <html>
    <body>{children}</body>
  </html>
</ClerkProvider>
```

## 🔧 Configuration Files

### 1. client/package.json
Added `@clerk/nextjs` dependency

### 2. client/src/app/layout.tsx
Wrapped app with `ClerkProvider`

### 3. client/src/middleware.ts
Route protection and Clerk middleware

### 4. client/src/components/Navbar.tsx
Added Clerk authentication components

### 5. client/.env.local
Clerk environment variables

## 🎯 Using Clerk in Your Code

### Check if User is Signed In

```tsx
import { SignedIn, SignedOut } from '@clerk/nextjs';

<SignedIn>
  <p>You are signed in!</p>
</SignedIn>

<SignedOut>
  <p>Please sign in</p>
</SignedOut>
```

### Get Current User

```tsx
'use client';
import { useUser } from '@clerk/nextjs';

export default function Profile() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  
  if (!isSignedIn) return <div>Not signed in</div>;

  return <div>Hello {user.firstName}!</div>;
}
```

### Server-Side Auth

```tsx
import { auth } from '@clerk/nextjs/server';

export default async function ProtectedPage() {
  const { userId } = await auth();
  
  if (!userId) {
    return <div>Please sign in</div>;
  }

  return <div>Your user ID: {userId}</div>;
}
```

## 🚨 Troubleshooting

### Issue: "Clerk keys not found"

**Solution**: Make sure you've:
1. Copied keys from Clerk Dashboard
2. Pasted them in `client/.env.local`
3. Restarted the dev server

### Issue: Sign-in modal doesn't appear

**Solution**:
1. Check browser console for errors
2. Verify `@clerk/nextjs` is installed: `cd client && npm list @clerk/nextjs`
3. Clear Next.js cache: `cd client && Remove-Item -Recurse -Force .next`

### Issue: CORS errors

**Solution**:
In Clerk Dashboard → Settings → Allowed Origins, add:
- `http://localhost:3000`
- Your production domain

### Issue: Middleware not working

**Solution**:
1. Verify `client/src/middleware.ts` exists
2. Check the `config.matcher` includes `'/__clerk/:path*'`
3. Restart dev server

## 📚 Next Steps

### Immediate
1. ✅ Get Clerk keys from dashboard
2. ✅ Update `.env.local`
3. ✅ Install dependencies (`npm install`)
4. ✅ Test sign-up flow

### Recommended
1. **Add User Profile Page**: Create `/profile` route
2. **Protect Routes**: Add more protected routes
3. **Customize Appearance**: Match Netflix branding
4. **Add Organizations**: For multi-user features
5. **Set Up Webhooks**: Sync users with your database

### Advanced
- **Custom Session Claims**: Add custom data to user sessions
- **Multi-factor Authentication**: Enable 2FA
- **Social Logins**: Add Google, GitHub, etc.
- **Email Templates**: Customize Clerk emails

## 🔗 Resources

- **Clerk Docs**: https://clerk.com/docs/nextjs
- **Dashboard**: https://dashboard.clerk.com/
- **Components**: https://clerk.com/docs/components/overview
- **Customization**: https://clerk.com/docs/customization/overview

## ✅ Verification Checklist

- [ ] Dependencies installed
- [ ] Clerk keys added to `.env.local`
- [ ] Dev server running
- [ ] Sign Up button visible on homepage
- [ ] Sign up flow works
- [ ] User button appears after sign-up
- [ ] Can sign out
- [ ] Can sign in again

Once all checked, you're ready! 🎉

## 🎬 Using with Your Backend

To protect your Express API routes with Clerk:

1. Install in server: `npm install @clerk/express`
2. Add middleware to protect routes
3. Verify JWT tokens from frontend

See: https://clerk.com/docs/backend-requests/overview

---

**Need help?** Check the Clerk documentation or reach out to support!
