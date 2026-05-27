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
  <!-- Apple store-utility-card 스타일, 세로형 — 카드 전체 클릭 시 상세보기 -->
  <div
    class="bg-white rounded-[18px] border border-[#e0e0e0] overflow-hidden cursor-pointer active:opacity-80 transition-opacity"
    @click="emit('select', classItem)"
  >
    <!-- 썸네일 이미지 -->
    <div class="relative">
      <img
        :src="classItem.thumbnail"
        :alt="classItem.title"
        class="w-full h-[180px] object-cover bg-[#f5f5f7]"
      />
      <span
        v-if="deadlineSoon"
        class="absolute top-3 left-3 bg-[#ff3b30] text-white text-[11px] font-semibold tracking-[-0.12px] px-2.5 py-1 rounded-[9999px] leading-none"
      >
        마감 임박
      </span>
    </div>

    <!-- 콘텐츠 -->
    <div class="p-4">
      <!-- 카테고리 -->
      <p class="text-[12px] font-normal text-[#7a7a7a] tracking-[-0.12px] uppercase mb-1.5">
        {{ classItem.category }}
      </p>

      <!-- 클래스 제목 -->
      <h3 class="text-[17px] font-semibold text-[#1d1d1f] leading-[1.24] tracking-[-0.374px] line-clamp-2">
        {{ classItem.title }}
      </h3>

      <!-- 날짜 · 지역 -->
      <div class="flex items-center gap-1 mt-2 text-[14px] font-normal text-[#7a7a7a] tracking-[-0.224px]">
        <span>{{ formatDate(classItem.date) }}</span>
        <span>·</span>
        <span>{{ classItem.location }}</span>
      </div>

      <!-- 참가 인원 -->
      <p class="text-[14px] font-normal text-[#7a7a7a] tracking-[-0.224px] mt-0.5">
        {{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명 참가
      </p>

      <!-- 가격 + 신청하기 버튼 -->
      <div class="flex items-center justify-between mt-4">
        <span class="text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.374px]">
          {{ formatPrice(classItem.price) }}
        </span>
        <button
          class="bg-[#0066cc] text-white text-[14px] font-normal tracking-[-0.224px] px-[15px] py-[8px] rounded-[9999px] active:scale-95 transition-transform duration-100"
          @click.stop="emit('select', classItem)"
        >
          신청하기
        </button>
      </div>
    </div>
  </div>
</template>
