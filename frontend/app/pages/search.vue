<script setup lang="ts">
import { CATEGORIES, useClasses } from '~/composables/useClasses'
import type { ClassItem } from '~/composables/useClasses'

const route = useRoute()
const router = useRouter()
const { allClasses, pending } = useClasses()

const searchQuery = ref(route.query.q?.toString() ?? '')
const activeCategory = ref('전체')
const selectedClass = ref<ClassItem | null>(null)

watch(() => route.query.q, (newQ) => {
  searchQuery.value = newQ?.toString() ?? ''
})

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

function handleSearch() {
  const q = searchQuery.value.trim()
  router.replace(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
}

function clearSearch() {
  searchQuery.value = ''
  router.replace('/search')
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f7] max-w-lg mx-auto pb-[72px]">

    <!-- 상단 고정: 검색 + 카테고리 -->
    <div class="sticky top-0 z-40 bg-[#f5f5f7]/90 backdrop-blur-md">

      <div class="px-5 pt-14 pb-3">
        <div class="flex items-center gap-3 bg-white rounded-[9999px] px-5 border border-[rgba(0,0,0,0.08)] h-11">
          <svg class="w-4 h-4 text-[#7a7a7a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="클래스, 카테고리, 지역으로 검색"
            class="flex-1 text-[17px] font-normal text-[#1d1d1f] tracking-[-0.374px] placeholder-[#7a7a7a] outline-none bg-transparent"
            @keydown.enter="handleSearch"
          />
          <button
            v-if="searchQuery"
            class="text-[#7a7a7a] active:opacity-60 transition-opacity"
            @click="clearSearch"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex gap-2 px-5 pb-3 overflow-x-auto scrollbar-hide">
        <button
          v-for="cat in CATEGORIES"
          :key="cat"
          @click="activeCategory = cat"
          class="flex-shrink-0 text-[14px] font-normal tracking-[-0.224px] px-4 py-2 rounded-[9999px] transition-all duration-150 active:scale-95 border"
          :class="activeCategory === cat
            ? 'bg-[#0066cc] text-white border-transparent'
            : 'bg-white text-[#1d1d1f] border-[#e0e0e0]'"
        >
          {{ cat }}
        </button>
      </div>

      <div class="h-px bg-[#e0e0e0]" />
    </div>

    <!-- 결과 헤더 -->
    <div class="px-5 py-4 flex items-baseline gap-2">
      <span class="text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.374px]">클래스</span>
      <span class="text-[14px] font-normal text-[#7a7a7a] tracking-[-0.224px]">
        {{ pending ? '...' : `${filteredClasses.length}개` }}
      </span>
    </div>

    <!-- 로딩 스켈레톤 -->
    <div v-if="pending" class="px-5 space-y-4 pb-8">
      <div
        v-for="i in 5"
        :key="i"
        class="h-28 bg-white rounded-[18px] animate-pulse"
      />
    </div>

    <!-- 세로형 클래스 카드 리스트 -->
    <div v-else-if="filteredClasses.length > 0" class="px-5 space-y-4 pb-8">
      <ClassCardVertical
        v-for="c in filteredClasses"
        :key="c.id"
        :class-item="c"
        @select="selectedClass = $event"
      />
    </div>

    <!-- 빈 상태 -->
    <div v-else class="px-5 py-20 text-center">
      <svg class="w-12 h-12 mx-auto mb-4 text-[#e0e0e0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <p class="text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.374px]">검색 결과가 없어요</p>
      <p class="text-[14px] font-normal text-[#7a7a7a] tracking-[-0.224px] mt-1">
        다른 검색어나 카테고리를 시도해보세요
      </p>
      <button
        class="mt-6 text-[#0066cc] text-[17px] font-normal tracking-[-0.374px] active:opacity-60"
        @click="clearSearch(); activeCategory = '전체'"
      >
        전체 클래스 보기
      </button>
    </div>

    <BottomNavigation active-menu="search" />

    <ClassDetail
      v-if="selectedClass"
      :class-item="selectedClass"
      @close="selectedClass = null"
    />

  </div>
</template>
