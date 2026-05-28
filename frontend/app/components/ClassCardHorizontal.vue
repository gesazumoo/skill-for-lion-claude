<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'

const props = defineProps<{
  classItem: ClassItem
}>()

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { isDeadlineSoon, getDeadlineDaysLeft, formatPrice } = useClasses()
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
      await refreshMyData()
      toast('이미 신청한 클래스입니다')
    } else if (error) {
      toast('신청 중 오류가 발생했습니다')
    } else {
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
    class="w-44 flex-shrink-0 bg-canvas cursor-pointer"
    @click="navigateTo('/classes/' + classItem.id)"
  >
    <!-- Image -->
    <div class="relative h-44 bg-soft-cloud overflow-hidden">
      <img :src="classItem.thumbnail" :alt="classItem.title" class="w-full h-full object-cover" loading="lazy" />
      <span class="absolute top-2 left-2 bg-ink text-canvas text-[10px] font-medium tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-[30px]">
        {{ classItem.category }}
      </span>
    </div>

    <!-- Metadata -->
    <div class="pt-2">
      <p class="text-[11px] font-medium leading-none mb-1" :class="deadlineSoon ? 'text-sale' : 'invisible'">
        {{ daysLeft === 0 ? '오늘 마감' : `마감 D-${daysLeft}` }}
      </p>
      <p class="text-[13px] font-medium text-ink leading-snug line-clamp-2 mb-1">{{ classItem.title }}</p>
      <p class="text-[12px] text-mute mb-1">{{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명 참가</p>
      <p class="text-[13px] font-medium text-ink mb-2">{{ formatPrice(classItem.price) }}</p>
      <button
        @click.stop="handleApply"
        :disabled="btnDisabled"
        class="w-full bg-ink text-canvas text-[11px] font-medium h-7 rounded-[30px] active:opacity-70 transition-opacity disabled:opacity-50"
      >
        {{ btnLabel }}
      </button>
    </div>
  </div>
</template>
