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
  <div
    class="card-vertical"
    style="
      flex-shrink: 0;
      width: 190px;
      background: #ffffff;
      border: 1.5px solid #f1f5f9;
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 2px 12px rgba(0,0,0,0.07);
    "
    @click="emit('select', classItem)"
  >
    <div style="position: relative; background: #f8fafc; aspect-ratio: 4/5; overflow: hidden;">
      <img :src="classItem.thumbnail" :alt="classItem.title"
        style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
      <span v-if="isDeadlineSoon(classItem.deadline)" style="
        position: absolute; top: 8px; left: 8px;
        background: #f97316; color: #fff;
        font-size: 10px; font-weight: 600;
        padding: 3px 8px; border-radius: 9999px;
      ">마감임박</span>
    </div>
    <div style="padding: 12px 14px 14px;">
      <p style="font-size: 11px; font-weight: 600; color: #0ea5e9; letter-spacing: 0.02em; margin-bottom: 3px; text-transform: uppercase;">
        {{ classItem.category }}
      </p>
      <p class="clamp-2" style="font-size: 13px; font-weight: 600; color: #0f172a; line-height: 1.4; margin-bottom: 4px;">
        {{ classItem.title }}
      </p>
      <p style="font-size: 11px; font-weight: 400; color: #94a3b8; margin-bottom: 8px;">
        {{ formatDate(classItem.date) }} · {{ classItem.location }}
      </p>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
        <p style="font-size: 14px; font-weight: 700; color: #0f172a;">{{ formatPrice(classItem.price) }}</p>
        <p style="font-size: 10px; color: #94a3b8;">{{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명</p>
      </div>
      <button
        class="apply-btn"
        style="
          width: 100%;
          padding: 9px 14px;
          background: #0ea5e9;
          color: #ffffff;
          font-size: 13px;
          font-family: inherit;
          font-weight: 600;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          min-height: 36px;
        "
        @click.stop="alert(`'${classItem.title}' 클래스에 신청하시겠습니까?`)"
      >신청하기</button>
    </div>
  </div>
</template>

<style scoped>
.card-vertical:active { transform: scale(0.97); transition: transform 0.12s; }
.apply-btn:active { transform: scale(0.95); filter: brightness(0.92); transition: all 0.1s; }
.clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
