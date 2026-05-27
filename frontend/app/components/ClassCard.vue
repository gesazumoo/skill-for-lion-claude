<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'
import { useClasses } from '~/composables/useClasses'

const props = defineProps<{
  classItem: ClassItem
  variant?: 'list' | 'scroll'
}>()

const { isDeadlineSoon, formatPrice, formatDate } = useClasses()

const deadlineSoon = computed(() => isDeadlineSoon(props.classItem.deadline))

function handleApply() {
  alert(`"${props.classItem.title}" 클래스를 신청했습니다!`)
}
</script>

<template>
  <!-- 가로 스크롤용 카드 (scroll variant) -->
  <div
    v-if="variant === 'scroll'"
    class="bg-white rounded-[18px] border border-[#e0e0e0] overflow-hidden w-44 flex-shrink-0"
  >
    <div class="relative">
      <img
        :src="classItem.thumbnail"
        :alt="classItem.title"
        class="w-full h-32 object-cover bg-[#f5f5f7]"
      />
      <span
        v-if="deadlineSoon"
        class="absolute top-2.5 left-2.5 bg-[#ff3b30] text-white text-[11px] font-semibold tracking-[-0.12px] px-2.5 py-0.5 rounded-[9999px] leading-none"
      >
        마감 임박
      </span>
    </div>
    <div class="p-4">
      <p class="text-[12px] font-normal text-[#7a7a7a] tracking-[-0.12px] mb-1 uppercase">
        {{ classItem.category }}
      </p>
      <p class="text-[15px] font-semibold text-[#1d1d1f] leading-[1.24] tracking-[-0.374px] line-clamp-2">
        {{ classItem.title }}
      </p>
      <p class="text-[15px] font-normal text-[#0066cc] tracking-[-0.374px] mt-2">
        {{ formatPrice(classItem.price) }}
      </p>
      <p class="text-[12px] font-normal text-[#7a7a7a] tracking-[-0.12px] mt-1">
        {{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명 참가
      </p>
    </div>
  </div>

  <!-- 리스트형 카드 (list variant) — Apple store-utility-card 스타일 -->
  <div
    v-else
    class="bg-white rounded-[18px] border border-[#e0e0e0] overflow-hidden flex"
  >
    <!-- 썸네일 -->
    <div class="relative w-[120px] flex-shrink-0 bg-[#f5f5f7]">
      <img
        :src="classItem.thumbnail"
        :alt="classItem.title"
        class="w-full h-full object-cover"
      />
      <span
        v-if="deadlineSoon"
        class="absolute top-2.5 left-2 bg-[#ff3b30] text-white text-[10px] font-semibold tracking-[-0.12px] px-2 py-[3px] rounded-[9999px] leading-none"
      >
        마감임박
      </span>
    </div>

    <!-- 콘텐츠 -->
    <div class="flex-1 p-4 flex flex-col justify-between min-w-0">
      <div>
        <p class="text-[12px] font-normal text-[#7a7a7a] tracking-[-0.12px] uppercase mb-1">
          {{ classItem.category }}
        </p>
        <h3 class="text-[17px] font-semibold text-[#1d1d1f] leading-[1.24] tracking-[-0.374px] line-clamp-2">
          {{ classItem.title }}
        </h3>
        <p class="text-[14px] font-normal text-[#7a7a7a] leading-[1.43] tracking-[-0.224px] mt-1.5">
          {{ classItem.location }} · {{ formatDate(classItem.date) }}
        </p>
        <p class="text-[14px] font-normal text-[#7a7a7a] tracking-[-0.224px]">
          {{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명 참가
        </p>
      </div>

      <div class="flex items-center justify-between mt-3">
        <span class="text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.374px]">
          {{ formatPrice(classItem.price) }}
        </span>
        <button
          @click="handleApply"
          class="bg-[#0066cc] text-white text-[14px] font-normal tracking-[-0.224px] px-[15px] py-[8px] rounded-[9999px] active:scale-95 transition-transform duration-100"
        >
          신청하기
        </button>
      </div>
    </div>
  </div>
</template>
