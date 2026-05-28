# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

이 파일의 내용은 항상 300줄 이하로 유지. 상세 내용은 `project-rules/`에 위치.

---

# Supabase 연동

이 프로젝트는 **무조건 `lion-test` 프로젝트에만 연동**한다.

- 프로젝트명: `lion-test`
- Project ID: `totwcjbvukmnfehhbfca`
- Region: `ap-northeast-2` (서울)

DB 작업, 마이그레이션, API 연동 등 모든 Supabase 작업은 이 프로젝트 ID를 사용해야 함. 다른 프로젝트는 절대 변경을 가하지 않는다.

---

# 작업 전 참고 문서

작업 전 아래 문서를 먼저 참고해줘.

- `./project-rules/glossary.md` — UI 용어 정의 (클래스 카드, 상세보기 등)
- `./project-rules/workflow.md` — 작업 완료 체크리스트

# 작업 후 해야할 일

작업이 끝나면 아래 작업을 반드시 진행해줘. (선택 아님)
- 현재 프로젝트 상태를 CLAUDE.md에 업데이트
- `/prompts` 폴더에 작업 프롬프트 저장 (새 화면/기능/구조 변경 시)

---

# Commands

All commands run from `frontend/`:

```bash
npm run dev       # dev server → http://localhost:3000
npm run build     # production build
npm run generate  # static site generation
npm run preview   # preview production build
```

Dev server는 `/dev` 스킬로도 실행 가능: HMR 활성화, 재시작 없이 파일 변경 즉시 반영.

---

# Architecture

## Project Layout

```
skill-for-lion-claude/
├── CLAUDE.md              # 이 파일
├── DESIGN.md              # 디자인 시스템 명세 (/apply-design 스킬이 읽음)
├── frontend/              # Nuxt 4 앱
│   ├── nuxt.config.ts     # Vite plugin 설정 (TailwindCSS)
│   └── app/               # srcDir — Nuxt 4의 기본 소스 루트
│       ├── app.vue
│       ├── assets/css/main.css   # TailwindCSS 진입점
│       ├── pages/         # file-based routing
│       ├── components/    # 자동 import
│       └── composables/   # 자동 import
├── project-rules/         # 용어 정의 및 작업 규칙
├── prompts/               # 화면별 작업 프롬프트 기록
└── .claude/skills/        # 슬래시 커맨드 정의
```

## Key Architectural Decisions

**Nuxt 4 with `app/` srcDir**: 모든 소스 코드는 `frontend/app/` 아래. `~/` alias가 `app/`을 가리킴. `nuxt.config.ts`는 `frontend/` 루트에 위치.

**컴포넌트 자동 import**: `app/components/`의 컴포넌트는 import 없이 템플릿에서 바로 사용 가능. composables도 동일.

---

# Available Skills

| 스킬 | 설명 |
|---|---|
| `/dev` | frontend 개발 서버 실행 |
| `/push` | 변경사항 커밋 & 푸시 (자동 메시지 생성) |
| `/apply-design` | `DESIGN.md`를 읽고 frontend 전체 디자인 재작성 |
| `/reset-frontend` | frontend를 빈 Nuxt3 상태로 초기화 |

---

# 현재 프로젝트 상태

## 구현된 화면

- **홈** (`pages/index.vue`) — Hero(검색+카테고리 필터), 추천 클래스 가로 스크롤, 마감 임박 가로 스크롤, 등록 CTA 밴드
- **검색** (`pages/search.vue`) — 검색바+카테고리 필터(sticky), 세로 스크롤 클래스 리스트, 클래스 상세보기 바텀 시트

## 미구현 (네비 버튼만 연결)

- `/register` — 등록 화면
- `/profile` — 내정보 화면

## 주요 파일

| 파일 | 역할 |
|---|---|
| `app/composables/useClasses.ts` | ClassItem 타입, CATEGORIES, 더미 데이터 14개, isDeadlineSoon / formatPrice / formatDate 유틸 |
| `app/components/ClassCard.vue` | 가로형 카드 — `variant="scroll"` (가로 스크롤) / `variant="list"` (세로 리스트, 검색 화면용) |
| `app/components/ClassCardVertical.vue` | 세로형 카드 — 홈 마감임박 가로 스크롤용, 신청하기 버튼(alert) 포함, `@select` emit |
| `app/components/ClassDetail.vue` | 클래스 상세보기 바텀 시트 — `<Teleport to="body">`, `@close` emit, 신청하기 버튼 |
| `app/components/BottomNavigation.vue` | 하단 네비 — `active-menu` prop, 라우트 기반 active 상태 |
| `app/app.vue` | NuxtPage + BottomNavigation 전역 배치, 현재 라우트로 activeMenu 자동 계산 |

## 검색 화면 동작

- 홈 검색바에서 Enter → `/search?q=<키워드>` 이동, 검색어 자동 입력
- 하단 네비 검색 탭 클릭 → `/search` 이동
- 검색어(title/category/location) + 카테고리 필터 동시 적용
- 클래스 카드 클릭 → ClassDetail 바텀 시트 오픈 (overlay 클릭 또는 × 버튼으로 닫힘)

## 홈 화면 동작

- Hero 영역: 검색창 Enter → `/search?q=<키워드>` 이동
- 카테고리 버튼 클릭 → `/search?category=<카테고리>` 이동
- 추천/마감임박 클래스 카드 클릭 → ClassDetail 바텀 시트 오픈
- 등록 유도 CTA → `/register` 이동

## 데이터 현황

- **Supabase 미연결** — 더미 데이터만 사용
- `useClasses.ts`의 DUMMY_CLASSES 14개로 화면 데이터 구성
- 마감 임박 판단(`isDeadlineSoon`): 브라우저 로컬 시간 기준, 3일 이내

## 다음 작업 참고

- API 연결 시 `useClasses.ts`의 DUMMY_CLASSES 제거 후 Supabase fetch로 교체
- 마감 임박 판단은 서비스 운영 시 서버 시간 기준으로 교체 필요
- ClassDetail의 신청하기는 현재 alert — 실제 신청 API 연결 필요
