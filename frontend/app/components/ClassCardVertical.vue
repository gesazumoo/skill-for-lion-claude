<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'

const props = defineProps<{
  classItem: ClassItem
}>()

const emit = defineEmits<{
  apply: [classItem: ClassItem]
}>()

const { isDeadlineSoon, getDeadlineDaysLeft, formatPrice, formatDate } = useClasses()

const deadlineSoon = computed(() => isDeadlineSoon(props.classItem.deadline))
const daysLeft = computed(() => getDeadlineDaysLeft(props.classItem.deadline))
const spotsLeft = computed(() => props.classItem.maxParticipants - props.classItem.currentParticipants)
</script>

<template>
  <!-- 세로형 클래스 카드 — Nike product card: flat, no radius, no shadow -->
  <div class="w-56 flex-shrink-0 bg-canvas">

    <!-- Image: full-bleed on soft-cloud, zero radius -->
    <div class="relative h-56 bg-soft-cloud overflow-hidden">
      <img
        :src="classItem.thumbnail"
        :alt="classItem.title"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <!-- Deadline bar: sale red, top of image (only when urgent) -->
      <div v-if="deadlineSoon" class="absolute top-0 left-0 right-0 bg-sale px-3 py-1.5">
        <p class="text-canvas text-[11px] font-medium tracking-[0.1em] uppercase">
          {{ daysLeft === 0 ? '오늘 마감' : `D-${daysLeft} 마감 임박` }}
        </p>
      </div>
      <!-- On-image CTA: white pill bottom-left (Nike button-outline-on-image) -->
      <button
        @click="emit('apply', classItem)"
        class="absolute bottom-3 left-3 bg-canvas text-ink text-xs font-medium px-4 h-8 rounded-[30px] active:opacity-70 transition-opacity"
      >
        신청하기
      </button>
    </div>

    <!-- Metadata: directly below image, 8px gap between rows -->
    <div class="pt-2">
      <!-- Category: uppercase tracking label (caption-md mute) -->
      <p class="text-[10px] font-medium tracking-[0.18em] uppercase text-mute mb-1">
        {{ classItem.category }}
      </p>
      <!-- Title: body-strong 13px -->
      <p class="text-[13px] font-medium text-ink line-clamp-2 leading-snug mb-1.5">
        {{ classItem.title }}
      </p>
      <!-- Meta: caption-md mute -->
      <p class="text-[12px] text-mute mb-0.5">
        {{ formatDate(classItem.date) }} · {{ classItem.location }}
      </p>
      <p class="text-[12px] text-mute mb-2">
        {{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명
        <span v-if="spotsLeft <= 3" class="text-sale font-medium">· 잔여 {{ spotsLeft }}석</span>
      </p>
      <!-- Price: body-strong ink -->
      <p class="text-[13px] font-medium text-ink">
        {{ formatPrice(classItem.price) }}
      </p>
    </div>
  </div>
</template>
