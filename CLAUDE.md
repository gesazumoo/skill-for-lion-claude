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

**TailwindCSS v4 via Vite plugin**: `tailwind.config.ts` 없음. `nuxt.config.ts`의 `vite.plugins`에 `tailwindcss()`를 등록하고, `app/assets/css/main.css`에서 `@import "tailwindcss"`로 로드. 커스텀 테마 없이 arbitrary values(`[#0066cc]`, `[18px]`) 전용.

**단일 데이터 소스**: `app/composables/useClasses.ts`가 모든 화면의 더미 데이터, 타입(`ClassItem`), 유틸(`isDeadlineSoon`, `formatPrice`, `formatDate`), 카테고리 목록(`CATEGORIES`)을 제공. API 연결 전까지 이 파일만 수정.

**컴포넌트 자동 import**: `app/components/`의 컴포넌트는 import 없이 템플릿에서 바로 사용 가능. composables도 동일.

## Design System (Apple — DESIGN.md 기반)

현재 디자인 시스템은 `DESIGN.md`의 Apple 스펙을 따름. `/apply-design` 스킬로 `DESIGN.md` 교체 시 전체 재적용 가능.

| 토큰 | 값 | 용도 |
|---|---|---|
| Primary | `#0066cc` | 버튼, 링크, active 상태 — 유일한 accent |
| Ink | `#1d1d1f` | 모든 헤드라인/본문 텍스트 |
| Muted | `#7a7a7a` | 보조 정보, 레이블 |
| On-dark | `#cccccc` | dark tile 위 보조 텍스트 |
| Dark tile | `#272729` | Hero, CTA 섹션 배경 |
| Canvas | `#ffffff` | 콘텐츠 섹션 배경 |
| Parchment | `#f5f5f7` | 보조 섹션, page canvas |
| Card radius | `rounded-[18px]` | 모든 카드 |
| Button shape | `rounded-[9999px]` | 모든 버튼 (pill 전용) |
| Shadow | 없음 | 카드에 그림자 사용 금지, hairline border만 |

**섹션 리듬**: Dark tile → White → Parchment → Dark (색 전환이 구분선, border 없음)

## Component Map

| 컴포넌트 | 역할 |
|---|---|
| `ClassCard.vue` | 가로형 카드 — `variant="list"` (세로 리스트용) / `variant="scroll"` (가로 스크롤용) |
| `ClassCardVertical.vue` | 세로형 카드 — 검색 결과 리스트용, `@select` emit |
| `ClassDetail.vue` | 상세보기 바텀 시트 — `<Teleport to="body">`, `@close` emit |
| `BottomNavigation.vue` | 하단 네비 — `active-menu` prop, router.push 내장 |

## Routing

| 경로 | 화면 |
|---|---|
| `/` | 홈 화면 — 추천/마감임박 클래스, CTA |
| `/search?q=<query>` | 검색 화면 — 쿼리 파라미터로 초기 검색어 수신 |
| `/register` | 미구현 (네비 버튼만 연결) |
| `/profile` | 미구현 (네비 버튼만 연결) |

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

- **홈** (`pages/index.vue`) — Hero(검색+카테고리), 추천 리스트, 마감임박 스크롤, 등록 CTA
- **검색** (`pages/search.vue`) — 검색바+필터(sticky), 세로형 카드 리스트, 상세보기 팝업

## 미구현

- 등록 화면 (`/register`)
- 내정보 화면 (`/profile`)
- 신청하기 API 연결 (현재 alert 처리)
- 마감 임박 기준일이 하드코딩 — API 연결 시 서버 시간 기준으로 교체 필요
