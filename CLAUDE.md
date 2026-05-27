이 파일의 내용은 항상 300줄 이하로 반드시 필요한 내용만 유지.

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
  - Hero 영역 (검색창 Enter → 검색 화면 이동, 카테고리 필터)
  - 추천 클래스 리스트 / 마감 임박 가로 스크롤 / 등록 유도 CTA

- **검색 화면** (`frontend/app/pages/search.vue`)
  - URL `?q=` 쿼리로 초기 검색어 수신
  - 검색바 + 카테고리 필터 칩 (상단 sticky)
  - 세로형 클래스 카드 리스트
  - 카드 클릭 → 클래스 상세보기 팝업

## 구현된 UI 컴포넌트

- `ClassCard.vue` — 가로형 클래스 카드 (variant: list/scroll)
- `ClassCardVertical.vue` — 세로형 클래스 카드 (select emit)
- `ClassDetail.vue` — 상세보기 팝업 (bottom sheet, Teleport)
- `BottomNavigation.vue` — 하단 네비게이션 (라우터 이동 포함)

## 더미 데이터 / 디자인 시스템

- 더미: `frontend/app/composables/useClasses.ts` (12개 클래스, ClassItem 타입, CATEGORIES 상수)
- 디자인: Apple 시스템 — Primary `#0066cc`, Dark tile `#272729`, Card `rounded-[18px] border border-[#e0e0e0]` no shadow, Button `rounded-[9999px]` pill

## 다음 작업자 참고사항

- 검색 화면 → 상세보기 팝업 경로: `search.vue`의 `selectedClass` ref → `ClassDetail.vue`
- 홈 검색창 Enter → `/search?q=<query>` 이동, 하단 네비 검색 버튼 → `/search`
- 등록/내정보 페이지 미구현 (router.push만 연결됨)
- `ClassDetail.vue`의 신청하기는 현재 alert 처리 (API 연결 시 교체 필요)
