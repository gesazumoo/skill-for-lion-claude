<script setup lang="ts">
import { CATEGORIES, useClasses } from '~/composables/useClasses'
import type { ClassItem } from '~/composables/useClasses'

const router = useRouter()
const { featuredClasses, deadlineSoonClasses, pending, error } = useClasses()

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
  <div style="min-height: 100vh; background: #ffffff; padding-bottom: 80px;">

    <!-- Hero — Nike editorial campaign tile -->
    <section style="background: #111111; padding: 72px 20px 56px;">
      <div style="max-width: 600px; margin: 0 auto;">

        <p style="
          font-size: 12px;
          font-weight: 500;
          color: #9e9ea0;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 20px;
        ">One-Day Class</p>

        <h1 style="
          font-family: 'Bebas Neue', 'Anton', Impact, sans-serif;
          font-size: clamp(72px, 20vw, 96px);
          font-weight: 400;
          line-height: 0.9;
          color: #ffffff;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          margin-bottom: 36px;
        ">
          오늘 바로<br>참여<br>가능한<br>클래스
        </h1>

        <!-- 검색창 — search-pill spec: bg #f5f5f5, rounded 24px, h 48px -->
        <div style="position: relative; margin-bottom: 20px;">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="클래스 검색"
            class="nike-search"
            style="
              width: 100%;
              height: 48px;
              padding: 0 52px 0 20px;
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
            class="search-submit"
            style="
              position: absolute;
              right: 6px;
              top: 50%;
              transform: translateY(-50%);
              width: 36px;
              height: 36px;
              background: #111111;
              border-radius: 9999px;
              border: none;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            "
            @click="handleSearch"
          >
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <!-- 카테고리 칩 — filter-chip spec: pill 30px, active=ink, inactive=transparent/border -->
        <div class="chip-row">
          <button
            v-for="category in CATEGORIES"
            :key="category"
            class="chip-btn"
            :style="{
              padding: '8px 16px',
              fontSize: '13px',
              fontFamily: '\'Inter\', sans-serif',
              fontWeight: '500',
              borderRadius: '30px',
              border: selectedCategory === category ? 'none' : '1px solid #707072',
              background: selectedCategory === category ? '#ffffff' : 'transparent',
              color: selectedCategory === category ? '#111111' : '#9e9ea0',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: '0',
              minHeight: '36px',
            }"
            @click="handleCategoryClick(category)"
          >
            {{ category }}
          </button>
        </div>

      </div>
    </section>

    <!-- 추천 클래스 — white canvas -->
    <section style="background: #ffffff; padding: 48px 0 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 0 20px 16px; display: flex; align-items: baseline; justify-content: space-between;">
        <h2 style="
          font-size: 32px;
          font-weight: 500;
          color: #111111;
          line-height: 1.2;
        ">추천 클래스</h2>
        <button
          style="
            font-size: 14px;
            font-weight: 500;
            color: #707072;
            background: none;
            border: none;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
          "
          @click="router.push('/search')"
        >전체보기</button>
      </div>
      <div v-if="pending" style="padding: 24px 20px; color: #9e9ea0; font-size: 14px; font-weight: 400;">
        로딩 중...
      </div>
      <div v-else-if="error" style="padding: 24px 20px; color: #d30005; font-size: 14px; font-weight: 400;">
        데이터를 불러오지 못했습니다
      </div>
      <div v-else class="card-scroll-row">
        <ClassCard
          v-for="item in featuredClasses"
          :key="item.id"
          :class-item="item"
          variant="scroll"
          @select="selectedClass = $event"
        />
      </div>
    </section>

    <!-- 마감 임박 — soft cloud surface -->
    <section style="background: #f5f5f5; padding: 48px 0 0; margin-top: 48px;">
      <div style="max-width: 600px; margin: 0 auto; padding: 0 20px 16px; display: flex; align-items: baseline; justify-content: space-between;">
        <h2 style="
          font-size: 32px;
          font-weight: 500;
          color: #111111;
          line-height: 1.2;
        ">마감 임박</h2>
        <span style="
          font-size: 12px;
          font-weight: 500;
          color: #d30005;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        ">3일 이내</span>
      </div>
      <div v-if="pending" style="padding: 24px 20px 48px; color: #9e9ea0; font-size: 14px; font-weight: 400;">
        로딩 중...
      </div>
      <div v-else-if="error" style="padding: 24px 20px 48px; color: #d30005; font-size: 14px; font-weight: 400;">
        데이터를 불러오지 못했습니다
      </div>
      <div v-else-if="deadlineSoonClasses.length > 0" class="card-scroll-row" style="padding-bottom: 48px;">
        <ClassCardVertical
          v-for="item in deadlineSoonClasses"
          :key="item.id"
          :class-item="item"
          @select="selectedClass = $event"
        />
      </div>
      <div v-else style="padding: 32px 20px 48px; color: #9e9ea0; font-size: 16px; font-weight: 400;">
        현재 마감 임박 클래스가 없습니다
      </div>
    </section>

    <!-- CTA 밴드 — ink (#111111) with white pill CTA -->
    <section style="background: #111111; padding: 80px 20px; text-align: center;">
      <div style="max-width: 480px; margin: 0 auto;">
        <p style="
          font-size: 12px;
          font-weight: 500;
          color: #9e9ea0;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 16px;
        ">Class Hosting</p>
        <h2 style="
          font-family: 'Bebas Neue', 'Anton', Impact, sans-serif;
          font-size: clamp(48px, 12vw, 64px);
          font-weight: 400;
          line-height: 0.9;
          color: #ffffff;
          text-transform: uppercase;
          margin-bottom: 24px;
          letter-spacing: 0.01em;
        ">나만의 클래스를<br>직접 모집해보세요</h2>
        <p style="
          font-size: 16px;
          font-weight: 400;
          color: #707072;
          margin-bottom: 40px;
          line-height: 1.5;
        ">클래스를 직접 개설하고 수강생을 모집할 수 있어요</p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <!-- button-outline-on-image: white pill on dark surface -->
          <button
            class="cta-primary"
            style="
              padding: 16px 32px;
              background: #ffffff;
              color: #111111;
              font-family: 'Inter', sans-serif;
              font-size: 16px;
              font-weight: 500;
              border-radius: 30px;
              border: none;
              cursor: pointer;
              min-height: 48px;
            "
            @click="router.push('/register')"
          >클래스 등록하기</button>
          <!-- button-secondary on dark: soft-cloud -->
          <button
            class="cta-secondary"
            style="
              padding: 16px 32px;
              background: transparent;
              color: #9e9ea0;
              font-family: 'Inter', sans-serif;
              font-size: 16px;
              font-weight: 500;
              border-radius: 30px;
              border: 1px solid #707072;
              cursor: pointer;
              min-height: 48px;
            "
            @click="router.push('/search')"
          >클래스 둘러보기</button>
        </div>
      </div>
    </section>

    <ClassDetail :class-item="selectedClass" @close="selectedClass = null" />
  </div>
</template>

<style scoped>
.card-scroll-row {
  display: flex;
  gap: 0;
  overflow-x: auto;
  padding: 0 20px 8px;
  scrollbar-width: none;
}
.card-scroll-row::-webkit-scrollbar { display: none; }

.chip-row {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}
.chip-row::-webkit-scrollbar { display: none; }

.chip-btn:active { opacity: 0.5; transition: opacity 0.1s; }
.search-submit:active { transform: translateY(-50%) scale(0.93); }
.cta-primary:active { opacity: 0.5; transition: opacity 0.1s; }
.cta-secondary:active { opacity: 0.5; transition: opacity 0.1s; }

.nike-search::placeholder { color: #9e9ea0; }
.nike-search:focus { outline: none; box-shadow: 0 0 0 2px #ffffff; }
</style>
