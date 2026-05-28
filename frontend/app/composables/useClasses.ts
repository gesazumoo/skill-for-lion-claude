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
}

interface DbClass {
  id: number
  title: string
  category: string
  price: number
  location: string
  date: string
  max_participants: number
  current_participants: number
  thumbnail: string
  deadline: string
  description: string
}

function mapRow(row: DbClass): ClassItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    price: row.price,
    location: row.location,
    date: row.date,
    maxParticipants: row.max_participants,
    currentParticipants: row.current_participants,
    thumbnail: row.thumbnail,
    deadline: row.deadline,
    description: row.description,
  }
}

export const CATEGORIES = ['전체', '운동', '러닝', '수영', '스터디', '취미', '클래스']

export function useClasses() {
  const { $supabase } = useNuxtApp()

  const { data: rawClasses, pending, error } = useAsyncData<ClassItem[]>(
    'classes',
    async () => {
      const { data, error: fetchError } = await ($supabase as any)
        .from('classes')
        .select('*')
        .order('created_at', { ascending: true })

      if (fetchError) throw fetchError
      return (data as DbClass[]).map(mapRow)
    },
    { default: () => [] as ClassItem[] }
  )

  const allClasses = computed(() => rawClasses.value ?? [])

  const deadlineSoonClasses = computed(() =>
    allClasses.value.filter(c => isDeadlineSoon(c.deadline))
  )

  const featuredClasses = computed(() =>
    allClasses.value.slice(0, 8)
  )

  function filterByCategory(category: string) {
    if (category === '전체') return allClasses.value
    return allClasses.value.filter(c => c.category === category)
  }

  function searchClasses(query: string, category: string = '전체') {
    const q = query.toLowerCase()
    let results = category === '전체'
      ? allClasses.value
      : allClasses.value.filter(c => c.category === category)
    if (q) {
      results = results.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
      )
    }
    return results
  }

  return { allClasses, deadlineSoonClasses, featuredClasses, filterByCategory, searchClasses, pending, error }
}

export function isDeadlineSoon(deadline: string): boolean {
  const deadlineDate = new Date(deadline)
  const now = new Date()
  const diffMs = deadlineDate.getTime() - now.getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  return diffDays >= 0 && diffDays <= 3
}

export function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR') + '원'
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}월 ${date.getDate()}일`
}
