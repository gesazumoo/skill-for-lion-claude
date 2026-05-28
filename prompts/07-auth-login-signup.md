# 작업: 회원가입(이메일 인증) & 로그인 구현

## 요청
Supabase Auth를 이용해 이메일 인증 기반 회원가입과 로그인 기능 구현

## 구현 내용

### 신규 파일
- `frontend/app/composables/useAuth.ts` — Supabase Auth 상태 관리 composable
- `frontend/app/pages/login.vue` — 로그인 폼 페이지
- `frontend/app/pages/signup.vue` — 회원가입 폼 + 이메일 인증 발송 안내
- `frontend/app/pages/auth/callback.vue` — 이메일 인증 링크 처리 (code/token_hash)
- `frontend/app/pages/profile.vue` — 내정보 페이지 (사용자 정보 + 로그아웃)

### 수정 파일
- `frontend/app/app.vue` — auth 초기화, 로그인/회원가입 페이지에서 BottomNav 숨김
- `frontend/app/components/BottomNavigation.vue` — 내정보 탭: 로그인/비로그인에 따라 /profile 또는 /login 분기

## Auth 흐름

1. **회원가입**: `/signup` → `supabase.auth.signUp()` → 이메일 인증 발송 → 성공 메시지
2. **이메일 인증**: 메일 링크 클릭 → `/auth/callback?code=...` → `exchangeCodeForSession()` → `/profile`
3. **로그인**: `/login` → `supabase.auth.signInWithPassword()` → redirect 또는 `/`
4. **로그아웃**: `/profile` → `supabase.auth.signOut()` → `/`
5. **비로그인 가드**: `/profile` 직접 접근 시 `/login?redirect=/profile` 리다이렉트

## useAuth 설계
- `useState('auth_user')` — 전역 반응형 auth 상태 (페이지 이동 시 유지)
- `init()` — 앱 마운트 시 `getSession()` + `onAuthStateChange()` 리스너 등록
- `signUp(email, password)` — emailRedirectTo를 `/auth/callback`으로 설정
- `signIn(email, password)` — signInWithPassword
- `signOut()` — signOut + user.value = null

## 디자인
- Nike 디자인 시스템 준수
- 입력창: soft-cloud (#f5f5f5) 배경, radius 24px, focus 시 ink (#111111) 2px ring
- 버튼: ink (#111111) 배경, white 텍스트, radius 30px
- 에러: sale (#d30005)
- BottomNav 없음 (login/signup/auth 경로)
