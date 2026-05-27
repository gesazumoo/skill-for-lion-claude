프로젝트 루트의 DESIGN.md 파일을 읽고, 그 디자인 시스템을 frontend에 **극단적으로, 컴포넌트 단위로 완전히** 재작성해줘.

---

## 핵심 원칙

단순 색상 교체나 클래스 수정이 아니다.
DESIGN.md를 읽고 그 브랜드/무드/언어를 완전히 흡수한 뒤, **처음부터 다시 디자인한다는 마인드**로 모든 vue 파일을 재작성해라.
Before/After를 봤을 때 "완전히 다른 서비스"처럼 보여야 한다.

---

## 실행 순서

### 1. DESIGN.md 읽기 및 분석
프로젝트 루트의 DESIGN.md를 읽어라. 없으면 사용자에게 알리고 종료해.

다음 항목을 반드시 추출해라:
- **Primary / accent 컬러** (버튼, 강조, 링크에 쓸 색)
- **Background 컬러** (page canvas, card surface, dark band)
- **Text 컬러** (headline ink, body, muted, on-dark)
- **Border / hairline 컬러**
- **폰트 패밀리** (없으면 가장 가까운 Google Fonts 대안 사용)
- **폰트 무게** (display weight vs body weight — 둘의 대비가 핵심)
- **display 타이포 크기** (Hero H1, 섹션 헤더)
- **body 타이포 크기 + 무게**
- **Border radius** (rounded.none=0px인지, pill=9999px인지, md=14px인지)
- **Shadow 정책** (없음 / 단일 tier / progressive)
- **버튼 스타일** (shape, padding, height, weight)
- **카드 스타일** (surface 색, radius, border, shadow)
- **전체 무드** (corporate/premium, warm/marketplace, editorial/magazine 등)
- **Hero 구조** (dark band? light? photo-first?)
- **섹션 레이블 스타일** (uppercase tracking? 일반 bold? 컬러?)
- **CTA 밴드 스타일**
- **Spacing rhythm** (section 간격, card padding)

### 2. frontend 파일 읽기
다음 파일들을 읽어 현재 구조를 파악해:
- `frontend/app/app.vue`
- `frontend/app/pages/index.vue`
- `frontend/app/components/ClassCard.vue`
- `frontend/app/components/DeadlineCard.vue`

### 3. 전면 재작성 — 아래 기준을 전부 적용해

#### app.vue
- 폰트 패밀리를 DESIGN.md에서 추출한 것으로 교체 (Google Fonts @import 사용)
- body의 기본 font-weight를 DESIGN.md의 body weight로 설정
- background 색상을 canvas 컬러로 설정
- 전역 CSS에 필요한 CSS 변수나 유틸리티 클래스 정의

#### index.vue — **레이아웃 구조까지 변경**

**Hero 영역 재설계:**
- DESIGN.md의 hero 무드에 맞게 배경색/이미지 구조 변경
  - dark band 스타일 → `surface-dark` 배경에 흰 텍스트
  - light editorial 스타일 → canvas 배경에 대형 headline
  - photo-first 스타일 → 풀블리드 이미지 위 텍스트 오버레이
- Hero H1: DESIGN.md의 display-xl 또는 display-lg 스펙 그대로 적용 (size, weight, line-height)
- 서브카피: body weight로
- 검색바: DESIGN.md의 search-bar 스타일 그대로 (pill이면 pill, 직사각형이면 직사각형, 오브 색상도 반영)
- 섹션 간격: DESIGN.md의 section spacing 적용

**카테고리 필터:**
- DESIGN.md의 filter-chip 또는 category-tab 스타일 그대로
- active/inactive 컬러, radius, border 모두 반영

**섹션 헤더:**
- DESIGN.md의 label 스타일 적용 (uppercase+tracking이면 그대로, 일반 bold면 그대로)
- "더보기" 링크도 DESIGN.md의 text-link 또는 button-text-link 스타일로

**CTA 밴드:**
- DESIGN.md의 cta-band 또는 hero-band 스타일 반영
- 버튼도 DESIGN.md의 button-primary 스펙 그대로

**Bottom nav:**
- active 색 = primary, inactive = muted
- 폰트 스타일도 DESIGN.md 따라

#### ClassCard.vue — **컴포넌트 단위 완전 재작성**
- 카드 container: DESIGN.md의 card radius/border/shadow 정책 적용
- 사진 영역: DESIGN.md의 card-photo background 색상 적용
- 카테고리 badge: DESIGN.md의 badge 스타일 (pill? rectangular? color?)
- 카드 제목: DESIGN.md의 title-md 스펙 (size, weight)
- 메타 정보 (날짜/장소/인원): DESIGN.md의 body-sm 스펙
- 가격: display weight로 강조
- 신청 버튼: DESIGN.md의 button-primary 스펙 완전 반영 (shape, height, padding, weight, color)
- 마감 상태: DESIGN.md의 disabled 스타일

#### DeadlineCard.vue — **컴포넌트 단위 완전 재작성**
- ClassCard와 동일한 card 정책 적용 (일관성)
- 마감 배지: DESIGN.md의 긴급/error 컬러 + DESIGN.md의 badge radius
- 카테고리 배지: DESIGN.md의 badge 스타일
- 버튼: button-primary 스펙

### 4. 적용 기준 체크리스트

재작성 전, 아래 항목을 반드시 확인하고 적용해:

| 항목 | 확인 |
|---|---|
| 폰트 패밀리가 DESIGN.md 기반인가 | |
| display weight vs body weight 대비가 DESIGN.md 그대로인가 | |
| Hero H1 크기가 DESIGN.md display-xl/lg 스펙인가 | |
| Primary 컬러가 버튼/강조/링크에 올바르게 쓰였는가 | |
| 카드 radius가 DESIGN.md rounded 토큰 그대로인가 | |
| 버튼 shape/height/padding이 DESIGN.md 스펙인가 | |
| Shadow 정책이 DESIGN.md 그대로인가 (없어야 하면 없어야) | |
| Section spacing이 DESIGN.md rhythm인가 | |
| Dark band / light canvas 대비 구조가 DESIGN.md 무드인가 | |
| 섹션 라벨 스타일 (uppercase? bold? color?)이 맞는가 | |
| Badge/chip radius/color가 DESIGN.md 스타일인가 | |

### 5. 완료 후 요약

다음 형식으로 한국어로 요약해줘:

```
## 적용된 DESIGN.md: [디자인 이름]

### Before → After 주요 변경
| 항목 | 이전 | 변경 후 |
|---|---|---|
| Primary 컬러 | ... | ... |
| 폰트/무게 | ... | ... |
| Hero 구조 | ... | ... |
| 버튼 스타일 | ... | ... |
| 카드 스타일 | ... | ... |
| 섹션 라벨 | ... | ... |
| 검색바 | ... | ... |
| Shadow | ... | ... |
| CTA 밴드 | ... | ... |
```
