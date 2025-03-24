import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wtshtouyaemziuasssrx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0c2h0b3V5YWVteml1YXNzc3J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NDgxNTEsImV4cCI6MjA1ODMyNDE1MX0.h8X4CGDx-k_LSRc4nIo5AtQ8jKL8qyxKw6dyVyT8b6E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
