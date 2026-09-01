# Visual Project Guide - Netflix Clone

A visual representation of your restructured full-stack Netflix Clone.

---

## Project Layout (Bird's Eye View)

```
netflix/                                       ROOT PROJECT FOLDER
│
├── PUBLIC ASSETS (Static Files - NEW)
│   │
│   └── public/                                Shared by client via Vite
│       ├── netflix.png                        ADD YOUR LOGO HERE
│       ├── images/                            More static images
│       ├── manifest.json                      PWA config
│       ├── robots.txt                         SEO
│       ├── _redirects                         Netlify
│       ├── .htaccess                          Apache
│       ├── README.md                          Public docs
│       └── HOW-TO-ADD-LOGO.md                 Logo guide
│
├── FRONTEND (React + TypeScript)
│   │
│   └── client/
│       ├── src/
│       │   ├── components/                    React components
│       │   │   ├── Navbar.tsx & .css
│       │   │   ├── Hero.tsx & .css
│       │   │   ├── Row.tsx & .css
│       │   │   ├── MovieCard.tsx & .css
│       │   │   └── Footer.tsx & .css
│       │   │
│       │   ├── services/
│       │   │   └── api.ts                     API calls
│       │   │
│       │   ├── types/
│       │   │   └── index.ts                   TypeScript types
│       │   │
│       │   ├── App.tsx                        Main component
│       │   ├── App.css                        App styles
│       │   ├── main.tsx                       Entry point
│       │   └── index.css                      Global styles
│       │
│       ├── index.html                         HTML (uses /netflix.png)
│       ├── package.json                       Dependencies
│       ├── tsconfig.json                      TypeScript config
│       ├── vite.config.ts                     Vite + public dir
│       ├── .env                               Environment vars
│       └── .eslintrc.cjs                      Linting rules
│
├── BACKEND (Express + TypeScript - Restructured)
│   │
│   └── server/
│       ├── src/
│       │   │
│       │   ├── config/                        NEW: Configuration
│       │   │   └── constants.ts               App constants
│       │   │
│       │   ├── controllers/                   NEW: Business logic
│       │   │   └── movieController.ts         Movie operations
│       │   │
│       │   ├── utils/                         NEW: Utilities
│       │   │   ├── logger.ts                  Color logging
│       │   │   └── errorHandler.ts            Error handling
│       │   │
│       │   ├── data/
│       │   │   └── movies.ts                  90+ movies dataset
│       │   │
│       │   ├── lib/
│       │   │   └── movies.ts                  Movie utilities
│       │   │
│       │   ├── middleware/
│       │   │   └── auth.ts                    Auth middleware
│       │   │
│       │   ├── routes/
│       │   │   ├── movies.ts                  Movie endpoints
│       │   │   ├── auth.ts                    Auth endpoints
│       │   │   └── watchlist.ts               Watchlist endpoints
│       │   │
│       │   ├── store/
│       │   │   └── db.ts                      In-memory DB
│       │   │
│       │   ├── types/
│       │   │   └── index.ts                   TypeScript types
│       │   │
│       │   └── index.ts                       UPDATED: Server entry
│       │
│       ├── package.json                       Dependencies
│       ├── tsconfig.json                      TypeScript config
│       ├── nodemon.json                       Dev config
│       └── .env                               Environment vars
│
├── DOCUMENTATION (Comprehensive)
│   ├── README.md                              Main documentation
│   ├── QUICKSTART.md                          5-minute setup
│   ├── SETUP.md                               Detailed setup
│   ├── GET-STARTED.md                         Getting started
│   ├── CONTRIBUTING.md                        Contribution guide
│   ├── PROJECT-STRUCTURE.md                   Structure details
│   ├── RESTRUCTURE-SUMMARY.md                 What changed
│   └── VISUAL-GUIDE.md                        This file
│
├── HELPER SCRIPTS (Windows)
│   ├── install.bat                            Install all
│   ├── start-dev.bat                          Start both
│   ├── start-server.bat                       Backend only
│   └── start-client.bat                       Frontend only
│
└── CONFIGURATION (Root Level)
    ├── package.json                           Root scripts
    ├── .gitignore                             Git ignore
    └── LICENSE                                MIT License
```

