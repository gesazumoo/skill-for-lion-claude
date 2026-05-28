<script setup lang="ts">
const { visible, message } = useToast()
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-200 ease-out"
    enter-from-class="translate-y-3 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition-all duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-3 opacity-0"
  >
    <div
      v-if="visible"
      class="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] bg-ink text-canvas text-sm font-medium px-6 py-3 rounded-[30px] whitespace-nowrap shadow-lg"
    >
      {{ message }}
    </div>
  </Transition>
</template>
