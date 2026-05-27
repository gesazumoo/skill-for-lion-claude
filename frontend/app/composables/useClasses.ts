export interface ClassItem {
  id: number
  title: string
  category: string
  price: number
  location: string
  date: string
  maxParticipants: number
  currentParticipants: number
  thumbnail: string
  deadline: string
  description: string
  creatorId: string | null
}

export const CATEGORIES = ['전체', '운동', '러닝', '수영', '스터디', '취미', '클래스'] as const

export function useClasses() {
  const nuxtApp = useNuxtApp()

  function isDeadlineSoon(deadline: string): boolean {
    const d = new Date(deadline)
    const now = new Date()
    const diffDays = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diffDays <= 3 && diffDays >= 0
  }

  function formatPrice(price: number): string {
    return price.toLocaleString('ko-KR') + '원'
  }

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    })
  }

  const { data, pending, error } = useAsyncData<ClassItem[]>('classes', async () => {
    const { data, error } = await nuxtApp.$supabase
      .from('classes')
      .select('*')
      .order('id', { ascending: true })

    if (error) throw error

    return data.map((row: Record<string, unknown>) => ({
      id: row.id as number,
      title: row.title as string,
      category: row.category as string,
      price: row.price as number,
      location: row.location as string,
      date: row.date as string,
      maxParticipants: row.max_participants as number,
      currentParticipants: row.current_participants as number,
      thumbnail: row.thumbnail as string,
      deadline: row.deadline as string,
      description: row.description as string,
      creatorId: row.creator_id as string | null,
    }))
  })

  const allClasses = computed(() => data.value ?? [])
  const deadlineSoonClasses = computed(() => allClasses.value.filter(c => isDeadlineSoon(c.deadline)))

  return {
    allClasses,
    deadlineSoonClasses,
    pending,
    error,
    isDeadlineSoon,
    formatPrice,
    formatDate,
  }
}
