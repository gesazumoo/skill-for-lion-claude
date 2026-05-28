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
  <!-- scroll variant -->
  <div
    v-if="variant === 'scroll'"
    class="card-scroll"
    style="
      flex-shrink: 0;
      width: 180px;
      background: #ffffff;
      border: 1.5px solid #f1f5f9;
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 2px 12px rgba(0,0,0,0.07);
    "
    @click="emit('select', classItem)"
  >
    <div style="position: relative; background: #f8fafc; aspect-ratio: 1/1; overflow: hidden;">
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
      <p style="font-size: 11px; font-weight: 600; color: #0ea5e9; letter-spacing: 0.02em; margin-bottom: 4px; text-transform: uppercase;">
        {{ classItem.category }}
      </p>
      <p class="clamp-2" style="font-size: 13px; font-weight: 600; color: #0f172a; line-height: 1.4; margin-bottom: 6px;">
        {{ classItem.title }}
      </p>
      <p style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 2px;">
        {{ formatPrice(classItem.price) }}
      </p>
      <p style="font-size: 11px; font-weight: 400; color: #94a3b8;">
        {{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명
      </p>
    </div>
  </div>

  <!-- list variant -->
  <div
    v-else
    class="card-list"
    style="
      display: flex;
      gap: 14px;
      padding: 14px 0;
      border-bottom: 1px solid #f1f5f9;
      cursor: pointer;
    "
    @click="emit('select', classItem)"
  >
    <div style="position: relative; flex-shrink: 0; width: 96px; height: 96px; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <img :src="classItem.thumbnail" :alt="classItem.title"
        style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
      <span v-if="isDeadlineSoon(classItem.deadline)" style="
        position: absolute; top: 5px; left: 5px;
        background: #f97316; color: #fff;
        font-size: 9px; font-weight: 600;
        padding: 2px 6px; border-radius: 9999px;
      ">마감임박</span>
    </div>
    <div style="flex: 1; min-width: 0; padding: 2px 0;">
      <p style="font-size: 11px; font-weight: 600; color: #0ea5e9; letter-spacing: 0.02em; margin-bottom: 3px; text-transform: uppercase;">
        {{ classItem.category }}
      </p>
      <p class="clamp-2" style="font-size: 15px; font-weight: 600; color: #0f172a; line-height: 1.35; margin-bottom: 5px;">
        {{ classItem.title }}
      </p>
      <p style="font-size: 13px; font-weight: 400; color: #94a3b8; margin-bottom: 8px;">
        {{ formatDate(classItem.date) }} · {{ classItem.location }}
      </p>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <p style="font-size: 15px; font-weight: 700; color: #0f172a;">{{ formatPrice(classItem.price) }}</p>
        <p style="font-size: 11px; color: #94a3b8;">{{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-scroll:active { transform: scale(0.97); transition: transform 0.12s; }
.card-list:active { opacity: 0.65; transition: opacity 0.12s; }
.clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
