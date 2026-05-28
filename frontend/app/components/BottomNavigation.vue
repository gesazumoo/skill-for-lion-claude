<script setup lang="ts">
defineProps<{
  activeMenu: 'home' | 'search' | 'register' | 'profile'
}>()
</script>

<template>
  <!-- 하단 네비게이션 — Nike utility bar: flat canvas, hairline-soft top, no shadow -->
  <nav class="fixed bottom-0 left-0 right-0 z-50 bg-canvas border-t border-hairline-soft">
    <div class="flex items-stretch h-16">

      <!-- 홈 -->
      <NuxtLink
        to="/"
        class="flex flex-col items-center justify-center gap-1 flex-1 relative transition-colors"
        :class="activeMenu === 'home' ? 'text-ink' : 'text-stone'"
      >
        <span v-if="activeMenu === 'home'" class="absolute top-0 left-0 right-0 h-0.5 bg-ink" />
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="text-[9px] font-medium tracking-[0.12em] uppercase">홈</span>
      </NuxtLink>

      <!-- 검색 -->
      <NuxtLink
        to="/search"
        class="flex flex-col items-center justify-center gap-1 flex-1 relative transition-colors"
        :class="activeMenu === 'search' ? 'text-ink' : 'text-stone'"
      >
        <span v-if="activeMenu === 'search'" class="absolute top-0 left-0 right-0 h-0.5 bg-ink" />
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span class="text-[9px] font-medium tracking-[0.12em] uppercase">검색</span>
      </NuxtLink>

      <!-- 등록 -->
      <NuxtLink
        to="/register"
        class="flex flex-col items-center justify-center gap-1 flex-1 relative transition-colors"
        :class="activeMenu === 'register' ? 'text-ink' : 'text-stone'"
      >
        <span v-if="activeMenu === 'register'" class="absolute top-0 left-0 right-0 h-0.5 bg-ink" />
        <div class="w-9 h-9 rounded-[30px] bg-ink flex items-center justify-center">
          <svg class="w-4 h-4 text-canvas" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <span class="text-[9px] font-medium tracking-[0.12em] uppercase">등록</span>
      </NuxtLink>

      <!-- 내정보 -->
      <NuxtLink
        to="/profile"
        class="flex flex-col items-center justify-center gap-1 flex-1 relative transition-colors"
        :class="activeMenu === 'profile' ? 'text-ink' : 'text-stone'"
      >
        <span v-if="activeMenu === 'profile'" class="absolute top-0 left-0 right-0 h-0.5 bg-ink" />
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="text-[9px] font-medium tracking-[0.12em] uppercase">내정보</span>
      </NuxtLink>

    </div>
  </nav>
</template>
