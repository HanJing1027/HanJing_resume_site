<template>
  <div class="skills-container">
    <div class="category-slider">
      <button
        v-for="(category, index) in skillCategories"
        :key="index"
        :class="['category-pill', { active: activeCategory === index }]"
        @click="setActiveCategory(index)"
      >
        <i v-if="category.icon" :class="['bx', category.icon]"></i>
        {{ category.title }}
      </button>
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="currentCategory" class="skills-content" :key="activeCategory">
        <div class="skills-description" v-if="currentCategory.description">
          <p>{{ currentCategory.description }}</p>
        </div>

        <div class="skills-mastery">
          <div
            v-for="(skill, skillIndex) in currentCategory.skills"
            :key="skillIndex"
            class="skill-item"
          >
            <div class="skill-info">
              <div class="skill-icon">
                <i :class="['bx', skill.icon]"></i>
              </div>
              <div class="skill-details">
                <h4 class="skill-name">{{ skill.name }}</h4>
                <p v-if="skill.description" class="skill-description">{{ skill.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  skillCategories: {
    type: Array,
    required: true,
  },
  defaultCategory: {
    type: Number,
    default: 0,
  },
})

const activeCategory = ref(props.defaultCategory)

const currentCategory = computed(() => {
  if (activeCategory.value >= 0 && activeCategory.value < props.skillCategories.length) {
    return props.skillCategories[activeCategory.value]
  }
  return null
})

const setActiveCategory = (index) => {
  activeCategory.value = index
}

onMounted(() => {
  if (props.skillCategories.length > 0 && activeCategory.value === -1) {
    activeCategory.value = 0
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.skills-container {
  display: flex;
  flex-direction: column;
  background: var(--card-bg);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-color);
}

.category-slider {
  display: flex;
  overflow-x: auto;
  padding: 0.5rem 0;
  margin-bottom: 2rem;
  scrollbar-width: none; /* Firefox */
  gap: 0.75rem;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }

  .category-pill {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--accent-lighter);
    border: 1px solid var(--border-color);
    color: var(--text-color);
    padding: 0.75rem 1.25rem;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.3s ease;
    cursor: pointer;

    i {
      font-size: 1.1rem;
    }

    &:hover {
      background: var(--accent-light);
      transform: translateY(-2px);
    }

    &.active {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
      box-shadow: 0 5px 15px rgba(var(--primary-rgb), 0.3);
    }
  }
}

.skills-content {
  flex: 1;
}

.skills-description {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--accent-lightest);
  border-radius: 10px;
  border-left: 4px solid var(--primary-color);

  p {
    color: var(--text-color);
    font-size: 0.95rem;
    line-height: 1.6;
  }
}

.skills-mastery {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.skill-item {
  cursor: default;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
  background: var(--accent-lighter);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }
}

.skill-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.skill-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background: var(--primary-color);
  color: white;
  border-radius: 12px;
  font-size: 1.5rem;
}

.skill-details {
  flex: 1;

  .skill-name {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: var(--dark-text);
  }

  .skill-description {
    font-size: 0.85rem;
    color: var(--text-muted);
  }
}

/* 過渡動畫 */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 992px) {
  .skills-container {
    padding: 1.5rem;
  }

  .category-slider {
    justify-content: flex-start;
    padding-bottom: 0.5rem;
  }
}

@media (max-width: $mobile-breakpoint) {
  .skills-container {
    padding: 1.25rem;
  }

  .skill-info {
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
    gap: 0.75rem;
  }

  .skill-icon {
    margin: 0 auto;
  }

  .skill-details {
    width: 100%;
    text-align: center;
  }
}
</style>
