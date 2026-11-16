# Netflex

A free streaming site for public-domain classics, openly licensed films and your own work.

**Live:** [netflex-drab.vercel.app](https://netflex-drab.vercel.app) · **API:** [netflex-api-uk1m.onrender.com/api/health](https://netflex-api-uk1m.onrender.com/api/health)

Netflex has a Next.js frontend and an Express API. Every title in the built-in catalogue is in the public domain or under a Creative Commons licence and streams from the Internet Archive. Your own films can be uploaded to Bunny Stream and play in Netflex's HLS player.

## Contents

- [Features](#features)
- [Architecture](#architecture)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [HTTP API](#http-api)
- [The catalogue](#the-catalogue)
- [Hosting your own films](#hosting-your-own-films)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features

- **Browse:** pill navigation (Home, TV Series, Movies, My List), a rotating hero banner, an announcement panel and horizontally scrolling title rows.
- **Watch:** a details view with licence, credit and episode list, and a full-screen player. Internet Archive titles use the archive player; your own films use an adaptive HLS player with a quality picker and resume-where-you-left-off.
- **Search:** titles, genres, categories and descriptions.
- **My List:** saved in the viewer's browser, so no account is needed to watch.
- **Your films:** an upload script sends a folder of videos to Bunny Stream and adds them to a **Netflex Originals** row.
- **Optional sign-in:** Clerk is enabled only when a publishable key is configured.
- **Responsive:** works from phone to desktop.

## Architecture

```text
Browser
  │
  ▼
Next.js app (client/) ── Vercel
  │  Server components fetch the catalogue from the API.
  │  Browser requests to /api/* are proxied to the API by a Next.js rewrite.
  ▼
Express API (server/) ── Render
     /api/movies     Catalogue: built-in titles + your films (server/films.json)
     /api/auth       Optional email/password accounts (JWT)
     /api/watchlist  Account watchlists (JWT)

Video
  Internet Archive embeds  ← built-in catalogue
  Bunny Stream (HLS)       ← your films
```

The API allows cross-origin requests only from the origins listed in `CLIENT_URL`.

```text
.
├── client/                 Next.js 14 frontend (App Router, TypeScript)
│   ├── public/             Icon (replace netflex.png to change it), manifest, robots.txt
│   └── src/
│       ├── app/            Pages: /, /movies, /series, /search, /my-list
│       ├── components/     Navbar, Hero, Row, MovieCard, DetailsModal, Player, HlsVideo, …
│       ├── lib/            API client, optional-auth flag
│       ├── styles/         CSS per component
│       └── middleware.ts   Clerk (only when configured)
├── server/                 Express 4 API (TypeScript)
│   ├── films.json          Your uploaded films (created by the upload script)
│   └── src/
│       ├── data/           Built-in catalogue (movies.ts) and your films loader (films.ts)
│       ├── scripts/        uploadFilms.ts (Bunny Stream uploader)
│       ├── routes/         movies, auth, watchlist
│       └── index.ts        App setup, CORS, error handling
└── package.json            Scripts that run both apps
```

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
```

```bash
npm run install:all
```

Copy the environment templates (PowerShell shown; use `cp` on macOS/Linux):

```powershell
Copy-Item client/.env.example client/.env.local
Copy-Item server/.env.example server/.env
```

In `server/.env`, keep `NODE_ENV=development` for local work, or set `JWT_SECRET`. The API refuses to start without a secret in any other mode.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The API runs on [http://localhost:5000](http://localhost:5000).

Leave the Clerk keys in `client/.env.local` empty unless you have a working Clerk application; the site runs without them.

## Environment variables

### Frontend (`client/.env.local`, or Vercel project settings)

| Variable | Purpose | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | API base URL, including `/api` | `http://localhost:5000/api` |
| `API_INTERNAL_URL` | Optional: API URL used by server rendering, if different | — |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Optional: enables Clerk sign-in | — |
| `CLERK_SECRET_KEY` | Required only with the Clerk key above | — |

### Backend (`server/.env`, or Render service settings)

| Variable | Purpose | Example |
| --- | --- | --- |
| `PORT` | Listening port (set automatically on Render) | `5000` |
| `NODE_ENV` | `development`, `test` or `production` | `development` |
| `CLIENT_URL` | Allowed CORS origins, comma-separated | `http://localhost:3000` |
| `JWT_SECRET` | Signs account tokens. Required unless `NODE_ENV` is `development` or `test` | long random string |
| `BUNNY_LIBRARY_ID` | Bunny Stream library (upload script) | `123456` |
| `BUNNY_API_KEY` | Bunny Stream API key (upload script). Keep secret | — |
| `BUNNY_CDN_HOSTNAME` | Bunny CDN host used for playback and thumbnails | `vz-abc123.b-cdn.net` |

Never commit `.env` files; they are ignored by git.

## Scripts

Run from the repository root:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API and frontend together |
| `npm run server:dev` / `npm run client:dev` | Start one of them |
| `npm run build` | Build the API, then the frontend |
| `npm start` | Start the compiled API |
| `npm run client:start` | Start the built frontend |

In `server/`: `npm run upload-films -- "<folder>"` uploads your films (see below). In `client/`: `npm run lint`.

## HTTP API

All routes are under `/api` and return JSON. Errors look like `{ "error": "…" }`.

### Catalogue

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Status, timestamp and environment |
| `GET` | `/api/movies/featured` | Titles for the hero banner |
| `GET` | `/api/movies/categories?type=movie\|series` | Rows with their titles; `type` is optional |
| `GET` | `/api/movies/categories/:id` | One row, e.g. `classic-horror` |
| `GET` | `/api/movies?type=…&ids=a,b` | All titles, optionally filtered or by ID (keeps order) |
| `GET` | `/api/movies/search?q=…` | Ranked search across title, genre, category and description |
| `GET` | `/api/movies/:id` | One title |

### Accounts and watchlist (optional)

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | — | `{ name, email, password }` → `{ token, user }` |
| `POST` | `/api/auth/login` | — | `{ email, password }` → `{ token, user }` |
| `GET` | `/api/auth/me` | Bearer JWT | Current account |
| `GET` / `POST` | `/api/watchlist` | Bearer JWT | List titles / add `{ movieId }` |
| `DELETE` | `/api/watchlist/:movieId` | Bearer JWT | Remove a title |

The website itself does not need accounts: My List is stored in the browser. Accounts are kept in a JSON file (`server/data/db.json`), which does not survive redeploys on hosts with temporary disks such as Render's free plan. Use a database before relying on them.

## The catalogue

`server/src/data/movies.ts` lists the built-in titles. Each one is in the public domain or under a Creative Commons licence (Blender Foundation open movies, *Sita Sings the Blues*, *Star Wreck*), as recorded on its Internet Archive item page, with credits shown where the licence requires them.

To add a title, find it on archive.org, check the licence on the item page, and add an entry using the identifier from its URL (`archive.org/details/<identifier>`).

## Hosting your own films

Your own films are stored and streamed by [Bunny Stream](https://bunny.net/stream/), which converts each upload into adaptive HLS. They appear in a **Netflex Originals** row at the top of the home page, and the newest three lead the hero banner.

Only upload films you own or have the rights to distribute.

### One-time setup

1. Create a Bunny account, then **Stream → Add Video Library**.
2. On the library's **API** page, copy the **Video Library ID**, **API Key** and **CDN Hostname**.
3. Add them to `server/.env` (for uploading) and set `BUNNY_CDN_HOSTNAME` on the deployed API (for playback):

   ```env
   BUNNY_LIBRARY_ID=123456
   BUNNY_API_KEY=your-library-api-key
   BUNNY_CDN_HOSTNAME=vz-abc123.b-cdn.net
   ```

4. In the library's **Security** settings, add your site's domain to **Allowed Referrers** so other sites can't stream your films.

### Uploading films

```bash
cd server
npm run upload-films -- "D:\My Films" --dry-run   # list what would be uploaded
npm run upload-films -- "D:\My Films"             # upload new .mp4/.mov/.mkv/.m4v/.webm/.avi files
npm run upload-films -- --status                  # encoding progress for each film
```

- The title, and the year if the file name ends in one (e.g. `Night Shift (2024).mp4`), come from the file name.
- Each upload is saved to `server/films.json` as soon as it finishes, so re-running only uploads what's missing. A failed upload is removed from Bunny automatically.
- Bunny takes a few minutes to encode each film. Until then the player says it may still be encoding.
- **Commit and push `server/films.json`** after uploading. The deployed API is rebuilt from git, so that's how it learns about new films.

### Editing film details

Edit `server/films.json`, then restart the API (or push, for the deployed one):

| Field | Meaning |
| --- | --- |
| `title`, `description`, `year`, `genres` | Shown on cards, the hero banner and the details view |
| `maturityRating` | e.g. `All`, `7+`, `13+`, `16+`, `18+` |
| `category` | Row to show the film in (default `Netflex Originals`) |
| `credit`, `license` | Shown in the details view (default licence `All rights reserved`) |
| `hidden` | `true` hides the film without deleting it |
| `bunnyVideoId`, `fileName` | Set by the upload script; don't change |

Artwork comes from Bunny's auto-generated thumbnail; choose a different one in the Bunny dashboard.

## Deployment

The live site runs on two services, both deploying automatically from `main`:

| Part | Host | Settings |
| --- | --- | --- |
| Frontend | Vercel project `netflex` | Root directory `client`, Node 22, `NEXT_PUBLIC_API_URL=https://netflex-api-uk1m.onrender.com/api` |
| API | Render web service `netflex-api` | Build `cd server && npm ci --include=dev && npm run build`, start `cd server && npm start`, Node 22, `NODE_ENV=production`, `JWT_SECRET`, `CLIENT_URL=https://netflex-drab.vercel.app,http://localhost:3000` |

When the frontend moves to a new domain, add it to `CLIENT_URL` on Render.

Render's free plan puts the API to sleep after about 15 minutes without traffic; the first request afterwards can take up to a minute.

## Troubleshooting

- **"We can't reach the catalogue right now":** the API is down or waking up. Locally, start it with `npm run server:dev`; on Render, wait a minute and refresh.
- **Site shows a Clerk error or redirects to clerk.accounts.dev:** the Clerk key in `client/.env.local` is invalid. Remove it (sign-in is optional) or replace it with a valid one.
- **API exits with "JWT_SECRET must be set":** set `JWT_SECRET`, or `NODE_ENV=development` for local use.
- **Browser console shows a CORS error:** add the site's exact origin (scheme + host, no trailing slash) to `CLIENT_URL` on the API and redeploy.
- **Your films don't appear:** check that `server/films.json` is committed and `BUNNY_CDN_HOSTNAME` is set on the API. The API logs a warning when films exist but the host is missing.

## License

The Netflex source code is licensed under the [GNU Affero General Public License v3.0](LICENSE). If you run a modified version of Netflex as a website, you must make its source code available to its users.

The licence covers the code only. Films in the catalogue keep their own licences (public domain or the Creative Commons licence shown on each title), and films you upload remain yours.
