<script setup lang="ts">
import { useClasses } from '~/composables/useClasses'

const { user, isLoggedIn, signOut } = useAuth()
const router = useRouter()
const nuxtApp = useNuxtApp()
const { formatPrice, formatDate } = useClasses()

const isSigningOut = ref(false)
const authReady = ref(false)
const myClasses = ref<any[]>([])
const myEnrollments = ref<any[]>([])
const isLoadingActivity = ref(false)

onMounted(() => {
  setTimeout(async () => {
    authReady.value = true
    if (isLoggedIn.value) await fetchMyActivity()
  }, 50)
})

watch(isLoggedIn, (val) => { if (val) fetchMyActivity() })

async function fetchMyActivity() {
  isLoadingActivity.value = true
  try {
    const [classesRes, enrollmentsRes] = await Promise.all([
      (nuxtApp.$supabase as any)
        .from('classes')
        .select('*')
        .eq('creator_id', user.value.id)
        .order('created_at', { ascending: false }),
      (nuxtApp.$supabase as any)
        .from('enrollments')
        .select('*, classes(*)')
        .eq('user_id', user.value.id)
        .order('created_at', { ascending: false }),
    ])
    myClasses.value = classesRes.data ?? []
    myEnrollments.value = (enrollmentsRes.data ?? []).map((e: any) => e.classes).filter(Boolean)
  } finally {
    isLoadingActivity.value = false
  }
}

