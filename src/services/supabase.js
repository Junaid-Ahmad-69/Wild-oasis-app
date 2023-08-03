import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pdwnbhgddaxfghgvbgem.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkd25iaGdkZGF4ZmdoZ3ZiZ2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5Nzg0MzUsImV4cCI6MjAwNjU1NDQzNX0.cB8BjjPQuEYexCxlyj_1f8j7pVoZBuK0pwlnYATDSes"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;