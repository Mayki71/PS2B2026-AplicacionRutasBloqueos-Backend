import { createClient } from '@supabase/supabase-js';

import * as dotenv from 'dotenv';

dotenv.config();

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
);

//export const supabase = createClient('https://ckyugbvytwvrvhkfmcri.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNreXVnYnZ5dHd2cnZoa2ZtY3JpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE0MzE3NSwiZXhwIjoyMDkwNzE5MTc1fQ.bEt-wN5BS-3Ybtzu7qLOXbypBttF2muNowzzkhfQ-qk');
