// We import createClient to instantiate a Supabase client instance. It's the function that connects your app to Supabase using your URL and API key
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  // These are environment variables that authenticate your app to Supabase:
  //They're stored in a .env.local
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);
