<script setup lang="ts">
import { CATEGORIES, useClasses } from '~/composables/useClasses'
import type { ClassItem } from '~/composables/useClasses'

const router = useRouter()
const { featuredClasses, deadlineSoonClasses } = useClasses()

const searchQuery = ref('')
const selectedCategory = ref('전체')
const selectedClass = ref<ClassItem | null>(null)

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
  } else {
    router.push('/search')
  }
}

function handleCategoryClick(category: string) {
  selectedCategory.value = category
  router.push(`/search?category=${encodeURIComponent(category)}`)
}
</script>

<template>
  <div class="min-h-screen bg-white pb-20">

    <!-- Hero 영역 -->
    <section class="bg-[#111111] px-5 pt-12 pb-8">
      <h1
        class="text-white uppercase leading-[0.9] mb-3"
        style="font-family: 'Bebas Neue', sans-serif; font-size: clamp(48px, 10vw, 72px);"
      >
        오늘 바로<br/>참여 가능한<br/>원데이 클래스
      </h1>
      <p class="text-[#9e9ea0] text-[14px] font-medium mb-6">
        운동, 취미, 스터디 — 원하는 클래스를 지금 찾아보세요
      </p>

      <!-- 검색창 -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="클래스 검색"
          class="w-full h-11 pl-4 pr-12 bg-white text-[#111111] text-[15px] rounded-[24px] outline-none placeholder:text-[#9e9ea0]"
          @keyup.enter="handleSearch"
        />
        <button
          class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#111111] rounded-full"
          @click="handleSearch"
        >
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      <!-- 카테고리 버튼 -->
      <div class="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
        <button
          v-for="category in CATEGORIES"
          :key="category"
          class="flex-shrink-0 px-4 py-1.5 text-[13px] font-medium rounded-[30px] transition-colors"
          :class="selectedCategory === category
            ? 'bg-white text-[#111111]'
            : 'bg-transparent text-[#9e9ea0] border border-[#444444]'"
          @click="handleCategoryClick(category)"
        >
          {{ category }}
        </button>
      </div>
    </section>

    <!-- 추천 클래스 영역 -->
    <section class="pt-8 pb-6">
      <div class="px-5 flex items-center justify-between mb-4">
        <h2 class="text-[20px] font-medium text-[#111111]">추천 클래스</h2>
        <button
          class="text-[13px] text-[#707072] font-medium"
          @click="router.push('/search')"
        >전체보기</button>
      </div>
      <div class="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none">
        <ClassCard
          v-for="item in featuredClasses"
          :key="item.id"
          :class-item="item"
          variant="scroll"
          @select="selectedClass = $event"
        />
      </div>
    </section>

    <!-- 구분선 -->
    <div class="h-2 bg-[#f5f5f5]" />

    <!-- 마감 임박 클래스 영역 -->
    <section class="pt-8 pb-6">
      <div class="px-5 flex items-center justify-between mb-4">
        <h2 class="text-[20px] font-medium text-[#111111]">마감 임박</h2>
        <span class="text-[12px] text-[#d30005] font-medium bg-[#fff0f0] px-2.5 py-1 rounded-[30px]">3일 이내 마감</span>
      </div>

      <div v-if="deadlineSoonClasses.length > 0" class="flex gap-4 overflow-x-auto px-5 pb-2 scrollbar-none">
        <ClassCardVertical
          v-for="item in deadlineSoonClasses"
          :key="item.id"
          :class-item="item"
          @select="selectedClass = $event"
        />
      </div>
      <div v-else class="px-5 py-8 text-center text-[#9e9ea0] text-[14px]">
        현재 마감 임박 클래스가 없습니다
      </div>
    </section>

    <!-- 구분선 -->
    <div class="h-2 bg-[#f5f5f5]" />

    <!-- 클래스 모집 등록 유도 영역 -->
    <section class="bg-[#111111] px-5 py-12 text-center">
      <p class="text-[#9e9ea0] text-[13px] font-medium uppercase tracking-wider mb-2">CLASS HOSTING</p>
      <h2
        class="text-white uppercase leading-[0.9] mb-4"
        style="font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 8vw, 56px);"
      >
        나만의 클래스를<br/>직접 모집해보세요
      </h2>
      <p class="text-[#9e9ea0] text-[14px] mb-8">
        클래스를 직접 개설하고 수강생을 모집할 수 있어요
      </p>
      <button
        class="px-10 py-3 bg-white text-[#111111] text-[15px] font-medium rounded-[30px]"
        @click="router.push('/register')"
      >
        클래스 등록하기
      </button>
    </section>

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
