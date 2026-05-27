<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'
import { useClasses } from '~/composables/useClasses'

const props = defineProps<{
  classItem: ClassItem
}>()

const emit = defineEmits<{
  select: [item: ClassItem]
}>()

const { isDeadlineSoon, formatPrice, formatDate } = useClasses()
const deadlineSoon = computed(() => isDeadlineSoon(props.classItem.deadline))
</script>

<template>
  <!-- Nike product card: 0 radius, full-bleed image on soft-cloud, hairline border -->
  <div
    class="bg-white overflow-hidden cursor-pointer active:opacity-70 transition-opacity border-b border-[#e5e5e5]"
    @click="emit('select', classItem)"
  >
    <div class="relative bg-[#f5f5f5] w-full h-48">
      <img :src="classItem.thumbnail" :alt="classItem.title" class="w-full h-full object-cover" />
      <span
        v-if="deadlineSoon"
        class="absolute top-3 left-3 text-[#d30005] text-[12px] font-[500] uppercase"
      >마감임박</span>
    </div>
    <div class="p-4">
      <p class="text-[12px] font-[500] text-[#707072] uppercase tracking-[0.04em] mb-1">{{ classItem.category }}</p>
      <h3 class="text-[16px] font-[500] text-[#111111] leading-[1.5] line-clamp-2">{{ classItem.title }}</h3>
      <div class="flex items-center gap-2 mt-2 text-[14px] font-[500] text-[#707072]">
        <span>{{ formatDate(classItem.date) }}</span>
        <span>·</span>
        <span>{{ classItem.location }}</span>
      </div>
      <p class="text-[14px] font-[500] text-[#707072] mt-0.5">{{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명 참가</p>
      <div class="flex items-center justify-between mt-4">
        <span class="text-[16px] font-[500] text-[#111111]">{{ formatPrice(classItem.price) }}</span>
        <button
          class="bg-[#111111] text-white text-[14px] font-[500] px-5 h-10 rounded-[30px] active:opacity-60 transition-opacity"
          @click.stop="emit('select', classItem)"
        >
          신청하기
        </button>
      </div>
    </div>
  </div>
</template>
