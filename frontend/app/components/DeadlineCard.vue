<script setup lang="ts">
import type { ClassItem } from '~/data/classes'

defineProps<{ item: ClassItem }>()

const accentMap: Record<string, { bg: string; text: string }> = {
  러닝:  { bg: '#ff6b00', text: '#ffffff' },
  수영:  { bg: '#3b89ff', text: '#ffffff' },
  운동:  { bg: '#00d722', text: '#080808' },
  스터디: { bg: '#7a3dff', text: '#ffffff' },
  취미:  { bg: '#ed52cb', text: '#ffffff' },
  클래스: { bg: '#ffae13', text: '#080808' },
}
</script>

<template>
  <div
    class="shadow-wf bg-white overflow-hidden flex flex-col shrink-0"
    style="width: 216px; border-radius: 8px; border: 1px solid #d8d8d8;"
  >
    <!-- Photo -->
    <div class="relative" style="background: #f4f4f4;">
      <img :src="item.thumbnail" :alt="item.title" class="w-full object-cover" style="height: 124px; border-radius: 8px 8px 0 0;" />

      <!-- Deadline badge — error red, 4px radius, top-right -->
      <span
        class="absolute top-2 right-2"
        style="
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.3px;
          padding: 3px 8px;
          border-radius: 4px;
          background: #ee1d36;
          color: #ffffff;
        "
      >
        {{ item.deadline }}
      </span>

      <!-- Category badge — chromatic accent, bottom-left -->
      <span
        class="absolute bottom-2 left-2"
        :style="`
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.3px;
          padding: 3px 8px;
          border-radius: 4px;
          background: ${accentMap[item.category]?.bg ?? '#d8d8d8'};
          color: ${accentMap[item.category]?.text ?? '#080808'};
        `"
      >
        {{ item.category }}
      </span>
    </div>

    <!-- Meta -->
    <div class="flex flex-col flex-1" style="padding: 14px;">
      <h3 class="mb-1" style="font-size: 15px; font-weight: 600; line-height: 1.3; letter-spacing: -0.15px; color: #080808;">
        {{ item.title }}
      </h3>
      <p class="mb-0.5" style="font-size: 12px; font-weight: 400; color: #5a5a5a;">{{ item.date }}</p>
      <p class="truncate mb-4" style="font-size: 12px; font-weight: 400; color: #5a5a5a;">{{ item.location }}</p>

      <div class="mt-auto flex items-center justify-between" style="padding-top: 12px; border-top: 1px solid #d8d8d8;">
        <span style="font-size: 16px; font-weight: 600; letter-spacing: -0.16px; color: #080808;">
          {{ item.price.toLocaleString() }}원
        </span>
        <button
          style="
            font-size: 13px;
            font-weight: 500;
            padding: 8px 14px;
            border-radius: 4px;
            background: #080808;
            color: #ffffff;
            display: inline-flex;
            align-items: center;
            font-family: inherit;
          "
        >
          신청
        </button>
      </div>
    </div>
  </div>
</template>
