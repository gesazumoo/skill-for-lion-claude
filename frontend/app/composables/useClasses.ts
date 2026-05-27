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

const classesData: ClassItem[] = [
  {
    id: 1,
    title: '초보자도 쉽게 배우는 자유형 수영',
    category: '수영',
    price: 35000,
    location: '서울 강남구',
    date: '2026-06-05',
    maxParticipants: 8,
    currentParticipants: 6,
    thumbnail: 'https://picsum.photos/seed/swim1/400/300',
    deadline: '2026-06-03',
    description: '자유형 기초부터 배우는 1일 수영 클래스입니다.',
  },
  {
    id: 2,
    title: '한강 공원에서 함께하는 5km 러닝',
    category: '러닝',
    price: 15000,
    location: '서울 영등포구',
    date: '2026-06-01',
    maxParticipants: 20,
    currentParticipants: 14,
    thumbnail: 'https://picsum.photos/seed/run1/400/300',
    deadline: '2026-05-29',
    description: '한강 공원에서 함께 달리는 러닝 클래스입니다.',
  },
  {
    id: 3,
    title: '스트레스 해소 요가 & 명상',
    category: '운동',
    price: 40000,
    location: '서울 마포구',
    date: '2026-06-07',
    maxParticipants: 12,
    currentParticipants: 9,
    thumbnail: 'https://picsum.photos/seed/yoga1/400/300',
    deadline: '2026-06-05',
    description: '몸과 마음을 힐링하는 요가 & 명상 클래스입니다.',
  },
  {
    id: 4,
    title: 'Python 기초 프로그래밍 스터디',
    category: '스터디',
    price: 20000,
    location: '서울 종로구',
    date: '2026-06-08',
    maxParticipants: 15,
    currentParticipants: 11,
    thumbnail: 'https://picsum.photos/seed/coding1/400/300',
    deadline: '2026-06-06',
    description: '파이썬을 처음 배우는 사람을 위한 스터디입니다.',
  },
  {
    id: 5,
    title: '도자기 핸드메이드 원데이 클래스',
    category: '취미',
    price: 55000,
    location: '서울 성동구',
    date: '2026-06-10',
    maxParticipants: 6,
    currentParticipants: 4,
    thumbnail: 'https://picsum.photos/seed/pottery1/400/300',
    deadline: '2026-06-08',
    description: '나만의 도자기를 만드는 특별한 원데이 클래스입니다.',
  },
  {
    id: 6,
    title: '트램폴린으로 즐기는 전신 유산소',
    category: '운동',
    price: 25000,
    location: '서울 송파구',
    date: '2026-06-03',
    maxParticipants: 10,
    currentParticipants: 8,
    thumbnail: 'https://picsum.photos/seed/jump1/400/300',
    deadline: '2026-05-28',
    description: '트램폴린으로 즐겁고 효과적으로 운동하는 클래스입니다.',
  },
  {
    id: 7,
    title: '원어민과 함께하는 영어 회화 스터디',
    category: '스터디',
    price: 30000,
    location: '서울 강서구',
    date: '2026-06-12',
    maxParticipants: 8,
    currentParticipants: 5,
    thumbnail: 'https://picsum.photos/seed/english1/400/300',
    deadline: '2026-06-10',
    description: '원어민과 함께하는 실전 영어 회화 스터디입니다.',
  },
  {
    id: 8,
    title: '서핑 입문 원데이 클래스',
    category: '클래스',
    price: 80000,
    location: '부산 해운대구',
    date: '2026-06-15',
    maxParticipants: 10,
    currentParticipants: 7,
    thumbnail: 'https://picsum.photos/seed/surf1/400/300',
    deadline: '2026-06-13',
    description: '파도를 타는 서핑의 기초를 배우는 입문 클래스입니다.',
  },
  {
    id: 9,
    title: '1:1 퍼스널 트레이닝 헬스 클래스',
    category: '운동',
    price: 60000,
    location: '서울 강남구',
    date: '2026-05-30',
    maxParticipants: 1,
    currentParticipants: 0,
    thumbnail: 'https://picsum.photos/seed/gym1/400/300',
    deadline: '2026-05-29',
    description: '전문 트레이너와 1:1로 진행하는 맞춤형 헬스 클래스입니다.',
  },
  {
    id: 10,
    title: '수채화로 그리는 한강 풍경',
    category: '취미',
    price: 45000,
    location: '서울 용산구',
    date: '2026-06-20',
    maxParticipants: 8,
    currentParticipants: 3,
    thumbnail: 'https://picsum.photos/seed/watercolor1/400/300',
    deadline: '2026-06-18',
    description: '수채화로 아름다운 한강 풍경을 그리는 취미 클래스입니다.',
  },
  {
    id: 11,
    title: '배드민턴 기초 레슨 클래스',
    category: '운동',
    price: 22000,
    location: '서울 노원구',
    date: '2026-06-14',
    maxParticipants: 10,
    currentParticipants: 6,
    thumbnail: 'https://picsum.photos/seed/badminton1/400/300',
    deadline: '2026-06-12',
    description: '배드민턴 기초 기술을 배우는 원데이 클래스입니다.',
  },
  {
    id: 12,
    title: '제빵 기초: 나만의 빵 만들기',
    category: '취미',
    price: 65000,
    location: '서울 서초구',
    date: '2026-06-18',
    maxParticipants: 6,
    currentParticipants: 2,
    thumbnail: 'https://picsum.photos/seed/baking1/400/300',
    deadline: '2026-06-16',
    description: '집에서도 만들 수 있는 기초 제빵 클래스입니다.',
  },
]

export const CATEGORIES = ['전체', '운동', '러닝', '수영', '스터디', '취미', '클래스'] as const

export function useClasses() {
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

  const deadlineSoonClasses = classesData.filter(c => isDeadlineSoon(c.deadline))

  return {
    allClasses: classesData,
    deadlineSoonClasses,
    isDeadlineSoon,
    formatPrice,
    formatDate,
  }
}
