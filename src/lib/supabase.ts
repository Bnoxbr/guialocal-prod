import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://teaogmkcaouluqsbzvaz.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlYW9nbWtjYW91bHVxc2J6dmF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3MjEzNzQsImV4cCI6MjA1NTI5NzM3NH0.mGIhpQVfWVEH_lSApu6e8JKPdhEJW0nZP1rQITgA9IM";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
