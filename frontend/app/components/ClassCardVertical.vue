<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'

const props = defineProps<{
  classItem: ClassItem
  fullWidth?: boolean
}>()

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { isDeadlineSoon, getDeadlineDaysLeft, formatPrice, formatDate } = useClasses()
const { isApplied, isOwn, isLoading: myDataLoading, refresh: refreshMyData } = useMyData()
const { show: toast } = useToast()

const deadlineSoon = computed(() => isDeadlineSoon(props.classItem.deadline))
const daysLeft = computed(() => getDeadlineDaysLeft(props.classItem.deadline))
const spotsLeft = computed(() => props.classItem.maxParticipants - props.classItem.currentParticipants)

const alreadyApplied = computed(() => isApplied(props.classItem.id))
const ownClass = computed(() => isOwn(props.classItem.id))
const isApplying = ref(false)

const btnLabel = computed(() => {
  if (ownClass.value) return '내 클래스'
  if (alreadyApplied.value) return '신청 완료'
  if (spotsLeft.value <= 0) return '마감'
  if (isApplying.value) return '신청 중...'
  return '신청하기'
})

const btnDisabled = computed(() =>
  ownClass.value || alreadyApplied.value || spotsLeft.value <= 0 || isApplying.value || myDataLoading.value
)

const handleApply = async () => {
  if (!user.value) { navigateTo('/auth'); return }
  if (btnDisabled.value) return

  isApplying.value = true
  try {
    const { error } = await supabase
      .from('class_map')
      .insert({ class_id: props.classItem.id, user_id: user.value.id })

    if (error?.code === '23505') {
      // DB 상태와 프론트 상태 불일치 → 동기화
      await refreshMyData()
      toast('이미 신청한 클래스입니다')
    } else if (error) {
      toast('신청 중 오류가 발생했습니다')
    } else {
      // 성공: 클래스 목록 갱신 + 내 데이터 갱신
      await Promise.all([refreshNuxtData('classes'), refreshMyData()])
      toast('신청이 완료되었습니다')
    }
  } catch {
    toast('신청 중 오류가 발생했습니다')
  } finally {
    isApplying.value = false
  }
}
</script>

<template>
  <div
    class="bg-canvas cursor-pointer"
    :class="fullWidth ? 'w-full' : 'w-56 flex-shrink-0'"
    @click="navigateTo('/classes/' + classItem.id)"
  >
    <!-- Image -->
    <div class="relative bg-soft-cloud overflow-hidden" :class="fullWidth ? 'aspect-square' : 'h-56'">
      <img :src="classItem.thumbnail" :alt="classItem.title" class="w-full h-full object-cover" loading="lazy" />
      <div v-if="deadlineSoon" class="absolute top-0 left-0 right-0 bg-sale px-3 py-1.5">
        <p class="text-canvas text-[11px] font-medium tracking-[0.1em] uppercase">
          {{ daysLeft === 0 ? '오늘 마감' : `D-${daysLeft} 마감 임박` }}
        </p>
      </div>
      <button
        @click.stop="handleApply"
        :disabled="btnDisabled"
        class="absolute bottom-3 left-3 bg-canvas text-ink text-xs font-medium px-4 h-8 rounded-[30px] active:opacity-70 transition-opacity disabled:opacity-50"
      >
        {{ btnLabel }}
      </button>
    </div>

    <!-- Metadata -->
    <div class="pt-2">
      <p class="text-[10px] font-medium tracking-[0.18em] uppercase text-mute mb-1">{{ classItem.category }}</p>
      <p class="text-[13px] font-medium text-ink line-clamp-2 leading-snug mb-1.5">{{ classItem.title }}</p>
      <p class="text-[12px] text-mute mb-0.5">{{ formatDate(classItem.date) }} · {{ classItem.location }}</p>
      <p class="text-[12px] text-mute mb-2">
        {{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명
        <span v-if="spotsLeft > 0 && spotsLeft <= 3" class="text-sale font-medium">· 잔여 {{ spotsLeft }}석</span>
      </p>
      <p class="text-[13px] font-medium text-ink">{{ formatPrice(classItem.price) }}</p>
    </div>
  </div>
</template>
