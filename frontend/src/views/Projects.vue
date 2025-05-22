<template>
  <div class="projects-container">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.projects-container {
  width: 100%;
  min-height: 100vh;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--background);
  position: relative;
}

// 過場動畫樣式
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
