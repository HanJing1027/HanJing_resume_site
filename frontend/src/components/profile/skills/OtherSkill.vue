<template>
  <div class="other-skills-wrapper">
    <div v-for="(category, index) in skillCategories" :key="index" class="skill-category">
      <div class="category-header" @click="toggleCategory(index)">
        <div class="header-content">
          <h4 class="category-title">{{ category.title }}</h4>
          <div class="title-decoration">
            <span class="dot"></span>
            <span class="line"></span>
          </div>
        </div>
        <div class="toggle-icon" :class="{ 'is-open': openCategories[index] }">
          <i class="bx bx-chevron-down"></i>
        </div>
      </div>

      <Transition name="slide">
        <div v-show="openCategories[index]" class="skills-container">
          <div v-for="(skill, skillIndex) in category.skills" :key="skillIndex" class="skill-item">
            <div class="skill-icon-wrapper">
              <div class="skill-icon">
                <i :class="['bx', skill.icon]"></i>
              </div>
              <div class="icon-glow"></div>
            </div>
            <div class="skill-content">
              <div class="skill-name">{{ skill.name }}</div>
            </div>
          </div>
        </div>
      </Transition>
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

// 追蹤每個分類的開關狀態
const openCategories = ref([])

// 在組件掛載時，預設所有分類為關閉狀態
onMounted(() => {
  // openCategories.value = props.skillCategories.map(() => false)
  openCategories.value = props.skillCategories.map((_, index) => index === 0)
})

// 切換分類的開關狀態
const toggleCategory = (index) => {
  openCategories.value[index] = !openCategories.value[index]
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.other-skills-wrapper {
  cursor: default;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.skill-category {
  position: relative;
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--primary-color);
    border-radius: 4px 0 0 4px;
  }

  &:hover {
    .toggle-icon {
      color: var(--primary-color);
    }
  }
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 0;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--dark-text);
  padding-left: 0.8rem;
  margin: 0;
  transition: transform 0.3s ease;
}

.title-decoration {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 0.8rem;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--primary-color);
  }

  .line {
    width: 60px;
    height: 2px;
    background-color: var(--primary-color);
    opacity: 0.7;
    transition: width 0.3s ease;
  }
}

.toggle-icon {
  font-size: 1.5rem;
  transition: all 0.3s ease;
  color: var(--text-color);

  &.is-open {
    transform: rotate(-180deg);
    color: var(--primary-color);
  }
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  padding-top: 1rem;
}

.skill-item {
  display: flex;
  align-items: center;
  position: relative;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background: var(--card-bg-alt);
  transition: all 0.3s ease;
  overflow: hidden;
  min-height: 70px;
  width: 100%; // 確保使用完整寬度

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);

    &::after {
      width: 100%;
    }

    .skill-icon {
      transform: rotate(10deg) scale(1.1);
      background: var(--primary-color);
    }

    .icon-glow {
      opacity: 0.15;
      transform: scale(1.5);
    }

    .skill-name {
      transform: translateX(5px);
      color: var(--dark-text);
    }
  }
}

.skill-icon-wrapper {
  position: relative;
}

.skill-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--primary-color) 0%, darken(#4a6bff, 15%) 100%);
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 2;
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  border-radius: 50%;
  opacity: 0;
  filter: blur(10px);
  transition: all 0.4s ease;
  z-index: 1;
}

.skill-name {
  font-weight: 600;
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.3s ease;
}

@media (max-width: $mobile-breakpoint) {
  .skills-container {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .skill-item {
    padding: 0.8rem;
    min-height: 60px;
  }

  .skill-icon {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
    min-width: 36px; // 確保圖標不會被壓縮
  }

  .skill-name {
    font-size: 0.95rem;
    line-height: 1.2;
  }

  .category-title {
    font-size: 1.3rem;
  }
}
</style>
