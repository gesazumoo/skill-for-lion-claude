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

## 디자인 시스템

**Nike Design Language** (`DESIGN.md` 기반) 적용 완료.

- **폰트**: Bebas Neue (Hero 캠페인 헤드라인) + Inter 400/500 (UI 전반)
- **Ink**: `#111111` — 기본 CTA, 제목, 활성 상태 (Nike의 유일한 "컬러")
- **Canvas**: `#ffffff` — 페이지 배경, 카드 배경
- **Soft Cloud**: `#f5f5f5` — 카드 이미지 배경, 검색 필, 섹션 배경
- **Hairline**: `#cacacb` / Hairline Soft: `#e5e5e5` (divider)
- **Mute**: `#707072` / Stone: `#9e9ea0` (보조 텍스트)
- **Sale**: `#d30005` — 마감임박 뱃지 텍스트 (유일한 컬러 포인트)
- **Radius**: 0px (카드/컨테이너) / 24px (검색 필) / 30px (CTA 버튼, 필터 칩) / 9999px (아이콘 원형)
- **Shadow**: 없음 (완전 플랫)
- **Display**: Bebas Neue, 72-96px / lh 0.9 / uppercase (Hero 전용)
- **Section heading**: 32px / weight 500 / lh 1.2
- **Body**: 16px / weight 400 / lh 1.5
- **Section rhythm**: ink hero (black) → white canvas → soft-cloud → ink CTA band (black)

## 주요 파일

| 파일 | 역할 |
|---|---|
| `app/composables/useClasses.ts` | ClassItem 타입, CATEGORIES, 더미 데이터 14개, isDeadlineSoon / formatPrice / formatDate 유틸 |
| `app/components/ClassCard.vue` | Nike product-card 스타일 — zero radius, zero shadow / `variant="scroll"` (1:1 이미지) / `variant="list"` (검색 화면) |
| `app/components/ClassCardVertical.vue` | 마감임박 세로 카드 — 4:5 이미지, zero radius, ink pill 신청하기 버튼 |
| `app/components/ClassDetail.vue` | 클래스 상세보기 바텀 시트 — `<Teleport to="body">`, hairline divider rows, ink 신청하기 버튼 |
| `app/components/BottomNavigation.vue` | 하단 네비 — white bg, hairline-top border, active=#111111, inactive=#9e9ea0 |
| `app/app.vue` | NuxtPage + BottomNavigation 전역 배치, 현재 라우트로 activeMenu 자동 계산 |
| `nuxt.config.ts` | Google Fonts Bebas Neue + Inter 로드 (head.link), @tailwindcss/vite 플러그인 |

## 검색 화면 동작

- 홈 검색바에서 Enter → `/search?q=<키워드>` 이동, 검색어 자동 입력
- 하단 네비 검색 탭 클릭 → `/search` 이동
- 검색어(title/category/location) + 카테고리 필터 동시 적용
- 클래스 카드 클릭 → ClassDetail 바텀 시트 오픈 (overlay 클릭 또는 × 버튼으로 닫힘)

## 홈 화면 동작

- Hero 영역 (ink #111111): Bebas Neue 대형 캠페인 헤드라인, 검색창 Enter → `/search?q=<키워드>` 이동
- 카테고리 칩 클릭 → `/search?category=<카테고리>` 이동
- 추천 클래스 섹션 (white canvas): 가로 스크롤 카드, 전체보기 → `/search`
- 마감 임박 섹션 (soft cloud #f5f5f5): 가로 스크롤 카드
- 추천/마감임박 클래스 카드 클릭 → ClassDetail 바텀 시트 오픈
- CTA 밴드 (ink #111111): Bebas Neue 헤드라인, 클래스 등록하기 → `/register`, 클래스 둘러보기 → `/search`

## 데이터 현황

- **Supabase 연결 완료** — `lion-test` 프로젝트 (`totwcjbvukmnfehhbfca`)
- `classes` 테이블 생성 및 14개 초기 데이터 시딩 완료
- 더미 데이터(`DUMMY_CLASSES`) 제거 — Supabase fetch로 교체
- 마감 임박 판단(`isDeadlineSoon`): 브라우저 로컬 시간 기준, 3일 이내

## Supabase 테이블

| 테이블 | 설명 | 연결된 화면 |
|---|---|---|
| `classes` | 클래스 목록 (조회 전용) | 홈, 검색 |

### `classes` 테이블 컬럼

| 컬럼 | 타입 | 설명 |
|---|---|---|
| `id` | BIGSERIAL | PK |
| `title` | TEXT | 클래스 제목 |
| `category` | TEXT | 카테고리 |
| `price` | INTEGER | 가격 (원) |
| `location` | TEXT | 지역 |
| `date` | DATE | 진행 날짜 |
| `max_participants` | INTEGER | 최대 인원 |
| `current_participants` | INTEGER | 현재 신청 인원 |
| `thumbnail` | TEXT | 썸네일 URL |
| `deadline` | DATE | 신청 마감일 |
| `description` | TEXT | 상세 설명 |
| `created_at` | TIMESTAMPTZ | 생성 시각 |

RLS: anon 역할에 SELECT 허용 (`public_read` 정책)

## Supabase 연동 파일

| 파일 | 역할 |
|---|---|
| `frontend/.env` | SUPABASE_URL, SUPABASE_ANON_KEY 환경변수 |
| `frontend/nuxt.config.ts` | runtimeConfig.public 선언 |
| `frontend/app/plugins/supabase.ts` | Supabase 클라이언트 생성 및 `$supabase`로 주입 |
| `frontend/app/composables/useClasses.ts` | `useAsyncData('classes', ...)` 로 Supabase fetch |

## 다음 작업 참고

- 마감 임박 판단은 서비스 운영 시 서버 시간 기준으로 교체 필요
- ClassDetail의 신청하기는 현재 alert — 실제 신청 API 연결 필요
- 클래스 등록 화면(`/register`) 구현 시 INSERT API 연결 필요
- `$supabase` 타입 자동 완성을 위해 Nuxt 플러그인 타입 선언 추가 가능 (`plugins/supabase.d.ts`)
