<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()

const categories = ['운동', '러닝', '수영', '스터디', '취미', '클래스']

const form = reactive({
  title: '',
  category: '',
  price: '',
  location: '',
  date: '',
  deadline: '',
  maxParticipants: '',
  description: '',
})

const thumbnailFile = ref<File | null>(null)
const thumbnailPreview = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)

const isLoading = ref(false)
const isSuccess = ref(false)
const errors = reactive<Record<string, string>>({})

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  thumbnailFile.value = file
  thumbnailPreview.value = URL.createObjectURL(file)
}

const clearError = (field: string) => {
  delete errors[field]
}

const validate = (): boolean => {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.title.trim()) errors.title = '클래스 제목을 입력해주세요'
  if (!form.category) errors.category = '카테고리를 선택해주세요'
  if (!form.price || Number(form.price) <= 0) errors.price = '참가비를 입력해주세요'
  if (!form.location.trim()) errors.location = '지역을 입력해주세요'
  if (!form.date) errors.date = '클래스 날짜를 선택해주세요'
  if (!form.deadline) errors.deadline = '마감 날짜를 선택해주세요'
  if (form.date && form.deadline && form.deadline > form.date)
    errors.deadline = '마감 날짜는 클래스 날짜 이전이어야 합니다'
  if (!form.maxParticipants || Number(form.maxParticipants) < 1)
    errors.maxParticipants = '최대 인원을 입력해주세요'
  return Object.keys(errors).length === 0
}

const uploadThumbnail = async (file: File): Promise<string> => {
  const ext = file.name.split('.').pop() ?? 'jpg'
  const filename = `${Date.now()}.${ext}`
  const { error } = await supabase.storage
    .from('class-thumbnails')
    .upload(filename, file, { contentType: file.type })
  if (error) throw error
  const { data } = supabase.storage.from('class-thumbnails').getPublicUrl(filename)
  return data.publicUrl
}

