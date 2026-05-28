<script setup lang="ts">
import type { ClassItem } from '~/composables/useClasses'
import { isDeadlineSoon, formatPrice, formatDate } from '~/composables/useClasses'

const props = defineProps<{
  classItem: ClassItem
}>()

const emit = defineEmits<{
  select: [classItem: ClassItem]
}>()
</script>

<template>
  <!-- Nike product-card style: zero radius, zero shadow, 4:5 portrait image -->
  <div
    class="card-vertical"
    style="
      flex-shrink: 0;
      width: 210px;
      margin-right: 12px;
      background: #ffffff;
      cursor: pointer;
    "
    @click="emit('select', classItem)"
  >
    <!-- 4:5 portrait image on soft-cloud, no radius -->
    <div style="position: relative; background: #f5f5f5; aspect-ratio: 4/5; overflow: hidden;">
      <img
        :src="classItem.thumbnail"
        :alt="classItem.title"
        style="width: 100%; height: 100%; object-fit: cover;"
        loading="lazy"
      />
      <!-- badge-promo: hairline border pill, sale color text -->
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

    <!-- Metadata: 8px gap rows, directly below image -->
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
        font-size: 14px;
        font-weight: 500;
        color: #707072;
        margin-bottom: 8px;
      ">{{ formatDate(classItem.date) }} · {{ classItem.location }}</p>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <p style="font-size: 16px; font-weight: 500; color: #111111;">{{ formatPrice(classItem.price) }}</p>
        <p style="font-size: 12px; font-weight: 500; color: #9e9ea0;">{{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명</p>
      </div>

      <!-- button-primary: ink bg, white text, 30px radius, 48px height -->
      <button
        class="apply-btn"
        style="
          width: 100%;
          padding: 14px 16px;
          background: #111111;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 500;
          border-radius: 30px;
          border: none;
          cursor: pointer;
          min-height: 48px;
          line-height: 1.2;
        "
        @click.stop="alert(`'${classItem.title}' 클래스에 신청하시겠습니까?`)"
      >신청하기</button>
    </div>
  </div>
</template>

<style scoped>
.card-vertical:active { opacity: 0.6; transition: opacity 0.12s; }
.apply-btn:active { opacity: 0.5; transform: scale(0.5); transition: all 0.1s; }
.clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
