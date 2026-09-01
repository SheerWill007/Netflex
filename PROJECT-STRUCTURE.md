# Project Structure

Complete overview of the Netflix Clone full-stack TypeScript project.

## 📁 Directory Structure

```
netflix/
│
├── 📄 Root Configuration Files
│   ├── package.json                 # Root package.json with scripts
│   ├── .gitignore                   # Git ignore rules
│   ├── LICENSE                      # MIT License
│   ├── README.md                    # Main documentation
│   ├── SETUP.md                     # Detailed setup guide
│   ├── QUICKSTART.md               # Quick start guide
│   ├── CONTRIBUTING.md             # Contribution guidelines
│   └── PROJECT-STRUCTURE.md        # This file
│
├── 🚀 Quick Start Scripts (Windows)
│   ├── install.bat                  # Install all dependencies
│   ├── start-dev.bat               # Start both services
│   ├── start-server.bat            # Start backend only
│   └── start-client.bat            # Start frontend only
│
├── 🖥️ SERVER (Backend - Express + TypeScript)
│   ├── src/
│   │   ├── data/
│   │   │   └── movies.ts           # Mock movie data
│   │   ├── routes/
│   │   │   └── movies.ts           # Movie API routes
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript type definitions
│   │   └── index.ts                # Server entry point
│   │
│   ├── dist/                       # Compiled JavaScript (generated)
│   ├── node_modules/               # Server dependencies (generated)
│   │
│   ├── .env                        # Environment variables
│   ├── .env.example                # Example environment file
│   ├── package.json                # Server dependencies & scripts
│   ├── tsconfig.json               # TypeScript configuration
│   └── nodemon.json                # Nodemon configuration
│
└── 💻 CLIENT (Frontend - React + TypeScript + Vite)
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.tsx          # Navigation bar component
    │   │   ├── Navbar.css          # Navbar styles
    │   │   ├── Hero.tsx            # Hero section component
    │   │   ├── Hero.css            # Hero styles
    │   │   ├── Row.tsx             # Movie row component
    │   │   ├── Row.css             # Row styles
    │   │   ├── MovieCard.tsx       # Movie card component
    │   │   ├── MovieCard.css       # Card styles
    │   │   ├── Footer.tsx          # Footer component
    │   │   └── Footer.css          # Footer styles
    │   │
    │   ├── services/
    │   │   └── api.ts              # API integration service
    │   │
    │   ├── types/
    │   │   └── index.ts            # TypeScript type definitions
    │   │
    │   ├── App.tsx                 # Main app component
    │   ├── App.css                 # App styles
    │   ├── main.tsx                # React entry point
    │   ├── index.css               # Global styles
    │   └── vite-env.d.ts           # Vite type declarations
    │
    ├── dist/                       # Production build (generated)
    ├── node_modules/               # Client dependencies (generated)
    │
    ├── .env                        # Environment variables
    ├── .env.example                # Example environment file
    ├── .eslintrc.cjs               # ESLint configuration
    ├── index.html                  # HTML entry point
    ├── package.json                # Client dependencies & scripts
    ├── tsconfig.json               # TypeScript configuration
    ├── tsconfig.node.json          # Node TypeScript config
    └── vite.config.ts              # Vite configuration
```

## 🗂️ File Descriptions

### Root Level

| File | Purpose |
|------|---------|
| `package.json` | Root scripts to manage both client and server |
| `.gitignore` | Specifies intentionally untracked files |
| `LICENSE` | MIT License for the project |
| `README.md` | Main project documentation |
| `SETUP.md` | Detailed installation and setup guide |
| `QUICKSTART.md` | Quick start guide for beginners |
| `CONTRIBUTING.md` | Guidelines for contributing |
| `PROJECT-STRUCTURE.md` | This file - project structure overview |

### Server Files

#### Configuration
- **`.env`**: Environment variables (PORT, NODE_ENV, CLIENT_URL)
- **`package.json`**: Dependencies and npm scripts
- **`tsconfig.json`**: TypeScript compiler options
- **`nodemon.json`**: Nodemon watch configuration

#### Source Code (`src/`)
- **`index.ts`**: Express server setup, middleware, routes
- **`routes/movies.ts`**: API endpoints for movies
- **`data/movies.ts`**: Mock movie data and categories
- **`types/index.ts`**: TypeScript interfaces (Movie, Category, HeroContent)

### Client Files

#### Configuration
- **`.env`**: Environment variables (VITE_API_URL)
- **`package.json`**: Dependencies and npm scripts
- **`tsconfig.json`**: TypeScript compiler options
- **`vite.config.ts`**: Vite build tool configuration
- **`.eslintrc.cjs`**: ESLint code quality rules
- **`index.html`**: HTML template

#### Source Code (`src/`)
- **`main.tsx`**: React app initialization
- **`App.tsx`**: Main application component
- **`index.css`**: Global CSS variables and resets
- **`App.css`**: App-level styles

