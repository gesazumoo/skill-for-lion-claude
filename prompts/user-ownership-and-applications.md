클래스 소유권 및 신청 기능 구현해줘.

## 작업 전 참고

작업 전 아래 문서를 먼저 참고해줘.

- ./project-rules/glossary.md
- ./project-rules/workflow.md

---

## 작업 목적

클래스 정보에 어떤 유저가 만든건지도 포함되어야 하고, 클래스마다 어떤 유저들이 신청했는지 정보가 포함되어야 한다. 이를 기반으로 내정보 페이지에서 내가 등록한 클래스와 신청한 클래스가 보여야 한다.

---

## 작업 내용

### 1. DB 마이그레이션

- `classes` 테이블에 `user_id` 컬럼 추가 (uuid, nullable, references auth.users)
- `class_applications` 테이블 생성:
  - id (uuid, PK)
  - class_id (int, FK → classes.id)
  - user_id (uuid, FK → auth.users.id)
  - created_at (timestamptz)
  - UNIQUE (class_id, user_id)

RLS 정책:
- `class_applications`: authenticated INSERT, authenticated SELECT (본인 것만, user_id = auth.uid())
- `classes`: authenticated INSERT, authenticated UPDATE

### 2. 클래스 등록 화면 (`register.vue`)

- INSERT 시 `user_id: user.value?.id` 포함

### 3. 클래스 상세보기 (`classes/[id].vue`)

신청 기능 구현:
- 내 신청 여부 확인 (`class_applications` 조회)
- 신청하기 버튼 → `class_applications` INSERT + `classes.current_participants` +1 UPDATE
- CTA 4가지 상태: 신청 완료 / 모집 마감 / 로그인 후 신청하기 / 신청하기

### 4. 내정보 화면 (`profile.vue`)

로그인 상태:
- 신청한 클래스 목록 (class_applications JOIN classes)
- 등록한 클래스 목록 (classes WHERE user_id = auth.uid())
- 각 항목 클릭 시 상세보기로 이동

### 5. ClassCardVertical 수정

- "신청하기" 버튼: emit 제거, `navigateTo('/classes/:id')` 로 대체

---

## 작업 후 정리

작업이 끝나면 CLAUDE.md에 아래 내용을 정리해줘.

- 추가된 DB 테이블 및 컬럼
- 신청 기능 동작 방식
- 내정보 화면 변경 내용
- 다음 작업자가 참고해야 할 내용

의미 있는 작업이므로 사용한 프롬프트를 `/prompts` 폴더에 저장해줘.
