import crypto from 'node:crypto';
import { getDb } from './db.js';

const ADMIN_USERNAME = process.env.CAREERS_ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.CAREERS_ADMIN_PASSWORD || 'JelTechAdmin2026!';
const SESSION_COOKIE_NAME = 'jeltech_careers_session';
const SESSION_DURATION_DAYS = 7;

export function verifyAdminCredentials(username, password) {
  if (!username || !password) return false;
  const validUser = username.trim().toLowerCase() === ADMIN_USERNAME.toLowerCase();
  // Safe comparison
  const validPass = password === ADMIN_PASSWORD;
  return validUser && validPass;
}

export function createAdminSession(username = ADMIN_USERNAME) {
  const db = getDb();
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const createdAt = new Date().toISOString();

  // Clean expired sessions
  try {
    db.prepare('DELETE FROM admin_sessions WHERE expires_at < ?').run(createdAt);
  } catch (err) {
    console.error('Failed to clean expired sessions:', err);
  }

  db.prepare(`
    INSERT INTO admin_sessions (token, username, expires_at, created_at)
    VALUES (?, ?, ?, ?)
  `).run(token, username, expiresAt, createdAt);

  return { token, expiresAt, cookieName: SESSION_COOKIE_NAME };
}

export function deleteAdminSession(token) {
  if (!token) return;
  const db = getDb();
  try {
    db.prepare('DELETE FROM admin_sessions WHERE token = ?').run(token);
  } catch (err) {
    console.error('Failed to delete session:', err);
  }
}

export function parseCookies(cookieHeader) {
  const list = {};
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    const key = parts.shift()?.trim();
    if (key) {
      list[key] = decodeURIComponent(parts.join('=').trim());
    }
  });
  return list;
}

export function verifyAdminSession(request) {
  try {
    let token = null;
    if (request && typeof request.headers?.get === 'function') {
      const cookieHeader = request.headers.get('cookie') || '';
      const cookies = parseCookies(cookieHeader);
      token = cookies[SESSION_COOKIE_NAME];
      if (!token) {
        // Also support Bearer authorization header for API requests
        const authHeader = request.headers.get('authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
          token = authHeader.substring(7).trim();
        }
      }
    }

    if (!token) {
      return { authenticated: false, error: 'Unauthorized: No session token provided' };
    }

    const db = getDb();
    const session = db.prepare(`
      SELECT * FROM admin_sessions WHERE token = ?
    `).get(token);

    if (!session) {
      return { authenticated: false, error: 'Unauthorized: Invalid session' };
    }

    const now = new Date().toISOString();
    if (session.expires_at < now) {
      db.prepare('DELETE FROM admin_sessions WHERE token = ?').run(token);
      return { authenticated: false, error: 'Unauthorized: Session has expired' };
    }

    return { authenticated: true, username: session.username, token };
  } catch (err) {
    console.error('Error verifying admin session:', err);
    return { authenticated: false, error: 'Authentication check failed' };
  }
}

export { SESSION_COOKIE_NAME };
