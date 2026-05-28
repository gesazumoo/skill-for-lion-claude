<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'

const props = defineProps<{
  classItem: ClassItem
}>()

const { isDeadlineSoon, getDeadlineDaysLeft, formatPrice } = useClasses()

const deadlineSoon = computed(() => isDeadlineSoon(props.classItem.deadline))
const daysLeft = computed(() => getDeadlineDaysLeft(props.classItem.deadline))
</script>

<template>
  <!-- 가로형 클래스 카드 — Nike product card: flat, no radius, no shadow -->
  <div class="w-44 flex-shrink-0 bg-canvas">

    <!-- Image: full-bleed on soft-cloud, zero radius, zero shadow -->
    <div class="relative h-44 bg-soft-cloud overflow-hidden">
      <img
        :src="classItem.thumbnail"
        :alt="classItem.title"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <!-- Category badge: ink pill, top-left -->
      <span class="absolute top-2 left-2 bg-ink text-canvas text-[10px] font-medium tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-[30px]">
        {{ classItem.category }}
      </span>
    </div>

    <!-- Metadata: directly below image, 8px gap between rows (spacing.sm) -->
    <div class="pt-2">
      <!-- Deadline: sale color text only, no badge background (Nike badge-sale-text) -->
      <p v-if="deadlineSoon" class="text-[11px] font-medium text-sale leading-none mb-1">
        {{ daysLeft === 0 ? '오늘 마감' : `마감 D-${daysLeft}` }}
      </p>
      <!-- Title: body-strong 13px/500 -->
      <p class="text-[13px] font-medium text-ink leading-snug line-clamp-2 mb-1">
        {{ classItem.title }}
      </p>
      <!-- Participants: caption-md mute -->
      <p class="text-[12px] text-mute mb-1">
        {{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명 참가
      </p>
      <!-- Price: body-strong ink -->
      <p class="text-[13px] font-medium text-ink">
        {{ formatPrice(classItem.price) }}
      </p>
    </div>
  </div>
</template>
