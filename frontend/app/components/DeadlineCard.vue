<script setup lang="ts">
import type { ClassItem } from '~/data/classes'

defineProps<{ item: ClassItem }>()

const categoryColors: Record<string, string> = {
  러닝: 'bg-orange-100 text-orange-600',
  수영: 'bg-blue-100 text-blue-600',
  운동: 'bg-green-100 text-green-600',
  스터디: 'bg-purple-100 text-purple-600',
  취미: 'bg-pink-100 text-pink-600',
  클래스: 'bg-yellow-100 text-yellow-600',
}
</script>

<template>
  <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 w-60 shrink-0 flex flex-col">
    <div class="relative">
      <img :src="item.thumbnail" :alt="item.title" class="w-full h-36 object-cover" />
      <span class="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full bg-red-500 text-white">
        {{ item.deadline }}
      </span>
      <span
        class="absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full"
        :class="categoryColors[item.category] ?? 'bg-gray-100 text-gray-600'"
      >
        {{ item.category }}
      </span>
    </div>
    <div class="p-3 flex flex-col flex-1">
      <h3 class="font-bold text-gray-900 text-sm leading-snug mb-2">{{ item.title }}</h3>
      <p class="text-xs text-gray-400 mb-1">{{ item.date }}</p>
      <p class="text-xs text-gray-400 truncate mb-3">{{ item.location }}</p>
      <div class="mt-auto flex items-center justify-between">
        <span class="text-sm font-bold text-gray-900">{{ item.price.toLocaleString() }}원</span>
        <button class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-gray-900 text-white hover:bg-gray-700 transition-colors">
          신청
        </button>
      </div>
    </div>
  </div>
</template>
