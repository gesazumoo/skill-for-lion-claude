import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const { public: { supabaseUrl, supabaseAnonKey } } = useRuntimeConfig()
  const client = createClient(supabaseUrl, supabaseAnonKey)
  return { provide: { supabase: client } }
})
