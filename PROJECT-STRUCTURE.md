# Project Structure - Netflix Clone

Complete overview of the restructured full-stack TypeScript project.

## 📁 New Directory Structure

```
netflix/
│
├── 📂 public/                       # Static assets (NEW!)
│   ├── images/                     # Static images
│   ├── netflix.png                 # Favicon (Netflix logo)
│   ├── manifest.json               # PWA manifest
│   ├── robots.txt                  # SEO robots file
│   ├── _redirects                  # Netlify redirects
│   ├── .htaccess                   # Apache configuration
│   └── README.md                   # Public folder documentation
│
├── 📂 client/                       # React Frontend
│   ├── src/
│   │   ├── components/             # React components
│   │   │   ├── Navbar.tsx / .css
│   │   │   ├── Hero.tsx / .css
│   │   │   ├── Row.tsx / .css
│   │   │   ├── MovieCard.tsx / .css
│   │   │   └── Footer.tsx / .css
│   │   ├── services/
│   │   │   └── api.ts              # API integration
│   │   ├── types/
│   │   │   └── index.ts            # Type definitions
│   │   ├── App.tsx                 # Main app component
│   │   ├── App.css                 # App styles
│   │   ├── main.tsx                # React entry point
│   │   ├── index.css               # Global styles
│   │   └── vite-env.d.ts           # Vite types
│   │
│   ├── .env                        # Environment variables
│   ├── .env.example                # Env example
│   ├── .eslintrc.cjs               # ESLint config
│   ├── index.html                  # HTML entry (updated with favicon)
│   ├── package.json                # Dependencies
│   ├── tsconfig.json               # TypeScript config (with path aliases)
│   ├── tsconfig.node.json          # Node TS config
│   └── vite.config.ts              # Vite config (with public dir)
│
├── 📂 server/                       # Express Backend (Restructured!)
│   ├── src/
│   │   ├── config/                 # Configuration (NEW!)
│   │   │   └── constants.ts        # App constants
│   │   │
│   │   ├── controllers/            # Business logic (NEW!)
│   │   │   └── movieController.ts  # Movie operations
│   │   │
│   │   ├── data/                   # Mock data
│   │   │   └── movies.ts           # Movie dataset
│   │   │
│   │   ├── lib/                    # Library functions
│   │   │   └── movies.ts           # Movie utilities
│   │   │
│   │   ├── middleware/             # Custom middleware
│   │   │   └── auth.ts             # Auth middleware
│   │   │
│   │   ├── routes/                 # API routes
│   │   │   ├── movies.ts           # Movie endpoints
│   │   │   ├── auth.ts             # Auth endpoints
│   │   │   └── watchlist.ts        # Watchlist endpoints
│   │   │
│   │   ├── store/                  # Data store
│   │   │   └── db.ts               # In-memory database
│   │   │
│   │   ├── types/                  # Type definitions
│   │   │   └── index.ts            # Shared types
│   │   │
│   │   ├── utils/                  # Utility functions (NEW!)
│   │   │   ├── errorHandler.ts    # Error handling
│   │   │   └── logger.ts           # Logging utility
│   │   │
│   │   └── index.ts                # Server entry (updated)
│   │
│   ├── dist/                       # Compiled JS (generated)
│   ├── .env                        # Environment variables
│   ├── .env.example                # Env example
│   ├── package.json                # Dependencies
│   ├── tsconfig.json               # TypeScript config
│   └── nodemon.json                # Nodemon config
│
├── 📄 Configuration Files
│   ├── package.json                # Root package.json
│   ├── .gitignore                  # Git ignore rules
│   └── LICENSE                     # MIT License
│
├── 📚 Documentation
│   ├── README.md                   # Main documentation
│   ├── SETUP.md                    # Setup guide
│   ├── QUICKSTART.md              # Quick start
│   ├── GET-STARTED.md             # Getting started
│   ├── CONTRIBUTING.md            # Contributing guide
│   └── PROJECT-STRUCTURE.md       # This file
│
└── 🚀 Helper Scripts (Windows)
    ├── install.bat                 # Install dependencies
    ├── start-dev.bat              # Start both services
    ├── start-server.bat           # Start backend only
    └── start-client.bat           # Start frontend only
```

## 🎯 Key Improvements

### 1. Public Folder (NEW!)
- **Location**: `/public/` at root level
- **Purpose**: Static assets served by Vite
- **Contents**:
  - `netflix.png` - Favicon
  - `manifest.json` - PWA manifest
  - `robots.txt` - SEO
  - `.htaccess` - Apache config
  - `_redirects` - Netlify config

