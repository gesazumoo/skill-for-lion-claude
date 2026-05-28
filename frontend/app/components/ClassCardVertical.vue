<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'
import { isDeadlineSoon, formatPrice, formatDate } from '~/composables/useClasses'

const props = defineProps<{
  classItem: ClassItem
}>()

const emit = defineEmits<{
  select: [classItem: ClassItem]
}>()
</script>

<template>
  <div class="flex-shrink-0 w-[220px] cursor-pointer" @click="emit('select', classItem)">
    <div class="relative bg-[#f5f5f5] aspect-[4/5] overflow-hidden">
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
      <p class="text-[12px] text-[#707072] font-medium">{{ classItem.category }}</p>
      <p class="text-[14px] font-medium text-[#111111] leading-snug mt-0.5 line-clamp-2">{{ classItem.title }}</p>
      <p class="text-[12px] text-[#707072] mt-1">{{ formatDate(classItem.date) }} · {{ classItem.location }}</p>
      <div class="flex items-center justify-between mt-2">
        <p class="text-[14px] font-medium text-[#111111]">{{ formatPrice(classItem.price) }}</p>
        <p class="text-[11px] text-[#9e9ea0]">{{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명</p>
      </div>
      <button
        class="w-full mt-2 py-2 bg-[#111111] text-white text-[13px] font-medium rounded-[30px]"
        @click.stop="alert(`'${classItem.title}' 클래스에 신청하시겠습니까?`)"
      >신청하기</button>
    </div>
  </div>
</template>
