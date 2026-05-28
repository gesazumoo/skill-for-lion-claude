<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'
import { isDeadlineSoon, formatPrice, formatDate } from '~/composables/useClasses'

const props = defineProps<{
  classItem: ClassItem | null
}>()

const emit = defineEmits<{
  close: []
}>()

const spotsLeft = computed(() =>
  props.classItem ? props.classItem.maxParticipants - props.classItem.currentParticipants : 0
)
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="classItem" class="fixed inset-0 z-50 flex flex-col justify-end">
        <!-- 오버레이 -->
        <div class="absolute inset-0 bg-black/50" @click="emit('close')" />

        <!-- 바텀 시트 -->
        <div class="relative bg-white w-full max-h-[90vh] overflow-y-auto">
          <!-- 드래그 핸들 -->
          <div class="sticky top-0 bg-white pt-3 pb-2 flex justify-center border-b border-[#e5e5e5] z-10">
            <div class="w-10 h-1 bg-[#cacacb] rounded-full" />
          </div>

          <!-- 닫기 버튼 -->
          <button
            class="absolute top-3 right-4 w-8 h-8 flex items-center justify-center text-[#707072] z-10"
            @click="emit('close')"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- 썸네일 -->
          <div class="aspect-[16/9] bg-[#f5f5f5] overflow-hidden">
            <img
              :src="classItem.thumbnail"
              :alt="classItem.title"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- 콘텐츠 -->
          <div class="px-5 pt-5 pb-8">
            <!-- 마감임박 뱃지 -->
            <span
              v-if="isDeadlineSoon(classItem.deadline)"
              class="inline-block bg-[#d30005] text-white text-[11px] font-medium px-2.5 py-1 rounded-[30px] mb-3"
            >마감임박</span>

            <!-- 카테고리 -->
            <p class="text-[13px] text-[#707072] font-medium">{{ classItem.category }}</p>

            <!-- 제목 -->
            <h2 class="text-[20px] font-medium text-[#111111] leading-snug mt-1 mb-4">
              {{ classItem.title }}
            </h2>

            <!-- 메타 정보 -->
            <div class="space-y-3 border-t border-[#e5e5e5] pt-4 mb-4">
              <div class="flex items-center gap-3">
                <svg class="w-4 h-4 text-[#707072] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-[14px] text-[#111111]">{{ formatDate(classItem.date) }}</span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-4 h-4 text-[#707072] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-[14px] text-[#111111]">{{ classItem.location }}</span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-4 h-4 text-[#707072] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-[14px] text-[#111111]">
                  {{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명 참가
                  <span class="text-[#707072]">(잔여 {{ spotsLeft }}석)</span>
                </span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-4 h-4 text-[#707072] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-[14px]">
                  마감 <span :class="isDeadlineSoon(classItem.deadline) ? 'text-[#d30005] font-medium' : 'text-[#111111]'">{{ formatDate(classItem.deadline) }}</span>
                </span>
              </div>
            </div>

            <!-- 설명 -->
            <div class="border-t border-[#e5e5e5] pt-4 mb-6">
              <p class="text-[14px] text-[#111111] leading-relaxed">{{ classItem.description }}</p>
            </div>

            <!-- 가격 + 신청하기 -->
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-[12px] text-[#707072]">참가비</p>
                <p class="text-[22px] font-medium text-[#111111]">{{ formatPrice(classItem.price) }}</p>
              </div>
              <button
                class="flex-1 py-3.5 bg-[#111111] text-white text-[15px] font-medium rounded-[30px]"
                @click="alert(`'${classItem.title}' 클래스에 신청되었습니다.`)"
              >
                신청하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.25s ease;
}
.sheet-enter-active .relative,
.sheet-leave-active .relative {
  transition: transform 0.3s ease;
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}
.sheet-enter-from .relative {
  transform: translateY(100%);
}
.sheet-leave-to .relative {
  transform: translateY(100%);
}
</style>
