<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const isLoggingOut = ref(false)

const handleLogout = async () => {
  isLoggingOut.value = true
  await supabase.auth.signOut()
  isLoggingOut.value = false
  navigateTo('/')
}

const formatJoinDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 가입`
}

const formatClassDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}월 ${d.getDate()}일`
}

// 내가 등록한 클래스
const { data: myClasses, refresh: refreshMyClasses } = await useAsyncData(
  'my-classes',
  async () => {
    if (!user.value) return []
    const { data } = await supabase
      .from('classes')
      .select('id, title, date, location, category, current_participants, max_participants')
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false })
    return data ?? []
  }
)

// 내가 신청한 클래스
const { data: myApplications, refresh: refreshMyApplications } = await useAsyncData(
  'my-applications',
  async () => {
    if (!user.value) return []
    const { data } = await supabase
      .from('class_applications')
      .select('id, classes(id, title, date, location, category, current_participants, max_participants)')
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false })
    return data ?? []
  }
)

watch(() => user.value?.id, () => {
  refreshMyClasses()
  refreshMyApplications()
})
</script>

<template>
  <div class="min-h-screen bg-canvas">

    <!-- 상단 헤더 -->
    <div class="sticky top-0 z-40 bg-canvas border-b border-hairline-soft">
      <div class="flex items-center h-12 px-4">
        <p class="text-xs font-medium tracking-[0.15em] uppercase text-charcoal">내정보</p>
      </div>
    </div>

    <!-- ══ 비로그인 상태 ══════════════════════════════════════ -->
    <div v-if="!user" class="flex flex-col items-center justify-center px-8 text-center" style="min-height: calc(100vh - 112px);">
      <div class="w-16 h-16 rounded-full bg-soft-cloud flex items-center justify-center mb-5">
        <svg class="w-8 h-8 text-mute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h2 class="text-lg font-medium text-ink mb-2">로그인이 필요합니다</h2>
      <p class="text-sm text-mute leading-relaxed mb-8">로그인하고 클래스 신청 내역과<br>나만의 정보를 확인해보세요.</p>
      <div class="flex flex-col gap-3 w-full">
        <NuxtLink
          to="/auth"
          class="w-full bg-ink text-canvas text-sm font-medium h-12 rounded-[30px] flex items-center justify-center"
        >
          로그인
        </NuxtLink>
        <NuxtLink
          to="/auth?mode=signup"
          class="w-full bg-soft-cloud text-ink text-sm font-medium h-12 rounded-[30px] flex items-center justify-center"
        >
          회원가입
        </NuxtLink>
      </div>
    </div>

    <!-- ══ 로그인 상태 ════════════════════════════════════════ -->
    <div v-else class="pb-24">

      <!-- 사용자 정보 영역 -->
      <div class="bg-ink px-6" style="padding-top: 40px; padding-bottom: 32px;">
        <div class="w-14 h-14 rounded-full bg-canvas bg-opacity-10 flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-canvas" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <p class="text-canvas text-base font-medium mb-1">{{ user.email }}</p>
        <p v-if="user.created_at" class="text-stone text-xs">{{ formatJoinDate(user.created_at) }}</p>
      </div>

      <!-- ── 내가 신청한 클래스 ──────────────────────────────── -->
      <div class="px-4 py-6">
        <div class="flex items-center justify-between mb-4">
          <p class="text-xs font-medium tracking-[0.15em] uppercase text-charcoal">신청한 클래스</p>
          <span class="text-xs text-mute">{{ (myApplications ?? []).length }}개</span>
        </div>

        <div v-if="!myApplications || myApplications.length === 0" class="bg-soft-cloud px-4 py-6 text-center">
          <p class="text-sm text-mute">신청한 클래스가 없습니다</p>
        </div>

        <div v-else class="flex flex-col">
          <NuxtLink
            v-for="app in myApplications"
            :key="app.id"
            :to="`/classes/${(app.classes as any)?.id}`"
            class="flex items-center gap-4 py-4 border-b border-hairline-soft last:border-0 active:opacity-70 transition-opacity"
          >
            <div class="flex-1 min-w-0">
              <p class="text-[10px] font-medium tracking-[0.15em] uppercase text-mute mb-1">
                {{ (app.classes as any)?.category }}
              </p>
              <p class="text-sm font-medium text-ink leading-snug line-clamp-1 mb-1">
                {{ (app.classes as any)?.title }}
              </p>
              <p class="text-xs text-mute">
                {{ formatClassDate((app.classes as any)?.date) }} · {{ (app.classes as any)?.location }}
              </p>
            </div>
            <svg class="w-4 h-4 text-mute flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <div class="h-px bg-hairline-soft" />

      <!-- ── 내가 등록한 클래스 ──────────────────────────────── -->
      <div class="px-4 py-6">
        <div class="flex items-center justify-between mb-4">
          <p class="text-xs font-medium tracking-[0.15em] uppercase text-charcoal">등록한 클래스</p>
          <span class="text-xs text-mute">{{ (myClasses ?? []).length }}개</span>
        </div>

        <div v-if="!myClasses || myClasses.length === 0" class="bg-soft-cloud px-4 py-6 text-center">
          <p class="text-sm text-mute">등록한 클래스가 없습니다</p>
        </div>

        <div v-else class="flex flex-col">
          <NuxtLink
            v-for="cls in myClasses"
            :key="cls.id"
            :to="`/classes/${cls.id}`"
            class="flex items-center gap-4 py-4 border-b border-hairline-soft last:border-0 active:opacity-70 transition-opacity"
          >
            <div class="flex-1 min-w-0">
              <p class="text-[10px] font-medium tracking-[0.15em] uppercase text-mute mb-1">
                {{ cls.category }}
              </p>
              <p class="text-sm font-medium text-ink leading-snug line-clamp-1 mb-1">
                {{ cls.title }}
              </p>
              <p class="text-xs text-mute">
                {{ formatClassDate(cls.date) }} · {{ cls.location }}
                <span class="ml-1">· {{ cls.current_participants }}/{{ cls.max_participants }}명</span>
              </p>
            </div>
            <svg class="w-4 h-4 text-mute flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <div class="h-px bg-hairline-soft" />

      <!-- 로그아웃 -->
      <div class="px-4 py-6">
        <button
          @click="handleLogout"
          :disabled="isLoggingOut"
          class="w-full bg-soft-cloud text-ink text-sm font-medium h-12 rounded-[30px] flex items-center justify-center gap-2 disabled:opacity-40 active:opacity-70 transition-opacity"
        >
          <svg v-if="isLoggingOut" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          {{ isLoggingOut ? '로그아웃 중...' : '로그아웃' }}
        </button>
      </div>

    </div>

    <!-- 하단 네비게이션 -->
    <BottomNavigation active-menu="profile" />

  </div>
</template>
