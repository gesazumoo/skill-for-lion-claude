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
  <div class="max-w-md mx-auto min-h-screen" style="background: #ffffff;">

    <!-- Header — white, hairline bottom -->
    <header
      class="sticky top-0 z-20 flex items-center justify-between px-6"
      style="background: #ffffff; height: 56px; border-bottom: 1px solid #d8d8d8;"
    >
      <span style="font-size: 15px; font-weight: 600; color: #080808; letter-spacing: -0.1px;">클래스데이</span>
      <button
        class="flex items-center justify-center"
        style="width: 32px; height: 32px; border-radius: 9999px; background: #f4f4f4;"
      >
        <svg class="w-4 h-4" style="color: #080808;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>
    </header>

    <!-- Hero Band — WHITE canvas, large headline -->
    <section class="px-6 pt-12 pb-10" style="background: #ffffff;">
      <!-- Eyebrow -->
      <p style="font-size: 15px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: #898989; margin-bottom: 16px;">
        지금 바로 참여 가능
      </p>
      <!-- H1: display-xxl scaled for mobile -->
      <h1 style="font-size: 40px; font-weight: 600; line-height: 1.05; letter-spacing: -0.5px; color: #080808; margin-bottom: 16px;">
        오늘 바로<br>참여 가능한<br>원데이 클래스
      </h1>
      <!-- Body -->
      <p style="font-size: 16px; font-weight: 400; line-height: 1.6; letter-spacing: -0.16px; color: #363636; margin-bottom: 28px;">
        운동, 취미, 스터디까지 — 오늘 하루를 특별하게 만들어보세요.
      </p>

      <!-- Search bar — 4px radius, hairline border -->
      <div class="flex" style="gap: 8px;">
        <div class="relative flex-1">
          <svg
            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style="color: #898989;"
            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            placeholder="클래스 검색"
            style="
              width: 100%;
              height: 44px;
              border-radius: 4px;
              border: 1px solid #d8d8d8;
              background: #ffffff;
              font-size: 16px;
              font-weight: 400;
              letter-spacing: -0.16px;
              color: #080808;
              padding: 0 12px 0 36px;
              outline: none;
              font-family: inherit;
            "
          />
        </div>
        <button
          style="
            height: 44px;
            padding: 0 20px;
            border-radius: 4px;
            background: #080808;
            color: #ffffff;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: -0.16px;
            font-family: inherit;
            white-space: nowrap;
          "
        >
          검색
        </button>
      </div>
    </section>

    <!-- Category Filter Chips — 4px radius, chromatic-aware -->
    <section class="px-6 pb-5" style="background: #ffffff; border-bottom: 1px solid #d8d8d8;">
      <div class="flex gap-2 overflow-x-auto scrollbar-hide">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          class="shrink-0"
          style="
            font-size: 14px;
            font-weight: 500;
            padding: 7px 14px;
            border-radius: 4px;
            border: 1px solid;
            white-space: nowrap;
            font-family: inherit;
            transition: all 0.1s;
          "
          :style="selectedCategory === cat
            ? 'background: #080808; color: #ffffff; border-color: #080808;'
            : 'background: #ffffff; color: #363636; border-color: #d8d8d8;'"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <main class="pb-28" style="background: #ffffff;">

      <!-- 마감 임박 -->
      <section class="px-6 pt-8 pb-8" style="border-bottom: 1px solid #d8d8d8;">
        <div class="flex items-baseline justify-between mb-6">
          <div>
            <p style="font-size: 12px; font-weight: 500; letter-spacing: 0.6px; text-transform: uppercase; color: #ee1d36; margin-bottom: 4px;">
              ● 마감 임박
            </p>
            <h2 style="font-size: 24px; font-weight: 500; color: #080808; line-height: 1.3;">오늘 마감 클래스</h2>
          </div>
          <button style="font-size: 14px; font-weight: 500; color: #5a5a5a; letter-spacing: 0;">
            더보기 →
          </button>
        </div>
        <div class="flex gap-3 overflow-x-auto scrollbar-hide -mx-6 px-6">
          <DeadlineCard v-for="item in deadlineClasses" :key="item.id" :item="item" />
        </div>
      </section>

      <!-- 인기 클래스 -->
      <section class="px-6 pt-8">
        <div class="flex items-baseline justify-between mb-6">
          <div>
            <p style="font-size: 12px; font-weight: 500; letter-spacing: 0.6px; text-transform: uppercase; color: #898989; margin-bottom: 4px;">
              Popular
            </p>
            <h2 style="font-size: 24px; font-weight: 500; color: #080808; line-height: 1.3;">인기 클래스</h2>
          </div>
          <button style="font-size: 14px; font-weight: 500; color: #5a5a5a;">
            더보기 →
          </button>
        </div>

        <div v-if="filtered.length === 0" class="py-16 text-center" style="font-size: 14px; color: #898989;">
          해당 카테고리 클래스가 없어요
        </div>

        <div v-else class="flex flex-col" style="gap: 16px;">
          <ClassCard v-for="item in filtered" :key="item.id" :item="item" />
        </div>
      </section>

      <!-- CTA Band — near-black hero-band-dark -->
      <section class="mt-10 mx-6 mb-2 px-8 py-10" style="background: #080808; border-radius: 8px;">
        <p style="font-size: 12px; font-weight: 500; letter-spacing: 0.6px; text-transform: uppercase; color: #898989; margin-bottom: 12px;">
          Host
        </p>
        <h3 style="font-size: 32px; font-weight: 500; line-height: 1.15; letter-spacing: -0.3px; color: #ffffff; margin-bottom: 12px;">
          나만의 클래스를<br>직접 모집하세요
        </h3>
        <p style="font-size: 16px; font-weight: 400; line-height: 1.6; letter-spacing: -0.16px; color: #898989; margin-bottom: 24px;">
          누구나 호스트가 될 수 있어요.<br>클래스를 개설하고 참가자를 모집해보세요.
        </p>
        <button
          style="
            background: #ffffff;
            color: #080808;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: -0.16px;
            padding: 12px 20px;
            border-radius: 4px;
            display: inline-flex;
            align-items: center;
            font-family: inherit;
          "
        >
          클래스 등록하기
        </button>
      </section>

    </main>

    <!-- Bottom Nav — white, hairline top -->
    <nav
      class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md flex items-center justify-around px-6 z-10"
      style="background: #ffffff; border-top: 1px solid #d8d8d8; height: 56px;"
    >
      <button class="flex flex-col items-center gap-1">
        <svg class="w-5 h-5" style="color: #080808;" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <span style="font-size: 10px; font-weight: 500; color: #080808; letter-spacing: 0.3px;">홈</span>
      </button>
      <button class="flex flex-col items-center gap-1">
        <svg class="w-5 h-5" style="color: #ababab;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <span style="font-size: 10px; font-weight: 500; color: #ababab; letter-spacing: 0.3px;">탐색</span>
      </button>
      <button class="flex flex-col items-center gap-1">
        <svg class="w-5 h-5" style="color: #ababab;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span style="font-size: 10px; font-weight: 500; color: #ababab; letter-spacing: 0.3px;">등록</span>
      </button>
      <button class="flex flex-col items-center gap-1">
        <svg class="w-5 h-5" style="color: #ababab;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span style="font-size: 10px; font-weight: 500; color: #ababab; letter-spacing: 0.3px;">마이</span>
      </button>
    </nav>

  </div>
</template>
