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
  <div class="min-h-screen bg-white max-w-lg mx-auto pb-[72px]">

    <!-- Sticky header — white, inset bottom hairline -->
    <div class="sticky top-0 z-40 bg-white" style="box-shadow: inset 0 -1px 0 #e5e5e5;">

      <div class="px-5 pt-14 pb-3">
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
            @keydown.enter="handleSearch"
          />
          <button
            v-if="searchQuery"
            class="text-[#707072] active:opacity-60 transition-opacity"
            @click="clearSearch"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Filter chips — rounded.lg = 30px, fully inverted active -->
      <div class="flex gap-2 px-5 pb-3 overflow-x-auto scrollbar-hide">
        <button
          v-for="cat in CATEGORIES"
          :key="cat"
          @click="activeCategory = cat"
          class="flex-shrink-0 text-[12px] font-[500] tracking-[0.02em] px-4 py-2 rounded-[30px] transition-colors duration-100 whitespace-nowrap border"
          :class="activeCategory === cat
            ? 'bg-[#111111] text-white border-[#111111]'
            : 'bg-white text-[#111111] border-[#cacacb]'"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Results header -->
    <div class="px-5 py-5 flex items-baseline gap-3 border-b border-[#e5e5e5]">
      <span class="text-[32px] font-[500] text-[#111111] leading-[1.2] uppercase">클래스</span>
      <span class="text-[14px] font-[500] text-[#707072] uppercase">
        {{ pending ? '...' : `${filteredClasses.length}개` }}
      </span>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="pb-8">
      <div v-for="i in 5" :key="i" class="h-28 bg-[#f5f5f5] animate-pulse border-b border-[#e5e5e5]" />
    </div>

    <!-- Card list — full-width, no outer padding -->
    <div v-else-if="filteredClasses.length > 0" class="pb-8">
      <ClassCardVertical
        v-for="c in filteredClasses"
        :key="c.id"
        :class-item="c"
        @select="selectedClass = $event"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="px-5 py-20 text-center">
      <p class="text-[32px] font-[500] text-[#111111] uppercase mb-2">결과 없음</p>
      <p class="text-[14px] font-[400] text-[#707072]">다른 검색어나 카테고리를 시도해보세요</p>
      <button
        class="mt-8 text-[16px] font-[500] text-[#111111] underline active:opacity-60 transition-opacity"
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