async function handleSignOut() {
  isSigningOut.value = true
  try {
    await signOut()
    myClasses.value = []
    myEnrollments.value = []
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
  <div class="min-h-screen bg-white max-w-lg mx-auto pb-[72px]">

    <!-- Loading state -->
    <template v-if="!authReady">
      <section class="bg-[#111111] px-5 pt-16 pb-10">
        <div class="w-32 h-4 bg-[#222222] animate-pulse mb-6" />
        <div class="w-48 h-16 bg-[#222222] animate-pulse mb-3" />
      </section>
    </template>

    <!-- ── Not logged in ── -->
    <template v-else-if="!isLoggedIn">

      <!-- Campaign hero -->
      <section class="bg-[#111111] px-5 pt-16 pb-10 text-center">
        <div class="w-16 h-16 bg-[#222222] flex items-center justify-center mx-auto mb-8">
          <svg class="w-8 h-8 text-[#9e9ea0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 class="font-display text-[56px] leading-[0.9] text-white uppercase mb-5">
          MY<br />PROFILE
        </h1>
        <p class="text-[16px] font-[400] text-[#9e9ea0] leading-[1.5]">
          클래스 등록, 신청 내역 확인 등<br />다양한 기능을 이용할 수 있어요
        </p>
      </section>

      <!-- CTA section -->
      <section class="bg-white px-5 py-10 space-y-3">
        <button
          class="w-full bg-[#111111] text-white text-[16px] font-[500] h-12 rounded-[30px] transition-opacity active:opacity-60"
          @click="router.push('/login')"
        >
          로그인하기
        </button>
        <button
          class="w-full bg-[#f5f5f5] text-[#111111] text-[16px] font-[500] h-12 rounded-[30px] transition-opacity active:opacity-60"
          @click="router.push('/login?mode=signup')"
        >
          회원가입하기
        </button>
      </section>

      <!-- Feature list -->
      <section class="bg-[#f5f5f5] px-5 py-10">
        <h2 class="text-[14px] font-[500] text-[#111111] uppercase tracking-[0.08em] mb-6">로그인하면 가능한 것들</h2>
        <div class="space-y-4">
          <div v-for="item in [
            '내가 등록한 클래스 관리',
            '신청한 클래스 내역 확인',
            '마감 임박 알림 받기',
          ]" :key="item" class="flex items-center gap-4">
            <div class="w-1.5 h-1.5 bg-[#111111]" />
            <span class="text-[16px] font-[400] text-[#111111]">{{ item }}</span>
          </div>
        </div>
      </section>
    </template>

    <!-- ── Logged in ── -->
    <template v-else>

      <!-- Campaign hero — user info -->
      <section class="bg-[#111111] px-5 pt-16 pb-10">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-14 h-14 bg-white flex items-center justify-center flex-shrink-0">
            <span class="text-[24px] font-[500] text-[#111111]">{{ userInitial }}</span>
          </div>
          <div>
            <p class="text-[12px] font-[500] text-[#9e9ea0] uppercase tracking-[0.08em] mb-1">내 계정</p>
            <p class="text-[16px] font-[500] text-white break-all">{{ user?.email }}</p>
          </div>
        </div>
        <div class="inline-flex items-center gap-2 mt-2">
          <div class="w-1.5 h-1.5 bg-[#007d48]" />
          <span class="text-[12px] font-[500] text-[#9e9ea0] uppercase tracking-[0.04em]">로그인됨</span>
        </div>
      </section>

      <!-- My registered classes -->
      <section class="bg-white px-5 py-8">
        <div class="flex items-baseline justify-between mb-1">
          <h2 class="text-[32px] font-[500] text-[#111111] uppercase leading-[1.2]">내 클래스</h2>
          <span class="text-[14px] font-[500] text-[#707072] uppercase">{{ myClasses.length }}개</span>
        </div>
        <div class="h-px bg-[#e5e5e5] mb-5 mt-4" />

        <!-- Loading -->
        <div v-if="isLoadingActivity" class="space-y-3">
          <div v-for="i in 2" :key="i" class="h-16 bg-[#f5f5f5] animate-pulse" />
        </div>

        <!-- Empty -->
        <p v-else-if="myClasses.length === 0" class="text-[14px] font-[400] text-[#707072] py-2">
          아직 등록한 클래스가 없어요
        </p>

        <!-- List -->
        <div v-else class="space-y-0">
          <div
            v-for="cls in myClasses"
            :key="cls.id"
            class="flex gap-3 py-4 border-b border-[#e5e5e5] last:border-0"
          >
            <div class="bg-[#f5f5f5] w-14 h-14 flex-shrink-0">
              <img :src="cls.thumbnail" :alt="cls.title" class="w-full h-full object-cover" />
            </div>
            <div class="min-w-0">
              <p class="text-[16px] font-[500] text-[#111111] truncate">{{ cls.title }}</p>
              <p class="text-[14px] font-[500] text-[#707072] mt-0.5">{{ formatDate(cls.date) }} · {{ formatPrice(cls.price) }}</p>
              <p class="text-[12px] font-[500] text-[#9e9ea0] uppercase mt-0.5">{{ cls.current_participants }}/{{ cls.max_participants }}명 신청</p>
            </div>
          </div>
        </div>
      </section>

      <!-- My enrolled classes -->
      <section class="bg-[#f5f5f5] px-5 py-8">
        <div class="flex items-baseline justify-between mb-1">
          <h2 class="text-[32px] font-[500] text-[#111111] uppercase leading-[1.2]">신청 내역</h2>
          <span class="text-[14px] font-[500] text-[#707072] uppercase">{{ myEnrollments.length }}개</span>
        </div>
        <div class="h-px bg-[#cacacb] mb-5 mt-4" />

        <!-- Loading -->
        <div v-if="isLoadingActivity" class="space-y-3">
          <div v-for="i in 2" :key="i" class="h-16 bg-[#e5e5e5] animate-pulse" />
        </div>

        <!-- Empty -->
        <p v-else-if="myEnrollments.length === 0" class="text-[14px] font-[400] text-[#707072] py-2">
          아직 신청한 클래스가 없어요
        </p>

        <!-- List -->
        <div v-else class="space-y-0">
          <div
            v-for="cls in myEnrollments"
            :key="cls.id"
            class="flex gap-3 py-4 border-b border-[#cacacb] last:border-0"
          >
            <div class="bg-white w-14 h-14 flex-shrink-0">
              <img :src="cls.thumbnail" :alt="cls.title" class="w-full h-full object-cover" />
            </div>
            <div class="min-w-0">
              <p class="text-[16px] font-[500] text-[#111111] truncate">{{ cls.title }}</p>
              <p class="text-[14px] font-[500] text-[#707072] mt-0.5">{{ formatDate(cls.date) }} · {{ formatPrice(cls.price) }}</p>
              <p class="text-[12px] font-[500] text-[#007d48] uppercase mt-0.5">신청 완료</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Logout section -->
      <section class="bg-[#111111] px-5 py-8">
        <button
          :disabled="isSigningOut"
          class="w-full text-[#9e9ea0] text-[16px] font-[500] h-12 rounded-[30px] border border-[#3a3a3a] transition-opacity active:opacity-50 disabled:opacity-40"
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

  </div>
</template>
