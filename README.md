# Netflex Clone

A full-stack TypeScript streaming-catalog demo. It has a React/Vite client, an Express API, JWT-based accounts, and a per-user watchlist. The catalog is intentionally mock data and the player uses a public sample video.

## Author

**William Law**
Portfolio: [https://willx.tech](https://willx.tech/)

## What it includes

- Browseable movie and series catalog with category rows, search, details, and playback modal
- Account registration, sign-in, protected routes, and token restoration
- Per-account watchlist persisted by the API
- Type-safe client and server code, CORS configuration, production static-file serving, and API health checks

## Tech stack

**Client:** React, Vite, TypeScript, Axios
**Server:** Node.js, Express, TypeScript, JWT authentication
**Data:** Local JSON store (development/demo use)

## Requirements

- Node.js 18 or later
- npm 9 or later

## Run locally

1. Install all dependencies:

```powershell
   npm run install:all
```

2. Create local configuration from the included examples:

```powershell
   Copy-Item server/.env.example server/.env
   Copy-Item client/.env.example client/.env
```

3. Set a unique `JWT_SECRET` in `server/.env`, then start both services:

```powershell
   npm run dev
```

The client runs at `http://localhost:5173`; the API runs at `http://localhost:5000/api`.

## Configuration

`server/.env`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=replace-with-a-long-random-secret
```

`CLIENT_URL` may contain a comma-separated list of permitted browser origins. `JWT_SECRET` is mandatory when `NODE_ENV=production`.

`client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## API

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| GET | `/api/health` | No | Service status |
| GET | `/api/movies/hero` | No | Featured title |
| GET | `/api/movies/categories` | No | Catalog categories |
| GET | `/api/movies?type=movie\|series` | No | Filtered catalog |
| GET | `/api/movies/search?q=term` | No | Title search |
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Sign in |
| GET | `/api/auth/me` | Bearer token | Current account |
| GET | `/api/watchlist` | Bearer token | User's list |
| POST | `/api/watchlist` | Bearer token | Add `{ "movieId": "…" }` |
| DELETE | `/api/watchlist/:movieId` | Bearer token | Remove a title |

## Production

Build both applications, then the server serves the compiled client and API:

```powershell
npm run build
npm start
```

The local JSON store is suitable for development and demos only. Use a transactional database and a managed secret for a multi-user deployment.

## Quality checks

```powershell
npm run build
npm run lint --prefix client
```

## Project layout

```text
client/  React application, routes, UI components, and API client
server/  Express routes, authentication, catalog data, and user store
```

## License

MIT License. See [LICENSE](LICENSE) for details.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution conventions.

## Contact

For questions or feedback, visit [willx.tech](https://willx.tech).