const handleSubmit = async () => {
  if (!validate()) return
  isLoading.value = true
  delete errors.submit
  try {
    let thumbnailUrl: string | null = null
    if (thumbnailFile.value) {
      thumbnailUrl = await uploadThumbnail(thumbnailFile.value)
    }
    const { error } = await supabase.from('classes').insert({
      title: form.title.trim(),
      category: form.category,
      price: Number(form.price),
      location: form.location.trim(),
      date: form.date,
      deadline: form.deadline,
      max_participants: Number(form.maxParticipants),
      current_participants: 0,
      thumbnail: thumbnailUrl,
      description: form.description.trim() || null,
    })
    if (error) throw error
    await refreshNuxtData('classes')
    isSuccess.value = true
  } catch {
    errors.submit = '등록 중 오류가 발생했습니다. 다시 시도해주세요.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-canvas">

    <!-- ══ 성공 화면 ═══════════════════════════════════════════ -->
    <div v-if="isSuccess" class="flex flex-col items-center justify-center min-h-screen px-8 text-center">
      <div class="w-14 h-14 rounded-full bg-ink flex items-center justify-center mb-6">
        <svg class="w-7 h-7 text-canvas" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p class="text-[10px] font-medium tracking-[0.25em] uppercase text-mute mb-3">등록 완료</p>
      <h2 class="font-display text-[36px] text-ink leading-[0.95] mb-4">클래스가<br>등록됐어요</h2>
      <p class="text-sm text-mute leading-relaxed mb-10">홈과 검색 화면에서<br>방금 등록한 클래스를 확인하세요.</p>
      <div class="flex flex-col gap-3 w-full">
        <NuxtLink
          to="/"
          class="w-full bg-ink text-canvas text-sm font-medium h-12 rounded-[30px] flex items-center justify-center"
        >
          홈으로 이동
        </NuxtLink>
        <NuxtLink
          to="/search"
          class="w-full bg-soft-cloud text-ink text-sm font-medium h-12 rounded-[30px] flex items-center justify-center"
        >
          검색에서 확인
        </NuxtLink>
      </div>
    </div>

    <!-- ══ 등록 폼 ════════════════════════════════════════════ -->
    <template v-else>

      <!-- 상단 헤더 -->
      <div class="sticky top-0 z-40 bg-canvas border-b border-hairline-soft">
        <div class="flex items-center h-12 px-4 gap-3">
          <button @click="router.back()" class="flex items-center justify-center w-8 h-8 -ml-1">
            <svg class="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <p class="text-[10px] font-medium tracking-[0.2em] uppercase text-mute">클래스 등록</p>
        </div>
      </div>

      <!-- 안내 헤드라인 -->
      <div class="bg-ink px-4 pt-8 pb-7">
        <p class="text-stone text-[10px] font-medium tracking-[0.25em] uppercase mb-3">강사 모드</p>
        <h1 class="font-display text-[40px] text-canvas leading-[0.92]">나만의<br>클래스 등록</h1>
      </div>

      <!-- 폼 영역 -->
      <form @submit.prevent="handleSubmit" class="pb-32">

        <!-- ── 썸네일 ─────────────────────────────────────── -->
        <div class="px-4 py-6">
          <p class="text-[10px] font-medium tracking-[0.2em] uppercase text-mute mb-3">썸네일 이미지</p>
          <input
            ref="fileInputRef"
            type="file"
            accept="image/*"
            class="hidden"
            @change="onFileChange"
          />
          <button
            type="button"
            @click="fileInputRef?.click()"
            class="w-full aspect-[4/3] bg-soft-cloud flex flex-col items-center justify-center gap-3 relative overflow-hidden"
          >
            <img
              v-if="thumbnailPreview"
              :src="thumbnailPreview"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <template v-if="!thumbnailPreview">
              <svg class="w-8 h-8 text-mute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-xs font-medium text-mute tracking-wide">이미지 선택</span>
            </template>
            <div
              v-else
              class="absolute bottom-2 right-2 bg-ink bg-opacity-70 text-canvas text-[10px] font-medium px-2.5 py-1 rounded-[20px]"
            >
              변경
            </div>
          </button>
        </div>

        <div class="h-px bg-hairline-soft" />

        <!-- ── 기본 정보 ─────────────────────────────────── -->
        <div class="px-4 py-6 flex flex-col gap-4">
          <p class="text-[10px] font-medium tracking-[0.2em] uppercase text-mute">기본 정보</p>

          <!-- 제목 -->
          <div>
            <input
              v-model="form.title"
              type="text"
              placeholder="클래스 제목"
              class="w-full bg-soft-cloud px-4 h-12 text-sm text-ink outline-none placeholder-stone"
              @input="clearError('title')"
            />
            <p v-if="errors.title" class="text-[11px] text-sale mt-1 px-1">{{ errors.title }}</p>
          </div>

          <!-- 카테고리 -->
          <div>
            <div class="flex gap-2 flex-wrap">
              <button
                v-for="cat in categories"
                :key="cat"
                type="button"
                @click="form.category = cat; clearError('category')"
                :class="form.category === cat
                  ? 'bg-ink text-canvas'
                  : 'bg-soft-cloud text-mute'"
                class="px-4 py-2 rounded-[30px] text-sm font-medium transition-colors"
              >
                {{ cat }}
              </button>
            </div>
            <p v-if="errors.category" class="text-[11px] text-sale mt-2 px-1">{{ errors.category }}</p>
          </div>

          <!-- 상세 설명 -->
          <div>
            <textarea
              v-model="form.description"
              placeholder="클래스 상세 설명"
              rows="4"
              class="w-full bg-soft-cloud px-4 py-3 text-sm text-ink outline-none placeholder-stone resize-none"
            />
          </div>
        </div>

        <div class="h-px bg-hairline-soft" />

        <!-- ── 일정 ──────────────────────────────────────── -->
        <div class="px-4 py-6 flex flex-col gap-4">
          <p class="text-[10px] font-medium tracking-[0.2em] uppercase text-mute">일정</p>

          <div>
            <label class="text-[11px] text-stone mb-1 block px-1">클래스 날짜</label>
            <input
              v-model="form.date"
              type="date"
              class="w-full bg-soft-cloud px-4 h-12 text-sm text-ink outline-none"
              @change="clearError('date')"
            />
            <p v-if="errors.date" class="text-[11px] text-sale mt-1 px-1">{{ errors.date }}</p>
          </div>

          <div>
            <label class="text-[11px] text-stone mb-1 block px-1">마감 날짜</label>
            <input
              v-model="form.deadline"
              type="date"
              class="w-full bg-soft-cloud px-4 h-12 text-sm text-ink outline-none"
              @change="clearError('deadline')"
            />
            <p v-if="errors.deadline" class="text-[11px] text-sale mt-1 px-1">{{ errors.deadline }}</p>
          </div>
        </div>

        <div class="h-px bg-hairline-soft" />

        <!-- ── 장소 & 인원 ────────────────────────────────── -->
        <div class="px-4 py-6 flex flex-col gap-4">
          <p class="text-[10px] font-medium tracking-[0.2em] uppercase text-mute">장소 & 인원</p>

          <div>
            <input
              v-model="form.location"
              type="text"
              placeholder="지역 (예: 서울 강남구)"
              class="w-full bg-soft-cloud px-4 h-12 text-sm text-ink outline-none placeholder-stone"
              @input="clearError('location')"
            />
            <p v-if="errors.location" class="text-[11px] text-sale mt-1 px-1">{{ errors.location }}</p>
          </div>

          <div>
            <input
              v-model="form.maxParticipants"
              type="number"
              min="1"
              placeholder="최대 참가 인원"
              class="w-full bg-soft-cloud px-4 h-12 text-sm text-ink outline-none placeholder-stone"
              @input="clearError('maxParticipants')"
            />
            <p v-if="errors.maxParticipants" class="text-[11px] text-sale mt-1 px-1">{{ errors.maxParticipants }}</p>
          </div>
        </div>

        <div class="h-px bg-hairline-soft" />

        <!-- ── 참가비 ─────────────────────────────────────── -->
        <div class="px-4 py-6">
          <p class="text-[10px] font-medium tracking-[0.2em] uppercase text-mute mb-4">참가비</p>
          <div class="relative">
            <input
              v-model="form.price"
              type="number"
              min="0"
              placeholder="0"
              class="w-full bg-soft-cloud px-4 pr-10 h-12 text-sm text-ink outline-none placeholder-stone"
              @input="clearError('price')"
            />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-mute">원</span>
          </div>
          <p v-if="errors.price" class="text-[11px] text-sale mt-1 px-1">{{ errors.price }}</p>
        </div>

        <!-- 제출 오류 -->
        <div v-if="errors.submit" class="mx-4 mb-2 bg-sale bg-opacity-10 px-4 py-3">
          <p class="text-sm text-sale">{{ errors.submit }}</p>
        </div>

      </form>

      <!-- ══ 하단 고정 CTA ══════════════════════════════════════ -->
      <div class="fixed bottom-0 left-0 right-0 z-50 bg-canvas border-t border-hairline-soft px-4 py-4">
        <div class="flex gap-3">
          <button
            type="button"
            @click="router.back()"
            class="flex-1 bg-soft-cloud text-ink text-sm font-medium h-12 rounded-[30px] transition-opacity active:opacity-70"
          >
            취소
          </button>
          <button
            type="button"
            @click="handleSubmit"
            :disabled="isLoading"
            class="flex-[2] bg-ink text-canvas text-sm font-medium h-12 rounded-[30px] transition-opacity active:opacity-70 disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <svg v-if="isLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            {{ isLoading ? '등록 중...' : '등록하기' }}
          </button>
        </div>
      </div>

    </template>
  </div>
</template>
