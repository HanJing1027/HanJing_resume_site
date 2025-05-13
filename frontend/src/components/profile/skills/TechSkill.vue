<template>
  <div class="skill-item" ref="skillItemRef">
    <div class="skill-info">
      <span class="skill-name">{{ tech.name }}</span>
      <span class="skill-percentage">{{ tech.percentage }}%</span>
    </div>
    <div class="skill-bar">
      <div
        class="skill-progress"
        :style="{ width: isVisible ? tech.percentage + '%' : '0%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  tech: {
    type: Object,
    required: true,
  },
})

const skillItemRef = ref(null)
const isVisible = ref(false) // 用於加入動畫的狀態
let observer = null // Intersection Observer

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries // 解構出第一個 entry
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.unobserve(entry.target) // 元素顯示一次後後就取消觀察 避免重複觸發
      }
    },
    {
      threshold: 0.1, // 當 10% 的元素可見時觸發
    }
  )

  if (skillItemRef.value) {
    observer.observe(skillItemRef.value) // 指定觀察的 DOM
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.skill-item {
  margin-bottom: 1.5rem;
  transition: all $transition-speed ease;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  .skill-name {
    font-weight: 600;
    color: var(--dark-text);
    transition: color $transition-speed ease;
  }

  .skill-percentage {
    color: var(--primary-color);
    font-weight: 600;
    transition: color $transition-speed ease;
  }
}

.skill-bar {
  height: 8px;
  background-color: var(--border-color);
  border-radius: 100px;
  box-shadow:
    inset 0 1px 3px var(--shadow),
    inset 0 0 2px rgba(0, 0, 0, 0.05);
  transition:
    background-color $transition-speed ease,
    box-shadow $transition-speed ease;
}

.skill-progress {
  width: 0;
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 100px;
  transition:
    width 1.5s cubic-bezier(0.4, 0, 0.2, 1),
    background-color $transition-speed ease;
}
</style>
