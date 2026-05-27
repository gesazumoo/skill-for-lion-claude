<script setup lang="ts">
const route = useRoute()

const activeMenu = computed(() => {
  if (route.path === '/') return 'home'
  if (route.path.startsWith('/search')) return 'search'
  if (route.path.startsWith('/register')) return 'register'
  return 'profile'
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <BottomNavigation :active-menu="activeMenu" />
  </div>
</template>
