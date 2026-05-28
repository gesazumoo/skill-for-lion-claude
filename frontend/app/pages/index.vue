<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'

const { classes, deadlineSoonClasses } = useClasses()

const categories = ['전체', '운동', '러닝', '수영', '스터디', '취미', '클래스']
const selectedCategory = ref('전체')
const searchQuery = ref('')

const filteredClasses = computed(() => {
  let list = classes.value
  if (selectedCategory.value !== '전체') {
    list = list.filter(c => c.category === selectedCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q)
    )
  }
  return list
})

const handleApply = (classItem: ClassItem) => {
  alert(`"${classItem.title}" 클래스에 신청되었습니다!`)
}

const goToSearch = () => {
  const q = searchQuery.value.trim()
  navigateTo(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
}
</script>

<template>
  <div class="min-h-screen bg-canvas pb-16">

    <!-- ══ HERO: ink dark band ══════════════════════════════ -->
    <!--
      Nike editorial campaign hero: full-width dark band,
      campaign headline (Black Han Sans), search pill, filter chips
    -->
    <section class="bg-ink px-4 pt-10 pb-8">

      <!-- Brand label: utility-xs uppercase tracking -->
      <p class="text-stone text-[10px] font-medium tracking-[0.25em] uppercase mb-5">
        원데이 클래스 플랫폼
      </p>

      <!-- Campaign headline: Black Han Sans display, white, line-height 0.9 -->
      <h1 class="font-display text-[52px] text-canvas leading-[0.92] mb-5">
        오늘 바로<br>참여 가능한<br>원데이 클래스
      </h1>

      <!-- Sub copy: body-md stone -->
      <p class="text-stone text-sm font-medium mb-7">
        나에게 맞는 클래스를 찾아보세요
      </p>

      <!-- Search: soft-cloud pill, rounded-[24px], h-10 -->
      <div class="bg-soft-cloud rounded-[24px] flex items-center gap-2 px-4 h-10 mb-6">
        <svg class="w-4 h-4 text-mute flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="클래스 검색"
          class="flex-1 text-sm text-ink bg-transparent outline-none placeholder-stone"
          @keydown.enter="goToSearch"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="flex-shrink-0">
          <svg class="w-3.5 h-3.5 text-mute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Filter chips: filter-chip style — active = canvas/ink, inactive = transparent/stone/ash-border -->
      <div class="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="selectedCategory === cat
            ? 'bg-canvas text-ink'
            : 'bg-transparent text-stone border border-ash'"
          class="px-4 py-1.5 rounded-[30px] text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- ══ 추천 클래스 ═══════════════════════════════════════ -->
    <!-- Section spacing: py-12 (48px = spacing.section) -->
    <section class="py-12 bg-canvas">
      <div class="px-4 flex items-end justify-between mb-5">
        <div>
          <!-- Section label: caption-sm uppercase tracking mute -->
          <p class="text-[10px] font-medium tracking-[0.2em] uppercase text-mute mb-1.5">클래스</p>
          <!-- Section title: heading-xl 32px/500 — scaled down for mobile -->
          <h2 class="text-2xl font-medium text-ink leading-tight">추천 클래스</h2>
        </div>
        <!-- Text link: link-md underline -->
        <NuxtLink to="/search" class="text-xs font-medium text-ink underline underline-offset-2 pb-0.5">
          전체 보기
        </NuxtLink>
      </div>

      <!-- Filter feedback -->
      <p v-if="selectedCategory !== '전체'" class="px-4 text-[11px] text-mute tracking-wide mb-4 uppercase">
        {{ selectedCategory }} · {{ filteredClasses.length }}개
      </p>

      <!-- Empty state -->
      <div v-if="filteredClasses.length === 0" class="px-4 py-10 text-center">
        <p class="text-sm text-mute">검색 결과가 없습니다</p>
      </div>

      <!-- Horizontal scroll: gap-4 (no px-8 large gutters, keep mobile-friendly) -->
      <div v-else class="flex gap-4 overflow-x-auto scrollbar-hide px-4">
        <ClassCardHorizontal
          v-for="item in filteredClasses"
          :key="item.id"
          :classItem="item"
        />
      </div>
    </section>

    <!-- 1px hairline divider between sections -->
    <div class="h-px bg-hairline" />

    <!-- ══ 마감 임박 ══════════════════════════════════════════ -->
    <!-- Soft-cloud background = Nike "studio" surface for products -->
    <section class="py-12 bg-soft-cloud">
      <div class="px-4 flex items-end justify-between mb-5">
        <div>
          <!-- Section label: sale red for urgency -->
          <p class="text-[10px] font-medium tracking-[0.2em] uppercase text-sale mb-1.5">마감 임박</p>
          <h2 class="text-2xl font-medium text-ink leading-tight">서두르세요</h2>
        </div>
        <span class="text-xs font-medium text-mute pb-0.5">{{ deadlineSoonClasses.length }}개</span>
      </div>

      <div v-if="deadlineSoonClasses.length === 0" class="px-4 py-10 text-center">
        <p class="text-sm text-mute">마감 임박 클래스가 없습니다</p>
      </div>

      <div v-else class="flex gap-4 overflow-x-auto scrollbar-hide px-4">
        <ClassCardVertical
          v-for="item in deadlineSoonClasses"
          :key="item.id"
          :classItem="item"
          @apply="handleApply"
        />
      </div>
    </section>

    <!-- 1px hairline divider -->
    <div class="h-px bg-hairline" />

    <!-- ══ CTA 밴드: ink dark band ════════════════════════════ -->
    <!--
      Nike campaign tile style: full-width ink band,
      display headline, sub copy, white pill CTA (button-outline-on-image)
    -->
    <section class="bg-ink px-4 py-12">
      <!-- Label -->
      <p class="text-stone text-[10px] font-medium tracking-[0.25em] uppercase mb-4">강사 모집</p>

      <!-- Display headline -->
      <h3 class="font-display text-[44px] text-canvas leading-[0.9] mb-5">
        나만의 클래스를<br>직접 모집하세요
      </h3>

      <!-- Sub copy -->
      <p class="text-stone text-sm leading-relaxed mb-8">
        쉽게 클래스를 등록하고 수강생을 모집하세요.<br>
        누구든 강사가 될 수 있습니다.
      </p>

      <!-- CTA: button-outline-on-image — canvas bg, ink text, pill, h-12 -->
      <button class="bg-canvas text-ink text-sm font-medium px-8 h-12 rounded-[30px] active:opacity-70 transition-opacity">
        클래스 등록하기
      </button>
    </section>

    <!-- ══ 하단 네비게이션 ════════════════════════════════════ -->
    <BottomNavigation active-menu="home" />

  </div>
</template>
