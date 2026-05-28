<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'

const props = defineProps<{
  classItem: ClassItem
}>()

const emit = defineEmits<{
  apply: [classItem: ClassItem]
}>()

const { isDeadlineSoon, getDeadlineDaysLeft, formatPrice, formatDate } = useClasses()

const deadlineSoon = computed(() => isDeadlineSoon(props.classItem.deadline))
const daysLeft = computed(() => getDeadlineDaysLeft(props.classItem.deadline))

const spotsLeft = computed(() =>
  props.classItem.maxParticipants - props.classItem.currentParticipants
)

const categoryColors: Record<string, string> = {
  '운동': 'bg-blue-100 text-blue-700',
  '러닝': 'bg-green-100 text-green-700',
  '수영': 'bg-cyan-100 text-cyan-700',
  '스터디': 'bg-yellow-100 text-yellow-700',
  '취미': 'bg-pink-100 text-pink-700',
  '클래스': 'bg-purple-100 text-purple-700'
}

const categoryColor = computed(() =>
  categoryColors[props.classItem.category] ?? 'bg-gray-100 text-gray-700'
)
</script>

<template>
  <div class="w-56 flex-shrink-0 bg-white rounded-2xl overflow-hidden">
    <!-- Thumbnail -->
    <div class="relative h-36 bg-gray-100 overflow-hidden">
      <img
        :src="classItem.thumbnail"
        :alt="classItem.title"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <!-- Deadline warning -->
      <div
        v-if="deadlineSoon"
        class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-600/90 to-transparent px-3 py-2"
      >
        <p class="text-white text-xs font-bold">
          {{ daysLeft === 0 ? '오늘 마감!' : `D-${daysLeft} 마감 임박` }}
        </p>
      </div>
    </div>

    <!-- Info -->
    <div class="p-3">
      <!-- Category -->
      <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full', categoryColor]">
        {{ classItem.category }}
      </span>

      <!-- Title -->
      <h3 class="text-sm font-bold text-gray-900 mt-2 mb-2 line-clamp-2 leading-snug">
        {{ classItem.title }}
      </h3>

      <!-- Meta -->
      <div class="space-y-1 mb-3">
        <div class="flex items-center gap-1.5 text-xs text-gray-500">
          <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{{ formatDate(classItem.date) }}</span>
        </div>
        <div class="flex items-center gap-1.5 text-xs text-gray-500">
          <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{{ classItem.location }}</span>
        </div>
        <div class="flex items-center gap-1.5 text-xs text-gray-500">
          <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명
            <span v-if="spotsLeft <= 3" class="text-red-500 font-semibold">(잔여 {{ spotsLeft }}석)</span>
          </span>
        </div>
      </div>

      <!-- Price & Apply -->
      <div class="flex items-center justify-between">
        <p class="text-base font-bold text-gray-900">{{ formatPrice(classItem.price) }}</p>
        <button
          @click="emit('apply', classItem)"
          class="bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full active:bg-indigo-700 transition-colors"
        >
          신청하기
        </button>
      </div>
    </div>
  </div>
</template>
