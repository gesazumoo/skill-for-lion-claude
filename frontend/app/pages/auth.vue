<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

// 이미 로그인 상태면 내정보로 이동
watchEffect(() => {
  if (user.value) navigateTo('/profile')
})

const route = useRoute()
const mode = ref<'login' | 'signup'>(route.query.mode === 'signup' ? 'signup' : 'login')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const switchMode = (target: 'login' | 'signup') => {
  mode.value = target
  errorMessage.value = ''
  successMessage.value = ''
  password.value = ''
  passwordConfirm.value = ''
}

const toKoreanError = (msg: string): string => {
  if (msg.includes('Invalid login credentials')) return '이메일 또는 비밀번호가 올바르지 않습니다'
  if (msg.includes('Email not confirmed')) return '이메일 인증이 필요합니다. 메일함을 확인해주세요'
  if (msg.includes('User already registered')) return '이미 가입된 이메일입니다'
  if (msg.includes('Password should be')) return '비밀번호는 6자 이상이어야 합니다'
  if (msg.includes('Unable to validate email')) return '올바른 이메일 형식을 입력해주세요'
  if (msg.includes('rate limit')) return '잠시 후 다시 시도해주세요'
  return '오류가 발생했습니다. 다시 시도해주세요'
}

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = '이메일과 비밀번호를 입력해주세요'
    return
  }
  errorMessage.value = ''
  isLoading.value = true
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value.trim(),
      password: password.value,
    })
    if (error) throw error
    navigateTo('/profile')
  } catch (e: any) {
    errorMessage.value = toKoreanError(e?.message ?? '')
  } finally {
    isLoading.value = false
  }
}

const handleSignup = async () => {
  if (!email.value || !password.value || !passwordConfirm.value) {
    errorMessage.value = '모든 항목을 입력해주세요'
    return
  }
  if (password.value.length < 6) {
    errorMessage.value = '비밀번호는 6자 이상이어야 합니다'
    return
  }
  if (password.value !== passwordConfirm.value) {
    errorMessage.value = '비밀번호가 일치하지 않습니다'
    return
  }
  errorMessage.value = ''
  isLoading.value = true
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value.trim(),
      password: password.value,
    })
    if (error) throw error
    // 이메일 인증 활성화 상태에서 중복 이메일은 에러 없이 identities가 빈 배열로 반환됨
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      errorMessage.value = '이미 가입된 이메일입니다. 로그인해주세요.'
      return
    }
    successMessage.value = '가입 확인 이메일을 발송했습니다.\n메일함을 확인하고 인증을 완료해주세요.'
  } catch (e: any) {
    errorMessage.value = toKoreanError(e?.message ?? '')
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = () => {
  if (mode.value === 'login') handleLogin()
  else handleSignup()
}
</script>

<template>
  <div class="min-h-screen bg-canvas flex flex-col">

    <!-- 상단 헤더 -->
    <div class="flex items-center h-12 px-4">
      <button @click="$router.back()" class="flex items-center justify-center w-8 h-8 -ml-1">
        <svg class="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>

    <!-- 헤드라인 -->
    <div class="px-6 pt-4 pb-8">
      <p class="text-xs font-medium tracking-[0.2em] uppercase text-mute mb-3">원데이 클래스</p>
      <h1 class="font-display text-[44px] text-ink leading-[0.92]">
        {{ mode === 'login' ? '로그인' : '회원가입' }}
      </h1>
    </div>

    <!-- 성공 메시지 (회원가입 완료) -->
    <div v-if="successMessage" class="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
      <div class="w-14 h-14 rounded-full bg-ink flex items-center justify-center">
        <svg class="w-7 h-7 text-canvas" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <div>
        <p class="text-base font-medium text-ink mb-2">이메일을 확인해주세요</p>
        <p class="text-sm text-mute leading-relaxed whitespace-pre-line">{{ successMessage }}</p>
      </div>
      <button
        @click="switchMode('login')"
        class="w-full bg-ink text-canvas text-sm font-medium h-12 rounded-[30px]"
      >
        로그인하러 가기
      </button>
    </div>

    <!-- 폼 -->
    <form v-else @submit.prevent="handleSubmit" class="flex-1 flex flex-col px-6 gap-3">

      <!-- 이메일 -->
      <div>
        <label class="text-[11px] font-medium text-mute tracking-wide block mb-1.5">이메일</label>
        <input
          v-model="email"
          type="email"
          placeholder="example@email.com"
          autocomplete="email"
          class="w-full bg-soft-cloud px-4 h-12 text-sm text-ink outline-none placeholder-stone"
          @input="errorMessage = ''"
        />
      </div>

      <!-- 비밀번호 -->
      <div>
        <label class="text-[11px] font-medium text-mute tracking-wide block mb-1.5">비밀번호</label>
        <input
          v-model="password"
          type="password"
          placeholder="6자 이상"
          :autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
          class="w-full bg-soft-cloud px-4 h-12 text-sm text-ink outline-none placeholder-stone"
          @input="errorMessage = ''"
        />
      </div>

      <!-- 비밀번호 확인 (회원가입만) -->
      <div v-if="mode === 'signup'">
        <label class="text-[11px] font-medium text-mute tracking-wide block mb-1.5">비밀번호 확인</label>
        <input
          v-model="passwordConfirm"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          autocomplete="new-password"
          class="w-full bg-soft-cloud px-4 h-12 text-sm text-ink outline-none placeholder-stone"
          @input="errorMessage = ''"
        />
      </div>

      <!-- 에러 메시지 -->
      <p v-if="errorMessage" class="text-[12px] text-sale font-medium">{{ errorMessage }}</p>

      <!-- 제출 버튼 -->
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full bg-ink text-canvas text-sm font-medium h-12 rounded-[30px] mt-2 flex items-center justify-center gap-2 disabled:opacity-40 active:opacity-70 transition-opacity"
      >
        <svg v-if="isLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        {{ isLoading ? '처리 중...' : (mode === 'login' ? '로그인' : '회원가입') }}
      </button>

      <!-- 모드 전환 -->
      <div class="flex items-center justify-center gap-1.5 pt-2">
        <span class="text-sm text-mute">
          {{ mode === 'login' ? '계정이 없으신가요?' : '이미 계정이 있으신가요?' }}
        </span>
        <button
          type="button"
          @click="switchMode(mode === 'login' ? 'signup' : 'login')"
          class="text-sm font-medium text-ink underline underline-offset-2"
        >
          {{ mode === 'login' ? '회원가입' : '로그인' }}
        </button>
      </div>

    </form>

  </div>
</template>
