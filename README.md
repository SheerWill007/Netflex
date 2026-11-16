# Netflex

Netflex is a full-stack streaming-catalogue demo. The repository contains a Next.js 14 frontend and a TypeScript/Express API. The frontend currently presents a public marketing/landing page with Clerk sign-in and sign-up buttons. The API separately provides a sample movie catalogue, local email/password authentication, and a per-user watchlist.

> This is a learning/demo application, not a production streaming service. The catalogue is hard-coded sample data, movie artwork uses Picsum placeholder images, and there is no video playback or subscription/billing integration.

## Contents

- [Features](#features)
- [Technology](#technology)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Running and building](#running-and-building)
- [HTTP API](#http-api)
- [Data and persistence](#data-and-persistence)
- [Hosting your own films](#hosting-your-own-films)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Features

- Responsive landing page with trending title cards, product feature sections, FAQs, and Clerk modal actions.
- Next.js App Router application with TypeScript, React 18, and custom CSS.
- Express API with health check, request logging, CORS configuration, and centralized error handling.
- Static sample catalogue containing 90 movie/series records in nine categories, plus a separate featured title.
- Catalogue API for the hero content, categories, title details, and title-name search.
- API registration and login using bcrypt-hashed passwords and seven-day JWTs.
- Authenticated API endpoints for reading, adding, and removing movies from a user's watchlist.
- JSON-file user storage for local development and simple demonstrations.

## Technology

| Area | Technologies |
| --- | --- |
| Web app | Next.js 14, React 18, TypeScript, Clerk, Axios, CSS |
| API | Node.js, Express 4, TypeScript, CORS, dotenv |
| API authentication | bcryptjs, jsonwebtoken |
| Development | npm, concurrently, nodemon |

## Architecture

```text
Browser
  |
  +--> Next.js app (client/, port 3000)
  |      App Router page and layout
  |      Clerk provides the landing-page sign-in/sign-up UI
  |      API helper uses NEXT_PUBLIC_API_URL
  |
  +--> Express API (server/, port 5000)
         /api/movies     Static in-memory catalogue
         /api/auth       Local email/password accounts and JWTs
         /api/watchlist  JWT-protected account watchlists
         server data     JSON file containing API users
```

The root npm scripts start the web app and API as separate development processes. The frontend API helper sends requests to the URL in `NEXT_PUBLIC_API_URL`; the Next.js configuration also rewrites `/api/*` to that API origin.

There are two distinct authentication integrations in the current code:

1. The Next.js landing page and route middleware use Clerk. The root page, Clerk sign-in/sign-up routes, and `/api/*` paths are public; other matched frontend routes require Clerk authentication.
2. The Express API has its own registration/login endpoints and validates its own JWT bearer tokens for `/api/watchlist/*` and `/api/auth/me`.

The Clerk session is not exchanged for an API JWT, and the frontend does not currently call the API's account or watchlist endpoints. Treat these as separate systems when extending the app.

## Project structure

```text
.
├── client/                         Next.js frontend
│   ├── .env.example                Frontend environment template
│   ├── .eslintrc.json
│   ├── package-lock.json
│   ├── package.json                Frontend scripts and dependencies
│   ├── next.config.js              Next.js configuration and API rewrite
│   ├── tsconfig.json
│   └── src/
│       ├── app/
│       │   ├── layout.tsx          Root layout, metadata, Clerk provider
│       │   └── page.tsx            Public landing page
│       ├── components/
│       │   ├── Footer.tsx
│       │   ├── Hero.tsx
│       │   ├── MovieCard.tsx
│       │   ├── Navbar.tsx
│       │   └── Row.tsx
│       ├── lib/api.ts              Axios API client and catalogue functions
│       ├── middleware.ts           Clerk route protection
│   ├── public/                     Static files served by Next.js at /
│   │   ├── HOW-TO-ADD-LOGO.md
│   │   ├── netflex.png             App icon
│   │   ├── manifest.json           Web app manifest
│   │   ├── README.md
│   │   └── robots.txt              Crawler rules
│       ├── styles/
│       │   ├── App.css
│       │   ├── Footer.css
│       │   ├── Hero.css
│       │   ├── Landing.css
│       │   ├── MovieCard.css
│       │   ├── Navbar.css
│       │   ├── Row.css
│       │   └── globals.css
│       └── types/index.ts          Frontend catalogue types
├── server/                         Express backend
│   ├── .env.example                API environment template
│   ├── nodemon.json
│   ├── package-lock.json
│   ├── package.json                API scripts and dependencies
│   ├── src/
│   │   ├── config/constants.ts     API prefix and server configuration
│   │   ├── controllers/
│   │   │   └── movieController.ts  Catalogue request handlers
│   │   ├── data/movies.ts          Featured title and sample catalogue
│   │   ├── lib/movies.ts           Movie lookup helpers
│   │   ├── middleware/auth.ts      JWT creation and verification
│   │   ├── routes/
│   │   │   ├── auth.ts             Registration, login, and profile
│   │   │   ├── movies.ts           Public catalogue routes
│   │   │   └── watchlist.ts        Protected watchlist routes
│   │   ├── store/db.ts             JSON-file user store
│   │   ├── types/index.ts          API and persisted-user types
│   │   ├── utils/
│   │   │   ├── errorHandler.ts
│   │   │   └── logger.ts
│   │   └── index.ts                Express app, middleware, and startup
│   └── tsconfig.json
├── .gitignore
├── CLERK-QUICKSTART.md
├── CLERK-SETUP.md
├── CONTRIBUTING.md
├── INSTALLATION.md
├── LICENSE
├── QUICKSTART.md
├── SETUP.md
├── START-HERE.md
├── install.bat                     Windows dependency installation helper
├── start-client.bat                Windows frontend launcher
├── start-dev.bat                   Windows full-stack launcher
├── start-server.bat                Windows API launcher
├── package.json                    Root orchestration scripts
├── package-lock.json
├── netflex.png                     Repository-level logo image
└── README.md
```

The client and server each have their own TypeScript configuration and npm lockfile. `client/src/app/page.tsx` renders the landing page; the catalogue components and API helpers are available for building out a catalogue experience.

## Prerequisites

- Node.js and npm installed and available on `PATH`.
- A Clerk application and its development keys if you want to use the sign-in/sign-up controls. See [Clerk's dashboard](https://dashboard.clerk.com/).

The frontend runs at `http://localhost:3000` and the API at `http://localhost:5000` by default.

## Getting started

From the repository root, install the root and application dependencies, then start both services:

```powershell
npm install
npm run install:all
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The API root is available at [http://localhost:5000](http://localhost:5000), and its health endpoint is [http://localhost:5000/api/health](http://localhost:5000/api/health).

Copy the environment templates and configure the required values before using authentication:

```powershell
Copy-Item client/.env.example client/.env.local
Copy-Item server/.env.example server/.env
```

Set the Clerk keys in `client/.env.local` and replace the development JWT secret in `server/.env` if using the API auth endpoints. Environment files are excluded from Git; do not commit real secrets.

For a Windows-only setup, `install.bat` and the `start-*.bat` helpers are also provided. The npm commands above work cross-platform.

## Environment variables

### Frontend (`client/.env.local`)

| Variable | Purpose | Default / example |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the Express API, including `/api` | `http://localhost:5000/api` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk browser-side application key | Required for Clerk |
| `CLERK_SECRET_KEY` | Clerk server-side secret | Required for Clerk |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in route | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up route | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Redirect after sign-in | `/` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Redirect after sign-up | `/` |

The frontend API client falls back to `http://localhost:5000/api` when `NEXT_PUBLIC_API_URL` is unset. Set it explicitly for deployments. The Next.js rewrite appends the requested API path, so provide the API base through `/api`, not a specific endpoint.

### Backend (`server/.env`)

| Variable | Purpose | Default / example |
| --- | --- | --- |
| `PORT` | Express listening port | `5000` |
| `NODE_ENV` | Runtime mode | `development` |
| `CLIENT_URL` | Allowed CORS origin(s); comma-separated list supported | `http://localhost:3000` |
| `JWT_SECRET` | Secret used to sign and verify API bearer tokens | Set a long random value |

`JWT_SECRET` must be set in production. The development-only fallback must not be used for deployed accounts.

## Running and building

Run these scripts from the repository root:

| Command | Description |
| --- | --- |
| `npm run dev` | Start API and frontend concurrently |
| `npm run server:dev` | Start only the API in watch mode |
| `npm run client:dev` | Start only the Next.js development server |
| `npm run build` | Build the API, then the frontend |
| `npm run server:build` | Compile the API TypeScript into `server/dist/` |
| `npm run client:build` | Build the Next.js app |
| `npm start` | Start the compiled API |
| `npm run server:start` | Same as `npm start` |
| `npm run client:start` | Start the built Next.js app |

The individual workspaces also provide `lint` scripts: run `npm run lint --prefix server` or `npm run lint --prefix client`.

## HTTP API

All API routes are prefixed with `/api`. Successful catalogue responses are JSON. Errors use JSON objects with an `error` field.

### Health and catalogue

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | API status, timestamp, and environment |
| `GET` | `/api/movies/hero` | Featured title |
| `GET` | `/api/movies/categories` | All nine categories and their titles |
| `GET` | `/api/movies/categories/:id` | One category by ID (for example, `cat1`) |
| `GET` | `/api/movies` | Flattened list of catalogue titles |
| `GET` | `/api/movies/search?q=<title>` | Case-insensitive title substring search |
| `GET` | `/api/movies/:id` | One catalogue title by ID |

Search requires the `q` query parameter. The route is registered before `/:id` so `/search` is interpreted as a search endpoint.

### Accounts and watchlist

| Method | Path | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | None | Create an API account |
| `POST` | `/api/auth/login` | None | Verify credentials and issue a token |
| `GET` | `/api/auth/me` | API JWT | Return the current API account |
| `GET` | `/api/watchlist` | API JWT | Return the account's saved movie records |
| `POST` | `/api/watchlist` | API JWT | Add a movie to the watchlist |
| `DELETE` | `/api/watchlist/:movieId` | API JWT | Remove a movie from the watchlist |

Register with JSON such as:

```json
{
  "name": "Alex",
  "email": "alex@example.com",
  "password": "choose-a-password"
}
```

Login with `email` and `password`. Both endpoints return `{ "token": "...", "user": { "id": "...", "email": "...", "name": "..." } }`. For protected endpoints, send the returned JWT in the HTTP `Authorization` header using the Bearer authentication scheme. Registration requires a name, valid email, and password of at least six characters.

Add a movie by sending `POST /api/watchlist` with JSON `{ "movieId": "m1" }`. The watchlist does not add duplicate IDs. A movie ID must exist in the sample catalogue (or identify the featured title).

## Data and persistence

- Catalogue records and categories are declared in `server/src/data/movies.ts`; they are loaded into memory and are not stored in a database.
- Sample title images are generated using `https://picsum.photos/` seed URLs.
- API account records are written to `data/db.json` relative to the running server module. The file and its parent directory are created on first write; keep this file persistent if account data must survive restarts or deployments.
- The JSON store is intended for a local/demo workload, not concurrent or horizontally scaled production use. Use a managed database for production.

## Hosting your own films

Your own films are stored and streamed by [Bunny Stream](https://bunny.net/stream/), which converts each upload into adaptive HLS (several qualities, chosen automatically for the viewer's connection). They appear in a **Netflex Originals** row at the top of the home page, and the newest three lead the hero banner.

Only upload films you own or have the rights to distribute.

### One-time setup

1. Create a Bunny account, then **Stream → Add Video Library**.
2. In the library's **API** page, copy the **Video Library ID**, the **API Key** and the **CDN Hostname** (for example `vz-abc123.b-cdn.net`).
3. Add them to `server/.env`:

   ```env
   BUNNY_LIBRARY_ID=123456
   BUNNY_API_KEY=your-library-api-key
   BUNNY_CDN_HOSTNAME=vz-abc123.b-cdn.net
   ```

   The API key can upload and delete videos. Keep it out of git and never put it in the client.

4. Recommended: in the library's **Security** settings, add your site's domain to **Allowed Referrers** so other sites can't embed your streams.

### Uploading films

```bash
cd server
npm run upload-films -- "D:\My Films" --dry-run   # list what would be uploaded
npm run upload-films -- "D:\My Films"             # upload new .mp4/.mov/.mkv/.m4v/.webm/.avi files
npm run upload-films -- --status                  # encoding progress for each film
```

- A film's title (and year, if the file name ends in one, e.g. `Night Shift (2024).mp4`) comes from its file name.
- Each upload is saved to `server/films.json` as soon as it finishes, so re-running after an interruption only uploads what's missing. A failed upload is removed from Bunny automatically.
- Bunny takes a few minutes to encode each film. Until then the player shows "may still be encoding".

### Editing film details

Edit `server/films.json` and restart the API. Each entry supports:

| Field | Meaning |
| --- | --- |
| `title`, `description`, `year`, `genres` | Shown on cards, the hero banner and the details view |
| `maturityRating` | e.g. `All`, `7+`, `13+`, `16+`, `18+` |
| `category` | Row to show the film in (default `Netflex Originals`) |
| `credit`, `license` | Shown in the details view (default licence `All rights reserved`) |
| `hidden` | `true` hides the film without deleting it |
| `bunnyVideoId`, `fileName` | Set by the upload script; don't change |

Artwork comes from Bunny's auto-generated thumbnail. To change it, pick a new thumbnail for the video in the Bunny dashboard.

### Playback

Self-hosted films play in Netflex's own player: native HLS in Safari and recent Chrome builds, hls.js elsewhere. It offers a quality picker when the stream has several renditions, and it remembers where each viewer stopped (stored in their browser), with a **Start over** option.

## Deployment

Deploy the Next.js frontend and Express API as separate services. Configure:

1. `NEXT_PUBLIC_API_URL` on the frontend to the publicly reachable API base URL, including `/api` (for example, `https://api.example.com/api`).
2. `CLIENT_URL` on the API to the frontend origin (or comma-separated allowed origins).
3. Clerk frontend keys and URLs in the frontend environment.
4. A strong, private `JWT_SECRET` on the API, and `NODE_ENV=production`.
5. Persistent storage or a database for API user data. The built-in JSON file is not suitable for ephemeral hosting filesystems.

For Vercel, deploy `client/` as the Next.js project and host `server/` on a Node.js service that can run the compiled API and provide persistent storage. The root `npm run build` builds both packages, but the Express server is not a substitute for hosting a Next.js server build.

## Troubleshooting

- **Frontend cannot reach the API:** Confirm the API is running, `NEXT_PUBLIC_API_URL` includes `/api`, and `CLIENT_URL` permits the frontend origin. Restart Next.js after changing frontend environment variables.
- **Clerk controls show a configuration error:** Check the Clerk publishable and secret keys in `client/.env.local`; restart the frontend after updating them.
- **API auth fails in production:** Set `JWT_SECRET` explicitly and use the API-issued token as a bearer token. Clerk sessions are not API JWTs.
- **Port already in use:** Change `PORT` for the API or edit the frontend dev/start port in `client/package.json`; keep the configured frontend URL and CORS origin aligned.
- **Accounts disappear after deployment/restart:** Persist the API's `data/db.json` location or migrate the user store to a persistent database.
