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
  userId?: string
}

interface ClassRow {
  id: number
  title: string
  category: string
  price: number
  location: string
  date: string
  max_participants: number
  current_participants: number
  thumbnail: string | null
  deadline: string
  description: string | null
  created_at: string
  user_id?: string | null
}

const toClassItem = (row: ClassRow): ClassItem => ({
  id: row.id,
  title: row.title,
  category: row.category,
  price: row.price,
  location: row.location,
  date: row.date,
  maxParticipants: row.max_participants,
  currentParticipants: row.current_participants,
  thumbnail: row.thumbnail ?? '',
  deadline: row.deadline,
  description: row.description ?? '',
  userId: row.user_id ?? undefined,
})

export const useClasses = () => {
  const supabase = useSupabaseClient()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const isDeadlineSoon = (deadline: string): boolean => {
    const deadlineDate = new Date(deadline)
    deadlineDate.setHours(0, 0, 0, 0)
    const diffDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diffDays >= 0 && diffDays <= 3
  }

  const getDeadlineDaysLeft = (deadline: string): number => {
    const deadlineDate = new Date(deadline)
    deadlineDate.setHours(0, 0, 0, 0)
    return Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  }

  const formatPrice = (price: number): string => {
    return price.toLocaleString('ko-KR') + '원'
  }

  const formatDate = (date: string): string => {
    const d = new Date(date)
    return `${d.getMonth() + 1}월 ${d.getDate()}일`
  }

  const { data: classesData, pending, error } = useAsyncData('classes', async () => {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .order('date', { ascending: true })
    if (error) throw error
    return (data as ClassRow[]).map(toClassItem)
  })

  const classes = computed(() => classesData.value ?? [])

  const deadlineSoonClasses = computed(() =>
    classes.value.filter(c => isDeadlineSoon(c.deadline))
  )

  return {
    classes,
    deadlineSoonClasses,
    pending,
    error,
    isDeadlineSoon,
    getDeadlineDaysLeft,
    formatPrice,
    formatDate,
  }
}