---

## Request Flow Diagram

```
+-------------------------------------------------------------------+
|                          USER'S BROWSER                            |
+-------------------------------------------------------------------+
                                 |
                    +------------+------------+
                    |                         |
            Request for:                Request for:
            STATIC ASSETS              DYNAMIC CONTENT
                    |                         |
                    v                         v
        +----------------------+   +-----------------------+
        |    PUBLIC FOLDER     |   |   REACT APP (Vite)    |
        |   /public/*.png      |   |  client/src/**/*.tsx  |
        |   Served directly    |   |                       |
        +----------------------+   +-----------+-----------+
                                                |
                                       Needs API data?
                                                |
                                                v
                                 +--------------------------+
                                 |     API SERVICE          |
                                 |  services/api.ts         |
                                 |  axios HTTP calls        |
                                 +-------------+-------------+
                                               |
                                      HTTP Request
                                      to /api/*
                                               |
                                               v
                           +----------------------------------+
                           |     EXPRESS SERVER                |
                           |    server/src/index.ts            |
                           +-------------+----------------------+
                                         |
                              Routes to appropriate endpoint
                                         |
                                         v
                              +--------------------+
                              |   ROUTES           |
                              | /api/movies/*      |
                              +---------+-----------+
                                        |
                              Calls controller
                                        |
                                        v
                              +--------------------+
                              |  CONTROLLERS       |
                              | Business Logic     |
                              +---------+-----------+
                                        |
                              Fetches from data layer
                                        |
                                        v
                              +--------------------+
                              |   DATA LAYER       |
                              |  Mock Movie Data   |
                              +---------+-----------+
                                        |
                              Returns JSON
                                        |
                                        v
                              Back through all layers
                                        |
                                        v
                                +----------------+
                                | BROWSER        |
                                | React updates  |
                                | UI re-renders  |
                                +----------------+
```

---

## Key File Relationships

### 1. Static Assets Flow
```
public/netflix.png
    -> (referenced in)
client/index.html
    <link rel="icon" href="/netflix.png" />
    -> (served by)
Vite Dev Server (configured in vite.config.ts)
    publicDir: '../public'
    -> (appears in)
Browser Tab (as favicon)
```

### 2. API Request Flow
```
User clicks on movie card
    ->
MovieCard.tsx component
    ->
services/api.ts
    fetchMovieById(id)
    ->
HTTP GET /api/movies/:id
    ->
server/routes/movies.ts
    router.get('/:id', getMovieById)
    ->
server/controllers/movieController.ts
    getMovieById function
    ->
server/data/movies.ts
    Find movie in data
    ->
Return JSON response
    ->
api.ts receives data
    ->
MovieCard component updates
    ->
UI shows movie details
```

### 3. Component Structure
```
App.tsx (Main container)
├── Navbar.tsx (Navigation)
├── Hero.tsx (Featured content)
│   └── Uses: heroContent from API
├── main.rows
│   └── Row.tsx (x9 categories)
│       └── MovieCard.tsx (multiple per row)
│           └── Uses: movie data from API
└── Footer.tsx (Site footer)
```

---

## File Size and Organization

### Small Files (Configuration)
```
Configuration files (< 1 KB each)
├── .env
├── .eslintrc.cjs
├── tsconfig.json
├── vite.config.ts
└── nodemon.json
```

### Medium Files (Logic)
```
Source code files (1-10 KB each)
├── components/*.tsx
├── routes/*.ts
├── controllers/*.ts
└── services/*.ts
```

