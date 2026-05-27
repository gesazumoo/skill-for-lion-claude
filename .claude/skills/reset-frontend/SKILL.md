frontend/ 디렉토리를 최초의 빈 Nuxt3 프로젝트 상태로 초기화해줘.

순서:
1. 사용자에게 초기화 여부를 한 번 확인해. "frontend를 빈 Nuxt3 상태로 초기화합니다. 계속할까요?" — 확인 받으면 진행해.

2. 아래 디렉토리/파일을 삭제해 (존재할 경우에만):
   - `frontend/app/pages/`
   - `frontend/app/components/`
   - `frontend/app/data/`
   - `frontend/app/layouts/`
   - `frontend/app/composables/`
   - `frontend/app/stores/`
   - `frontend/assets/`

3. `frontend/app/app.vue`를 Nuxt 기본 상태로 복원해:
   ```vue
   <template>
     <div>
       <NuxtRouteAnnouncer />
       <NuxtWelcome />
     </div>
   </template>
   ```

4. `frontend/nuxt.config.ts`를 기본 상태로 복원해:
   ```ts
   // https://nuxt.com/docs/api/configuration/nuxt-config
   export default defineNuxtConfig({
     compatibilityDate: '2025-07-15',
     devtools: { enabled: true }
   })
   ```

5. `frontend/package.json`에서 추가된 모듈들을 확인해.
   기본 Nuxt3 패키지(nuxt, vue, vue-router) 외에 추가된 게 있으면
   `cd frontend && npm uninstall <패키지명>`으로 제거해.

6. 완료되면 "frontend가 빈 Nuxt3 상태로 초기화됐습니다."라고 한국어로 알려줘.
   삭제된 항목 목록도 함께 보여줘.
