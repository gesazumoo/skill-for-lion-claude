<script setup lang="ts">
import { CATEGORIES, useClasses } from '~/composables/useClasses'
import type { ClassItem } from '~/composables/useClasses'

const route = useRoute()
const router = useRouter()
const { searchClasses } = useClasses()

const searchQuery = ref((route.query.q as string) ?? '')
const selectedCategory = ref((route.query.category as string) ?? '전체')
const selectedClass = ref<ClassItem | null>(null)

const results = computed(() => searchClasses(searchQuery.value, selectedCategory.value))

function handleSearch() {
  router.replace({
    query: {
      ...(searchQuery.value ? { q: searchQuery.value } : {}),
      ...(selectedCategory.value !== '전체' ? { category: selectedCategory.value } : {}),
    }
  })
}

function selectCategory(category: string) {
  selectedCategory.value = category
  handleSearch()
}

function clearSearch() {
  searchQuery.value = ''
  handleSearch()
}

watch(() => route.query, (q) => {
  if (q.q !== undefined) searchQuery.value = q.q as string
  if (q.category !== undefined) selectedCategory.value = q.category as string
  else if (!q.category) selectedCategory.value = '전체'
})
</script>

<template>
  <div class="min-h-screen bg-white pb-20">

    <!-- 스티키 상단 영역 -->
    <div class="sticky top-0 bg-white z-40 border-b border-[#e5e5e5]">
      <!-- 검색바 -->
      <div class="px-4 pt-4 pb-3">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="클래스 검색"
            class="w-full h-11 pl-10 pr-10 bg-[#f5f5f5] text-[#111111] text-[15px] rounded-[24px] outline-none placeholder:text-[#9e9ea0] focus:bg-white focus:ring-2 focus:ring-[#111111] transition-colors"
            @keyup.enter="handleSearch"
          />
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#707072]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button
            v-if="searchQuery"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-[#9e9ea0]"
            @click="clearSearch"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 카테고리 필터 -->
      <div class="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-none">
        <button
          v-for="category in CATEGORIES"
          :key="category"
          class="flex-shrink-0 px-4 py-1.5 text-[13px] font-medium rounded-[30px] border transition-colors"
          :class="selectedCategory === category
            ? 'bg-[#111111] text-white border-[#111111]'
            : 'bg-white text-[#111111] border-[#cacacb]'"
          @click="selectCategory(category)"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- 검색 결과 헤더 -->
    <div class="px-4 py-3 flex items-center justify-between">
      <p class="text-[13px] text-[#707072]">
        <span v-if="searchQuery">
          "<span class="text-[#111111] font-medium">{{ searchQuery }}</span>" 검색 결과
        </span>
        <span v-else-if="selectedCategory !== '전체'">
          <span class="text-[#111111] font-medium">{{ selectedCategory }}</span> 클래스
        </span>
        <span v-else>전체 클래스</span>
      </p>
      <p class="text-[13px] text-[#707072]">{{ results.length }}개</p>
    </div>

    <!-- 검색 결과 리스트 -->
    <div v-if="results.length > 0" class="px-4">
      <ClassCard
        v-for="item in results"
        :key="item.id"
        :class-item="item"
        variant="list"
        @select="selectedClass = item"
      />
    </div>

    <!-- 결과 없음 -->
    <div v-else class="flex flex-col items-center justify-center py-20 px-4 text-center">
      <svg class="w-12 h-12 text-[#cacacb] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <p class="text-[16px] font-medium text-[#111111] mb-1">검색 결과가 없습니다</p>
      <p class="text-[14px] text-[#707072]">다른 키워드나 카테고리로 검색해보세요</p>
    </div>

    <!-- 클래스 상세보기 바텀 시트 -->
    <ClassDetail
      :class-item="selectedClass"
      @close="selectedClass = null"
    />

  </div>
</template>

<style scoped>
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
