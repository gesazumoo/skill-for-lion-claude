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

export const CATEGORIES = ['전체', '운동', '러닝', '수영', '스터디', '취미', '클래스']

const today = new Date()
const addDays = (d: number) => {
  const dt = new Date(today)
  dt.setDate(dt.getDate() + d)
  return dt.toISOString().split('T')[0]
}

export const DUMMY_CLASSES: ClassItem[] = [
  {
    id: 1,
    title: '한강 새벽 러닝 클래스',
    category: '러닝',
    price: 15000,
    location: '서울 마포구',
    date: addDays(3),
    maxParticipants: 20,
    currentParticipants: 14,
    thumbnail: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=400&fit=crop',
    deadline: addDays(2),
    description: '한강 노을길을 따라 달리는 새벽 러닝 클래스입니다. 초보자도 환영하며 페이스메이커가 함께합니다.',
  },
  {
    id: 2,
    title: '요가 & 명상 원데이 클래스',
    category: '운동',
    price: 35000,
    location: '서울 강남구',
    date: addDays(5),
    maxParticipants: 12,
    currentParticipants: 8,
    thumbnail: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=400&fit=crop',
    deadline: addDays(4),
    description: '바디스캔 명상과 흐름 요가를 결합한 2시간 집중 클래스입니다. 매트 제공.',
  },
  {
    id: 3,
    title: '수영 기초 원데이 레슨',
    category: '수영',
    price: 45000,
    location: '서울 송파구',
    date: addDays(7),
    maxParticipants: 8,
    currentParticipants: 6,
    thumbnail: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=400&fit=crop',
    deadline: addDays(6),
    description: '자유형 기초부터 배우는 성인 수영 레슨. 국가대표 출신 코치가 직접 지도합니다.',
  },
  {
    id: 4,
    title: '독서 토론 스터디 클럽',
    category: '스터디',
    price: 10000,
    location: '서울 종로구',
    date: addDays(4),
    maxParticipants: 10,
    currentParticipants: 7,
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
    deadline: addDays(3),
    description: '이번 달 선정 도서를 함께 읽고 이야기 나누는 소규모 독서 모임입니다.',
  },
  {
    id: 5,
    title: '도예 핸드빌딩 원데이 클래스',
    category: '취미',
    price: 55000,
    location: '서울 성동구',
    date: addDays(6),
    maxParticipants: 6,
    currentParticipants: 3,
    thumbnail: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop',
    deadline: addDays(5),
    description: '흙을 손으로 빚어 나만의 컵을 만드는 도예 클래스. 재료비 포함.',
  },
  {
    id: 6,
    title: '크로스핏 입문 원데이',
    category: '운동',
    price: 25000,
    location: '서울 마포구',
    date: addDays(2),
    maxParticipants: 15,
    currentParticipants: 13,
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
    deadline: addDays(1),
    description: '전문 코치와 함께하는 크로스핏 입문 수업. 기초 동작부터 WOD까지.',
  },
  {
    id: 7,
    title: '수채화 풍경 드로잉',
    category: '취미',
    price: 40000,
    location: '서울 서대문구',
    date: addDays(8),
    maxParticipants: 8,
    currentParticipants: 4,
    thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
    deadline: addDays(7),
    description: '서울 도심 풍경을 수채화로 표현하는 야외 드로잉 클래스입니다.',
  },
  {
    id: 8,
    title: '영어 스피킹 집중 스터디',
    category: '스터디',
    price: 20000,
    location: '서울 강남구',
    date: addDays(10),
    maxParticipants: 6,
    currentParticipants: 2,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop',
    deadline: addDays(9),
    description: '원어민과 함께하는 프리토킹 중심 영어 스피킹 클래스. 소수 정예.',
  },
  {
    id: 9,
    title: '아침 필라테스 원데이',
    category: '운동',
    price: 30000,
    location: '서울 용산구',
    date: addDays(1),
    maxParticipants: 10,
    currentParticipants: 9,
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop',
    deadline: addDays(0),
    description: '코어 강화와 체형 교정에 집중하는 아침 필라테스 1일 집중 과정.',
  },
  {
    id: 10,
    title: '오픈워터 수영 체험',
    category: '수영',
    price: 60000,
    location: '경기 가평군',
    date: addDays(12),
    maxParticipants: 12,
    currentParticipants: 8,
    thumbnail: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=400&fit=crop',
    deadline: addDays(11),
    description: '청평호에서 즐기는 오픈워터 수영 체험. 안전 장비 및 가이드 포함.',
  },
  {
    id: 11,
    title: '트레일 러닝 입문',
    category: '러닝',
    price: 20000,
    location: '서울 북한산',
    date: addDays(9),
    maxParticipants: 15,
    currentParticipants: 10,
    thumbnail: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=400&fit=crop',
    deadline: addDays(8),
    description: '북한산 둘레길을 달리는 트레일 러닝 입문 클래스. 장비 가이드 포함.',
  },
  {
    id: 12,
    title: '캘리그라피 원데이 클래스',
    category: '취미',
    price: 35000,
    location: '서울 은평구',
    date: addDays(14),
    maxParticipants: 8,
    currentParticipants: 5,
    thumbnail: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=400&fit=crop',
    deadline: addDays(13),
    description: '붓펜으로 배우는 현대 캘리그라피. 기초 획순부터 작품 완성까지.',
  },
  {
    id: 13,
    title: 'IT 코딩 스터디 입문',
    category: '스터디',
    price: 15000,
    location: '서울 강서구',
    date: addDays(11),
    maxParticipants: 10,
    currentParticipants: 6,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop',
    deadline: addDays(10),
    description: 'Python 기초부터 시작하는 코딩 입문 스터디. 노트북만 있으면 OK.',
  },
  {
    id: 14,
    title: '비치 발리볼 원데이',
    category: '운동',
    price: 18000,
    location: '서울 한강공원',
    date: addDays(3),
    maxParticipants: 12,
    currentParticipants: 10,
    thumbnail: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&h=400&fit=crop',
    deadline: addDays(2),
    description: '한강 모래사장에서 즐기는 비치 발리볼 원데이 클래스. 팀 구성 포함.',
  },
]

export function useClasses() {
  const allClasses = computed(() => DUMMY_CLASSES)

  const deadlineSoonClasses = computed(() =>
    DUMMY_CLASSES.filter(c => isDeadlineSoon(c.deadline))
  )

  const featuredClasses = computed(() =>
    DUMMY_CLASSES.slice(0, 8)
  )

  function filterByCategory(category: string) {
    if (category === '전체') return DUMMY_CLASSES
    return DUMMY_CLASSES.filter(c => c.category === category)
  }

  function searchClasses(query: string, category: string = '전체') {
    const q = query.toLowerCase()
    let results = category === '전체' ? DUMMY_CLASSES : DUMMY_CLASSES.filter(c => c.category === category)
    if (q) {
      results = results.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
      )
    }
    return results
  }

  return { allClasses, deadlineSoonClasses, featuredClasses, filterByCategory, searchClasses }
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
