<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'

const props = defineProps<{
  classItem: ClassItem
}>()

const { isDeadlineSoon, formatPrice } = useClasses()

const deadlineSoon = computed(() => isDeadlineSoon(props.classItem.deadline))

const participantRatio = computed(() => {
  return Math.round((props.classItem.currentParticipants / props.classItem.maxParticipants) * 100)
})
</script>

<template>
  <div class="w-40 flex-shrink-0 bg-white rounded-2xl overflow-hidden cursor-pointer active:scale-95 transition-transform">
    <!-- Thumbnail -->
    <div class="relative h-28 bg-gray-100 overflow-hidden">
      <img
        :src="classItem.thumbnail"
        :alt="classItem.title"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <!-- Deadline badge -->
      <span
        v-if="deadlineSoon"
        class="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full"
      >
        마감 임박
      </span>
      <!-- Category badge -->
      <span class="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
        {{ classItem.category }}
      </span>
    </div>

    <!-- Info -->
    <div class="p-3">
      <h3 class="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-2">
        {{ classItem.title }}
      </h3>
      <!-- Participants -->
      <div class="mb-1.5">
        <div class="flex justify-between items-center mb-1">
          <span class="text-xs text-gray-400">참가 인원</span>
          <span class="text-xs text-gray-600 font-medium">
            {{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명
          </span>
        </div>
        <div class="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-indigo-500 rounded-full transition-all"
            :style="{ width: `${participantRatio}%` }"
          />
        </div>
      </div>
      <!-- Price -->
      <p class="text-sm font-bold text-indigo-600">{{ formatPrice(classItem.price) }}</p>
    </div>
  </div>
</template>
