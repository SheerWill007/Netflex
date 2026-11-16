/**
 * Upload your films to Bunny Stream and add them to the Netflex catalogue.
 *
 *   npm run upload-films -- "D:\My Films"            upload every new video in the folder
 *   npm run upload-films -- "D:\My Films" --dry-run  list what would be uploaded
 *   npm run upload-films -- --status                 show Bunny's encoding status per film
 *
 * Needs BUNNY_LIBRARY_ID and BUNNY_API_KEY in server/.env (Bunny dashboard → Stream →
 * your library → API). Files already listed in server/films.json are skipped, so it is
 * safe to re-run after adding new films or after an interrupted upload.
 */
import 'dotenv/config';
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import { FilmEntry, filmsFile, readFilmEntries, writeFilmEntries } from '../data/films';

const VIDEO_EXTENSIONS = new Set(['.mp4', '.mov', '.mkv', '.m4v', '.webm', '.avi']);

// Bunny encoding status codes (Stream API "status" field)
const STATUS_NAMES: Record<number, string> = {
  0: 'queued',
  1: 'processing',
  2: 'encoding',
  3: 'finished',
  4: 'resolution finished (playable)',
  5: 'FAILED',
  6: 'presigned upload started',
  7: 'presigned upload finished',
  8: 'presigned upload failed',
};

interface Config {
  apiBase: string;
  libraryId: string;
  apiKey: string;
}

function readConfig(): Config {
  const libraryId = process.env.BUNNY_LIBRARY_ID?.trim();
  const apiKey = process.env.BUNNY_API_KEY?.trim();
  if (!libraryId || !apiKey) {
    fail('Set BUNNY_LIBRARY_ID and BUNNY_API_KEY in server/.env (Bunny dashboard → Stream → your library → API).');
  }
  return {
    apiBase: (process.env.BUNNY_API_BASE?.trim() || 'https://video.bunnycdn.com').replace(/\/+$/, ''),
    libraryId,
    apiKey,
  };
}

function fail(message: string): never {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

/** Minimal HTTP helper that can stream a request body (fetch needs extra flags for that). */
function request(
  method: string,
  url: string,
  headers: Record<string, string | number>,
  body?: string | fs.ReadStream,
  onProgress?: (sent: number) => void
): Promise<{ status: number; text: string }> {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const client = target.protocol === 'http:' ? http : https;
    const req = client.request(target, { method, headers }, (res) => {
      let text = '';
      res.setEncoding('utf-8');
      res.on('data', (chunk) => (text += chunk));
      res.on('end', () => resolve({ status: res.statusCode ?? 0, text }));
    });
    req.on('error', reject);

    if (body instanceof fs.ReadStream) {
      let sent = 0;
      body.on('data', (chunk) => {
        sent += chunk.length;
        onProgress?.(sent);
      });
      body.on('error', reject);
      body.pipe(req);
    } else {
      req.end(body);
    }
  });
}

async function bunny(config: Config, method: string, pathname: string, body?: unknown) {
  const res = await request(
    method,
    `${config.apiBase}/library/${encodeURIComponent(config.libraryId)}${pathname}`,
    { AccessKey: config.apiKey, Accept: 'application/json', 'Content-Type': 'application/json' },
    body === undefined ? undefined : JSON.stringify(body)
  );
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`Bunny ${method} ${pathname} failed (${res.status}): ${res.text.slice(0, 300)}`);
  }
  return res.text ? JSON.parse(res.text) : {};
}

/** "Night_Shift (2024).mov" → { title: "Night Shift", year: 2024 } */
function parseFileName(fileName: string): { title: string; year?: number } {
  let name = path.parse(fileName).name.replace(/[._]+/g, ' ');
  let year: number | undefined;
  const match = name.match(/[\s(\[-]*\b(19\d{2}|20\d{2})\b[)\]]?\s*$/);
  if (match && match.index! > 0) {
    year = Number(match[1]);
    name = name.slice(0, match.index);
  }
  return { title: name.replace(/\s+/g, ' ').trim() || path.parse(fileName).name, year };
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'film'
  );
}

function uniqueId(base: string, taken: Set<string>): string {
  let id = `original-${base}`;
  for (let n = 2; taken.has(id); n++) id = `original-${base}-${n}`;
  taken.add(id);
  return id;
}

const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

