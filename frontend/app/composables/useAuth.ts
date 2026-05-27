export function useAuth() {
  const user = useState<any>('auth-user', () => null)
  const nuxtApp = useNuxtApp()
  const supabase = nuxtApp.$supabase as any

  const isLoggedIn = computed(() => !!user.value)

  function parseError(msg: string): string {
    if (msg.includes('Invalid login credentials')) return '이메일 또는 비밀번호를 확인해주세요'
    if (msg.includes('Email not confirmed')) return '이메일 인증 후 로그인해주세요'
    if (msg.includes('User already registered')) return '이미 사용 중인 이메일이에요'
    if (msg.includes('Password should be at least')) return '비밀번호는 6자 이상이어야 해요'
    if (msg.includes('invalid') && msg.toLowerCase().includes('email')) return '올바른 이메일 형식이 아니에요'
    if (msg.includes('rate limit') || msg.includes('too many')) return '잠시 후 다시 시도해주세요'
    return '오류가 발생했어요. 다시 시도해주세요'
  }

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(parseError(error.message))
    return data
  }

  async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw new Error(parseError(error.message))
    return data
  }

  async function signOut() {
    await supabase.auth.signOut()
    user.value = null
  }

  return { user, isLoggedIn, signIn, signUp, signOut }
}
