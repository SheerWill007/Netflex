# Netflix Clone - Full Stack with Next.js 14

A production-ready Netflix clone built with **Next.js 14**, TypeScript, Express, and Node.js. Features Server-Side Rendering, RESTful API, and 90+ movies across 9 categories.

![Netflix Clone](https://img.shields.io/badge/TypeScript-100%25-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![License](https://img.shields.io/badge/license-MIT-green)

> **🎉 Now powered by Next.js 14 with App Router!** See `NEXTJS-MIGRATION.md` for details.

---

## 🚀 Quick Start

```powershell
# 1. Install
npm run install:all

# 2. Start
npm run dev

# 3. Open
http://localhost:3000
```

---

## ✨ Features

- **Next.js 14** - Server-Side Rendering + App Router
- **SEO Optimized** - Better search engine visibility
- **TypeScript** - Full type safety
- **90+ Movies** - Across 9 categories
- **Responsive** - Mobile-first design
- **Fast** - Optimized performance
- **Modern** - Latest React patterns

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with SSR
- **React 18** - UI library
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **CSS3** - Custom properties

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **CORS** - Cross-origin support

---

## 📁 Project Structure

```
netflix/
├── public/              # Static assets + favicon
├── client/              # Next.js 14 frontend
│   ├── src/app/        # App Router
│   ├── src/components/ # React components
│   ├── src/lib/        # API integration
│   └── src/styles/     # CSS files
├── server/              # Express backend
│   ├── src/routes/     # API routes
│   ├── src/controllers/# Business logic
│   └── src/data/       # Movie data
└── docs/                # Documentation
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

**1. Clone & Install**
```powershell
git clone <repo>
cd netflix
npm run install:all
```

**2. Environment Setup**

Client (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Server (`.env`):
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**3. Start Development**
```powershell
npm run dev
```

Services:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

---

## 📝 Scripts

```powershell
# Development
npm run dev              # Both services
npm run client:dev       # Frontend only
npm run server:dev       # Backend only

# Production
npm run build            # Build both
npm start                # Start production

# Maintenance
npm run install:all      # Install all deps
npm run lint             # Check code
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/movies/hero` | Hero content |
| GET | `/api/movies/categories` | All categories |
| GET | `/api/movies/:id` | Specific movie |
| GET | `/api/movies/search?q=` | Search movies |

---

## 🎨 Components

- **Navbar** - Fixed navigation with scroll effect
- **Hero** - Featured content banner
- **Row** - Horizontal movie rows
- **MovieCard** - Individual cards with hover
- **Footer** - Site footer

---

## 📚 Documentation

- **START-HERE.md** - Project overview
- **QUICK-START-NEXTJS.md** - Fast setup
- **NEXTJS-MIGRATION.md** - Next.js details
- **PROJECT-STRUCTURE.md** - File organization
- **SETUP.md** - Detailed installation
- **CONTRIBUTING.md** - Contribution guide

---

## 🎯 Key Features

### Next.js Benefits
- **SSR** - Server-side rendering
- **SEO** - Search engine optimized
- **Performance** - Fast page loads
- **Code Splitting** - Automatic optimization
- **Font Optimization** - Auto-optimized fonts

### Application Features
- Browse 90+ movies
- 9 content categories
- Responsive design
- Hover animations
- Hero banner
- Footer with links

---

## 🔧 Configuration

### Next.js (`next.config.js`)
```javascript
{
  reactStrictMode: true,
  images: {
    domains: ['source.unsplash.com'],
  },
}
```

### TypeScript
Path aliases configured:
```typescript
import Navbar from '@/components/Navbar';
import { fetchMovies } from '@/lib/api';
```

---

## 🐛 Troubleshooting

**Port in use?**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**API not connecting?**
1. Check backend: http://localhost:5000/api/health
2. Verify `.env.local` settings
3. Update `CLIENT_URL` to port 3000

**Build errors?**
```powershell
cd client
Remove-Item -Recurse -Force .next
npm run build
```

---

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import on Vercel
3. Set `NEXT_PUBLIC_API_URL`
4. Deploy

### Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean
- Self-hosted

---

## 🎯 Future Enhancements

- [ ] User authentication
- [ ] Database integration
- [ ] Video player
- [ ] User profiles
- [ ] Watchlist feature
- [ ] Search with filters
- [ ] Recommendation engine
- [ ] Admin panel

---

## 📄 License

MIT License - See LICENSE file

---

## 🙏 Acknowledgments

- Design inspired by Netflix
- Built for educational purposes
- Not affiliated with Netflix Inc.

---

## 👤 Author

Built with ❤️ as a learning project

---

**🎬 Ready to start?**

```powershell
npm run dev
```

Open: http://localhost:3000

**Happy coding!** 🚀
