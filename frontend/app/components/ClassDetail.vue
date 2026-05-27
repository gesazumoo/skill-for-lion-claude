<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'
import { useClasses } from '~/composables/useClasses'

const props = defineProps<{
  classItem: ClassItem
}>()

const emit = defineEmits<{
  close: []
}>()

const { isDeadlineSoon, formatPrice, formatDate } = useClasses()
const deadlineSoon = computed(() => isDeadlineSoon(props.classItem.deadline))

const participantRate = computed(() =>
  Math.round((props.classItem.currentParticipants / props.classItem.maxParticipants) * 100)
)

function handleApply() {
  alert(`"${props.classItem.title}" 클래스를 신청했습니다!`)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <!-- 딤 오버레이 -->
    <div
      class="fixed inset-0 z-50 flex items-end justify-center"
      @click.self="emit('close')"
    >
      <div class="absolute inset-0 bg-black/50" @click="emit('close')" />

      <!-- 바텀 시트 — Apple sheet 스타일 -->
      <div class="relative w-full max-w-lg bg-white rounded-t-[28px] max-h-[92vh] flex flex-col overflow-hidden">

        <!-- 드래그 핸들 -->
        <div class="flex-shrink-0 flex justify-center pt-3 pb-1">
          <div class="w-10 h-1 bg-[#e0e0e0] rounded-full" />
        </div>

        <!-- 닫기 버튼 -->
        <button
          class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#f5f5f7] rounded-full text-[#7a7a7a] text-lg leading-none z-10 active:opacity-70"
          @click="emit('close')"
        >
          ×
        </button>

        <!-- 스크롤 영역 -->
        <div class="overflow-y-auto flex-1">

          <!-- 썸네일 이미지 -->
          <div class="relative">
            <img
              :src="classItem.thumbnail"
              :alt="classItem.title"
              class="w-full h-56 object-cover bg-[#f5f5f7]"
            />
            <span
              v-if="deadlineSoon"
              class="absolute top-3 left-3 bg-[#ff3b30] text-white text-[11px] font-semibold tracking-[-0.12px] px-2.5 py-1 rounded-[9999px]"
            >
              마감 임박
            </span>
          </div>

          <!-- 상세 정보 -->
          <div class="px-6 pt-6 pb-4">

            <!-- 카테고리 -->
            <p class="text-[12px] font-normal text-[#7a7a7a] uppercase tracking-[-0.12px] mb-2">
              {{ classItem.category }}
            </p>

            <!-- 제목 — lead (28px / 400 / 1.14) -->
            <h2 class="text-[28px] font-semibold text-[#1d1d1f] leading-[1.14] tracking-[-0.374px]">
              {{ classItem.title }}
            </h2>

            <!-- 가격 — display + Action Blue -->
            <p class="text-[34px] font-semibold text-[#0066cc] tracking-[-0.374px] mt-3">
              {{ formatPrice(classItem.price) }}
            </p>

            <!-- 구분선 -->
            <div class="h-px bg-[#f0f0f0] my-5" />

            <!-- 메타 정보 -->
            <dl class="space-y-3">
              <div class="flex items-start gap-3">
                <dt class="text-[14px] font-normal text-[#7a7a7a] tracking-[-0.224px] w-14 flex-shrink-0">날짜</dt>
                <dd class="text-[17px] font-normal text-[#1d1d1f] tracking-[-0.374px]">{{ formatDate(classItem.date) }}</dd>
              </div>
              <div class="flex items-start gap-3">
                <dt class="text-[14px] font-normal text-[#7a7a7a] tracking-[-0.224px] w-14 flex-shrink-0">장소</dt>
                <dd class="text-[17px] font-normal text-[#1d1d1f] tracking-[-0.374px]">{{ classItem.location }}</dd>
              </div>
              <div class="flex items-start gap-3">
                <dt class="text-[14px] font-normal text-[#7a7a7a] tracking-[-0.224px] w-14 flex-shrink-0">마감일</dt>
                <dd class="text-[17px] font-normal tracking-[-0.374px]" :class="deadlineSoon ? 'text-[#ff3b30]' : 'text-[#1d1d1f]'">
                  {{ formatDate(classItem.deadline) }}
                  <span v-if="deadlineSoon" class="text-[12px] ml-1">· 마감 임박</span>
                </dd>
              </div>
            </dl>

            <!-- 구분선 -->
            <div class="h-px bg-[#f0f0f0] my-5" />

            <!-- 참가 인원 -->
            <div>
              <div class="flex justify-between items-baseline mb-2">
                <p class="text-[14px] font-semibold text-[#1d1d1f] tracking-[-0.224px]">참가 현황</p>
                <p class="text-[14px] font-normal text-[#7a7a7a] tracking-[-0.224px]">
                  {{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명
                </p>
              </div>
              <!-- 참가율 바 -->
              <div class="h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                <div
                  class="h-full bg-[#0066cc] rounded-full transition-all"
                  :style="{ width: `${participantRate}%` }"
                />
              </div>
              <p class="text-[12px] font-normal text-[#7a7a7a] tracking-[-0.12px] mt-1.5">
                잔여 {{ classItem.maxParticipants - classItem.currentParticipants }}자리
              </p>
            </div>

            <!-- 구분선 -->
            <div class="h-px bg-[#f0f0f0] my-5" />

            <!-- 상세 설명 -->
            <div>
              <p class="text-[14px] font-semibold text-[#1d1d1f] tracking-[-0.224px] mb-2">클래스 소개</p>
              <p class="text-[17px] font-normal text-[#1d1d1f] leading-[1.47] tracking-[-0.374px]">
                {{ classItem.description }}
              </p>
            </div>

            <div class="h-6" />
          </div>
        </div>

        <!-- 하단 고정: 신청하기 버튼 -->
        <div class="flex-shrink-0 bg-white border-t border-[#f0f0f0] px-6 py-4">
          <button
            class="w-full bg-[#0066cc] text-white text-[17px] font-normal tracking-[-0.374px] py-[14px] rounded-[9999px] active:scale-95 transition-transform duration-100"
            @click="handleApply"
          >
            신청하기
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>
