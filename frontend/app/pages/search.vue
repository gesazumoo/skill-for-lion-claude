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
  <div style="min-height: 100vh; background: #ffffff; padding-bottom: 80px;">

    <!-- sticky header — Nike sub-nav: white bg, hairline-soft bottom -->
    <div style="position: sticky; top: 0; background: #ffffff; z-index: 40; box-shadow: inset 0 -1px 0 #e5e5e5;">

      <!-- 검색바 — search-pill-focused spec: bg #f5f5f5, rounded 24px -->
      <div style="padding: 12px 20px 10px;">
        <div style="position: relative;">
          <svg
            style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #707072;"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="클래스 검색"
            class="search-input"
            style="
              width: 100%;
              height: 44px;
              padding: 0 40px 0 42px;
              background: #f5f5f5;
              color: #111111;
              font-family: 'Inter', sans-serif;
              font-size: 16px;
              font-weight: 400;
              border-radius: 24px;
              border: none;
              outline: none;
              box-sizing: border-box;
            "
            @keyup.enter="handleSearch"
          />
          <button
            v-if="searchQuery"
            style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; background: none; border: none; cursor: pointer; color: #9e9ea0;"
            @click="clearSearch"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 카테고리 필터 — filter-chip spec: active=ink, inactive=canvas+hairline, 30px radius -->
      <div class="chip-row" style="padding: 0 20px 12px;">
        <button
          v-for="category in CATEGORIES"
          :key="category"
          class="chip-btn"
          :style="{
            flexShrink: '0',
            padding: '7px 16px',
            fontSize: '13px',
            fontFamily: '\'Inter\', sans-serif',
            fontWeight: '500',
            borderRadius: '30px',
            border: selectedCategory === category ? 'none' : '1px solid #cacacb',
            background: selectedCategory === category ? '#111111' : '#ffffff',
            color: selectedCategory === category ? '#ffffff' : '#111111',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            minHeight: '36px',
          }"
          @click="selectCategory(category)"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- 결과 카운트 행 -->
    <div style="padding: 12px 20px; display: flex; align-items: center; justify-content: space-between;">
      <p style="font-size: 14px; font-weight: 500; color: #707072;">
        <span v-if="searchQuery">
          "<span style="color: #111111;">{{ searchQuery }}</span>" 검색 결과
        </span>
        <span v-else-if="selectedCategory !== '전체'">
          <span style="color: #111111;">{{ selectedCategory }}</span> 클래스
        </span>
        <span v-else>전체 클래스</span>
      </p>
      <p style="font-size: 14px; font-weight: 500; color: #9e9ea0;">{{ results.length }}개</p>
    </div>

    <!-- 검색 결과 -->
    <div v-if="results.length > 0" style="padding: 0 20px;">
      <ClassCard
        v-for="item in results"
        :key="item.id"
        :class-item="item"
        variant="list"
        @select="selectedClass = item"
      />
    </div>

    <!-- 결과 없음 -->
    <div v-else style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 20px; text-align: center;">
      <svg style="width: 48px; height: 48px; color: #cacacb; margin-bottom: 16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <p style="font-size: 16px; font-weight: 500; color: #111111; margin-bottom: 8px;">검색 결과가 없습니다</p>
      <p style="font-size: 14px; font-weight: 400; color: #707072;">다른 키워드나 카테고리로 검색해보세요</p>
    </div>

    <ClassDetail :class-item="selectedClass" @close="selectedClass = null" />
  </div>
</template>

<style scoped>
.chip-row {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}
.chip-row::-webkit-scrollbar { display: none; }

.chip-btn:active { opacity: 0.5; transition: opacity 0.1s; }

.search-input::placeholder { color: #9e9ea0; }
.search-input:focus { background: #ffffff; box-shadow: 0 0 0 2px #111111; }
</style>
