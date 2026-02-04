import { createClient } from '@supabase/supabase-js'

// Replace with your actual Supabase credentials
const supabaseUrl = 'https://owwjcbrfoancvfbnaqay.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93d2pjYnJmb2FuY3ZmYm5hcWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwMjA0ODMsImV4cCI6MjA4NDU5NjQ4M30.o6lnwEt6FI77ix_g8c8xSFSCZnutKCj6DPex0jEvwVs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)