### 2. Server Restructure
- ✅ **controllers/** - Separated business logic
- ✅ **config/** - Centralized configuration
- ✅ **utils/** - Utility functions (logger, error handler)
- ✅ **Improved error handling** - Custom error classes
- ✅ **Better logging** - Color-coded console logs

### 3. Client Updates
- ✅ **Path aliases** - Use `@/`, `@components/`, `@services/`
- ✅ **Public dir reference** - Vite configured to use `/public/`
- ✅ **Updated HTML** - References `/netflix.png` favicon
- ✅ **Better meta tags** - SEO and PWA ready

## 📦 File Organization by Purpose

### Static Assets
```
public/
├── netflix.png          → Favicon and logo
├── images/             → Additional static images
├── manifest.json       → PWA configuration
├── robots.txt          → Search engine directives
└── _redirects          → SPA routing for deployment
```

### Frontend Components
```
client/src/components/
├── Navbar.tsx/css      → Navigation bar
├── Hero.tsx/css        → Featured content banner
├── Row.tsx/css         → Movie category rows
├── MovieCard.tsx/css   → Individual movie cards
└── Footer.tsx/css      → Site footer
```

### Backend Organization
```
server/src/
├── config/             → Configuration constants
├── controllers/        → Request handlers
├── routes/            → Route definitions
├── data/              → Mock data
├── utils/             → Helper functions
└── types/             → TypeScript types
```

## 🔄 Data Flow

```
Browser Request
    ↓
[Public Assets] → Served directly by Vite
    or
[React Components] → client/src/
    ↓
[API Service] → client/src/services/api.ts
    ↓
[Express Routes] → server/src/routes/
    ↓
[Controllers] → server/src/controllers/
    ↓
[Data Layer] → server/src/data/
    ↓
[Response] → JSON
    ↓
[React State Update]
    ↓
[UI Re-render]
```

## 🎨 Path Aliases (Client)

Configure in `client/tsconfig.json` and `client/vite.config.ts`:

```typescript
// Instead of:
import Navbar from '../../components/Navbar';
import { fetchMovies } from '../../services/api';

// Use:
import Navbar from '@components/Navbar';
import { fetchMovies } from '@services/api';
```

Available aliases:
- `@/*` → `./src/*`
- `@components/*` → `./src/components/*`
- `@services/*` → `./src/services/*`
- `@types/*` → `./src/types/*`

## 🌐 Public Assets Usage

### In HTML
```html
<link rel="icon" href="/netflix.png" />
<link rel="manifest" href="/manifest.json" />
```

### In React/TypeScript
```typescript
<img src="/netflix.png" alt="Netflix" />
<img src="/images/banner.jpg" alt="Banner" />
```

### Build Process
- Development: Served from `/public/` by Vite dev server
- Production: Copied to `dist/` root during build

## 📡 API Structure

### Endpoints
```
GET  /api/health                    → Health check
GET  /api/movies/hero               → Hero content
GET  /api/movies/categories         → All categories
GET  /api/movies/categories/:id     → Specific category
GET  /api/movies                    → All movies
GET  /api/movies/:id                → Specific movie
GET  /api/movies/search?q=query     → Search movies
GET  /api/auth/register             → Register user
POST /api/auth/login                → Login user
GET  /api/watchlist                 → Get user's watchlist
POST /api/watchlist/:movieId        → Add to watchlist
```

### Controller Pattern
```typescript
// routes/movies.ts
router.get('/hero', getHeroContent);

// controllers/movieController.ts
export const getHeroContent = (_req, res) => {
  // Business logic here
};
```

## 🔧 Configuration Files

### Server Configuration
- **`config/constants.ts`** - App-wide constants
- **`.env`** - Environment variables
- **`tsconfig.json`** - TypeScript settings
- **`nodemon.json`** - Dev server settings

### Client Configuration
- **`.env`** - API URL and env vars
- **`tsconfig.json`** - TypeScript + path aliases
- **`vite.config.ts`** - Build tool + public dir
- **`.eslintrc.cjs`** - Code quality rules

## 🛠️ Utility Functions

### Logger (`server/src/utils/logger.ts`)
```typescript
logger.info('Server started');
logger.error('Failed to connect');
logger.success('Operation successful');
logger.warn('Deprecation warning');
```

### Error Handler (`server/src/utils/errorHandler.ts`)
```typescript
throw new AppError(404, 'Not found');

// Catches all async errors
router.get('/', asyncHandler(async (req, res) => {
  // Async code here
}));
```

## 📊 Build Output Structure

### Development
```
http://localhost:5173/
├── /                   → React app (Vite dev server)
├── /netflix.png        → Public assets
└── /src/...           → Hot module replacement

http://localhost:5000/
└── /api/...           → Express API
```

### Production
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── netflix.png         → Public assets copied here
├── manifest.json
└── robots.txt
```

## 🔍 Finding Files Quickly

**Need to modify...**

| What | Where |
|------|-------|
| Favicon | `/public/netflix.png` |
| Static images | `/public/images/` |
| Movie data | `server/src/data/movies.ts` |
| API routes | `server/src/routes/*.ts` |
| Business logic | `server/src/controllers/*.ts` |
| Server config | `server/src/config/constants.ts` |
| Error handling | `server/src/utils/errorHandler.ts` |
| Logging | `server/src/utils/logger.ts` |
| React components | `client/src/components/*.tsx` |
| Component styles | `client/src/components/*.css` |
| API calls | `client/src/services/api.ts` |
| Type definitions | `*/src/types/index.ts` |
| Environment | `*/.env` |

## 🚀 Running the Project

```bash
# Install all dependencies
npm run install:all

# Start both services
npm run dev

# Frontend: http://localhost:5173
# Backend:  http://localhost:5000
```

## ✅ Structure Benefits

1. **Separation of Concerns** - Each folder has a clear purpose
2. **Scalability** - Easy to add new features
3. **Maintainability** - Code is organized and findable
4. **Type Safety** - TypeScript throughout
5. **Best Practices** - Industry-standard structure
6. **SEO Ready** - Proper meta tags and public assets
7. **PWA Ready** - Manifest and favicon configured
8. **Deployment Ready** - .htaccess and _redirects included

---

This structure provides a professional, scalable foundation for your Netflix clone! 🎬
