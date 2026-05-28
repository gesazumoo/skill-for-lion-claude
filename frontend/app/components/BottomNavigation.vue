<script setup lang="ts">
const props = defineProps<{
  activeMenu: 'home' | 'search' | 'register' | 'profile'
}>()

const router = useRouter()
</script>

<template>
  <nav style="
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid #f1f5f9;
    z-index: 50;
    box-shadow: 0 -4px 16px rgba(0,0,0,0.05);
  ">
    <div style="display: flex; align-items: stretch; max-width: 600px; margin: 0 auto;">
      <button
        v-for="item in [
          { key: 'home', label: '홈', path: '/' },
          { key: 'search', label: '검색', path: '/search' },
          { key: 'register', label: '등록', path: '/register' },
          { key: 'profile', label: '내정보', path: '/profile' },
        ]"
        :key="item.key"
        class="nav-btn"
        :style="{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 0 12px',
          gap: '4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: activeMenu === item.key ? '#0ea5e9' : '#94a3b8',
          minHeight: '52px',
        }"
        @click="router.push(item.path)"
      >
        <svg v-if="item.key === 'home'" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <svg v-else-if="item.key === 'search'" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <svg v-else-if="item.key === 'register'" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <svg v-else width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span style="font-size: 10px; font-weight: 600;">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.nav-btn:active { opacity: 0.5; transition: opacity 0.1s; }
</style>
