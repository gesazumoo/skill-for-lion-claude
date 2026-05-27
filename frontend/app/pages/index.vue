<script setup lang="ts">
import { CATEGORIES, useClasses } from '~/composables/useClasses'

const { allClasses, deadlineSoonClasses, pending } = useClasses()
const router = useRouter()

const searchQuery = ref('')
const activeCategory = ref('전체')

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
  <div class="min-h-screen max-w-lg mx-auto pb-[72px]">

    <!-- ① Dark Hero Tile — #272729 -->
    <section class="bg-[#272729] px-5 pt-16 pb-12">

      <p class="text-[14px] font-semibold text-[#0066cc] tracking-[-0.224px] mb-3">
        원데이 클래스
      </p>

      <h1 class="text-[34px] font-semibold text-white leading-[1.07] tracking-[-0.374px] mb-3">
        오늘 바로 참여 가능한<br />원데이 클래스
      </h1>

      <p class="text-[17px] font-normal text-[#cccccc] leading-[1.47] tracking-[-0.374px] mb-7">
        운동, 러닝, 수영, 스터디 등<br />원하는 클래스를 찾아보세요
      </p>

      <div class="flex items-center gap-3 bg-white rounded-[9999px] px-5 border border-[rgba(0,0,0,0.08)] h-11">
        <svg class="w-4 h-4 text-[#7a7a7a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="클래스, 카테고리, 지역으로 검색"
          class="flex-1 text-[17px] font-normal text-[#1d1d1f] tracking-[-0.374px] placeholder-[#7a7a7a] outline-none bg-transparent"
          @keydown.enter="handleSearchSubmit"
        />
      </div>

      <div class="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-1">
        <button
          v-for="cat in CATEGORIES"
          :key="cat"
          @click="activeCategory = cat"
          class="flex-shrink-0 text-[14px] font-normal tracking-[-0.224px] px-4 py-2 rounded-[9999px] transition-all duration-150 active:scale-95"
          :class="activeCategory === cat
            ? 'bg-[#0066cc] text-white'
            : 'bg-transparent text-white border border-[rgba(255,255,255,0.28)]'"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- ② White Recommended Section — #ffffff -->
    <section class="bg-white px-5 py-12">

      <div class="flex items-baseline justify-between mb-6">
        <h2 class="text-[21px] font-semibold text-[#1d1d1f] tracking-[-0.374px]">
          추천 클래스
        </h2>
        <span class="text-[14px] font-normal text-[#7a7a7a] tracking-[-0.224px]">
          {{ pending ? '...' : `${filteredClasses.length}개` }}
        </span>
      </div>

      <!-- 로딩 스켈레톤 -->
      <div v-if="pending" class="space-y-3">
        <div
          v-for="i in 4"
          :key="i"
          class="h-24 bg-[#f5f5f7] rounded-[18px] animate-pulse"
        />
      </div>

      <!-- 클래스 리스트 -->
      <div v-else-if="filteredClasses.length > 0" class="space-y-3">
        <ClassCard
          v-for="c in filteredClasses"
          :key="c.id"
          :class-item="c"
          variant="list"
        />
      </div>

      <!-- 빈 상태 -->
      <div v-else class="py-16 text-center">
        <svg class="w-10 h-10 mx-auto mb-4 text-[#e0e0e0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.374px]">검색 결과가 없어요</p>
        <p class="text-[14px] font-normal text-[#7a7a7a] tracking-[-0.224px] mt-1">다른 검색어나 카테고리를 시도해보세요</p>
      </div>
    </section>

    <!-- ③ Parchment Deadline Section — #f5f5f7 -->
    <section v-if="pending || deadlineSoonClasses.length > 0" class="bg-[#f5f5f7] py-12">

      <div class="px-5 mb-6">
        <h2 class="text-[21px] font-semibold text-[#1d1d1f] tracking-[-0.374px]">
          마감 임박 클래스
        </h2>
        <p class="text-[17px] font-normal text-[#7a7a7a] leading-[1.47] tracking-[-0.374px] mt-1">
          3일 이내 마감되는 클래스예요
        </p>
      </div>

      <!-- 로딩 스켈레톤 -->
      <div v-if="pending" class="flex gap-3 px-5">
        <div
          v-for="i in 3"
          :key="i"
          class="flex-shrink-0 w-40 h-48 bg-white rounded-[18px] animate-pulse"
        />
      </div>

      <div v-else class="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-1">
        <ClassCard
          v-for="c in deadlineSoonClasses"
          :key="c.id"
          :class-item="c"
          variant="scroll"
        />
      </div>
    </section>

    <!-- ④ Dark CTA Tile -->
    <section class="bg-[#272729] px-5 py-16 text-center">

      <p class="text-[14px] font-semibold text-[#0066cc] tracking-[-0.224px] mb-4">
        클래스 호스트
      </p>

      <h2 class="text-[34px] font-semibold text-white leading-[1.07] tracking-[-0.374px]">
        나만의 클래스를<br />직접 모집해보세요
      </h2>

      <p class="text-[17px] font-normal text-[#cccccc] leading-[1.47] tracking-[-0.374px] mt-4 mx-auto max-w-xs">
        지금 바로 클래스를 등록하고<br />함께할 사람들을 모집해보세요
      </p>

      <button
        class="mt-8 bg-[#0066cc] text-white text-[17px] font-light tracking-[-0.374px] px-[22px] py-[11px] rounded-[9999px] active:scale-95 transition-transform duration-100"
      >
        클래스 등록하기
      </button>
    </section>

    <BottomNavigation active-menu="home" />

  </div>
</template>
