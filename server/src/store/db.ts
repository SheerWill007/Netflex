import fs from 'fs';
import path from 'path';
import { DatabaseShape, StoredUser } from '../types';

const dataDir = path.join(__dirname, '../../data');
const dbPath = path.join(dataDir, 'db.json');

function emptyDb(): DatabaseShape {
  return { users: [] };
}

function ensureDb(): DatabaseShape {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    const initial = emptyDb();
    fs.writeFileSync(dbPath, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
  const raw = fs.readFileSync(dbPath, 'utf-8');
  try {
    const parsed = JSON.parse(raw) as DatabaseShape;
    if (!Array.isArray(parsed.users)) {
      throw new Error('Database users field is invalid');
    }
    return parsed;
  } catch {
    // Never overwrite a corrupt data file: doing so would silently erase accounts.
    throw new Error(`Unable to read user database at ${dbPath}`);
  }
}

function persist(db: DatabaseShape): void {
  const temporaryPath = `${dbPath}.tmp`;
  fs.writeFileSync(temporaryPath, JSON.stringify(db, null, 2), 'utf-8');
  fs.renameSync(temporaryPath, dbPath);
}

export function getUsers(): StoredUser[] {
  return ensureDb().users;
}

export function findUserByEmail(email: string): StoredUser | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): StoredUser | undefined {
  return getUsers().find((u) => u.id === id);
}

export function createUser(user: StoredUser): StoredUser {
  const db = ensureDb();
  db.users.push(user);
  persist(db);
  return user;
}

export function updateUser(user: StoredUser): StoredUser {
  const db = ensureDb();
  const index = db.users.findIndex((u) => u.id === user.id);
  if (index === -1) {
    throw new Error('User not found');
  }
  db.users[index] = user;
  persist(db);
  return user;
}
