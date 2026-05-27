<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'
import { useClasses } from '~/composables/useClasses'

const props = defineProps<{
  classItem: ClassItem
}>()

const emit = defineEmits<{
  close: []
}>()

const { isDeadlineSoon, formatPrice, formatDate } = useClasses()
const { isLoggedIn, user } = useAuth()
const router = useRouter()
const nuxtApp = useNuxtApp()

const deadlineSoon = computed(() => isDeadlineSoon(props.classItem.deadline))
const participantRate = computed(() =>
  Math.round((props.classItem.currentParticipants / props.classItem.maxParticipants) * 100)
)

const isApplying = ref(false)
const isApplied = ref(false)
const applyError = ref('')

async function handleApply() {
  if (!isLoggedIn.value) {
    emit('close')
    router.push('/login')
    return
  }
  if (isApplied.value) return
  isApplying.value = true
  applyError.value = ''
  try {
    const { error } = await (nuxtApp.$supabase as any)
      .from('enrollments')
      .insert({ class_id: props.classItem.id, user_id: user.value.id })
    if (error) {
      if (error.code === '23505') applyError.value = '이미 신청한 클래스입니다'
      else throw error
    } else {
      isApplied.value = true
      await refreshNuxtData('classes')
      setTimeout(() => emit('close'), 1500)
    }
  } catch {
    applyError.value = '신청 중 오류가 발생했습니다. 다시 시도해주세요.'
  } finally {
    isApplying.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-end justify-center"
      @click.self="emit('close')"
    >
      <div class="absolute inset-0 bg-black/60" @click="emit('close')" />

      <!-- Sheet — flat top edge, Nike system -->
      <div class="relative w-full max-w-lg bg-white max-h-[92vh] flex flex-col overflow-hidden">

        <!-- Drag handle -->
        <div class="flex-shrink-0 flex justify-center pt-3 pb-1">
          <div class="w-10 h-[3px] bg-[#cacacb]" />
        </div>

        <!-- Close -->
        <button
          class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#f5f5f5] text-[#707072] text-xl leading-none z-10 active:opacity-60"
          @click="emit('close')"
        >×</button>

        <!-- Scroll area -->
        <div class="overflow-y-auto flex-1">

          <!-- Thumbnail — full-bleed on soft-cloud, 0 radius -->
          <div class="relative bg-[#f5f5f5]">
            <img
              :src="classItem.thumbnail"
              :alt="classItem.title"
              class="w-full h-56 object-cover"
            />
            <span
              v-if="deadlineSoon"
              class="absolute top-3 left-3 text-[#d30005] text-[12px] font-[500] uppercase"
            >마감임박</span>
          </div>

          <!-- Content -->
          <div class="px-6 pt-6 pb-4">

            <p class="text-[12px] font-[500] text-[#707072] uppercase tracking-[0.04em] mb-2">
              {{ classItem.category }}
            </p>

            <h2 class="text-[32px] font-[500] text-[#111111] leading-[1.2]">
              {{ classItem.title }}
            </h2>

            <p class="text-[32px] font-[500] text-[#111111] mt-3">
              {{ formatPrice(classItem.price) }}
            </p>

            <div class="h-px bg-[#e5e5e5] my-5" />

            <dl class="space-y-3">
              <div class="flex items-start gap-3">
                <dt class="text-[14px] font-[500] text-[#707072] w-14 flex-shrink-0 uppercase">날짜</dt>
                <dd class="text-[16px] font-[400] text-[#111111]">{{ formatDate(classItem.date) }}</dd>
              </div>
              <div class="flex items-start gap-3">
                <dt class="text-[14px] font-[500] text-[#707072] w-14 flex-shrink-0 uppercase">장소</dt>
                <dd class="text-[16px] font-[400] text-[#111111]">{{ classItem.location }}</dd>
              </div>
              <div class="flex items-start gap-3">
                <dt class="text-[14px] font-[500] w-14 flex-shrink-0 uppercase" :class="deadlineSoon ? 'text-[#d30005]' : 'text-[#707072]'">마감일</dt>
                <dd class="text-[16px] font-[400]" :class="deadlineSoon ? 'text-[#d30005]' : 'text-[#111111]'">
                  {{ formatDate(classItem.deadline) }}
                </dd>
              </div>
            </dl>

            <div class="h-px bg-[#e5e5e5] my-5" />

            <!-- Participants -->
            <div>
              <div class="flex justify-between items-baseline mb-2">
                <p class="text-[14px] font-[500] text-[#111111] uppercase">참가 현황</p>
                <p class="text-[14px] font-[500] text-[#707072]">
                  {{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명
                </p>
              </div>
              <div class="h-[3px] bg-[#f5f5f5] overflow-hidden">
                <div
                  class="h-full bg-[#111111] transition-all"
                  :style="{ width: `${participantRate}%` }"
                />
              </div>
              <p class="text-[12px] font-[500] text-[#707072] uppercase mt-2">
                잔여 {{ classItem.maxParticipants - classItem.currentParticipants }}자리
              </p>
            </div>

            <div class="h-px bg-[#e5e5e5] my-5" />

            <!-- Description -->
            <div>
              <p class="text-[14px] font-[500] text-[#111111] uppercase mb-3">클래스 소개</p>
              <p class="text-[16px] font-[400] text-[#111111] leading-[1.5]">
                {{ classItem.description }}
              </p>
            </div>

            <div class="h-6" />
          </div>
        </div>

        <!-- CTA footer -->
        <div class="flex-shrink-0 bg-white border-t border-[#e5e5e5] px-6 py-4 space-y-2">
          <p v-if="applyError" class="text-[13px] text-[#d30005] text-center font-[500] uppercase">
            {{ applyError }}
          </p>
          <button
            :disabled="isApplying || isApplied"
            class="w-full text-[16px] font-[500] h-12 rounded-[30px] transition-opacity active:opacity-60 disabled:opacity-50"
            :class="isApplied ? 'bg-[#007d48] text-white' : 'bg-[#111111] text-white'"
            @click="handleApply"
          >
            <span v-if="isApplying" class="flex items-center justify-center gap-2">
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="white" stroke-width="4" />
                <path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              신청 중...
            </span>
            <span v-else-if="isApplied">신청 완료</span>
            <span v-else>{{ isLoggedIn ? '신청하기' : '로그인 후 신청하기' }}</span>
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>
