<script setup lang="ts">
const route = useRoute()
const { classes, isDeadlineSoon, getDeadlineDaysLeft, formatPrice, formatDate } = useClasses()

const classItem = computed(() =>
  classes.value.find(c => c.id === Number(route.params.id))
)

const deadlineSoon = computed(() =>
  classItem.value ? isDeadlineSoon(classItem.value.deadline) : false
)

const daysLeft = computed(() =>
  classItem.value ? getDeadlineDaysLeft(classItem.value.deadline) : 0
)

const spotsLeft = computed(() =>
  classItem.value ? classItem.value.maxParticipants - classItem.value.currentParticipants : 0
)

const handleApply = () => {
  if (classItem.value) {
    alert(`"${classItem.value.title}" 클래스에 신청되었습니다!`)
  }
}

useHead({
  title: computed(() => classItem.value?.title ?? '클래스 상세')
})
</script>

<template>
  <div class="min-h-screen bg-canvas">

    <!-- 클래스 없을 때 -->
    <div v-if="!classItem" class="flex flex-col items-center justify-center min-h-screen gap-4">
      <p class="text-sm text-mute">클래스를 찾을 수 없습니다</p>
      <NuxtLink to="/search" class="text-xs font-medium text-ink underline underline-offset-2">
        검색으로 돌아가기
      </NuxtLink>
    </div>

    <template v-else>

      <!-- ══ 상단 바 ════════════════════════════════════════════ -->
      <div class="sticky top-0 z-40 bg-canvas border-b border-hairline-soft">
        <div class="flex items-center h-12 px-4 gap-3">
          <button @click="$router.back()" class="flex items-center justify-center w-8 h-8 -ml-1">
            <svg class="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <p class="text-[10px] font-medium tracking-[0.2em] uppercase text-mute">클래스 상세</p>
        </div>
      </div>

      <!-- ══ 썸네일 이미지 ══════════════════════════════════════ -->
      <div class="relative w-full aspect-[4/3] bg-soft-cloud overflow-hidden">
        <img
          :src="classItem.thumbnail"
          :alt="classItem.title"
          class="w-full h-full object-cover"
        />
        <!-- 마감 임박 배너 -->
        <div v-if="deadlineSoon" class="absolute top-0 left-0 right-0 bg-sale px-4 py-2">
          <p class="text-canvas text-[11px] font-medium tracking-[0.1em] uppercase">
            {{ daysLeft === 0 ? '오늘 마감' : `D-${daysLeft} 마감 임박` }}
          </p>
        </div>
      </div>

      <!-- ══ 클래스 정보 ════════════════════════════════════════ -->
      <div class="px-4 pt-5 pb-32">

        <!-- 카테고리 -->
        <p class="text-[10px] font-medium tracking-[0.2em] uppercase text-mute mb-2">
          {{ classItem.category }}
        </p>

        <!-- 제목 -->
        <h1 class="text-[22px] font-medium text-ink leading-tight mb-5">
          {{ classItem.title }}
        </h1>

        <!-- 구분선 -->
        <div class="h-px bg-hairline-soft mb-5" />

        <!-- 세부 정보 -->
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
              <span v-if="spotsLeft <= 3" class="text-sale font-medium ml-1">· 잔여 {{ spotsLeft }}석</span>
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

        <!-- 구분선 -->
        <div class="h-px bg-hairline-soft mb-5" />

        <!-- 상세 설명 -->
        <div>
          <p class="text-[10px] font-medium tracking-[0.2em] uppercase text-mute mb-3">상세 설명</p>
          <p class="text-sm text-ink leading-relaxed">{{ classItem.description }}</p>
        </div>

      </div>

      <!-- ══ 하단 고정 CTA ══════════════════════════════════════ -->
      <div class="fixed bottom-0 left-0 right-0 z-50 bg-canvas border-t border-hairline-soft px-4 py-4">
        <div class="flex items-center justify-between mb-3">
          <div>
            <p class="text-[10px] font-medium tracking-[0.1em] uppercase text-mute">참가비</p>
            <p class="text-xl font-medium text-ink">{{ formatPrice(classItem.price) }}</p>
          </div>
          <p v-if="spotsLeft <= 5" class="text-xs text-sale font-medium">잔여 {{ spotsLeft }}석</p>
        </div>
        <button
          @click="handleApply"
          class="w-full bg-ink text-canvas text-sm font-medium h-12 rounded-[30px] active:opacity-70 transition-opacity"
        >
          신청하기
        </button>
      </div>

    </template>
  </div>
</template>
