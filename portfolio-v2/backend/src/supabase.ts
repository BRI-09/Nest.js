import { createClient } from '@supabase/supabase-js';

// These env vars are set in Vercel project settings
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('⚠  SUPABASE_URL or SUPABASE_ANON_KEY not set. Supabase features will fail.');
}

export const supabase = createClient(
  SUPABASE_URL || '',
  SUPABASE_KEY || '',
);
