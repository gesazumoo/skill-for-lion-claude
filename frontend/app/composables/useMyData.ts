export interface AppliedClass {
  id: number
  title: string
  category: string
  date: string
  location: string
  max_participants: number
  current_participants: number
}

export interface CreatedClass {
  id: number
  title: string
  category: string
  date: string
  location: string
  max_participants: number
  current_participants: number
}

export const useMyData = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  // useState: 앱 전역 공유 (모든 컴포넌트가 같은 인스턴스 참조)
  const appliedClassIds = useState<number[]>('my-applied-ids', () => [])
  const appliedClasses = useState<AppliedClass[]>('my-applied-classes', () => [])
  const createdClasses = useState<CreatedClass[]>('my-created-classes', () => [])
  const isLoading = useState<boolean>('my-data-loading', () => false)

  const refresh = async () => {
    // getSession()으로 실제 세션 토큰을 확인 (user reactive ref보다 신뢰도 높음)
    // user.value?.id는 Nuxt SSR 상태에서 먼저 세팅되지만,
    // Supabase 클라이언트의 토큰 복원은 비동기이므로 타이밍 이슈 발생 가능
    const { data: { session } } = await supabase.auth.getSession()
    const userId = session?.user?.id

    if (!userId) {
      appliedClassIds.value = []
      appliedClasses.value = []
      createdClasses.value = []
      return
    }

    isLoading.value = true
    try {
      // class_map에서 내가 신청한 class_id 목록 조회
      const { data: mapRows, error: mapError } = await supabase
        .from('class_map')
        .select('class_id')
        .eq('user_id', userId)

      if (mapError) throw mapError

      const ids = (mapRows ?? []).map(r => Number(r.class_id))
      appliedClassIds.value = ids

      // 신청한 클래스 상세 정보 조회
      if (ids.length > 0) {
        const { data: classRows } = await supabase
          .from('classes')
          .select('id, title, category, date, location, max_participants, current_participants')
          .in('id', ids)
          .order('date', { ascending: true })
        appliedClasses.value = (classRows ?? []) as AppliedClass[]
      } else {
        appliedClasses.value = []
      }

      // 내가 만든 클래스 조회 (creator_id 우선, 없으면 user_id fallback)
      const { data: createdRows } = await supabase
        .from('classes')
        .select('id, title, category, date, location, max_participants, current_participants')
        .or(`creator_id.eq.${userId},user_id.eq.${userId}`)
        .order('created_at', { ascending: false })
      createdClasses.value = (createdRows ?? []) as CreatedClass[]
    } finally {
      isLoading.value = false
    }
  }

  const isApplied = (classId: number) => appliedClassIds.value.includes(classId)
  const isOwn = (classId: number) => createdClasses.value.some(c => c.id === classId)

  return {
    appliedClassIds,
    appliedClasses,
    createdClasses,
    isLoading,
    isApplied,
    isOwn,
    refresh,
  }
}
