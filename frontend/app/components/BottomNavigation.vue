<script setup lang="ts">
defineProps<{
  activeMenu: 'home' | 'search' | 'register' | 'profile'
}>()

const navItems = [
  {
    key: 'home',
    label: '홈',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />`
  },
  {
    key: 'search',
    label: '검색',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />`
  },
  {
    key: 'register',
    label: '등록',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />`
  },
  {
    key: 'profile',
    label: '내정보',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />`
  }
] as const
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 safe-area-inset-bottom">
    <div class="flex items-center justify-around px-2 h-16">
      <button
        v-for="item in navItems"
        :key="item.key"
        class="flex flex-col items-center gap-0.5 flex-1 py-2 transition-colors"
        :class="activeMenu === item.key ? 'text-indigo-600' : 'text-gray-400'"
      >
        <!-- Register button gets special treatment -->
        <div
          v-if="item.key === 'register'"
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
            activeMenu === 'register' ? 'bg-indigo-600' : 'bg-indigo-500'
          ]"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="item.icon" />
        </div>
        <template v-else>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="item.icon" />
        </template>
        <span class="text-xs font-medium">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>
