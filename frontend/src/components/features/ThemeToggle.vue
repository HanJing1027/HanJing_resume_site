<template>
  <button
    class="theme-toggle"
    @click="toggleTheme"
    :aria-label="isDarkTheme ? '切換至亮色主題' : '切換至暗色主題'"
  >
    <i class="bx" :class="isDarkTheme ? 'bx-sun' : 'bx-moon'"></i>
  </button>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useThemeStore } from '@/stores/modules/useThemeStore.js'

const themeStore = useThemeStore()
const isDarkTheme = ref(false)

// 初始化主題
onMounted(() => {
  isDarkTheme.value = themeStore.isDark
})

// 監聽主題變化
watch(
  () => themeStore.isDark,
  (newValue) => {
    isDarkTheme.value = newValue
  }
)

// 切換主題
const toggleTheme = () => {
  themeStore.toggleTheme()
  isDarkTheme.value = themeStore.isDark
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: var(--accent-lighter);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all $transition-speed ease;

  &:hover {
    background-color: var(--accent-light);
    transform: rotate(15deg);
  }

  i {
    font-size: 1.4rem;
  }
}

@media (max-width: $mobile-breakpoint) {
  .theme-toggle {
    width: 30px;
    height: 30px;

    i {
      font-size: 1.2rem;
    }
  }
}
</style>
