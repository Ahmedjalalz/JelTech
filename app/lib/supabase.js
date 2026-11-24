import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SERVICE_ROLE_KEY;

/**
 * Checks whether Supabase credentials have been properly configured
 * in the environment (.env.local) and are not placeholder values.
 */
export function isSupabaseConfigured() {
  if (!supabaseUrl) return false;
  const trimmedUrl = supabaseUrl.trim();
  if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
    return false;
  }
  if (trimmedUrl.includes('your-project-id')) {
    return false;
  }

  const key = (supabaseServiceKey || supabaseAnonKey || '').trim();
  if (!key || key.includes('your_supabase_') || key.length < 20) {
    return false;
  }

  return true;
}

export function isServiceRoleConfigured() {
  return Boolean(supabaseServiceKey && supabaseServiceKey.trim().length > 20);
}

let adminClient = null;
let publicClient = null;

/**
 * Returns a Supabase client with elevated privileges using the Service Role Key.
 * Used exclusively on the server side for admin ATS operations, handling resumes,
 * and database transactions without client-side RLS limits.
 */
export function getSupabaseAdmin() {
  if (!isSupabaseConfigured()) return null;
  if (!adminClient) {
    if (!supabaseServiceKey) {
      console.warn(
        '⚠️ [Supabase Warning]: SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables. Falling back to anon key. Admin ATS updates and private application views will be blocked by Postgres Row Level Security (RLS) unless SUPABASE_SERVICE_ROLE_KEY is configured in Vercel/env.'
      );
    }
    const key = supabaseServiceKey?.trim() || supabaseAnonKey?.trim();
    adminClient = createClient(supabaseUrl.trim(), key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return adminClient;
}

/**
 * Returns a public Supabase client using the Anon public key.
 */
export function getSupabaseClient() {
  if (!isSupabaseConfigured()) return null;
  if (!publicClient) {
    const key = supabaseAnonKey?.trim() || supabaseServiceKey?.trim();
    publicClient = createClient(supabaseUrl.trim(), key, {
      auth: {
        persistSession: false,
      },
    });
  }
  return publicClient;
}
