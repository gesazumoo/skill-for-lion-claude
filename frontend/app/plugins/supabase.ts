import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  const client = createClient(
    config.public.supabaseUrl as string,
    config.public.supabaseAnonKey as string,
  )

  if (import.meta.client) {
    const user = useState<any>('auth-user', () => null)
    try {
      const { data: { session } } = await client.auth.getSession()
      user.value = session?.user ?? null
    } catch {}

    client.auth.onAuthStateChange((_event: any, session: any) => {
      user.value = session?.user ?? null
    })
  }

  return {
    provide: { supabase: client },
  }
})
