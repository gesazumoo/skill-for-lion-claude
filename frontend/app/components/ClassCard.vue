<script setup lang="ts">
import type { ClassItem } from '~/data/classes'

const props = defineProps<{ item: ClassItem }>()

const categoryColors: Record<string, string> = {
  러닝: 'bg-orange-100 text-orange-600',
  수영: 'bg-blue-100 text-blue-600',
  운동: 'bg-green-100 text-green-600',
  스터디: 'bg-purple-100 text-purple-600',
  취미: 'bg-pink-100 text-pink-600',
  클래스: 'bg-yellow-100 text-yellow-600',
}

const categoryColor = computed(() => categoryColors[props.item.category] ?? 'bg-gray-100 text-gray-600')
const spotsLeft = computed(() => props.item.maxParticipants - props.item.currentParticipants)
const isFull = computed(() => spotsLeft.value === 0)
</script>

<template>
  <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
    <div class="relative">
      <img :src="item.thumbnail" :alt="item.title" class="w-full h-44 object-cover" />
      <span
        class="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full"
        :class="categoryColor"
      >
        {{ item.category }}
      </span>
    </div>

    <div class="p-4 flex flex-col flex-1">
      <h3 class="font-bold text-gray-900 text-base leading-snug mb-3">{{ item.title }}</h3>

      <div class="space-y-1.5 text-sm text-gray-500 mb-4">
        <div class="flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{{ item.date }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="truncate">{{ item.location }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{{ item.currentParticipants }}/{{ item.maxParticipants }}명</span>
          <span v-if="!isFull" class="text-emerald-500 font-medium">· 잔여 {{ spotsLeft }}자리</span>
          <span v-else class="text-red-400 font-medium">· 마감</span>
        </div>
      </div>

      <div class="mt-auto flex items-center justify-between">
        <span class="text-lg font-bold text-gray-900">{{ item.price.toLocaleString() }}원</span>
        <button
          :disabled="isFull"
          class="text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          :class="isFull
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-900 text-white hover:bg-gray-700'"
        >
          {{ isFull ? '마감' : '신청하기' }}
        </button>
      </div>
    </div>
  </div>
</template>
