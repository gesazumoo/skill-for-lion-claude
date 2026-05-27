프로젝트 루트의 DESIGN.md 파일을 읽고, 그 내용을 기반으로 frontend 디자인을 업데이트해줘.

순서:
1. 프로젝트 루트에서 DESIGN.md 파일을 읽어. 파일이 없으면 사용자에게 알리고 종료해.
2. DESIGN.md의 내용을 분석해:
   - 컬러 팔레트 (primary, background, text 등)
   - 타이포그래피 (폰트, 사이즈, 굵기 등)
   - 컴포넌트 스타일 (radius, shadow, spacing 등)
   - 전체적인 디자인 무드와 스타일 방향
3. frontend/ 디렉토리의 현재 vue 파일들과 컴포넌트들을 읽어서 구조를 파악해.
4. DESIGN.md의 디자인 시스템을 frontend에 적용해:
   - TailwindCSS 클래스를 활용해 색상, 타이포그래피, 간격, radius 등을 변경
   - DESIGN.md에 명시된 컬러가 Tailwind 기본값에 없으면 inline style 또는 CSS 변수로 처리
   - 디자인 무드에 맞게 전체적인 레이아웃 느낌도 조정
   - 기존 기능과 데이터 구조는 그대로 유지하고 스타일만 변경
5. 변경이 완료되면 어떤 디자인 요소가 적용됐는지 한국어로 요약해줘.