### Large Files (Data)
```
Data and dependencies (> 10 KB)
├── movies.ts (90+ movies)
├── package-lock.json
└── node_modules/ (many MB)
```

---

## Organization by Purpose

```
PUBLIC ASSETS     - Static files (images, manifests)
FRONTEND          - User interface (React)
BACKEND           - Server logic (Express)
DOCUMENTATION     - Guides and README files
HELPER SCRIPTS    - Quick command shortcuts
CONFIGURATION     - Setup and config files
```

---

## Finding What You Need

### "I want to..."

**Add an image**
`/public/images/yourimage.png`

**Change the logo**
`/public/netflix.png`

**Edit a React component**
`/client/src/components/ComponentName.tsx`

**Modify styling**
`/client/src/components/ComponentName.css`

**Add movie data**
`/server/src/data/movies.ts`

**Create an API endpoint**
`/server/src/routes/*.ts` + `/server/src/controllers/*.ts`

**Change server configuration**
`/server/src/config/constants.ts`

**Fix API calls**
`/client/src/services/api.ts`

**Update types**
`*/src/types/index.ts`

**Modify environment**
`*/.env`

---

## Development vs. Production

### Development (npm run dev)
```
Frontend: http://localhost:5173
    Vite Dev Server
    ├── Hot Module Replacement (HMR)
    ├── Serves from /client/src/
    └── Public assets from /public/

Backend: http://localhost:5000
    Express Server
    ├── Nodemon auto-restart
    ├── TypeScript via ts-node
    └── API endpoints at /api/*
```

### Production (npm run build + npm start)
```
Built Frontend: /client/dist/
    ├── Optimized bundles
    ├── Minified code
    └── Public assets copied

Backend: Compiled to /server/dist/
    ├── JavaScript (from TypeScript)
    ├── Optimized for Node.js
    └── Serves static frontend + API
```

---

## Verification Points

### 1. Public Folder
```
[ ] public/ folder exists at root
[ ] public/netflix.png placeholder exists
[ ] public/README.md explains usage
[ ] public/HOW-TO-ADD-LOGO.md has instructions
```

### 2. Server Structure
```
[ ] server/src/config/ folder exists
[ ] server/src/controllers/ folder exists
[ ] server/src/utils/ folder exists
[ ] server/src/index.ts imports new modules
```

### 3. Client Updates
```
[ ] client/index.html references /netflix.png
[ ] client/vite.config.ts has publicDir: '../public'
[ ] client/tsconfig.json has path aliases
```

### 4. Documentation
```
[ ] All README files present
[ ] PROJECT-STRUCTURE.md updated
[ ] RESTRUCTURE-SUMMARY.md explains changes
[ ] VISUAL-GUIDE.md (this file) provides overview
```

---

## What's Different from the Original

### Added
- Public folder at root
- Server controllers directory
- Server utils directory
- Server config directory
- Enhanced logging
- Better error handling
- Path aliases in client
- Comprehensive documentation
- Helper batch scripts

### Changed
- server/src/index.ts - Uses new modules
- client/vite.config.ts - References public dir
- client/index.html - Uses netflix.png favicon
- client/tsconfig.json - Path aliases added

### Kept
- All React components
- All API routes
- All movie data
- All functionality
- All npm scripts

---

## Quick Actions

### Start Development
```
Double-click: start-dev.bat
    OR
Run: npm run dev
```

### Add Your Logo
```
1. Create or download a 64x64px PNG
2. Name it: netflix.png
3. Place in: /public/netflix.png
4. Refresh browser
```

### Deploy to Production
```
npm run build
npm start
```

---

## Need More Help?

- **Overview**: This file (VISUAL-GUIDE.md)
- **Structure**: PROJECT-STRUCTURE.md
- **Changes**: RESTRUCTURE-SUMMARY.md
- **Quick Start**: QUICKSTART.md
- **Setup**: SETUP.md
- **Full Docs**: README.md

---