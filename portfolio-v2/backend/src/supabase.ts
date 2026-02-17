import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn(
    '⚠  SUPABASE_URL or SUPABASE_ANON_KEY is missing.\n' +
    '   Set them in Vercel → Project Settings → Environment Variables.\n' +
    '   For local dev, create backend/.env with these values.'
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});
