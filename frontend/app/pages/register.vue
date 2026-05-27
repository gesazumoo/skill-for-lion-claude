<script setup lang="ts">
import { CATEGORIES } from '~/composables/useClasses'

const router = useRouter()
const nuxtApp = useNuxtApp()

const FORM_CATEGORIES = CATEGORIES.filter(c => c !== '전체')

const form = reactive({
  title: '',
  category: FORM_CATEGORIES[0] as string,
  price: '',
  location: '',
  date: '',
  deadline: '',
  maxParticipants: '',
  description: '',
})

const imageFile = ref<File | null>(null)
const imagePreview = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)
const isSubmitting = ref(false)
const showSuccess = ref(false)
const errors = reactive<Record<string, string>>({})

function onImageChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  imageFile.value = file
  const reader = new FileReader()
  reader.onload = ev => { imagePreview.value = ev.target?.result as string }
  reader.readAsDataURL(file)
}

function removeImage() {
  imageFile.value = null
  imagePreview.value = ''
  if (fileInputRef.value) fileInputRef.value.value = ''
}

function clearError(field: string) {
  delete errors[field]
}

function validate(): boolean {
  const e: Record<string, string> = {}
  if (!form.title.trim()) e.title = '클래스 제목을 입력해주세요'
  if (!form.price || Number(form.price) <= 0) e.price = '가격을 입력해주세요'
  if (!form.location.trim()) e.location = '지역을 입력해주세요'
  if (!form.date) e.date = '날짜를 선택해주세요'
  if (!form.deadline) e.deadline = '마감 날짜를 선택해주세요'
  else if (form.date && form.deadline >= form.date) e.deadline = '마감 날짜는 수업 날짜보다 이전이어야 해요'
  if (!form.maxParticipants || Number(form.maxParticipants) <= 0) e.maxParticipants = '참가 인원을 입력해주세요'
  if (!form.description.trim()) e.description = '상세 설명을 입력해주세요'
  Object.keys(errors).forEach(k => delete errors[k])
  Object.assign(errors, e)
  return Object.keys(e).length === 0
}

async function uploadThumbnail(): Promise<string> {
  if (!imageFile.value) {
    return `https://picsum.photos/seed/${Date.now()}/400/300`
  }
  const ext = imageFile.value.name.split('.').pop() ?? 'jpg'
  const path = `${Date.now()}.${ext}`
  const { data, error } = await (nuxtApp.$supabase as any).storage
    .from('class-thumbnails')
    .upload(path, imageFile.value)
  if (error) throw error
  const { data: { publicUrl } } = (nuxtApp.$supabase as any).storage
    .from('class-thumbnails')
    .getPublicUrl(data.path)
  return publicUrl
}