async function uploadOne(config: Config, filePath: string, entries: FilmEntry[], taken: Set<string>) {
  const fileName = path.basename(filePath);
  const size = fs.statSync(filePath).size;
  const { title, year } = parseFileName(fileName);

  console.log(`\n▶ ${fileName} (${mb(size)})`);
  const created = (await bunny(config, 'POST', '/videos', { title })) as { guid?: string };
  if (!created.guid) throw new Error('Bunny did not return a video id');

  try {
    let lastShown = -1;
    const res = await request(
      'PUT',
      `${config.apiBase}/library/${encodeURIComponent(config.libraryId)}/videos/${encodeURIComponent(created.guid)}`,
      { AccessKey: config.apiKey, 'Content-Type': 'application/octet-stream', 'Content-Length': size },
      fs.createReadStream(filePath),
      (sent) => {
        const pct = Math.floor((sent / size) * 100);
        if (pct !== lastShown && (pct % 5 === 0 || pct === 100)) {
          lastShown = pct;
          process.stdout.write(`\r  uploading… ${String(pct).padStart(3)}%`);
        }
      }
    );
    process.stdout.write('\n');
    if (res.status < 200 || res.status >= 300) {
      throw new Error(`upload failed (${res.status}): ${res.text.slice(0, 300)}`);
    }
  } catch (error) {
    // Don't leave an empty video behind in the library.
    await bunny(config, 'DELETE', `/videos/${encodeURIComponent(created.guid)}`).catch(() => undefined);
    throw error;
  }

  const entry: FilmEntry = {
    id: uniqueId(slugify(title), taken),
    title,
    description: '',
    year: year ?? new Date().getFullYear(),
    genres: [],
    maturityRating: '13+',
    bunnyVideoId: created.guid,
    fileName,
  };
  entries.push(entry);
  writeFilmEntries(entries); // save after each film so an interruption loses nothing
  console.log(`  ✔ uploaded as "${title}" (${entry.id}); Bunny is now encoding it`);
}

async function showStatus(config: Config) {
  const entries = readFilmEntries();
  if (!entries.length) {
    console.log('No films in films.json yet.');
    return;
  }
  for (const entry of entries) {
    try {
      const video = (await bunny(config, 'GET', `/videos/${encodeURIComponent(entry.bunnyVideoId)}`)) as {
        status?: number;
        encodeProgress?: number;
      };
      const status = STATUS_NAMES[video.status ?? -1] ?? `status ${video.status}`;
      const progress = video.status === 3 ? '' : ` ${video.encodeProgress ?? 0}%`;
      console.log(`${entry.title.padEnd(40)} ${status}${progress}${entry.hidden ? '  (hidden)' : ''}`);
    } catch (error) {
      console.log(`${entry.title.padEnd(40)} ✖ ${(error as Error).message}`);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const folder = args.find((a) => !a.startsWith('--'));

  if (args.includes('--status')) {
    await showStatus(readConfig());
    return;
  }
  if (!folder) {
    fail('Usage: npm run upload-films -- "<folder with your films>" [--dry-run]   or   --status');
  }
  if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) {
    fail(`Folder not found: ${folder}`);
  }

  const entries = readFilmEntries();
  const done = new Set(entries.map((e) => e.fileName).filter(Boolean));
  const taken = new Set(entries.map((e) => e.id));
  const files = fs
    .readdirSync(folder)
    .filter((f) => VIDEO_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));
  const pending = files.filter((f) => !done.has(f));

  console.log(`Found ${files.length} video file(s); ${files.length - pending.length} already uploaded, ${pending.length} new.`);
  if (!pending.length) return;
  if (dryRun) {
    pending.forEach((f) => console.log(`  would upload: ${f} (${mb(fs.statSync(path.join(folder, f)).size)})`));
    return;
  }

  const config = readConfig();
  let failed = 0;
  for (const file of pending) {
    try {
      await uploadOne(config, path.join(folder, file), entries, taken);
    } catch (error) {
      failed++;
      console.error(`  ✖ ${file}: ${(error as Error).message}`);
    }
  }

  console.log(`\nDone: ${pending.length - failed} uploaded, ${failed} failed.`);
  console.log(`Edit ${filmsFile} to add descriptions and genres, then restart the API.`);
  console.log('Check encoding progress with: npm run upload-films -- --status');
  if (failed) process.exitCode = 1;
}

main().catch((error) => fail((error as Error).message));
