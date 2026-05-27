<script setup lang="ts">
const { signIn, signUp } = useAuth()
const router = useRouter()
const route = useRoute()

type Mode = 'login' | 'signup'
const mode = ref<Mode>((route.query.mode as Mode) === 'signup' ? 'signup' : 'login')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMsg = ref('')
const verificationSent = ref(false)

function switchMode(newMode: Mode) {
  mode.value = newMode
  errorMsg.value = ''
}

async function handleSubmit() {
  const trimmedEmail = email.value.trim()
  if (!trimmedEmail || !password.value) {
    errorMsg.value = '이메일과 비밀번호를 입력해주세요'
    return
  }
  isLoading.value = true
  errorMsg.value = ''
  try {
    if (mode.value === 'login') {
      await signIn(trimmedEmail, password.value)
      const redirect = (route.query.redirect as string) || '/profile'
      router.replace(redirect)
    } else {
      await signUp(trimmedEmail, password.value)
      verificationSent.value = true
    }
  } catch (e: any) {
    errorMsg.value = e.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-white max-w-lg mx-auto">

    <!-- Campaign Hero — ink bg, Bebas Neue -->
    <section class="bg-[#111111] px-5 pt-16 pb-10">
      <button
        class="flex items-center gap-1 text-[#9e9ea0] text-[14px] font-[500] uppercase tracking-[0.04em] mb-10 active:opacity-60 transition-opacity"
        @click="router.back()"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        뒤로
      </button>
      <p class="text-[12px] font-[500] text-[#9e9ea0] uppercase tracking-[0.12em] mb-4">원데이 클래스</p>
      <h1 class="font-display text-[72px] leading-[0.9] text-white uppercase">
        {{ mode === 'login' ? 'SIGN\nIN' : 'JOIN\nUS' }}
      </h1>
    </section>

    <!-- Verification sent state -->
    <section v-if="verificationSent" class="bg-white px-5 py-20 text-center">
      <div class="w-16 h-16 bg-[#f5f5f5] flex items-center justify-center mx-auto mb-8">
        <svg class="w-8 h-8 text-[#111111]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h2 class="text-[32px] font-[500] text-[#111111] uppercase leading-[1.2] mb-3">인증 이메일 전송</h2>
      <p class="text-[16px] font-[400] text-[#707072] leading-[1.5] mb-10">
        {{ email }}으로<br />인증 링크를 보냈어요.<br />이메일을 확인하고 링크를 클릭해주세요.
      </p>
      <button
        class="w-full bg-[#111111] text-white text-[16px] font-[500] h-12 rounded-[30px] active:opacity-60 transition-opacity"
        @click="switchMode('login'); verificationSent = false"
      >
        로그인하러 가기
      </button>
    </section>

    <!-- Form section -->
    <section v-else class="bg-white px-5 py-10">

      <!-- Mode tabs — ink underline style -->
      <div class="flex border-b border-[#e5e5e5] mb-8">
        <button
          class="flex-1 pb-3 text-[16px] font-[500] uppercase transition-colors"
          :class="mode === 'login'
            ? 'text-[#111111] border-b-2 border-[#111111] -mb-px'
            : 'text-[#9e9ea0]'"
          @click="switchMode('login')"
        >로그인</button>
        <button
          class="flex-1 pb-3 text-[16px] font-[500] uppercase transition-colors"
          :class="mode === 'signup'
            ? 'text-[#111111] border-b-2 border-[#111111] -mb-px'
            : 'text-[#9e9ea0]'"
          @click="switchMode('signup')"
        >회원가입</button>
      </div>

      <div class="space-y-6">

        <!-- Email -->
        <div>
          <label class="block text-[12px] font-[500] text-[#111111] uppercase tracking-[0.08em] mb-2">이메일</label>
          <input
            v-model="email"
            type="email"
            inputmode="email"
            autocomplete="email"
            placeholder="example@email.com"
            class="w-full bg-[#f5f5f5] px-5 h-12 text-[16px] font-[400] text-[#111111] placeholder-[#9e9ea0] outline-none focus:ring-2 focus:ring-[#111111] transition-all"
            @keydown.enter="handleSubmit"
            @input="errorMsg = ''"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-[12px] font-[500] text-[#111111] uppercase tracking-[0.08em] mb-2">비밀번호</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="6자 이상"
              class="w-full bg-[#f5f5f5] px-5 h-12 pr-12 text-[16px] font-[400] text-[#111111] placeholder-[#9e9ea0] outline-none focus:ring-2 focus:ring-[#111111] transition-all"
              @keydown.enter="handleSubmit"
              @input="errorMsg = ''"
            />
            <button
              type="button"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-[#9e9ea0] active:opacity-60"
              @click="showPassword = !showPassword"
            >
              <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Error message — sale color, no bg per Nike system -->
        <Transition name="fade">
          <p v-if="errorMsg" class="text-[14px] font-[500] text-[#d30005] uppercase">
            {{ errorMsg }}
          </p>
        </Transition>

      </div>

      <!-- Primary CTA — black pill -->
      <button
        :disabled="isLoading"
        class="w-full mt-8 bg-[#111111] text-white text-[16px] font-[500] h-12 rounded-[30px] transition-opacity active:opacity-60 disabled:opacity-50"
        @click="handleSubmit"
      >
        <span v-if="isLoading" class="flex items-center justify-center gap-2">
          <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="white" stroke-width="4" />
            <path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          처리 중...
        </span>
        <span v-else>{{ mode === 'login' ? '로그인하기' : '회원가입하기' }}</span>
      </button>

      <!-- Mode switch link -->
      <p class="mt-6 text-center text-[14px] font-[400] text-[#707072]">
        {{ mode === 'login' ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?' }}
        <button
          class="text-[#111111] font-[500] underline ml-1 active:opacity-60"
          @click="switchMode(mode === 'login' ? 'signup' : 'login')"
        >
          {{ mode === 'login' ? '회원가입' : '로그인' }}
        </button>
      </p>
    </section>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