#### Components (`src/components/`)
- **`Navbar.tsx/css`**: Fixed navigation with scroll effect
- **`Hero.tsx/css`**: Featured content hero section
- **`Row.tsx/css`**: Horizontal scrolling movie rows
- **`MovieCard.tsx/css`**: Individual movie cards with hover
- **`Footer.tsx/css`**: Site footer

#### Services (`src/services/`)
- **`api.ts`**: Axios HTTP client for API calls

#### Types (`src/types/`)
- **`index.ts`**: Shared TypeScript interfaces

## 📊 Component Hierarchy

```
App
├── Navbar
├── Hero
│   └── HeroContent
├── main.rows
│   └── Row (multiple)
│       └── MovieCard (multiple)
└── Footer
```

## 🔄 Data Flow

```
User Browser
    ↓
React Components (Client)
    ↓
API Service (axios)
    ↓
Express Routes (Server)
    ↓
Movie Data (Mock Data)
    ↓
Response JSON
    ↓
React State Update
    ↓
UI Re-render
```

## 🎯 Key Technologies by Layer

### Frontend (Client)
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Axios**: HTTP client
- **CSS3**: Styling with custom properties

### Backend (Server)
- **Node.js**: Runtime environment
- **Express**: Web framework
- **TypeScript**: Type safety
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment configuration

### Development Tools
- **ESLint**: Code linting
- **Nodemon**: Auto-restart on changes
- **ts-node**: TypeScript execution
- **Concurrently**: Run multiple scripts

## 📝 Configuration Files Explained

### TypeScript Configuration

**Server (`server/tsconfig.json`)**
```json
{
  "target": "ES2020",        // JavaScript version
  "module": "commonjs",      // CommonJS for Node.js
  "outDir": "./dist",        // Output directory
  "strict": true             // Strict type checking
}
```

**Client (`client/tsconfig.json`)**
```json
{
  "target": "ES2020",        // JavaScript version
  "module": "ESNext",        // ES modules
  "jsx": "react-jsx",        // React JSX support
  "strict": true             // Strict type checking
}
```

### Vite Configuration

**(`client/vite.config.ts`)**
```typescript
{
  plugins: [react()],        // React plugin
  server: {
    port: 5173,             // Dev server port
    proxy: {                // API proxy
      '/api': 'http://localhost:5000'
    }
  }
}
```

### Environment Variables

**Server (`.env`)**
```env
PORT=5000                   # Server port
NODE_ENV=development        # Environment
CLIENT_URL=http://localhost:5173  # CORS origin
```

**Client (`.env`)**
```env
VITE_API_URL=http://localhost:5000/api  # API endpoint
```

## 🚀 NPM Scripts Reference

### Root Scripts
```bash
npm run install:all    # Install all dependencies
npm run dev           # Run both client and server
npm run build         # Build both for production
npm run server:dev    # Run server only
npm run client:dev    # Run client only
```

### Server Scripts
```bash
npm run dev          # Development with hot reload
npm run build        # Compile TypeScript
npm start            # Run production server
```

### Client Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📦 Dependencies Overview

### Server Dependencies
- `express`: Web framework
- `cors`: CORS middleware
- `dotenv`: Environment variables

### Server Dev Dependencies
- `typescript`: TypeScript compiler
- `@types/express`: Express type definitions
- `@types/node`: Node.js type definitions
- `nodemon`: Auto-restart
- `ts-node`: TypeScript execution

### Client Dependencies
- `react`: UI library
- `react-dom`: React DOM renderer
- `axios`: HTTP client

### Client Dev Dependencies
- `typescript`: TypeScript compiler
- `@vitejs/plugin-react`: Vite React plugin
- `vite`: Build tool
- `eslint`: Linting
- Various type definitions

## 🎨 CSS Architecture

### Global Styles (`index.css`)
- CSS custom properties (variables)
- Reset styles
- Base typography

### Component Styles
Each component has its own CSS file:
- Scoped to component
- Uses CSS custom properties
- Responsive breakpoints
- Hover/transition effects

### CSS Variables
```css
--bg: #141414           /* Background */
--red: #e50914          /* Netflix red */
--text: #ffffff         /* Primary text */
--text-dim: #b3b3b3     /* Dimmed text */
```

## 🔐 Type Safety

Shared types between client and server:

```typescript
interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
  // ... more fields
}
```

Both client and server use the same interfaces for consistency.

## 📈 Future Structure Considerations

As the project grows, consider:

```
server/src/
├── controllers/     # Business logic
├── middleware/      # Custom middleware
├── models/         # Database models
├── services/       # Business services
└── utils/          # Helper functions

client/src/
├── hooks/          # Custom React hooks
├── contexts/       # React contexts
├── pages/          # Page components
└── utils/          # Helper functions
```

## 🔍 Finding Files Quickly

**Need to modify...**
- **Movie data**: `server/src/data/movies.ts`
- **API routes**: `server/src/routes/movies.ts`
- **Server config**: `server/src/index.ts`
- **Component styles**: `client/src/components/*.css`
- **API calls**: `client/src/services/api.ts`
- **Type definitions**: `*/src/types/index.ts`

---

This structure provides a clean separation of concerns and is ready for scaling!
