<script setup lang="ts">
defineProps<{
  activeMenu: 'home' | 'search' | 'register' | 'profile'
}>()

const router = useRouter()

const navItems = [
  { id: 'home' as const, label: '홈', path: '/' },
  { id: 'search' as const, label: '검색', path: '/search' },
  { id: 'register' as const, label: '등록', path: '/register' },
  { id: 'profile' as const, label: '내정보', path: '/profile' },
]
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-[#111111] z-50 safe-pb" style="box-shadow: inset 0 1px 0 #222222;">
    <div class="flex max-w-lg mx-auto">
      <button
        v-for="item in navItems"
        :key="item.id"
        class="flex-1 flex flex-col items-center pt-3 pb-2 gap-[3px] transition-opacity active:opacity-50"
        :class="activeMenu === item.id ? 'text-white' : 'text-[#9e9ea0]'"
        @click="router.push(item.path)"
      >
        <svg v-if="item.id === 'home'" class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <svg v-else-if="item.id === 'search'" class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <svg v-else-if="item.id === 'register'" class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 4v16m8-8H4" />
        </svg>
        <svg v-else class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="text-[11px] font-[500] uppercase tracking-[0.04em]">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>
