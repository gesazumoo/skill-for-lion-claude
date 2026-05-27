Claude Code를 Supabase MCP 서버에 연결해줘. 연결되면 이후 자연어로 DB 조작, 마이그레이션, API 연동 요청이 가능해져.

## 순서

1. ARGUMENTS에서 Supabase Personal Access Token을 읽어.
   - 없으면 사용자에게 이렇게 안내하고 입력 요청해:
     > Supabase Personal Access Token이 필요해요.
     > https://supabase.com/dashboard/account/tokens 에서 발급하세요.
     > 토큰을 입력해주세요:

2. `~/.claude/settings.json` 파일을 읽어. 없으면 `{}` 로 시작해.

3. `mcpServers` 항목에 아래 설정을 추가해 (이미 `supabase` 키가 있으면 덮어써):
   ```json
   "supabase": {
     "command": "npx",
     "args": [
       "-y",
       "@supabase/mcp-server-supabase@latest",
       "--access-token",
       "<입력받은 토큰>"
     ]
   }
   ```

4. 수정된 전체 JSON을 `~/.claude/settings.json`에 저장해.
   - 저장 시 기존 설정(다른 MCP 서버, permissions 등)은 절대 건드리지 마.

5. 완료 후 사용자에게 한국어로 알려줘:
   - 설정 저장 완료 메시지
   - **Claude Code를 완전히 종료 후 재시작해야 MCP가 활성화된다**는 안내
   - 재시작 후 "Supabase에 어떤 프로젝트가 있어?" 라고 물어보면 연결 확인 가능하다는 안내
