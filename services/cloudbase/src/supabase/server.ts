import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseSecretKey = process.env.SUPABASE_SUPABASE_SECRET_KEY_KEY!;

if (
  !supabaseUrl ||
  !supabaseAnonKey
  // ||!supabaseSecretKey
) {
  throw new Error('Missing Supabase environment variables in client environment.');
}

// Use non-public server environment variables if possible, or standard envs
export const createServerSupabaseClient = () => {
  return createClient(
    supabaseUrl,
    supabaseAnonKey,
    // supabaseSecretKey,
  );
};
