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
        <!-- overlay -->
        <div class="absolute inset-0 bg-black/60" @click="emit('close')" />

        <!-- bottom sheet — Nike: white, no radius on top -->
        <div class="relative bg-white w-full max-h-[90vh] overflow-y-auto" style="border-top-left-radius: 0; border-top-right-radius: 0;">

          <!-- drag handle + close -->
          <div class="sticky top-0 bg-white z-10" style="padding: 12px 20px 10px; border-bottom: 1px solid #e5e5e5; display: flex; align-items: center; justify-content: space-between;">
            <div style="width: 40px; height: 4px; background: #cacacb; border-radius: 9999px; margin: 0 auto;" />
            <button
              style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: #f5f5f5; border-radius: 9999px; border: none; cursor: pointer; color: #707072;"
              @click="emit('close')"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 썸네일 — full-bleed, no radius -->
          <div style="aspect-ratio: 16/9; background: #f5f5f5; overflow: hidden;">
            <img
              :src="classItem.thumbnail"
              :alt="classItem.title"
              style="width: 100%; height: 100%; object-fit: cover;"
            />
          </div>

          <!-- 콘텐츠 -->
          <div style="padding: 20px 20px 32px;">

            <!-- 마감임박 뱃지 — badge-promo spec: canvas bg, hairline border, sale color text, 30px radius -->
            <span
              v-if="isDeadlineSoon(classItem.deadline)"
              style="
                display: inline-block;
                background: #ffffff;
                color: #d30005;
                font-family: 'Inter', sans-serif;
                font-size: 12px;
                font-weight: 500;
                padding: 4px 12px;
                border-radius: 30px;
                border: 1px solid #cacacb;
                margin-bottom: 12px;
              "
            >마감임박</span>

            <!-- 카테고리 -->
            <p style="font-size: 14px; font-weight: 500; color: #707072; margin-bottom: 4px;">{{ classItem.category }}</p>

            <!-- 제목 -->
            <h2 style="font-size: 24px; font-weight: 500; color: #111111; line-height: 1.2; margin-bottom: 20px;">
              {{ classItem.title }}
            </h2>

            <!-- 메타 정보 -->
            <div style="border-top: 1px solid #e5e5e5; padding-top: 16px; margin-bottom: 16px;">
              <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                <svg style="width: 16px; height: 16px; color: #707072; flex-shrink: 0;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span style="font-size: 14px; font-weight: 500; color: #111111;">{{ formatDate(classItem.date) }}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                <svg style="width: 16px; height: 16px; color: #707072; flex-shrink: 0;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span style="font-size: 14px; font-weight: 500; color: #111111;">{{ classItem.location }}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                <svg style="width: 16px; height: 16px; color: #707072; flex-shrink: 0;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span style="font-size: 14px; font-weight: 500; color: #111111;">
                  {{ classItem.currentParticipants }}/{{ classItem.maxParticipants }}명 참가
                  <span style="color: #707072;">(잔여 {{ spotsLeft }}석)</span>
                </span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0;">
                <svg style="width: 16px; height: 16px; color: #707072; flex-shrink: 0;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style="font-size: 14px; font-weight: 500;">
                  마감
                  <span :style="{ color: isDeadlineSoon(classItem.deadline) ? '#d30005' : '#111111', fontWeight: isDeadlineSoon(classItem.deadline) ? '500' : '400' }">
                    {{ formatDate(classItem.deadline) }}
                  </span>
                </span>
              </div>
            </div>

            <!-- 설명 -->
            <div style="border-top: 1px solid #e5e5e5; padding-top: 16px; margin-bottom: 24px;">
              <p style="font-size: 14px; font-weight: 400; color: #111111; line-height: 1.75;">{{ classItem.description }}</p>
            </div>

            <!-- 가격 + 신청하기 — button-primary spec: ink bg, white text, 30px radius, 48px -->
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">
              <div>
                <p style="font-size: 12px; font-weight: 500; color: #707072; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 2px;">참가비</p>
                <p style="font-size: 24px; font-weight: 500; color: #111111;">{{ formatPrice(classItem.price) }}</p>
              </div>
              <button
                class="apply-btn"
                style="
                  flex: 1;
                  padding: 16px 24px;
                  background: #111111;
                  color: #ffffff;
                  font-family: 'Inter', sans-serif;
                  font-size: 16px;
                  font-weight: 500;
                  border-radius: 30px;
                  border: none;
                  cursor: pointer;
                  min-height: 48px;
                "
                @click="alert(`'${classItem.title}' 클래스에 신청되었습니다.`)"
              >신청하기</button>
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
.apply-btn:active { opacity: 0.5; transition: opacity 0.1s; }
</style>
