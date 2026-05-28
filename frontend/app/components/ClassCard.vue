<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'
import { isDeadlineSoon, formatPrice, formatDate } from '~/composables/useClasses'

const props = defineProps<{
  classItem: ClassItem
  variant?: 'scroll' | 'list'
}>()

const emit = defineEmits<{
  select: [classItem: ClassItem]
}>()
</script>

<template>
  <!-- scroll variant: 가로 스크롤용 세로 카드 -->
  <div
    v-if="variant === 'scroll'"
    class="flex-shrink-0 w-[200px] cursor-pointer"
    @click="emit('select', classItem)"
  >
    <div class="relative bg-[#f5f5f5] aspect-square overflow-hidden">
      <img
        :src="classItem.thumbnail"
        :alt="classItem.title"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <span
        v-if="isDeadlineSoon(classItem.deadline)"
        class="absolute top-2 left-2 bg-[#d30005] text-white text-[11px] font-medium px-2 py-1 rounded-[30px]"
      >마감임박</span>
    </div>
    <div class="pt-2">
      <p class="text-[13px] text-[#707072] font-medium">{{ classItem.category }}</p>
      <p class="text-[14px] font-medium text-[#111111] leading-snug mt-0.5 line-clamp-2">{{ classItem.title }}</p>
      <p class="text-[14px] font-medium text-[#111111] mt-1">{{ formatPrice(classItem.price) }}</p>
      <p class="text-[12px] text-[#9e9ea0] mt-0.5">{{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명</p>
    </div>
  </div>

  <!-- list variant: 세로 리스트용 가로 카드 -->
  <div
    v-else
    class="flex gap-3 cursor-pointer py-3 border-b border-[#e5e5e5] last:border-0"
    @click="emit('select', classItem)"
  >
    <div class="relative flex-shrink-0 w-[100px] h-[100px] bg-[#f5f5f5] overflow-hidden">
      <img
        :src="classItem.thumbnail"
        :alt="classItem.title"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <span
        v-if="isDeadlineSoon(classItem.deadline)"
        class="absolute top-1 left-1 bg-[#d30005] text-white text-[10px] font-medium px-1.5 py-0.5 rounded-[30px]"
      >마감임박</span>
    </div>
    <div class="flex-1 min-w-0 py-1">
      <p class="text-[12px] text-[#707072] font-medium">{{ classItem.category }}</p>
      <p class="text-[15px] font-medium text-[#111111] leading-snug mt-0.5 line-clamp-2">{{ classItem.title }}</p>
      <p class="text-[12px] text-[#707072] mt-1">{{ formatDate(classItem.date) }} · {{ classItem.location }}</p>
      <div class="flex items-center justify-between mt-2">
        <p class="text-[14px] font-medium text-[#111111]">{{ formatPrice(classItem.price) }}</p>
        <p class="text-[12px] text-[#9e9ea0]">{{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명</p>
      </div>
    </div>
  </div>
</template>
