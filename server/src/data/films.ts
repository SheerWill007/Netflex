import fs from 'fs';
import path from 'path';
import { Movie } from '../types';
import { logger } from '../utils/logger';

/**
 * Your own films, hosted on Bunny Stream.
 *
 * Entries live in server/films.json. `npm run upload-films -- <folder>` uploads new video
 * files and adds an entry for each; edit the JSON afterwards to fill in descriptions,
 * genres and so on. Restart the API to pick up changes.
 */

export interface FilmEntry {
  id: string;
  title: string;
  description?: string;
  year?: number;
  genres?: string[];
  maturityRating?: string;
  /** Row the film appears in. Defaults to "Netflex Originals". */
  category?: string;
  credit?: string;
  license?: string;
  /** Bunny Stream video GUID */
  bunnyVideoId: string;
  /** Original file name, used by the upload script to skip files already uploaded */
  fileName?: string;
  /** Hide from the catalogue without deleting the entry (e.g. while still encoding) */
  hidden?: boolean;
}

export const ORIGINALS_CATEGORY = 'Netflex Originals';

export const filmsFile = path.resolve(__dirname, '../../films.json');

export function readFilmEntries(file = filmsFile): FilmEntry[] {
  if (!fs.existsSync(file)) return [];
  const parsed: unknown = JSON.parse(fs.readFileSync(file, 'utf-8'));
  if (!Array.isArray(parsed)) {
    throw new Error(`${file} must contain a JSON array`);
  }
  return parsed as FilmEntry[];
}

export function writeFilmEntries(entries: FilmEntry[], file = filmsFile): void {
  const temporary = `${file}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(entries, null, 2)}\n`, 'utf-8');
  fs.renameSync(temporary, file);
}

function cdnBase(): string | null {
  const value = process.env.BUNNY_CDN_HOSTNAME?.trim().replace(/\/+$/, '');
  if (!value) return null;
  // A bare host name (as Bunny shows it) means https; an explicit http:// is kept for local testing.
  return /^https?:\/\//.test(value) ? value : `https://${value}`;
}

export function toMovie(entry: FilmEntry, cdn: string): Movie {
  const id = encodeURIComponent(entry.bunnyVideoId);
  return {
    id: entry.id,
    title: entry.title,
    description: entry.description ?? '',
    imageUrl: `${cdn}/${id}/thumbnail.jpg`,
    posterUrl: `${cdn}/${id}/thumbnail.jpg`,
    category: entry.category ?? ORIGINALS_CATEGORY,
    genres: entry.genres ?? [],
    year: entry.year,
    maturityRating: entry.maturityRating ?? '13+',
    type: 'movie',
    license: entry.license ?? 'All rights reserved',
    credit: entry.credit,
    source: { provider: 'bunny', id: entry.bunnyVideoId, playbackUrl: `${cdn}/${id}/playlist.m3u8` },
  };
}

/** Self-hosted films as catalogue titles. Empty (with a warning) when not configured. */
export function loadFilms(): Movie[] {
  let entries: FilmEntry[];
  try {
    entries = readFilmEntries().filter((e) => !e.hidden);
  } catch (error) {
    logger.error(`Could not read ${filmsFile}; self-hosted films are disabled`, error);
    return [];
  }
  if (!entries.length) return [];

  const cdn = cdnBase();
  if (!cdn) {
    logger.warn('films.json has entries but BUNNY_CDN_HOSTNAME is not set; self-hosted films are hidden');
    return [];
  }
  return entries.map((e) => toMovie(e, cdn));
}
