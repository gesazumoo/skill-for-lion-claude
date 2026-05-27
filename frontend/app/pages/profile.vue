<script setup lang="ts">
const { user, isLoggedIn, signOut } = useAuth()
const router = useRouter()

const isSigningOut = ref(false)
const authReady = ref(false)

onMounted(() => {
  // 클라이언트에서 auth 상태 확인 후 렌더링
  setTimeout(() => { authReady.value = true }, 50)
})

async function handleSignOut() {
  isSigningOut.value = true
  try {
    await signOut()
  } finally {
    isSigningOut.value = false
  }
}

const userInitial = computed(() => {
  const email = user.value?.email ?? ''
  return email.charAt(0).toUpperCase()
})
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f7] max-w-lg mx-auto pb-[72px]">

    <!-- 로딩 중 (auth 상태 확인 전) -->
    <template v-if="!authReady">
      <section class="bg-[#272729] px-5 pt-16 pb-10">
        <div class="w-32 h-6 bg-[#3a3a3c] rounded-full animate-pulse mb-4" />
        <div class="w-48 h-9 bg-[#3a3a3c] rounded-full animate-pulse mb-3" />
        <div class="w-56 h-5 bg-[#3a3a3c] rounded-full animate-pulse" />
      </section>
    </template>

    <!-- ── 비로그인 상태 ── -->
    <template v-else-if="!isLoggedIn">

      <!-- Dark Hero -->
      <section class="bg-[#272729] px-5 pt-16 pb-12 text-center">
        <div class="w-20 h-20 bg-[#3a3a3c] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-[rgba(235,235,245,0.4)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 class="text-[28px] font-semibold text-white leading-[1.1] tracking-[-0.374px] mb-3">
          로그인하고<br />더 많은 기능을 사용하세요
        </h1>
        <p class="text-[17px] font-normal text-[#cccccc] leading-[1.47] tracking-[-0.374px]">
          클래스 등록, 신청 내역 확인 등<br />다양한 기능을 이용할 수 있어요
        </p>
      </section>

      <!-- White CTA Section -->
      <section class="bg-white px-5 py-10 space-y-3">
        <button
          class="w-full bg-[#0066cc] text-white text-[17px] font-light tracking-[-0.374px] py-[14px] rounded-[9999px] transition-all active:scale-[0.98]"
          @click="router.push('/login')"
        >
          로그인하기
        </button>
        <button
          class="w-full bg-[#f5f5f7] text-[#1d1d1f] text-[17px] font-light tracking-[-0.374px] py-[14px] rounded-[9999px] transition-all active:scale-[0.98]"
          @click="router.push('/login?mode=signup')"
        >
          회원가입하기
        </button>
      </section>

      <!-- Parchment Info Section -->
      <section class="bg-[#f5f5f7] px-5 py-10">
        <h2 class="text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.374px] mb-5">
          로그인하면 이런 게 가능해요
        </h2>
        <div class="space-y-4">
          <div v-for="item in [
            { icon: '📋', text: '내가 등록한 클래스 관리' },
            { icon: '🎯', text: '신청한 클래스 내역 확인' },
            { icon: '🔔', text: '마감 임박 알림 받기' },
          ]" :key="item.text" class="flex items-center gap-3">
            <span class="text-[22px]">{{ item.icon }}</span>
            <span class="text-[15px] font-normal text-[#1d1d1f] tracking-[-0.224px]">{{ item.text }}</span>
          </div>
        </div>
      </section>
    </template>

    <!-- ── 로그인 상태 ── -->
    <template v-else>

      <!-- Dark Hero — 사용자 정보 -->
      <section class="bg-[#272729] px-5 pt-16 pb-12">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-16 h-16 bg-[#0066cc] rounded-full flex items-center justify-center flex-shrink-0">
            <span class="text-[24px] font-semibold text-white">{{ userInitial }}</span>
          </div>
          <div>
            <p class="text-[14px] font-normal text-[#7a7a7a] tracking-[-0.224px] mb-0.5">내 계정</p>
            <p class="text-[17px] font-semibold text-white tracking-[-0.374px] break-all">
              {{ user?.email }}
            </p>
          </div>
        </div>
        <div class="inline-flex items-center gap-1.5 bg-[#30d158]/20 px-3 py-1.5 rounded-[9999px]">
          <div class="w-1.5 h-1.5 bg-[#30d158] rounded-full" />
          <span class="text-[13px] font-medium text-[#30d158] tracking-[-0.2px]">로그인됨</span>
        </div>
      </section>

      <!-- White — 활동 내역 (플레이스홀더) -->
      <section class="bg-white px-5 py-8">
        <h2 class="text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.374px] mb-5">
          내 활동
        </h2>
        <div class="space-y-1">
          <div
            v-for="item in [
              { label: '등록한 클래스', value: '-' },
              { label: '신청한 클래스', value: '-' },
            ]"
            :key="item.label"
            class="flex items-center justify-between py-4 border-b border-[#f5f5f7] last:border-0"
          >
            <span class="text-[17px] font-normal text-[#1d1d1f] tracking-[-0.374px]">{{ item.label }}</span>
            <span class="text-[17px] font-normal text-[#7a7a7a] tracking-[-0.374px]">{{ item.value }}</span>
          </div>
        </div>
        <p class="text-[13px] text-[#7a7a7a] tracking-[-0.2px] mt-4">
          활동 내역 기능은 곧 추가될 예정이에요
        </p>
      </section>

      <!-- Dark — 로그아웃 -->
      <section class="bg-[#272729] px-5 py-8">
        <button
          :disabled="isSigningOut"
          class="w-full text-[rgba(235,235,245,0.6)] text-[17px] font-normal tracking-[-0.374px] py-[14px] rounded-[9999px] border border-[rgba(235,235,245,0.15)] transition-opacity active:opacity-50 disabled:opacity-40"
          @click="handleSignOut"
        >
          <span v-if="isSigningOut" class="flex items-center justify-center gap-2">
            <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            로그아웃 중...
          </span>
          <span v-else>로그아웃</span>
        </button>
      </section>
    </template>

    <BottomNavigation active-menu="profile" />
  </div>
</template>
