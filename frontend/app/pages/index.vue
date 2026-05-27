<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'
import { CATEGORIES, useClasses } from '~/composables/useClasses'

const { allClasses, deadlineSoonClasses, pending } = useClasses()
const router = useRouter()

const searchQuery = ref('')
const activeCategory = ref('전체')
const selectedClass = ref<ClassItem | null>(null)

const filteredClasses = computed(() =>
  allClasses.value.filter(c => {
    const matchSearch =
      !searchQuery.value ||
      c.title.includes(searchQuery.value) ||
      c.category.includes(searchQuery.value) ||
      c.location.includes(searchQuery.value)
    const matchCategory = activeCategory.value === '전체' || c.category === activeCategory.value
    return matchSearch && matchCategory
  })
)

function handleSearchSubmit() {
  const q = searchQuery.value.trim()
  router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
}
</script>

<template>
  <div class="min-h-screen bg-white max-w-lg mx-auto pb-[72px]">

    <!-- ① Campaign Hero — ink bg, Bebas Neue display -->
    <section class="bg-[#111111] px-5 pt-16 pb-10">

      <p class="text-[12px] font-[500] text-[#9e9ea0] uppercase tracking-[0.12em] mb-5">
        원데이 클래스
      </p>

      <h1 class="font-display text-[80px] leading-[0.9] text-white uppercase mb-8">
        ONE DAY<br />CLASS
      </h1>

      <!-- Search pill — soft-cloud, rounded.md = 24px -->
      <div class="flex items-center gap-3 bg-[#f5f5f5] rounded-[24px] px-5 h-12">
        <svg class="w-4 h-4 text-[#707072] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="클래스, 카테고리, 지역으로 검색"
          class="flex-1 text-[16px] font-[400] text-[#111111] placeholder-[#707072] outline-none bg-transparent"
          @keydown.enter="handleSearchSubmit"
        />
      </div>

      <!-- Category filter chips — rounded.lg = 30px, inverted active -->
      <div class="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-1">
        <button
          v-for="cat in CATEGORIES"
          :key="cat"
          @click="activeCategory = cat"
          class="flex-shrink-0 text-[12px] font-[500] tracking-[0.02em] px-4 py-2 rounded-[30px] transition-colors duration-100 whitespace-nowrap"
          :class="activeCategory === cat
            ? 'bg-white text-[#111111]'
            : 'bg-transparent text-[#9e9ea0] border border-[#3a3a3a]'"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- ② White — Recommended Classes -->
    <section class="bg-white py-12">
      <div class="flex items-baseline justify-between mb-0 px-5">
        <h2 class="text-[32px] font-[500] text-[#111111] leading-[1.2] uppercase">
          추천 클래스
        </h2>
        <span class="text-[14px] font-[500] text-[#707072] uppercase">
          {{ pending ? '...' : `${filteredClasses.length}개` }}
        </span>
      </div>

      <div class="h-px bg-[#e5e5e5] mt-6 mb-0" />

      <!-- Loading skeleton -->
      <div v-if="pending">
        <div v-for="i in 4" :key="i" class="h-28 bg-[#f5f5f5] animate-pulse border-b border-[#e5e5e5]" />
      </div>

      <!-- Card list — edge-to-edge, no padding -->
      <div v-else-if="filteredClasses.length > 0">
        <ClassCard
          v-for="c in filteredClasses"
          :key="c.id"
          :class-item="c"
          variant="list"
          @select="selectedClass = $event"
        />
      </div>

      <!-- Empty state -->
      <div v-else class="py-16 text-center px-5">
        <p class="text-[32px] font-[500] text-[#111111] uppercase mb-2">결과 없음</p>
        <p class="text-[14px] font-[400] text-[#707072]">다른 검색어나 카테고리를 시도해보세요</p>
      </div>
    </section>

    <!-- ③ Soft Cloud — Deadline Soon -->
    <section v-if="pending || deadlineSoonClasses.length > 0" class="bg-[#f5f5f5] py-12">
      <div class="px-5 mb-6">
        <h2 class="text-[32px] font-[500] text-[#111111] leading-[1.2] uppercase">마감 임박</h2>
        <p class="text-[14px] font-[400] text-[#707072] mt-1">3일 이내 마감되는 클래스</p>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="flex gap-0 px-5">
        <div v-for="i in 3" :key="i" class="flex-shrink-0 w-44 h-56 bg-white animate-pulse mr-2" />
      </div>

      <div v-else class="flex gap-0 overflow-x-auto scrollbar-hide px-5 pb-1 gap-x-4">
        <ClassCard
          v-for="c in deadlineSoonClasses"
          :key="c.id"
          :class-item="c"
          variant="scroll"
          @select="selectedClass = $event"
        />
      </div>
    </section>

    <!-- ④ CTA Band — ink, Bebas Neue campaign style -->
    <section class="bg-[#111111] px-5 py-16 text-center">
      <p class="text-[12px] font-[500] text-[#9e9ea0] uppercase tracking-[0.12em] mb-5">
        클래스 호스트
      </p>
      <h2 class="font-display text-[64px] leading-[0.9] text-white uppercase mb-6">
        YOUR CLASS<br />STARTS HERE
      </h2>
      <p class="text-[16px] font-[400] text-[#9e9ea0] mb-10 max-w-xs mx-auto leading-[1.5]">
        지금 바로 클래스를 등록하고<br />함께할 사람들을 모집해보세요
      </p>
      <!-- button-outline-on-image: white pill on dark -->
      <button
        class="inline-block bg-white text-[#111111] text-[16px] font-[500] px-8 h-12 rounded-[30px] transition-opacity active:opacity-60"
        @click="router.push('/register')"
      >
        클래스 등록하기
      </button>
    </section>

    <ClassDetail
      v-if="selectedClass"
      :class-item="selectedClass"
      @close="selectedClass = null"
    />

    <BottomNavigation active-menu="home" />

  </div>
</template>
