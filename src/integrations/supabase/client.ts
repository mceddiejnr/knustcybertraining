// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dkhiilowutttziqghklj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRraGlpbG93dXR0dHppcWdoa2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjI4NDUsImV4cCI6MjA2NTUzODg0NX0.cEzopCx0PWvcQZCwYkI7s6a0sj-Xh5aK01oa3HSlw9Y";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);