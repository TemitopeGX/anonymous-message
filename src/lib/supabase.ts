import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on our schema
export type Profile = {
  id: string;
  email: string;
  created_at: string;
};

export type Link = {
  id: string;
  user_id: string;
  created_at: string;
};

export type Message = {
  id: string;
  link_id: string;
  content: string;
  created_at: string;
};
