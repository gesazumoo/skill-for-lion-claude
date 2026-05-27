export interface ClassItem {
  id: number
  title: string
  category: string
  date: string
  location: string
  currentParticipants: number
  maxParticipants: number
  price: number
  thumbnail: string
  host: string
  deadline?: string
}

export const categories = ['전체', '운동', '러닝', '수영', '스터디', '취미', '클래스']

export const popularClasses: ClassItem[] = [
  {
    id: 1,
    title: '한강 일출 러닝 클래스',
    category: '러닝',
    date: '2025-05-28 (수) 오전 6:00',
    location: '서울 마포구 한강공원',
    currentParticipants: 12,
    maxParticipants: 20,
    price: 15000,
    thumbnail: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&q=80',
    host: '러닝메이트 김코치',
  },
  {
    id: 2,
    title: '초보자를 위한 수영 특강',
    category: '수영',
    date: '2025-05-29 (목) 오후 7:00',
    location: '서울 강남구 스포츠센터',
    currentParticipants: 6,
    maxParticipants: 8,
    price: 35000,
    thumbnail: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=600&q=80',
    host: '박수영 강사',
  },
  {
    id: 3,
    title: '필라테스 원데이 체험',
    category: '운동',
    date: '2025-05-30 (금) 오전 10:00',
    location: '서울 용산구 이태원',
    currentParticipants: 5,
    maxParticipants: 10,
    price: 28000,
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    host: '이필라 강사',
  },
  {
    id: 4,
    title: '영어 스피킹 스터디',
    category: '스터디',
    date: '2025-05-28 (수) 오후 8:00',
    location: '서울 마포구 홍대 카페',
    currentParticipants: 8,
    maxParticipants: 12,
    price: 10000,
    thumbnail: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=600&q=80',
    host: '영어하는 최지수',
  },
  {
    id: 5,
    title: '드로잉 원데이 클래스',
    category: '취미',
    date: '2025-05-31 (토) 오후 2:00',
    location: '서울 성동구 성수동',
    currentParticipants: 9,
    maxParticipants: 15,
    price: 45000,
    thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    host: '드로잉 아티스트 유리',
  },
  {
    id: 6,
    title: '클라이밍 입문 클래스',
    category: '운동',
    date: '2025-06-01 (일) 오전 11:00',
    location: '서울 마포구 클라이밍짐',
    currentParticipants: 4,
    maxParticipants: 6,
    price: 40000,
    thumbnail: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=80',
    host: '클라이밍 박준혁',
  },
]

export const deadlineClasses: ClassItem[] = [
  {
    id: 7,
    title: '오늘 저녁 요가 클래스',
    category: '운동',
    date: '2025-05-27 (화) 오후 7:30',
    location: '서울 강남구 역삼',
    currentParticipants: 7,
    maxParticipants: 8,
    price: 20000,
    thumbnail: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&q=80',
    host: '요가 마스터 송하나',
    deadline: '오늘 마감',
  },
  {
    id: 8,
    title: '핸드드립 커피 클래스',
    category: '취미',
    date: '2025-05-27 (화) 오후 4:00',
    location: '서울 종로구 익선동',
    currentParticipants: 5,
    maxParticipants: 6,
    price: 38000,
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    host: '바리스타 정민준',
    deadline: '2시간 후 마감',
  },
  {
    id: 9,
    title: '홍대 스트리트 러닝',
    category: '러닝',
    date: '2025-05-27 (화) 오후 8:00',
    location: '서울 마포구 홍대입구',
    currentParticipants: 10,
    maxParticipants: 12,
    price: 5000,
    thumbnail: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=600&q=80',
    host: '런클럽 서울',
    deadline: '오늘 마감',
  },
  {
    id: 10,
    title: '도예 원데이 클래스',
    category: '취미',
    date: '2025-05-27 (화) 오후 1:00',
    location: '서울 성동구 서울숲',
    currentParticipants: 3,
    maxParticipants: 4,
    price: 55000,
    thumbnail: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80',
    host: '도예 작가 임수진',
    deadline: '1자리 남음',
  },
]
