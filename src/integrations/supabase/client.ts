
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://shkobynecxttnhnjxums.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoa29ieW5lY3h0dG5obmp4dW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyODg3MjIsImV4cCI6MjA2Mjg2NDcyMn0.tUkhg7mwz3pRsEF-jP8zV8cEuTCqX9C23JGW56L-HTs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
