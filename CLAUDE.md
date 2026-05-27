이 파일의 내용은 항상 300줄 이하로 유지.

# 작업 전 참고 문서

작업 전 아래 문서를 먼저 참고해줘.

- ./project-rules/glossary.md
- ./project-rules/workflow.md

# 작업 후 해야할 일

작업이 끝나면 아래 작업을 반드시 진행해줘. (선택 아님)
- 현재 프로젝트 상태를 CLAUDE.md에 업데이트
- /prompts 폴더에 작업 프롬프트 저장 (새 화면/기능/구조 변경 시)

---

# 현재 프로젝트 상태

## 구현된 화면

- **홈 화면** (`frontend/app/pages/index.vue`)
  - Hero 영역 (검색창, 카테고리 필터)
  - 추천 클래스 리스트
  - 마감 임박 클래스 가로 스크롤
  - 클래스 등록 유도 영역
  - 하단 네비게이션 (홈 active)

## 구현된 UI 컴포넌트

- `ClassCard.vue` — 가로형 클래스 카드 (variant: list / scroll)
- `BottomNavigation.vue` — 하단 네비게이션 (홈/검색/등록/내정보)

## 더미 데이터

- `frontend/app/composables/useClasses.ts`
  - 12개 클래스 (수영, 러닝, 운동, 스터디, 취미, 클래스 카테고리)
  - 마감 임박 클래스 3개 포함 (deadline 3일 이내)
  - `isDeadlineSoon`, `formatPrice`, `formatDate` 유틸 함수 포함

## 디자인 시스템

- **기반**: Apple 디자인 시스템 (`DESIGN.md` 기준)
- **TailwindCSS v4** (`@tailwindcss/vite` 플러그인)
- **폰트**: `system-ui, -apple-system` (SF Pro) + Inter fallback (Google Fonts)
- **Primary**: `#0066cc` (Action Blue) — 버튼, 링크, 활성 상태 전용
- **섹션 리듬**: `#272729` Dark tile ↔ `#ffffff` White ↔ `#f5f5f7` Parchment (색 전환이 구분선)
- **텍스트**: `#1d1d1f` ink / `#7a7a7a` muted / `#cccccc` on-dark
- **카드**: `rounded-[18px]` + `border border-[#e0e0e0]` + **no shadow**
- **버튼**: `rounded-[9999px]` pill 전용 + `active:scale-95`
- **하단 내비**: `bg-black`, active=`#0066cc`
- **타이포**: 34px/600/-0.374px (display), 17px/400/-0.374px (body), 14px/400/-0.224px (caption)

## 다음 작업자 참고사항

- `ClassCard.vue`는 홈 외 다른 화면에서도 재사용 가능 (variant prop으로 list/scroll 전환)
- `useClasses.ts`의 `ClassItem` 타입과 더미 데이터를 다음 화면에서 그대로 재사용
- `CATEGORIES` 상수도 export되어 있음 (카테고리 목록 공통 사용)
- `BottomNavigation.vue`는 `active-menu` prop으로 active 메뉴 지정
- TailwindCSS 설정: `frontend/app/assets/css/main.css` (scrollbar-hide 유틸 포함)
