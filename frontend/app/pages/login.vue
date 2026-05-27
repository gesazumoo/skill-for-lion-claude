<script setup lang="ts">
const { signIn, signUp } = useAuth()
const router = useRouter()

type Mode = 'login' | 'signup'
const mode = ref<Mode>('login')
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
      router.replace('/profile')
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
  <div class="min-h-screen bg-[#f5f5f7] max-w-lg mx-auto">

    <!-- ① Dark Hero -->
    <section class="bg-[#272729] px-5 pt-16 pb-10">

      <!-- 뒤로가기 -->
      <button
        class="flex items-center gap-1 text-[#0066cc] text-[17px] font-normal tracking-[-0.374px] mb-8 active:opacity-60"
        @click="router.back()"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        뒤로
      </button>

      <p class="text-[14px] font-semibold text-[#0066cc] tracking-[-0.224px] mb-3">
        원데이 클래스
      </p>
      <h1 class="text-[34px] font-semibold text-white leading-[1.07] tracking-[-0.374px] mb-3">
        반갑습니다
      </h1>
      <p class="text-[17px] font-normal text-[#cccccc] leading-[1.47] tracking-[-0.374px]">
        {{ mode === 'login' ? '계속하려면 로그인해주세요' : '새로운 계정을 만들어보세요' }}
      </p>
    </section>

    <!-- ② 이메일 인증 완료 상태 -->
    <section v-if="verificationSent" class="bg-white px-5 py-16 text-center">
      <div class="w-16 h-16 bg-[#f5f5f7] rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-8 h-8 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h2 class="text-[21px] font-semibold text-[#1d1d1f] tracking-[-0.374px] mb-2">
        인증 이메일을 보냈어요
      </h2>
      <p class="text-[17px] font-normal text-[#7a7a7a] leading-[1.47] tracking-[-0.374px] mb-1">
        {{ email }} 으로
      </p>
      <p class="text-[17px] font-normal text-[#7a7a7a] leading-[1.47] tracking-[-0.374px] mb-10">
        인증 링크를 보냈어요.<br />이메일을 확인하고 링크를 클릭해주세요.
      </p>
      <button
        class="w-full bg-[#0066cc] text-white text-[17px] font-light tracking-[-0.374px] py-[14px] rounded-[9999px] active:scale-[0.98] transition-transform"
        @click="switchMode('login'); verificationSent = false"
      >
        로그인하러 가기
      </button>
    </section>

    <!-- ③ White Form Section -->
    <section v-else class="bg-white px-5 py-8">

      <!-- 탭 스위처 (Segmented Control) -->
      <div class="flex bg-[#f5f5f7] rounded-[12px] p-1 mb-8">
        <button
          class="flex-1 py-2.5 text-[15px] font-medium tracking-[-0.224px] rounded-[10px] transition-all duration-200"
          :class="mode === 'login'
            ? 'bg-white text-[#1d1d1f] shadow-sm'
            : 'text-[#7a7a7a]'"
          @click="switchMode('login')"
        >
          로그인
        </button>
        <button
          class="flex-1 py-2.5 text-[15px] font-medium tracking-[-0.224px] rounded-[10px] transition-all duration-200"
          :class="mode === 'signup'
            ? 'bg-white text-[#1d1d1f] shadow-sm'
            : 'text-[#7a7a7a]'"
          @click="switchMode('signup')"
        >
          회원가입
        </button>
      </div>

      <div class="space-y-5">

        <!-- 이메일 -->
        <div>
          <label class="block text-[14px] font-medium text-[#1d1d1f] tracking-[-0.224px] mb-2">
            이메일
          </label>
          <input
            v-model="email"
            type="email"
            inputmode="email"
            autocomplete="email"
            placeholder="example@email.com"
            class="w-full bg-[#f5f5f7] rounded-[12px] px-4 py-[14px] text-[17px] text-[#1d1d1f] placeholder-[#7a7a7a] tracking-[-0.374px] outline-none focus:ring-2 focus:ring-[#0066cc]/30 transition-all"
            @keydown.enter="handleSubmit"
            @input="errorMsg = ''"
          />
        </div>

        <!-- 비밀번호 -->
        <div>
          <label class="block text-[14px] font-medium text-[#1d1d1f] tracking-[-0.224px] mb-2">
            비밀번호
          </label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="6자 이상 입력해주세요"
              class="w-full bg-[#f5f5f7] rounded-[12px] px-4 py-[14px] pr-12 text-[17px] text-[#1d1d1f] placeholder-[#7a7a7a] tracking-[-0.374px] outline-none focus:ring-2 focus:ring-[#0066cc]/30 transition-all"
              @keydown.enter="handleSubmit"
              @input="errorMsg = ''"
            />
            <button
              type="button"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-[#7a7a7a] active:opacity-60"
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

        <!-- 에러 메시지 -->
        <Transition name="fade">
          <div
            v-if="errorMsg"
            class="flex items-center gap-2 bg-[#fff2f2] rounded-[12px] px-4 py-3"
          >
            <svg class="w-4 h-4 text-[#ff3b30] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <p class="text-[14px] text-[#ff3b30] tracking-[-0.2px]">{{ errorMsg }}</p>
          </div>
        </Transition>

      </div>

      <!-- 제출 버튼 -->
      <button
        :disabled="isLoading"
        class="w-full mt-8 bg-[#0066cc] text-white text-[17px] font-light tracking-[-0.374px] py-[14px] rounded-[9999px] transition-all active:scale-[0.98] disabled:opacity-60"
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

      <!-- 하단 모드 전환 링크 -->
      <p class="mt-6 text-center text-[14px] text-[#7a7a7a] tracking-[-0.224px]">
        {{ mode === 'login' ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?' }}
        <button
          class="text-[#0066cc] font-medium ml-1 active:opacity-60"
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
