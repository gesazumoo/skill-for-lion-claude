<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'

const { classes, deadlineSoonClasses, formatPrice } = useClasses()

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
</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-20">

    <!-- ── Hero ─────────────────────────────────────────── -->
    <section class="bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500 text-white px-4 pt-10 pb-6">
      <!-- Header row -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <p class="text-indigo-200 text-xs font-medium tracking-wide uppercase mb-1">원데이 클래스 플랫폼</p>
          <h1 class="text-2xl font-bold leading-tight">
            오늘 바로 참여 가능한<br>원데이 클래스
          </h1>
        </div>
        <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
      </div>

      <!-- Search bar -->
      <div class="bg-white rounded-2xl flex items-center gap-3 px-4 py-3 mb-5 shadow-sm">
        <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="클래스 검색 (제목, 카테고리, 지역)"
          class="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent"
        />
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="text-gray-400 hover:text-gray-600"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Category chips -->
      <div class="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-colors',
            selectedCategory === cat
              ? 'bg-white text-indigo-600'
              : 'bg-white/20 text-white border border-white/30'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- ── Stats bar ─────────────────────────────────────── -->
    <div class="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-around">
      <div class="text-center">
        <p class="text-lg font-bold text-indigo-600">{{ classes.length }}+</p>
        <p class="text-xs text-gray-500">진행 중인 클래스</p>
      </div>
      <div class="w-px h-8 bg-gray-100" />
      <div class="text-center">
        <p class="text-lg font-bold text-indigo-600">7</p>
        <p class="text-xs text-gray-500">카테고리</p>
      </div>
      <div class="w-px h-8 bg-gray-100" />
      <div class="text-center">
        <p class="text-lg font-bold text-indigo-600">{{ deadlineSoonClasses.length }}</p>
        <p class="text-xs text-gray-500">마감 임박</p>
      </div>
    </div>

    <!-- ── Recommended Classes ────────────────────────────── -->
    <section class="py-5">
      <div class="px-4 flex items-center justify-between mb-3">
        <div>
          <h2 class="text-base font-bold text-gray-900">추천 클래스</h2>
          <p v-if="selectedCategory !== '전체'" class="text-xs text-indigo-500 font-medium mt-0.5">
            {{ selectedCategory }} · {{ filteredClasses.length }}개
          </p>
        </div>
        <button class="text-xs text-indigo-600 font-medium">전체 보기 →</button>
      </div>

      <!-- Empty state -->
      <div v-if="filteredClasses.length === 0" class="px-4 py-8 text-center text-gray-400 text-sm">
        검색 결과가 없습니다
      </div>

      <!-- Horizontal scroll -->
      <div v-else class="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
        <ClassCardHorizontal
          v-for="item in filteredClasses"
          :key="item.id"
          :classItem="item"
        />
      </div>
    </section>

    <!-- ── Deadline Soon Classes ──────────────────────────── -->
    <section class="bg-white py-5">
      <div class="px-4 flex items-center justify-between mb-3">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-base font-bold text-gray-900">마감 임박 클래스</h2>
            <span class="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {{ deadlineSoonClasses.length }}
            </span>
          </div>
          <p class="text-xs text-gray-500 mt-0.5">3일 이내 마감되는 클래스</p>
        </div>
        <button class="text-xs text-indigo-600 font-medium">전체 보기 →</button>
      </div>

      <div v-if="deadlineSoonClasses.length === 0" class="px-4 py-8 text-center text-gray-400 text-sm">
        마감 임박 클래스가 없습니다
      </div>

      <div v-else class="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
        <ClassCardVertical
          v-for="item in deadlineSoonClasses"
          :key="item.id"
          :classItem="item"
          @apply="handleApply"
        />
      </div>
    </section>

    <!-- ── Banner: Popular Categories ────────────────────── -->
    <section class="px-4 py-5">
      <h2 class="text-base font-bold text-gray-900 mb-3">카테고리별 탐색</h2>
      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="cat in categories.slice(1)"
          :key="cat"
          @click="selectedCategory = cat; $el.closest('.min-h-screen').scrollTo({ top: 0, behavior: 'smooth' })"
          class="bg-white rounded-2xl py-4 flex flex-col items-center gap-1.5 active:bg-indigo-50 transition-colors border border-gray-100"
        >
          <span class="text-xl">
            {{ { '운동': '💪', '러닝': '🏃', '수영': '🏊', '스터디': '📚', '취미': '🎨', '클래스': '✨' }[cat] }}
          </span>
          <span class="text-xs font-semibold text-gray-700">{{ cat }}</span>
        </button>
      </div>
    </section>

    <!-- ── CTA: Register Class ────────────────────────────── -->
    <section class="px-4 pb-2">
      <div class="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl p-6 border border-indigo-100">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h3 class="text-base font-bold text-gray-900 mb-1">
              나만의 클래스를 직접 모집해보세요
            </h3>
            <p class="text-xs text-gray-500 mb-4 leading-relaxed">
              쉽게 클래스를 등록하고 수강생을 모집하세요.<br>
              누구든 강사가 될 수 있습니다.
            </p>
            <button class="bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full active:bg-indigo-700 transition-colors">
              클래스 등록하기 →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Bottom Navigation ──────────────────────────────── -->
    <BottomNavigation active-menu="home" />
  </div>
</template>
