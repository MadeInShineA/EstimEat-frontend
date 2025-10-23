import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}


export const supabase = createClient(supabaseUrl, supabaseKey);


export interface Commune {
  id: number;
  name: string;
  lat: number;
  long: number;
  canton: string;
  score: number;
  features: string[];
  extra_info: string;
  version: number;
  third_sector_job_score?: number;
  building_score?: number;
  demographie_score?: number;
  restau_score?: number;
  third_sector_establishment_score?: number;
  total_score?: number;
}
