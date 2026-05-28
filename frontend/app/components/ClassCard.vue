<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'
import { isDeadlineSoon, formatPrice, formatDate } from '~/composables/useClasses'

const props = defineProps<{
  classItem: ClassItem
  variant?: 'scroll' | 'list'
}>()

const emit = defineEmits<{
  select: [classItem: ClassItem]
}>()
</script>

<template>
  <!-- scroll variant — Nike product-card: zero radius, zero shadow, full-bleed image on soft-cloud -->
  <div
    v-if="variant === 'scroll'"
    class="card-scroll"
    style="
      flex-shrink: 0;
      width: 200px;
      margin-right: 12px;
      background: #ffffff;
      cursor: pointer;
    "
    @click="emit('select', classItem)"
  >
    <!-- Image — full-bleed on #f5f5f5, no radius -->
    <div style="position: relative; background: #f5f5f5; aspect-ratio: 1/1; overflow: hidden;">
      <img
        :src="classItem.thumbnail"
        :alt="classItem.title"
        style="width: 100%; height: 100%; object-fit: cover;"
        loading="lazy"
      />
      <!-- badge-promo on sale = sale color, no background -->
      <span
        v-if="isDeadlineSoon(classItem.deadline)"
        style="
          position: absolute;
          top: 8px;
          left: 8px;
          background: #ffffff;
          color: #d30005;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
          padding: 3px 10px;
          border-radius: 30px;
          border: 1px solid #cacacb;
        "
      >마감임박</span>
    </div>

    <!-- Metadata — sits directly below image, 8px gap between rows -->
    <div style="padding: 10px 0 0;">
      <p style="
        font-size: 12px;
        font-weight: 500;
        color: #707072;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: 4px;
      ">{{ classItem.category }}</p>
      <p class="clamp-2" style="
        font-size: 16px;
        font-weight: 500;
        color: #111111;
        line-height: 1.5;
        margin-bottom: 4px;
      ">{{ classItem.title }}</p>
      <p style="
        font-size: 16px;
        font-weight: 500;
        color: #111111;
        margin-bottom: 2px;
      ">{{ formatPrice(classItem.price) }}</p>
      <p style="
        font-size: 12px;
        font-weight: 500;
        color: #9e9ea0;
      ">{{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명</p>
    </div>
  </div>

  <!-- list variant — horizontal row, zero radius image -->
  <div
    v-else
    class="card-list"
    style="
      display: flex;
      gap: 16px;
      padding: 16px 0;
      border-bottom: 1px solid #e5e5e5;
      cursor: pointer;
    "
    @click="emit('select', classItem)"
  >
    <!-- Square image, no radius -->
    <div style="
      position: relative;
      flex-shrink: 0;
      width: 96px;
      height: 96px;
      background: #f5f5f5;
      overflow: hidden;
    ">
      <img
        :src="classItem.thumbnail"
        :alt="classItem.title"
        style="width: 100%; height: 100%; object-fit: cover;"
        loading="lazy"
      />
      <span
        v-if="isDeadlineSoon(classItem.deadline)"
        style="
          position: absolute;
          top: 5px;
          left: 5px;
          background: #ffffff;
          color: #d30005;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 500;
          padding: 2px 7px;
          border-radius: 30px;
          border: 1px solid #cacacb;
        "
      >마감임박</span>
    </div>

    <!-- Text meta -->
    <div style="flex: 1; min-width: 0; padding: 0;">
      <p style="
        font-size: 12px;
        font-weight: 500;
        color: #707072;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: 3px;
      ">{{ classItem.category }}</p>
      <p class="clamp-2" style="
        font-size: 16px;
        font-weight: 500;
        color: #111111;
        line-height: 1.5;
        margin-bottom: 4px;
      ">{{ classItem.title }}</p>
      <p style="
        font-size: 14px;
        font-weight: 500;
        color: #707072;
        margin-bottom: 6px;
      ">{{ formatDate(classItem.date) }} · {{ classItem.location }}</p>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <p style="font-size: 16px; font-weight: 500; color: #111111;">{{ formatPrice(classItem.price) }}</p>
        <p style="font-size: 12px; font-weight: 500; color: #9e9ea0;">{{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-scroll:active { opacity: 0.6; transition: opacity 0.12s; }
.card-list:active { opacity: 0.6; transition: opacity 0.12s; }
.clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
