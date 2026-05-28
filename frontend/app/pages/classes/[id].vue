<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()
const classId = Number(route.params.id)

const { isDeadlineSoon, getDeadlineDaysLeft, formatPrice, formatDate } = useClasses()

// 클래스 상세 데이터 (직접 fetch — 신청 후 갱신 목적)
const { data: classData, refresh: refreshClass } = await useAsyncData(
  `class-${classId}`,
  async () => {
    const { data } = await supabase
      .from('classes')
      .select('*')
      .eq('id', classId)
      .single()
    return data
  }
)

// 내 신청 여부 확인
const { data: myApplication, refresh: refreshApplication } = await useAsyncData(
  `application-${classId}`,
  async () => {
    if (!user.value) return null
    const { data } = await supabase
      .from('class_applications')
      .select('id')
      .eq('class_id', classId)
      .eq('user_id', user.value.id)
      .maybeSingle()
    return data
  }
)

const classItem = computed(() => {
  const row = classData.value
  if (!row) return null
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    price: row.price,
    location: row.location,
    date: row.date,
    maxParticipants: row.max_participants,
    currentParticipants: row.current_participants,
    thumbnail: row.thumbnail ?? '',
    deadline: row.deadline,
    description: row.description ?? '',
    userId: row.user_id,
  }
})

const hasApplied = computed(() => !!myApplication.value)
const isFull = computed(() =>
  classItem.value
    ? classItem.value.currentParticipants >= classItem.value.maxParticipants
    : false
)
const deadlineSoon = computed(() => classItem.value ? isDeadlineSoon(classItem.value.deadline) : false)
const daysLeft = computed(() => classItem.value ? getDeadlineDaysLeft(classItem.value.deadline) : 0)
const spotsLeft = computed(() =>
  classItem.value ? classItem.value.maxParticipants - classItem.value.currentParticipants : 0
)

const isApplying = ref(false)
const applyError = ref('')

const handleApply = async () => {
  if (!user.value) {
    navigateTo('/auth')
    return
  }
  if (!classItem.value || hasApplied.value || isFull.value) return

  isApplying.value = true
  applyError.value = ''
  try {
    const { error: insertError } = await supabase
      .from('class_applications')
      .insert({ class_id: classItem.value.id, user_id: user.value.id })
    if (insertError) throw insertError

    await supabase
      .from('classes')
      .update({ current_participants: classItem.value.currentParticipants + 1 })
      .eq('id', classItem.value.id)

    await Promise.all([refreshClass(), refreshApplication()])
    await refreshNuxtData('classes')
  } catch (e: any) {
    if (e?.code === '23505') {
      await refreshApplication()
    } else {
      applyError.value = '신청 중 오류가 발생했습니다'
    }
  } finally {
    isApplying.value = false
  }
}

useHead({
  title: computed(() => classItem.value?.title ?? '클래스 상세')
})
</script>

