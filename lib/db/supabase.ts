// lib/db/supabase.ts - Datenbankclient für Supabase, dient aktuell nur zum Zugriff auf das Storage
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL oder Key fehlen in den Umgebungsvariablen!")
}

export const supabase = createClient(supabaseUrl, supabaseKey)