async function handleSubmit() {
  if (!validate()) {
    const firstErrorEl = document.querySelector('[data-error]')
    firstErrorEl?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }
  isSubmitting.value = true
  try {
    const thumbnail = await uploadThumbnail()
    const { error } = await (nuxtApp.$supabase as any).from('classes').insert({
      title: form.title.trim(),
      category: form.category,
      price: Number(form.price),
      location: form.location.trim(),
      date: form.date,
      deadline: form.deadline,
      max_participants: Number(form.maxParticipants),
      current_participants: 0,
      thumbnail,
      description: form.description.trim(),
    })
    if (error) throw error
    await refreshNuxtData('classes')
    showSuccess.value = true
    setTimeout(() => router.push('/search'), 1500)
  } catch {
    errors.submit = '등록 중 오류가 발생했어요. 다시 시도해주세요.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f7] max-w-lg mx-auto pb-[72px]">

    <!-- 성공 토스트 -->
    <div class="fixed bottom-24 inset-x-0 flex justify-center pointer-events-none z-50">
      <Transition name="toast">
        <div
          v-if="showSuccess"
          class="flex items-center gap-2 bg-[#1d1d1f] text-white text-[15px] font-medium px-5 py-3 rounded-[9999px] shadow-xl"
        >
          <svg class="w-4 h-4 text-[#30d158] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
          클래스가 등록되었어요!
        </div>
      </Transition>
    </div>

    <!-- ① Dark Hero Header -->
    <section class="bg-[#272729] px-5 pt-16 pb-10">
      <p class="text-[14px] font-semibold text-[#0066cc] tracking-[-0.224px] mb-3">
        클래스 호스트
      </p>
      <h1 class="text-[34px] font-semibold text-white leading-[1.07] tracking-[-0.374px] mb-3">
        새로운 클래스를<br />등록해보세요
      </h1>
      <p class="text-[17px] font-normal text-[#cccccc] leading-[1.47] tracking-[-0.374px]">
        함께할 사람들을 직접 모집할 수 있어요
      </p>
    </section>

    <!-- ② White Form Section -->
    <section class="bg-white px-5 py-10 space-y-8">

      <!-- 클래스 제목 -->
      <div :data-error="errors.title ? '' : undefined">
        <label class="block text-[14px] font-medium text-[#1d1d1f] tracking-[-0.224px] mb-3">
          클래스 제목 <span class="text-[#ff3b30]">*</span>
        </label>
        <input
          v-model="form.title"
          type="text"
          placeholder="어떤 클래스인지 알려주세요"
          maxlength="50"
          class="w-full bg-[#f5f5f7] rounded-[12px] px-4 py-[14px] text-[17px] text-[#1d1d1f] placeholder-[#7a7a7a] tracking-[-0.374px] outline-none transition-all"
          :class="errors.title ? 'ring-2 ring-[#ff3b30]/40' : 'focus:ring-2 focus:ring-[#0066cc]/30'"
          @input="clearError('title')"
        />
        <p v-if="errors.title" class="mt-2 text-[13px] text-[#ff3b30] tracking-[-0.2px]">
          {{ errors.title }}
        </p>
      </div>

      <!-- 카테고리 -->
      <div>
        <label class="block text-[14px] font-medium text-[#1d1d1f] tracking-[-0.224px] mb-3">
          카테고리 <span class="text-[#ff3b30]">*</span>
        </label>
        <div class="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            v-for="cat in FORM_CATEGORIES"
            :key="cat"
            type="button"
            @click="form.category = cat"
            class="flex-shrink-0 whitespace-nowrap text-[15px] font-normal tracking-[-0.224px] px-5 py-2.5 rounded-[9999px] transition-all duration-150 active:scale-95"
            :class="form.category === cat
              ? 'bg-[#0066cc] text-white'
              : 'bg-[#f5f5f7] text-[#1d1d1f]'"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <div class="h-px bg-[#e5e5ea]" />

      <!-- 가격 -->
      <div :data-error="errors.price ? '' : undefined">
        <label class="block text-[14px] font-medium text-[#1d1d1f] tracking-[-0.224px] mb-3">
          가격 <span class="text-[#ff3b30]">*</span>
        </label>
        <div class="relative">
          <input
            v-model="form.price"
            type="number"
            inputmode="numeric"
            placeholder="0"
            min="0"
            class="w-full bg-[#f5f5f7] rounded-[12px] px-4 py-[14px] pr-10 text-[17px] text-[#1d1d1f] placeholder-[#7a7a7a] tracking-[-0.374px] outline-none transition-all"
            :class="errors.price ? 'ring-2 ring-[#ff3b30]/40' : 'focus:ring-2 focus:ring-[#0066cc]/30'"
            @input="clearError('price')"
          />
          <span class="absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-[#7a7a7a]">원</span>
        </div>
        <p v-if="errors.price" class="mt-2 text-[13px] text-[#ff3b30] tracking-[-0.2px]">
          {{ errors.price }}
        </p>
      </div>

      <!-- 최대 인원 -->
      <div :data-error="errors.maxParticipants ? '' : undefined">
        <label class="block text-[14px] font-medium text-[#1d1d1f] tracking-[-0.224px] mb-3">
          최대 참가 인원 <span class="text-[#ff3b30]">*</span>
        </label>
        <div class="relative">
          <input
            v-model="form.maxParticipants"
            type="number"
            inputmode="numeric"
            placeholder="0"
            min="1"
            class="w-full bg-[#f5f5f7] rounded-[12px] px-4 py-[14px] pr-10 text-[17px] text-[#1d1d1f] placeholder-[#7a7a7a] tracking-[-0.374px] outline-none transition-all"
            :class="errors.maxParticipants ? 'ring-2 ring-[#ff3b30]/40' : 'focus:ring-2 focus:ring-[#0066cc]/30'"
            @input="clearError('maxParticipants')"
          />
          <span class="absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-[#7a7a7a]">명</span>
        </div>
        <p v-if="errors.maxParticipants" class="mt-2 text-[13px] text-[#ff3b30] tracking-[-0.2px]">
          {{ errors.maxParticipants }}
        </p>
      </div>

      <!-- 지역 -->
      <div :data-error="errors.location ? '' : undefined">
        <label class="block text-[14px] font-medium text-[#1d1d1f] tracking-[-0.224px] mb-3">
          지역 <span class="text-[#ff3b30]">*</span>
        </label>
        <input
          v-model="form.location"
          type="text"
          placeholder="예: 서울 강남구"
          class="w-full bg-[#f5f5f7] rounded-[12px] px-4 py-[14px] text-[17px] text-[#1d1d1f] placeholder-[#7a7a7a] tracking-[-0.374px] outline-none transition-all"
          :class="errors.location ? 'ring-2 ring-[#ff3b30]/40' : 'focus:ring-2 focus:ring-[#0066cc]/30'"
          @input="clearError('location')"
        />
        <p v-if="errors.location" class="mt-2 text-[13px] text-[#ff3b30] tracking-[-0.2px]">
          {{ errors.location }}
        </p>
      </div>

      <div class="h-px bg-[#e5e5ea]" />

      <!-- 수업 날짜 -->
      <div :data-error="errors.date ? '' : undefined">
        <label class="block text-[14px] font-medium text-[#1d1d1f] tracking-[-0.224px] mb-3">
          수업 날짜 <span class="text-[#ff3b30]">*</span>
        </label>
        <input
          v-model="form.date"
          type="date"
          class="w-full bg-[#f5f5f7] rounded-[12px] px-4 py-[14px] text-[17px] text-[#1d1d1f] tracking-[-0.374px] outline-none transition-all"
          :class="errors.date ? 'ring-2 ring-[#ff3b30]/40' : 'focus:ring-2 focus:ring-[#0066cc]/30'"
          @change="clearError('date')"
        />
        <p v-if="errors.date" class="mt-2 text-[13px] text-[#ff3b30] tracking-[-0.2px]">
          {{ errors.date }}
        </p>
      </div>

      <!-- 마감 날짜 -->
      <div :data-error="errors.deadline ? '' : undefined">
        <label class="block text-[14px] font-medium text-[#1d1d1f] tracking-[-0.224px] mb-3">
          마감 날짜 <span class="text-[#ff3b30]">*</span>
        </label>
        <input
          v-model="form.deadline"
          type="date"
          class="w-full bg-[#f5f5f7] rounded-[12px] px-4 py-[14px] text-[17px] text-[#1d1d1f] tracking-[-0.374px] outline-none transition-all"
          :class="errors.deadline ? 'ring-2 ring-[#ff3b30]/40' : 'focus:ring-2 focus:ring-[#0066cc]/30'"
          @change="clearError('deadline')"
        />
        <p v-if="errors.deadline" class="mt-2 text-[13px] text-[#ff3b30] tracking-[-0.2px]">
          {{ errors.deadline }}
        </p>
      </div>

      <div class="h-px bg-[#e5e5ea]" />

      <!-- 상세 설명 -->
      <div :data-error="errors.description ? '' : undefined">
        <label class="block text-[14px] font-medium text-[#1d1d1f] tracking-[-0.224px] mb-3">
          상세 설명 <span class="text-[#ff3b30]">*</span>
        </label>
        <textarea
          v-model="form.description"
          placeholder="클래스에 대해 자세히 설명해주세요"
          rows="5"
          maxlength="500"
          class="w-full bg-[#f5f5f7] rounded-[12px] px-4 py-[14px] text-[17px] text-[#1d1d1f] placeholder-[#7a7a7a] tracking-[-0.374px] outline-none resize-none transition-all leading-[1.6]"
          :class="errors.description ? 'ring-2 ring-[#ff3b30]/40' : 'focus:ring-2 focus:ring-[#0066cc]/30'"
          @input="clearError('description')"
        />
        <div class="flex items-start justify-between mt-2">
          <p v-if="errors.description" class="text-[13px] text-[#ff3b30] tracking-[-0.2px]">
            {{ errors.description }}
          </p>
          <span class="ml-auto text-[13px] text-[#7a7a7a]">{{ form.description.length }}/500</span>
        </div>
      </div>
    </section>

    <!-- ③ Parchment — 썸네일 업로드 -->
    <section class="bg-[#f5f5f7] px-5 py-10">
      <label class="block text-[14px] font-medium text-[#1d1d1f] tracking-[-0.224px] mb-2">
        썸네일 이미지
      </label>
      <p class="text-[13px] text-[#7a7a7a] tracking-[-0.2px] mb-4">
        이미지를 등록하지 않으면 기본 이미지가 사용돼요
      </p>

      <!-- 이미지 미리보기 -->
      <div v-if="imagePreview" class="relative mb-3">
        <img
          :src="imagePreview"
          alt="썸네일 미리보기"
          class="w-full h-48 object-cover rounded-[18px]"
        />
        <button
          type="button"
          @click="removeImage"
          class="absolute top-3 right-3 bg-black/60 text-white w-7 h-7 rounded-full flex items-center justify-center active:opacity-70"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- 업로드 버튼 -->
      <button
        v-if="!imagePreview"
        type="button"
        @click="fileInputRef?.click()"
        class="w-full h-36 border-2 border-dashed border-[#d1d1d6] rounded-[18px] flex flex-col items-center justify-center gap-2 active:opacity-70 transition-opacity"
      >
        <div class="w-10 h-10 bg-[#e5e5ea] rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-[#7a7a7a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <span class="text-[14px] font-normal text-[#7a7a7a] tracking-[-0.224px]">사진 추가</span>
      </button>
      <button
        v-else
        type="button"
        @click="fileInputRef?.click()"
        class="w-full mt-2 py-2.5 rounded-[9999px] border border-[#d1d1d6] text-[14px] text-[#1d1d1f] tracking-[-0.224px] active:opacity-70 transition-opacity"
      >
        다른 사진 선택
      </button>

      <input
        ref="fileInputRef"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        class="hidden"
        @change="onImageChange"
      />
    </section>

    <!-- ④ Dark Submit Section -->
    <section class="bg-[#272729] px-5 py-10 space-y-3">
      <!-- 서버 에러 메시지 -->
      <p v-if="errors.submit" class="text-[14px] text-[#ff453a] tracking-[-0.224px] text-center pb-1">
        {{ errors.submit }}
      </p>

      <!-- 등록하기 버튼 -->
      <button
        type="button"
        :disabled="isSubmitting"
        @click="handleSubmit"
        class="w-full bg-[#0066cc] text-white text-[17px] font-light tracking-[-0.374px] py-[14px] rounded-[9999px] transition-all active:scale-[0.98] disabled:opacity-60"
      >
        <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
          <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="white" stroke-width="4" />
            <path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          등록 중...
        </span>
        <span v-else>등록하기</span>
      </button>

      <!-- 취소 버튼 -->
      <button
        type="button"
        :disabled="isSubmitting"
        @click="router.back()"
        class="w-full text-[rgba(235,235,245,0.6)] text-[17px] font-normal tracking-[-0.374px] py-[14px] rounded-[9999px] transition-opacity active:opacity-50 disabled:opacity-40"
      >
        취소
      </button>
    </section>

    <BottomNavigation active-menu="register" />

  </div>
</template>

<style scoped>
.toast-enter-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
