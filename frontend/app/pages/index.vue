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
  <div class="min-h-screen pb-20" style="background: #ffffff;">

    <!-- Hero (밝은 흰 배경, 컬러풀 헤드라인) -->
    <section style="background: linear-gradient(160deg, #f0f9ff 0%, #ffffff 60%); padding: 56px 20px 48px;">
      <div style="max-width: 600px; margin: 0 auto;">
        <span style="
          display: inline-block;
          background: #e0f2fe;
          color: #0284c7;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 9999px;
          margin-bottom: 16px;
        ">원데이 클래스</span>

        <h1 style="
          font-size: clamp(32px, 8vw, 48px);
          font-weight: 700;
          line-height: 1.2;
          color: #0f172a;
          margin-bottom: 12px;
        ">
          오늘 바로<br/>
          <span style="color: #0ea5e9;">참여 가능한</span><br/>
          클래스 찾기
        </h1>
        <p style="
          font-size: 15px;
          font-weight: 300;
          color: #64748b;
          margin-bottom: 32px;
          line-height: 1.7;
        ">
          운동, 취미, 스터디 — 원하는 클래스를 지금 찾아보세요
        </p>

        <!-- 검색창 -->
        <div style="position: relative; margin-bottom: 20px;">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="클래스 검색"
            class="search-input"
            style="
              width: 100%;
              height: 48px;
              padding: 0 52px 0 20px;
              background: #ffffff;
              color: #0f172a;
              font-size: 15px;
              font-family: inherit;
              border-radius: 9999px;
              border: 1.5px solid #e2e8f0;
              outline: none;
              box-sizing: border-box;
              box-shadow: 0 2px 8px rgba(14, 165, 233, 0.08);
            "
            @keyup.enter="handleSearch"
          />
          <button
            class="search-btn"
            style="
              position: absolute;
              right: 6px;
              top: 50%;
              transform: translateY(-50%);
              width: 36px;
              height: 36px;
              background: #0ea5e9;
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

        <!-- 카테고리 칩 -->
        <div class="chip-row">
          <button
            v-for="category in CATEGORIES"
            :key="category"
            class="chip-btn"
            :style="{
              padding: '7px 16px',
              fontSize: '13px',
              fontFamily: 'inherit',
              fontWeight: selectedCategory === category ? '600' : '400',
              borderRadius: '9999px',
              border: 'none',
              background: selectedCategory === category ? '#0ea5e9' : '#f1f5f9',
              color: selectedCategory === category ? '#ffffff' : '#64748b',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: '0',
              transition: 'all 0.15s',
            }"
            @click="handleCategoryClick(category)"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <!-- 추천 클래스 (흰 배경) -->
    <section style="background: #ffffff; padding: 40px 0 32px;">
      <div style="max-width: 600px; margin: 0 auto; padding: 0 20px 20px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <h2 style="font-size: 20px; font-weight: 600; color: #0f172a;">추천 클래스</h2>
          <button
            style="font-size: 13px; font-weight: 400; color: #0ea5e9; background: none; border: none; cursor: pointer;"
            @click="router.push('/search')"
          >전체보기 →</button>
        </div>
      </div>
      <div class="card-scroll-row">
        <ClassCard
          v-for="item in featuredClasses"
          :key="item.id"
          :class-item="item"
          variant="scroll"
          @select="selectedClass = $event"
        />
      </div>
    </section>

    <!-- 마감 임박 (아주 연한 노랑/주황 배경) -->
    <section style="background: #fffbeb; padding: 40px 0 32px;">
      <div style="max-width: 600px; margin: 0 auto; padding: 0 20px 20px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <h2 style="font-size: 20px; font-weight: 600; color: #0f172a;">마감 임박</h2>
          <span style="
            font-size: 12px;
            font-weight: 600;
            color: #d97706;
            background: #fef3c7;
            padding: 3px 10px;
            border-radius: 9999px;
          ">3일 이내</span>
        </div>
      </div>
      <div v-if="deadlineSoonClasses.length > 0" class="card-scroll-row">
        <ClassCardVertical
          v-for="item in deadlineSoonClasses"
          :key="item.id"
          :class-item="item"
          @select="selectedClass = $event"
        />
      </div>
      <div v-else style="padding: 24px 20px; text-align: center; color: #94a3b8; font-size: 15px;">
        현재 마감 임박 클래스가 없습니다
      </div>
    </section>

    <!-- CTA 밴드 (밝은 sky blue 배경) -->
    <section style="background: #0ea5e9; padding: 56px 20px; text-align: center;">
      <div style="max-width: 480px; margin: 0 auto;">
        <span style="
          display: inline-block;
          background: rgba(255,255,255,0.25);
          color: #ffffff;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 9999px;
          margin-bottom: 20px;
        ">Class Hosting</span>
        <h2 style="
          font-size: clamp(24px, 6vw, 36px);
          font-weight: 700;
          line-height: 1.25;
          color: #ffffff;
          margin-bottom: 12px;
        ">
          나만의 클래스를<br/>직접 모집해보세요
        </h2>
        <p style="font-size: 15px; font-weight: 300; color: rgba(255,255,255,0.85); margin-bottom: 36px; line-height: 1.7;">
          클래스를 직접 개설하고 수강생을 모집할 수 있어요
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button
            class="cta-btn-primary"
            style="
              padding: 12px 28px;
              background: #ffffff;
              color: #0ea5e9;
              font-size: 15px;
              font-family: inherit;
              font-weight: 600;
              border-radius: 9999px;
              border: none;
              cursor: pointer;
              min-height: 44px;
              box-shadow: 0 4px 16px rgba(0,0,0,0.12);
            "
            @click="router.push('/register')"
          >클래스 등록하기</button>
          <button
            class="cta-btn-ghost"
            style="
              padding: 12px 28px;
              background: transparent;
              color: #ffffff;
              font-size: 15px;
              font-family: inherit;
              font-weight: 400;
              border-radius: 9999px;
              border: 1.5px solid rgba(255,255,255,0.7);
              cursor: pointer;
              min-height: 44px;
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
  gap: 14px;
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

.chip-btn:active { transform: scale(0.94); }
.search-btn:active { transform: translateY(-50%) scale(0.93); }
.cta-btn-primary:active,
.cta-btn-ghost:active { transform: scale(0.96); }

.search-input:focus { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14,165,233,0.15); }
.search-input::placeholder { color: #94a3b8; }
</style>
