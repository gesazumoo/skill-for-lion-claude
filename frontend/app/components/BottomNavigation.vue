<script setup lang="ts">
const props = defineProps<{
  activeMenu: 'home' | 'search' | 'register' | 'profile'
}>()

const router = useRouter()
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e5e5] z-50">
    <div class="flex items-stretch max-w-[600px] mx-auto">
      <button
        v-for="item in [
          { key: 'home', label: '홈', path: '/' },
          { key: 'search', label: '검색', path: '/search' },
          { key: 'register', label: '등록', path: '/register' },
          { key: 'profile', label: '내정보', path: '/profile' },
        ]"
        :key="item.key"
        class="flex-1 flex flex-col items-center justify-center py-3 gap-1"
        :class="activeMenu === item.key ? 'text-[#111111]' : 'text-[#9e9ea0]'"
        @click="router.push(item.path)"
      >
        <!-- 홈 아이콘 -->
        <svg v-if="item.key === 'home'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <!-- 검색 아이콘 -->
        <svg v-else-if="item.key === 'search'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <!-- 등록 아이콘 -->
        <svg v-else-if="item.key === 'register'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <!-- 내정보 아이콘 -->
        <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="text-[11px] font-medium">{{ item.label }}</span>
        <span
          v-if="activeMenu === item.key"
          class="absolute bottom-0 w-5 h-0.5 bg-[#111111] rounded-full"
        />
      </button>
    </div>
  </nav>
</template>
