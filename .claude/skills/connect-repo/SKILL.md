ARGUMENTS로 GitHub 레포 URL을 받아서 현재 디렉토리를 해당 레포에 연결하고 전체 내용을 커밋 & 푸시해줘.

순서:
1. ARGUMENTS에서 GitHub 레포 URL을 읽어. 없으면 사용자에게 URL을 물어봐.
2. 현재 디렉토리가 git 저장소인지 확인해. 아니면 `git init`을 실행해.
3. `git remote -v`로 remote가 이미 있는지 확인해.
   - 없으면: `git remote add origin <URL>`
   - origin이 이미 있으면: `git remote set-url origin <URL>`
4. `git add .`로 모든 파일을 스테이징해.
5. `git commit -m "Initial commit"`으로 커밋해. 이미 커밋할 게 없으면 사용자에게 알려줘.
6. `git branch -M main`으로 브랜치를 main으로 설정해.
7. `git push -u origin main`으로 푸시해.
8. 성공하면 레포 URL과 함께 완료 메시지를 한국어로 알려줘.
   실패하면 에러 내용을 한국어로 설명하고 해결 방법을 제안해줘.
