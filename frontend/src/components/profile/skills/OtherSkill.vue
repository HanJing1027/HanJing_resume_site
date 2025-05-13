<template>
  <div class="skill-categories">
    <div v-for="(category, index) in localCategories" :key="index" class="skill-category">
      <!-- 類別標題 點擊時切換展開/收合狀態 -->
      <div class="category-header" @click="toggleCategory(index)">
        <h4>{{ category.title }}</h4>
        <i class="bx bx-chevron-down" :class="{ rotate: category.isOpen }"></i>
      </div>

      <!-- 類別內容 isOpen狀態顯示/隱藏 -->
      <div v-show="category.isOpen" class="category-content">
        <div v-for="(skill, skillIndex) in category.skills" :key="skillIndex" class="skill-item">
          <i :class="['bx', skill.icon]"></i>
          <span>{{ skill.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  skillCategories: {
    type: Array,
    required: true,
  },
})

const localCategories = ref([])

// 初始化類別數據
onMounted(() => {
  localCategories.value = props.skillCategories.map((category) => ({
    ...category,
    isOpen: false, // 預設為所有類別都是收合的
  }))
})

const toggleCategory = (index) => {
  localCategories.value[index].isOpen = !localCategories.value[index].isOpen
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.skill-categories {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all $transition-speed ease;
}

.skill-category {
  background: var(--card-bg-alt);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px var(--shadow);
  border: 1px solid var(--border-color);
  transition: all $transition-speed ease;
}

.category-header {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--accent-lighter);
  transition: all $transition-speed ease;

  h4 {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--dark-text);
    margin: 0;
    transition: color $transition-speed ease;
  }

  i {
    font-size: 1.4rem;
    color: var(--primary-color);
    transition: all $transition-speed ease;

    &.rotate {
      transform: rotate(180deg);
    }
  }

  &:hover {
    background: var(--accent-light);
  }
}

.category-content {
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.8rem;
  transition: all $transition-speed ease;
  background: var(--card-bg-alt);
}

.skill-item {
  cursor: default;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: var(--accent-lighter);
  border: 1px solid var(--border-color);
  transition: all $transition-speed ease;

  i {
    color: var(--primary-color);
    font-size: 1.2rem;
    transition: color $transition-speed ease;
  }

  span {
    font-size: 0.9rem;
    color: var(--text-color);
    transition: color $transition-speed ease;
  }

  &:hover {
    background: var(--accent-light);
  }
}

@media (max-width: $mobile-breakpoint) {
  .category-content {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }

  .skill-item {
    span {
      line-height: 1.5;
    }
  }
}
</style>
