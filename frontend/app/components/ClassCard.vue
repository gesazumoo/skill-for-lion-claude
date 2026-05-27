<script setup lang="ts">
import type { ClassItem } from '~/data/classes'

const props = defineProps<{ item: ClassItem }>()

const spotsLeft = computed(() => props.item.maxParticipants - props.item.currentParticipants)
const isFull = computed(() => spotsLeft.value === 0)

// Webflow 5-stop chromatic accent palette mapped to category
const accentMap: Record<string, { bg: string; text: string }> = {
  러닝:  { bg: '#ff6b00', text: '#ffffff' },
  수영:  { bg: '#3b89ff', text: '#ffffff' },
  운동:  { bg: '#00d722', text: '#080808' },
  스터디: { bg: '#7a3dff', text: '#ffffff' },
  취미:  { bg: '#ed52cb', text: '#ffffff' },
  클래스: { bg: '#ffae13', text: '#080808' },
}
const accent = computed(() => accentMap[props.item.category] ?? { bg: '#d8d8d8', text: '#080808' })
</script>

<template>
  <!-- Level-2 layered shadow on each card -->
  <div
    class="shadow-wf bg-white overflow-hidden flex flex-col"
    style="border-radius: 8px; border: 1px solid #d8d8d8;"
  >
    <!-- Photo -->
    <div class="relative" style="background: #f4f4f4;">
      <img :src="item.thumbnail" :alt="item.title" class="w-full object-cover" style="height: 188px; border-radius: 8px 8px 0 0;" />
      <!-- Chromatic category badge — 4px radius, accent fill -->
      <span
        class="absolute top-3 left-3"
        :style="`
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 4px;
          background: ${accent.bg};
          color: ${accent.text};
        `"
      >
        {{ item.category }}
      </span>
    </div>

    <!-- Card body -->
    <div class="flex flex-col flex-1" style="padding: 20px;">
      <h3 class="mb-3" style="font-size: 18px; font-weight: 600; line-height: 1.3; letter-spacing: -0.2px; color: #080808;">
        {{ item.title }}
      </h3>

      <!-- Meta rows -->
      <div class="flex flex-col mb-4" style="gap: 6px;">
        <div class="flex items-center gap-2" style="font-size: 14px; font-weight: 400; color: #5a5a5a;">
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{{ item.date }}</span>
        </div>
        <div class="flex items-center gap-2" style="font-size: 14px; font-weight: 400; color: #5a5a5a;">
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="truncate">{{ item.location }}</span>
        </div>
        <div class="flex items-center gap-2" style="font-size: 14px; font-weight: 400; color: #5a5a5a;">
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{{ item.currentParticipants }}/{{ item.maxParticipants }}명</span>
          <span v-if="!isFull" style="color: #080808; font-weight: 500;">· 잔여 {{ spotsLeft }}자리</span>
          <span v-else style="color: #ee1d36; font-weight: 500;">· 마감</span>
        </div>
      </div>

      <!-- Price + CTA -->
      <div class="mt-auto flex items-center justify-between" style="padding-top: 16px; border-top: 1px solid #d8d8d8;">
        <div>
          <p style="font-size: 11px; font-weight: 500; letter-spacing: 0.6px; text-transform: uppercase; color: #898989; margin-bottom: 2px;">가격</p>
          <span style="font-size: 20px; font-weight: 600; letter-spacing: -0.2px; color: #080808;">
            {{ item.price.toLocaleString() }}원
          </span>
        </div>
        <button
          :disabled="isFull"
          style="
            font-size: 16px;
            font-weight: 500;
            letter-spacing: -0.16px;
            padding: 12px 20px;
            border-radius: 4px;
            display: inline-flex;
            align-items: center;
            font-family: inherit;
          "
          :style="isFull
            ? 'background: #f4f4f4; color: #ababab; cursor: not-allowed;'
            : 'background: #080808; color: #ffffff;'"
        >
          {{ isFull ? '마감' : '신청하기' }}
        </button>
      </div>
    </div>
  </div>
</template>
