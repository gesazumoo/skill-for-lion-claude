<script setup lang="ts">
import { categories, popularClasses, deadlineClasses } from '~/data/classes'

const selectedCategory = ref('전체')

const filtered = computed(() =>
  selectedCategory.value === '전체'
    ? popularClasses
    : popularClasses.filter(c => c.category === selectedCategory.value)
)
</script>

<template>
  <div class="max-w-md mx-auto bg-gray-50 min-h-screen">

    <!-- Header -->
    <header class="bg-white px-5 pt-12 pb-5 sticky top-0 z-10 border-b border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <span class="text-xl font-extrabold tracking-tight text-gray-900">클래스데이</span>
        <button class="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
      </div>
    </header>

    <main class="px-5 pb-24">

      <!-- Hero -->
      <section class="pt-7 pb-6">
        <p class="text-sm text-emerald-500 font-semibold mb-2">지금 바로 참여 가능</p>
        <h1 class="text-2xl font-extrabold text-gray-900 leading-tight mb-1">
          오늘 바로 참여 가능한<br>원데이 클래스
        </h1>
        <p class="text-sm text-gray-400 mb-5">운동, 취미, 스터디까지 — 오늘 하루를 특별하게</p>

        <!-- Search -->
        <div class="relative mb-5">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            placeholder="클래스 검색"
            class="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
          />
        </div>

        <!-- Category chips -->
        <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            class="shrink-0 text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            :class="selectedCategory === cat
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-400'"
          >
            {{ cat }}
          </button>
        </div>
      </section>

      <!-- 마감 임박 -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base font-bold text-gray-900 flex items-center gap-1.5">
            <span class="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            오늘 마감 임박
          </h2>
          <button class="text-xs text-gray-400 hover:text-gray-600">더보기</button>
        </div>
        <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5">
          <DeadlineCard v-for="item in deadlineClasses" :key="item.id" :item="item" />
        </div>
      </section>

      <!-- 인기 클래스 -->
      <section>
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base font-bold text-gray-900">인기 클래스</h2>
          <button class="text-xs text-gray-400 hover:text-gray-600">더보기</button>
        </div>

        <div v-if="filtered.length === 0" class="py-16 text-center text-gray-400 text-sm">
          해당 카테고리 클래스가 없어요
        </div>

        <div v-else class="grid grid-cols-1 gap-4">
          <ClassCard v-for="item in filtered" :key="item.id" :item="item" />
        </div>
      </section>

      <!-- CTA -->
      <section class="mt-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl p-6 text-white">
        <p class="text-xs font-semibold text-emerald-400 mb-2">HOST</p>
        <h3 class="text-lg font-extrabold leading-snug mb-2">나만의 클래스를<br>직접 모집해보세요</h3>
        <p class="text-sm text-gray-400 mb-5">누구나 호스트가 될 수 있어요.<br>지금 바로 클래스를 개설해보세요.</p>
        <button class="bg-white text-gray-900 text-sm font-bold px-5 py-3 rounded-xl hover:bg-gray-100 transition-colors">
          클래스 등록하기
        </button>
      </section>

    </main>

    <!-- Bottom Nav -->
    <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 flex items-center justify-around px-6 py-3 z-10">
      <button class="flex flex-col items-center gap-0.5 text-gray-900">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <span class="text-[10px] font-semibold">홈</span>
      </button>
      <button class="flex flex-col items-center gap-0.5 text-gray-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <span class="text-[10px] font-semibold">탐색</span>
      </button>
      <button class="flex flex-col items-center gap-0.5 text-gray-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span class="text-[10px] font-semibold">등록</span>
      </button>
      <button class="flex flex-col items-center gap-0.5 text-gray-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="text-[10px] font-semibold">마이</span>
      </button>
    </nav>

  </div>
</template>

<style>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