<template>
  <div class="min-h-screen bg-canvas">

    <div v-if="!classItem" class="flex flex-col items-center justify-center min-h-screen gap-4">
      <p class="text-sm text-mute">클래스를 찾을 수 없습니다</p>
      <NuxtLink to="/search" class="text-xs font-medium text-ink underline underline-offset-2">
        검색으로 돌아가기
      </NuxtLink>
    </div>

    <template v-else>

      <!-- 상단 바 -->
      <div class="sticky top-0 z-40 bg-canvas border-b border-hairline-soft">
        <div class="flex items-center h-12 px-4 gap-3">
          <button @click="$router.back()" class="flex items-center justify-center w-8 h-8 -ml-1">
            <svg class="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <p class="text-xs font-medium tracking-[0.15em] uppercase text-charcoal">클래스 상세</p>
        </div>
      </div>

      <!-- 썸네일 -->
      <div class="relative w-full aspect-[4/3] bg-soft-cloud overflow-hidden">
        <img
          v-if="classItem.thumbnail"
          :src="classItem.thumbnail"
          :alt="classItem.title"
          class="w-full h-full object-cover"
        />
        <div v-if="deadlineSoon" class="absolute top-0 left-0 right-0 bg-sale px-4 py-2">
          <p class="text-canvas text-[11px] font-medium tracking-[0.1em] uppercase">
            {{ daysLeft === 0 ? '오늘 마감' : `D-${daysLeft} 마감 임박` }}
          </p>
        </div>
      </div>

      <!-- 클래스 정보 -->
      <div class="px-4 pt-5 pb-36">

        <p class="text-[10px] font-medium tracking-[0.2em] uppercase text-mute mb-2">{{ classItem.category }}</p>
        <h1 class="text-[22px] font-medium text-ink leading-tight mb-5">{{ classItem.title }}</h1>

        <div class="h-px bg-hairline-soft mb-5" />

        <div class="flex flex-col gap-3 mb-5">
          <div class="flex items-center gap-3">
            <svg class="w-4 h-4 text-mute flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="text-sm text-ink">{{ formatDate(classItem.date) }}</span>
          </div>
          <div class="flex items-center gap-3">
            <svg class="w-4 h-4 text-mute flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-sm text-ink">{{ classItem.location }}</span>
          </div>
          <div class="flex items-center gap-3">
            <svg class="w-4 h-4 text-mute flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-sm text-ink">
              {{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명 참가
              <span v-if="spotsLeft <= 3 && !isFull" class="text-sale font-medium ml-1">· 잔여 {{ spotsLeft }}석</span>
              <span v-if="isFull" class="text-sale font-medium ml-1">· 마감</span>
            </span>
          </div>
          <div class="flex items-center gap-3">
            <svg class="w-4 h-4 text-mute flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm" :class="deadlineSoon ? 'text-sale font-medium' : 'text-ink'">
              마감 {{ formatDate(classItem.deadline) }}
            </span>
          </div>
        </div>

        <div class="h-px bg-hairline-soft mb-5" />

        <div>
          <p class="text-[10px] font-medium tracking-[0.2em] uppercase text-mute mb-3">상세 설명</p>
          <p class="text-sm text-ink leading-relaxed">{{ classItem.description }}</p>
        </div>

      </div>

      <!-- 하단 고정 CTA -->
      <div class="fixed bottom-0 left-0 right-0 z-50 bg-canvas border-t border-hairline-soft px-4 py-4">
        <div class="flex items-center justify-between mb-3">
          <div>
            <p class="text-[10px] font-medium tracking-[0.1em] uppercase text-mute">참가비</p>
            <p class="text-xl font-medium text-ink">{{ formatPrice(classItem.price) }}</p>
          </div>
          <p v-if="spotsLeft <= 5 && !isFull" class="text-xs text-sale font-medium">잔여 {{ spotsLeft }}석</p>
        </div>

        <p v-if="applyError" class="text-[11px] text-sale mb-2">{{ applyError }}</p>

        <!-- 신청 완료 -->
        <div v-if="hasApplied" class="w-full bg-soft-cloud h-12 rounded-[30px] flex items-center justify-center gap-2">
          <svg class="w-4 h-4 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-sm font-medium text-ink">신청 완료</span>
        </div>

        <!-- 마감 -->
        <div v-else-if="isFull" class="w-full bg-soft-cloud h-12 rounded-[30px] flex items-center justify-center">
          <span class="text-sm font-medium text-mute">모집 마감</span>
        </div>

        <!-- 로그인 필요 -->
        <NuxtLink
          v-else-if="!user"
          to="/auth"
          class="w-full bg-ink text-canvas text-sm font-medium h-12 rounded-[30px] flex items-center justify-center"
        >
          로그인 후 신청하기
        </NuxtLink>

        <!-- 신청하기 -->
        <button
          v-else
          @click="handleApply"
          :disabled="isApplying"
          class="w-full bg-ink text-canvas text-sm font-medium h-12 rounded-[30px] flex items-center justify-center gap-2 disabled:opacity-40 active:opacity-70 transition-opacity"
        >
          <svg v-if="isApplying" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          {{ isApplying ? '신청 중...' : '신청하기' }}
        </button>
      </div>

    </template>
  </div>
</template>
