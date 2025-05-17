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

onBeforeUnmount(() => {
  // 新增：元件卸載時清理 observer
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.skill-item {
  cursor: default;
  margin-bottom: 2rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  transition: all $transition-speed ease;
  border-left: 3px solid transparent;

  &:hover {
    border-left: 3px solid var(--primary-color);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transform: translateX(5px);
  }
}

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;

  .skill-name {
    font-weight: 700;
    color: var(--dark-text);
    transition: color $transition-speed ease;
    font-size: 1.05rem;
    letter-spacing: 0.3px;
  }

  .skill-percentage {
    color: var(--primary-color);
    font-weight: 600;
    transition: color $transition-speed ease;
    background-color: $bg-lighter;
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 0.9rem;
    opacity: 0;
    transform: translateY(5px);
    animation: fadeIn 0.5s forwards;
    animation-delay: 1s;
  }
}

.skill-bar {
  height: 8px;
  background: var(--border-color);
  border-radius: 10px;
  box-shadow: inset 0 1px 3px var(--shadow);
  overflow: hidden;
  position: relative;
  transition: all $transition-speed ease;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0;
  }

  &:hover::after {
    opacity: 1;
    animation: shimmer 2s infinite;
  }
}

.skill-progress {
  width: 0;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--primary-color) 0%,
    var(--primary-color-light, var(--primary-color)) 120%
  );
  border-radius: 10px;
  position: relative;
  transition: width 1.8s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, #ffffff69, transparent);
    transition: left 0.7s ease;
    animation: flowLight 2.5s ease-in-out infinite;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes flowLight {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}
</style>
