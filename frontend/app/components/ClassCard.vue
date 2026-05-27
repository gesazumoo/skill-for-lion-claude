<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'
import { useClasses } from '~/composables/useClasses'

const props = defineProps<{
  classItem: ClassItem
  variant?: 'list' | 'scroll'
}>()

const emit = defineEmits<{ select: [item: ClassItem] }>()

const { isDeadlineSoon, formatPrice, formatDate } = useClasses()
const deadlineSoon = computed(() => isDeadlineSoon(props.classItem.deadline))
</script>

<template>
  <!-- Scroll variant: square product card, 0 radius -->
  <div
    v-if="variant === 'scroll'"
    class="bg-white w-44 flex-shrink-0 cursor-pointer active:opacity-70 transition-opacity"
    @click="emit('select', classItem)"
  >
    <div class="relative bg-[#f5f5f5] w-44 h-44">
      <img :src="classItem.thumbnail" :alt="classItem.title" class="w-full h-full object-cover" />
      <span
        v-if="deadlineSoon"
        class="absolute top-2 left-2 text-[#d30005] text-[11px] font-[500] uppercase leading-none"
      >마감임박</span>
    </div>
    <div class="pt-2 pb-4">
      <p class="text-[12px] font-[500] text-[#707072] uppercase tracking-[0.04em] mb-1">{{ classItem.category }}</p>
      <p class="text-[16px] font-[500] text-[#111111] leading-[1.5] line-clamp-2">{{ classItem.title }}</p>
      <p class="text-[14px] font-[500] text-[#707072] mt-0.5">{{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명</p>
      <p class="text-[16px] font-[500] text-[#111111] mt-1">{{ formatPrice(classItem.price) }}</p>
    </div>
  </div>

  <!-- List variant: horizontal row, 0 radius, hairline bottom border -->
  <div
    v-else
    class="bg-white flex overflow-hidden cursor-pointer active:opacity-70 transition-opacity border-b border-[#e5e5e5]"
    @click="emit('select', classItem)"
  >
    <div class="relative bg-[#f5f5f5] w-28 h-28 flex-shrink-0">
      <img :src="classItem.thumbnail" :alt="classItem.title" class="w-full h-full object-cover" />
      <span
        v-if="deadlineSoon"
        class="absolute top-2 left-2 text-[#d30005] text-[10px] font-[500] uppercase leading-none"
      >마감임박</span>
    </div>
    <div class="flex-1 p-3 flex flex-col justify-between min-w-0">
      <div>
        <p class="text-[12px] font-[500] text-[#707072] uppercase tracking-[0.04em] mb-0.5">{{ classItem.category }}</p>
        <h3 class="text-[16px] font-[500] text-[#111111] leading-[1.5] line-clamp-2">{{ classItem.title }}</h3>
        <p class="text-[14px] font-[500] text-[#707072] mt-1">{{ classItem.location }} · {{ formatDate(classItem.date) }}</p>
        <p class="text-[14px] font-[500] text-[#707072]">{{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명</p>
      </div>
      <div class="flex items-center justify-between mt-2">
        <span class="text-[16px] font-[500] text-[#111111]">{{ formatPrice(classItem.price) }}</span>
        <button
          @click.stop="emit('select', classItem)"
          class="bg-[#111111] text-white text-[14px] font-[500] px-5 h-10 rounded-[30px] active:opacity-60 transition-opacity"
        >
          신청하기
        </button>
      </div>
    </div>
  </div>
</template>
