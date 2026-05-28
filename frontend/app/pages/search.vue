<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'

const route = useRoute()
const router = useRouter()
const { classes } = useClasses()

const categories = ['전체', '운동', '러닝', '수영', '스터디', '취미', '클래스']
const selectedCategory = ref('전체')
const searchQuery = ref((route.query.q as string) || '')

watch(() => route.query.q, (q) => {
  searchQuery.value = (q as string) || ''
})

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

const handleSearch = () => {
  const q = searchQuery.value.trim()
  router.replace({ query: q ? { q } : {} })
}

const clearSearch = () => {
  searchQuery.value = ''
  router.replace({ query: {} })
}

const goToDetail = (item: ClassItem) => {
  navigateTo(`/classes/${item.id}`)
}
</script>

<template>
  <div class="min-h-screen bg-canvas">

    <!-- ══ 상단 검색 헤더 (sticky) ═════════════════════════════ -->
    <div class="sticky top-0 z-40 bg-canvas border-b border-hairline-soft">

      <!-- 검색창 -->
      <div class="px-4 pt-4 pb-3">
        <div class="bg-soft-cloud rounded-[24px] flex items-center gap-2 px-4 h-10">
          <svg class="w-4 h-4 text-mute flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="클래스 검색"
            class="flex-1 text-sm text-ink bg-transparent outline-none placeholder-stone"
            @keydown.enter="handleSearch"
          />
          <button v-if="searchQuery" @click="clearSearch" class="flex-shrink-0">
            <svg class="w-3.5 h-3.5 text-mute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 카테고리 필터 칩 -->
      <div class="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-3">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="selectedCategory === cat
            ? 'bg-ink text-canvas'
            : 'bg-transparent text-stone border border-ash'"
          class="px-4 py-1.5 rounded-[30px] text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- ══ 검색 결과 ═══════════════════════════════════════════ -->
    <div class="px-4 pt-5 pb-24">

      <!-- 결과 수 -->
      <p class="text-[10px] font-medium tracking-[0.2em] uppercase text-mute mb-4">
        {{ searchQuery || selectedCategory !== '전체' ? `검색결과 · ${filteredClasses.length}개` : `전체 · ${filteredClasses.length}개` }}
      </p>

      <!-- 결과 없음 -->
      <div v-if="filteredClasses.length === 0" class="py-20 text-center">
        <p class="text-sm text-mute">검색 결과가 없습니다</p>
        <button
          @click="clearSearch(); selectedCategory = '전체'"
          class="mt-4 text-xs font-medium text-ink underline underline-offset-2"
        >
          전체 보기
        </button>
      </div>

      <!-- 2열 그리드 클래스 리스트 -->
      <div v-else class="grid grid-cols-2 gap-x-3 gap-y-8">
        <div
          v-for="item in filteredClasses"
          :key="item.id"
          class="cursor-pointer"
          @click="goToDetail(item)"
        >
          <ClassCardVertical
            :classItem="item"
            :fullWidth="true"
            @apply.stop="goToDetail(item)"
          />
        </div>
      </div>

    </div>

    <!-- ══ 하단 네비게이션 ════════════════════════════════════ -->
    <BottomNavigation active-menu="search" />

  </div>
</template>
