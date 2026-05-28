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

## 상태

**회원가입/로그인 구현 완료 + 내정보 화면 연동** (2026-05-28)

### 디자인 시스템
- **DESIGN.md 기반**: Nike 디자인 시스템 전면 적용
- 컬러: ink `#111111` / canvas `#fff` / soft-cloud `#f5f5f5` / sale `#d30005` / mute `#707072`
- 폰트: Black Han Sans (캠페인 헤드라인) + Inter (UI 본문)
- 카드: 완전 flat (radius 0, shadow 없음)
- 버튼: pill `rounded-[30px]`, h-12, ink/canvas 반전
- Hero: ink 다크밴드 + 캠페인 헤드라인 + soft-cloud 검색
- 섹션 라벨: uppercase + letter-spacing tracking

### 구현된 화면
- `app/pages/index.vue` — 홈 화면 (ink Hero, 추천 클래스, 마감 임박, ink CTA 밴드)
- `app/pages/search.vue` — 검색 화면 (sticky 검색창, 카테고리 필터, 2열 그리드 클래스 리스트)
- `app/pages/classes/[id].vue` — 클래스 상세보기 화면 (썸네일, 전체 정보, 하단 고정 CTA)
- `app/pages/register.vue` — 클래스 등록 화면 (입력 폼, 썸네일 업로드, Supabase INSERT)
- `app/pages/auth.vue` — 로그인/회원가입 화면 (모드 전환, 이메일 인증 안내, 에러 처리)
- `app/pages/profile.vue` — 내정보 화면 (비로그인 CTA / 로그인 사용자 정보 + 로그아웃)

### 구현된 컴포넌트
- `app/components/ClassCardHorizontal.vue` — 가로형 클래스 카드 (추천 클래스용, flat Nike 스타일)
- `app/components/ClassCardVertical.vue` — 세로형 클래스 카드 (`fullWidth` prop으로 2열 그리드 / 가로 스크롤 모두 지원)
- `app/components/BottomNavigation.vue` — 하단 네비게이션 (NuxtLink로 실제 라우팅 연결)

### 구현된 Composable
- `app/composables/useClasses.ts` — Supabase `classes` 테이블 fetch, snake_case → camelCase 매핑, isDeadlineSoon/formatPrice/formatDate 유틸

### 설치된 패키지
- `tailwindcss` + `@tailwindcss/vite` — TailwindCSS v4 (Vite 플러그인 방식)
- `@nuxtjs/supabase` — Supabase 클라이언트 모듈 (useSupabaseClient 자동 import)
- Google Fonts: Black Han Sans + Inter (main.css @import)

### 핵심 기능
- **Supabase 실데이터** — `classes` 테이블에서 fetch, 홈/검색/상세 모두 연동
- **클래스 등록** — Supabase INSERT + Storage 썸네일 업로드, 성공 시 `refreshNuxtData('classes')` 캐시 갱신
- **Supabase Auth** — 이메일/비밀번호 회원가입·로그인·로그아웃, `useSupabaseUser()`로 전역 상태 관리
- 카테고리 필터 (전체/운동/러닝/수영/스터디/취미/클래스)
- 검색창 (제목·카테고리·지역 필터링) — Enter 시 검색 화면으로 이동, URL `?q=` 파라미터 연동
- 마감 임박 자동 감지 (3일 이내)
- 신청하기 버튼 → alert로 클래스 제목 표시
- 홈 → 검색 화면 이동: Enter 키 / "전체 보기" 버튼 / 하단 네비게이션 검색 탭
- 검색 → 클래스 상세보기 이동: 카드 클릭

### 다음 작업자 참고
- `frontend/.env` 파일에 Supabase 키 설정됨 (gitignore 제외, 로컬에만 존재)
- `useAsyncData('classes', ...)` 키로 중복 fetch 방지 — 여러 컴포넌트에서 `useClasses()` 호출해도 1회만 요청
- `ClassCardVertical`에 `fullWidth` prop 추가됨 — 검색 결과(2열 그리드)는 `:fullWidth="true"`, 가로 스크롤은 prop 없이 사용
- 하단 네비게이션은 NuxtLink로 연결됨. 모든 탭 페이지 구현 완료
- Auth: `useSupabaseUser()` (from `@nuxtjs/supabase`) — 세션은 쿠키로 자동 유지, 새로고침 후에도 로그인 상태 유지
- `/auth?mode=signup` — 쿼리 파라미터로 초기 모드 설정 가능 (login/signup)
- `nuxt.config.ts`의 `supabase.redirect: false` — 인증 라우팅은 각 페이지에서 직접 처리
- 클래스 상세보기는 `/classes/:id` 라우트, `useClasses().classes`로 id 매칭
- 검색 URL 파라미터: `/search?q=키워드` — 홈 검색창 Enter 시 자동 전달
- 등록 화면은 `useSupabaseClient()` 직접 사용 (useClasses 미사용) — INSERT + Storage upload
- 썸네일 업로드 실패해도 등록 자체는 진행됨 (thumbnail nullable)

## Supabase 연동 현황

`lion-test` 프로젝트 (`totwcjbvukmnfehhbfca`) — **홈/검색/상세보기/등록 연동 완료**

| 리소스 | 설명 | 연동 여부 |
|---|---|---|
| `classes` 테이블 | id, title, category, price, location, date, max_participants, current_participants, thumbnail, deadline, description, created_at | ✅ 전체 화면 |
| `class-thumbnails` Storage 버킷 | 클래스 등록 시 썸네일 이미지 저장 (public) | ✅ 등록 화면 |
| Supabase Auth | 이메일/비밀번호 인증 | ✅ 로그인/회원가입/내정보 |

RLS:
- `classes`: anon SELECT (`public_read`), authenticated SELECT (`authenticated_read`), anon INSERT (`public_insert`)
- `class-thumbnails`: anon SELECT + INSERT 허용

현재 단계:
- API 연결: ✅ Supabase REST API
- DB 연결: ✅ classes 테이블 (READ + INSERT)
- Storage: ✅ class-thumbnails 버킷
- 더미 데이터: ❌ 제거됨
