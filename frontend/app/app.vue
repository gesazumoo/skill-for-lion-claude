<script setup lang="ts">
const supabase = useSupabaseClient()
const { refresh, appliedClassIds, appliedClasses, createdClasses } = useMyData()

// onAuthStateChange: 실제 Supabase 세션이 준비된 시점에 정확히 호출됨
// (user reactive ref보다 신뢰도 높음 — 토큰 복원 완료 후에 발동)
supabase.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    refresh()
  } else {
    appliedClassIds.value = []
    appliedClasses.value = []
    createdClasses.value = []
  }
})
</script>

<template>
  <div>
    <NuxtPage />
    <AppToast />
  </div>
</template>
