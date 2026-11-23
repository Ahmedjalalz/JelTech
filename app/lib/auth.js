import crypto from 'node:crypto';
import { getDb } from './db.js';
import { getSupabaseAdmin, isSupabaseConfigured } from './supabase.js';

const ADMIN_USERNAME = process.env.CAREERS_ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.CAREERS_ADMIN_PASSWORD || 'JelTechAdmin2026!';
const ADMIN_EMAIL = process.env.CAREERS_ADMIN_EMAIL || 'admin@jeltech.net';
const SESSION_COOKIE_NAME = 'jeltech_careers_session';
const SESSION_DURATION_DAYS = 7;

export async function verifyAdminCredentials(username, password) {
  if (!username || !password) return false;

  const trimmedUser = username.trim().toLowerCase();
  const configuredUser = (process.env.CAREERS_ADMIN_USERNAME || ADMIN_USERNAME).trim().toLowerCase();
  const configuredEmail = (process.env.CAREERS_ADMIN_EMAIL || ADMIN_EMAIL).trim().toLowerCase();
  const configuredPass = process.env.CAREERS_ADMIN_PASSWORD || ADMIN_PASSWORD;

  // 1. Direct env credentials check (Username or Admin Email)
  if ((trimmedUser === configuredUser || trimmedUser === configuredEmail) && password === configuredPass) {
    return true;
  }

  // 2. Check Supabase Auth if Supabase is connected
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const emailToCheck = username.includes('@') ? username.trim() : configuredEmail;
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailToCheck,
          password: password,
        });

        if (!error && data?.user) {
          return true;
        }
      }
    } catch (err) {
      console.warn('Supabase Auth verification check skipped:', err?.message || err);
    }
  }

  return false;
}

export async function createAdminSession(username = ADMIN_USERNAME) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const createdAt = new Date().toISOString();

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        // Clean expired sessions
        await supabase.from('admin_sessions').delete().lt('expires_at', createdAt);
        // Insert new session
        const { error } = await supabase.from('admin_sessions').insert({
          token,
          username,
          expires_at: expiresAt,
          created_at: createdAt,
        });
        if (error) {
          console.error('Supabase admin_sessions insert error:', error);
        } else {
          return { token, expiresAt, cookieName: SESSION_COOKIE_NAME };
        }
      }
    } catch (err) {
      console.error('Failed to create admin session in Supabase, falling back to local db:', err);
    }
  }

  // Fallback to SQLite
  try {
    const db = getDb();
    try {
      db.prepare('DELETE FROM admin_sessions WHERE expires_at < ?').run(createdAt);
    } catch {}

    db.prepare(`
      INSERT INTO admin_sessions (token, username, expires_at, created_at)
      VALUES (?, ?, ?, ?)
    `).run(token, username, expiresAt, createdAt);
  } catch (err) {
    console.error('Failed to create session in SQLite:', err);
  }

  return { token, expiresAt, cookieName: SESSION_COOKIE_NAME };
}

export async function deleteAdminSession(token) {
  if (!token) return;

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from('admin_sessions').delete().eq('token', token);
      }
    } catch (err) {
      console.error('Failed to delete session in Supabase:', err);
    }
  }

  try {
    const db = getDb();
    db.prepare('DELETE FROM admin_sessions WHERE token = ?').run(token);
  } catch (err) {
    // Ignore SQLite errors if running with Supabase
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

export async function verifyAdminSession(request) {
  try {
    let token = null;
    if (request && typeof request.headers?.get === 'function') {
      const cookieHeader = request.headers.get('cookie') || '';
      const cookies = parseCookies(cookieHeader);
      token = cookies[SESSION_COOKIE_NAME];
      if (!token) {
        const authHeader = request.headers.get('authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
          token = authHeader.substring(7).trim();
        }
      }
    }

    if (!token) {
      return { authenticated: false, error: 'Unauthorized: No session token provided' };
    }

    const now = new Date().toISOString();

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          const { data: session, error } = await supabase
            .from('admin_sessions')
            .select('*')
            .eq('token', token)
            .single();

          if (!error && session) {
            if (new Date(session.expires_at).getTime() < Date.now()) {
              await supabase.from('admin_sessions').delete().eq('token', token);
              return { authenticated: false, error: 'Unauthorized: Session has expired' };
            }
            return { authenticated: true, username: session.username, token };
          }
        }
      } catch (err) {
        console.warn('Supabase session verification error, falling back:', err?.message || err);
      }
    }

    // Fallback to SQLite
    const db = getDb();
    const session = db.prepare(`
      SELECT * FROM admin_sessions WHERE token = ?
    `).get(token);

    if (!session) {
      return { authenticated: false, error: 'Unauthorized: Invalid session' };
    }

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
