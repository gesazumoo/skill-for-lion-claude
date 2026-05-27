<template>
  <div class="min-h-screen" style="background: #ffffff;">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; }

body {
  font-family: 'Inter', Arial, system-ui, sans-serif;
  font-weight: 400;
  color: #080808;
  background: #ffffff;
  -webkit-font-smoothing: antialiased;
  font-feature-settings: "ss01";
}

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

/* Webflow Level-2 layered shadow */
.shadow-wf {
  box-shadow:
    0 84px 24px rgba(0,0,0,0),
    0 54px 22px rgba(0,0,0,0.01),
    0 30px 18px rgba(0,0,0,0.04),
    0 13px 13px rgba(0,0,0,0.08),
    0 3px 7px rgba(0,0,0,0.09);
}
</style>
