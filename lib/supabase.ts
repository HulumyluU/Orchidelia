import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// For client-side operations (use anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side operations (use service role key for admin access)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
