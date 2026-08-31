# Netflix Clone - Full Stack TypeScript Application

A full-stack Netflix clone built with React, TypeScript, Express, and Node.js. This project demonstrates modern web development practices with a responsive UI and RESTful API architecture.

![Netflix Clone](https://img.shields.io/badge/TypeScript-100%25-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Features

- **Modern Tech Stack**: React 18 + TypeScript + Vite for blazing-fast development
- **Backend API**: Express + TypeScript REST API
- **Responsive Design**: Mobile-first design that works on all devices
- **Movie Browsing**: Browse movies by categories
- **Dynamic Content**: Hero section with featured content
- **Smooth Animations**: Card hover effects and transitions
- **Type Safety**: Full TypeScript implementation across frontend and backend

## 📦 Project Structure

```
netflix/
├── client/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API integration
│   │   ├── types/         # TypeScript types
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── server/                # Express + TypeScript backend
│   ├── src/
│   │   ├── data/         # Mock data
│   │   ├── routes/       # API routes
│   │   ├── types/        # TypeScript types
│   │   └── index.ts      # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── package.json          # Root package.json for scripts
└── README.md

```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling with custom properties

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd netflix
```

### 2. Install dependencies

Install dependencies for both client and server:

```bash
npm run install:all
```

Or install individually:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Set up environment variables

#### Server Environment (.env)
Create a `.env` file in the `server` directory:

```bash
cd server
copy .env.example .env
```

Edit the `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

#### Client Environment (.env)
Create a `.env` file in the `client` directory:

```bash
cd client
copy .env.example .env
```

Edit the `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run the application

#### Development Mode (Both services)

Run both client and server concurrently:

```bash
npm run dev
```

This will start:
- **Backend API**: http://localhost:5000
- **Frontend**: http://localhost:5173

#### Run services individually

**Backend only:**
```bash
npm run server:dev
```

**Frontend only:**
```bash
npm run client:dev
```

### 5. Build for production

Build both client and server:

```bash
npm run build
```

Or build individually:

```bash
# Build server
npm run server:build

# Build client
npm run client:build
```

### 6. Start production server

```bash
npm start
```

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/movies/hero` | Get hero content |
| GET | `/movies/categories` | Get all categories with movies |
| GET | `/movies/categories/:id` | Get specific category by ID |
| GET | `/movies` | Get all movies |
| GET | `/movies/:id` | Get specific movie by ID |
| GET | `/movies/search?q=query` | Search movies by title |
| GET | `/health` | Health check endpoint |

### Example Response

**GET /api/movies/hero**
```json
{
  "id": "hero-1",
  "title": "Ember & Static",
  "description": "When a small-town radio host starts picking up signals...",
  "tag": "N-CLONE ORIGINAL",
  "imageUrl": "https://source.unsplash.com/...",
  "rating": 98,
  "year": 2026,
  "maturityRating": "16+",
  "seasons": 3,
  "isHD": true
}
```

## 🎨 Components

### Frontend Components

- **Navbar**: Fixed navigation bar with scroll effect
- **Hero**: Featured content section with play buttons
- **Row**: Horizontal scrolling movie rows
- **MovieCard**: Individual movie card with hover effects
- **Footer**: Site footer with links

### Component Props

```typescript
// Hero Component
interface HeroProps {
  content: HeroContent;
}

// Row Component
interface RowProps {
  category: Category;
}

// MovieCard Component
interface MovieCardProps {
  movie: Movie;
}
```

## 📝 Available Scripts

### Root Level

| Script | Description |
|--------|-------------|
| `npm run install:all` | Install all dependencies |
| `npm run dev` | Run both client and server in dev mode |
| `npm run build` | Build both client and server |
| `npm start` | Start production server |
| `npm run server:dev` | Run server in dev mode |
| `npm run client:dev` | Run client in dev mode |

### Server Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start server with nodemon |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |

### Client Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🔧 Configuration Files

- **`tsconfig.json`**: TypeScript configuration
- **`vite.config.ts`**: Vite configuration
- **`.env`**: Environment variables
- **`package.json`**: Dependencies and scripts

## 🎯 Future Enhancements

- [ ] User authentication and authorization
- [ ] Real database integration (PostgreSQL/MongoDB)
- [ ] Video player functionality
- [ ] User profiles and preferences
- [ ] Watchlist and favorites
- [ ] Search functionality with filters
- [ ] Recommendation engine
- [ ] Admin panel for content management
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 🐛 Troubleshooting

### Port already in use

If port 5000 or 5173 is already in use:

**Change server port:**
Edit `server/.env`:
```env
PORT=5001
```

**Change client port:**
Edit `client/vite.config.ts`:
```typescript
server: {
  port: 5174,
}
```

### CORS errors

Ensure the `CLIENT_URL` in `server/.env` matches your frontend URL.

### API connection failed

1. Check if the backend is running on http://localhost:5000
2. Verify `VITE_API_URL` in `client/.env`
3. Check browser console for error messages

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspired by Netflix
- Built for educational purposes
- Not affiliated with Netflix Inc.

## 👤 Author

Built with ❤️ as a learning project

---

**Note**: This is a practice clone project built for learning purposes and is not affiliated with Netflix.
