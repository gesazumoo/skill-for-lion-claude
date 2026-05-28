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

const dummyClasses: ClassItem[] = [
  {
    id: 1,
    title: '아크릴화 입문 클래스',
    category: '취미',
    price: 45000,
    location: '성동구',
    date: '2026-05-28',
    maxParticipants: 8,
    currentParticipants: 7,
    thumbnail: 'https://picsum.photos/seed/art101/400/300',
    deadline: '2026-05-28',
    description: '아크릴 물감으로 나만의 작품을 만들어보는 입문 클래스입니다. 재료 포함.'
  },
  {
    id: 2,
    title: '올림픽공원 수영 레슨',
    category: '수영',
    price: 55000,
    location: '송파구',
    date: '2026-05-29',
    maxParticipants: 6,
    currentParticipants: 5,
    thumbnail: 'https://picsum.photos/seed/swim201/400/300',
    deadline: '2026-05-29',
    description: '올림픽공원 수영장에서 진행하는 소규모 개인 레슨입니다.'
  },
  {
    id: 3,
    title: '영어 스피킹 스터디',
    category: '스터디',
    price: 20000,
    location: '강남구',
    date: '2026-05-29',
    maxParticipants: 10,
    currentParticipants: 8,
    thumbnail: 'https://picsum.photos/seed/english301/400/300',
    deadline: '2026-05-29',
    description: '원어민과 함께하는 영어 회화 스터디. 실생활 영어 표현 집중 학습.'
  },
  {
    id: 4,
    title: '강남 요가 클래스',
    category: '운동',
    price: 35000,
    location: '강남구',
    date: '2026-05-30',
    maxParticipants: 10,
    currentParticipants: 6,
    thumbnail: 'https://picsum.photos/seed/yoga401/400/300',
    deadline: '2026-05-30',
    description: '초보자도 쉽게 따라할 수 있는 하타 요가 클래스입니다.'
  },
  {
    id: 5,
    title: '홈트레이닝 HIIT',
    category: '운동',
    price: 25000,
    location: '강서구',
    date: '2026-05-31',
    maxParticipants: 12,
    currentParticipants: 9,
    thumbnail: 'https://picsum.photos/seed/hiit501/400/300',
    deadline: '2026-05-31',
    description: '45분 동안 전신을 단련하는 고강도 인터벌 트레이닝 클래스.'
  },
  {
    id: 6,
    title: '한강 러닝 클럽',
    category: '러닝',
    price: 20000,
    location: '여의도',
    date: '2026-06-01',
    maxParticipants: 20,
    currentParticipants: 8,
    thumbnail: 'https://picsum.photos/seed/run601/400/300',
    deadline: '2026-06-01',
    description: '한강 러닝코스를 함께 달리는 페이스별 그룹 러닝 클래스.'
  },
  {
    id: 7,
    title: '코딩 스터디 (파이썬)',
    category: '스터디',
    price: 15000,
    location: '서초구',
    date: '2026-06-02',
    maxParticipants: 8,
    currentParticipants: 3,
    thumbnail: 'https://picsum.photos/seed/code701/400/300',
    deadline: '2026-06-02',
    description: '파이썬 기초부터 실전 프로젝트까지 함께 공부하는 코딩 스터디.'
  },
  {
    id: 8,
    title: '도자기 만들기 클래스',
    category: '취미',
    price: 55000,
    location: '마포구',
    date: '2026-06-03',
    maxParticipants: 6,
    currentParticipants: 2,
    thumbnail: 'https://picsum.photos/seed/pottery801/400/300',
    deadline: '2026-06-03',
    description: '도예 전문가와 함께 나만의 도자기를 만들어보는 원데이 클래스.'
  },
  {
    id: 9,
    title: '플라워 아트 클래스',
    category: '취미',
    price: 40000,
    location: '용산구',
    date: '2026-06-04',
    maxParticipants: 8,
    currentParticipants: 4,
    thumbnail: 'https://picsum.photos/seed/flower901/400/300',
    deadline: '2026-06-04',
    description: '생화로 꽃다발과 플라워 박스를 만드는 플로리스트 클래스.'
  },
  {
    id: 10,
    title: '바리스타 입문 클래스',
    category: '클래스',
    price: 60000,
    location: '종로구',
    date: '2026-06-05',
    maxParticipants: 6,
    currentParticipants: 1,
    thumbnail: 'https://picsum.photos/seed/coffee1001/400/300',
    deadline: '2026-06-05',
    description: '핸드드립부터 에스프레소까지, 커피의 모든 것을 배우는 클래스.'
  },
  {
    id: 11,
    title: '뜨개질 원데이 클래스',
    category: '취미',
    price: 30000,
    location: '은평구',
    date: '2026-06-07',
    maxParticipants: 10,
    currentParticipants: 5,
    thumbnail: 'https://picsum.photos/seed/knit1101/400/300',
    deadline: '2026-06-07',
    description: '기초 뜨개질로 컵홀더와 머플러를 완성하는 입문 클래스.'
  },
  {
    id: 12,
    title: '북한산 등산 클럽',
    category: '운동',
    price: 18000,
    location: '도봉구',
    date: '2026-06-08',
    maxParticipants: 15,
    currentParticipants: 7,
    thumbnail: 'https://picsum.photos/seed/hike1201/400/300',
    deadline: '2026-06-08',
    description: '가이드와 함께하는 북한산 둘레길 트레킹 클래스.'
  },
  {
    id: 13,
    title: '수채화 풍경 클래스',
    category: '취미',
    price: 38000,
    location: '종로구',
    date: '2026-06-10',
    maxParticipants: 8,
    currentParticipants: 2,
    thumbnail: 'https://picsum.photos/seed/paint1301/400/300',
    deadline: '2026-06-10',
    description: '수채화로 아름다운 풍경화를 그리는 입문 클래스. 재료 제공.'
  },
  {
    id: 14,
    title: '볼링 입문 클래스',
    category: '클래스',
    price: 22000,
    location: '영등포구',
    date: '2026-06-12',
    maxParticipants: 10,
    currentParticipants: 3,
    thumbnail: 'https://picsum.photos/seed/bowl1401/400/300',
    deadline: '2026-06-12',
    description: '볼링 기초 자세부터 스트라이크 노하우까지 배우는 원데이 클래스.'
  }
]

export const useClasses = () => {
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

  const classes = ref(dummyClasses)

  const deadlineSoonClasses = computed(() =>
    dummyClasses.filter(c => isDeadlineSoon(c.deadline))
  )

  return {
    classes,
    deadlineSoonClasses,
    isDeadlineSoon,
    getDeadlineDaysLeft,
    formatPrice,
    formatDate
  }
}
