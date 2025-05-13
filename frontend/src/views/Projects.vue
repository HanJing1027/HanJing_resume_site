<template>
  <div class="projects-container">
    <div class="card-wrapper">
      <ProjectCard
        type="design"
        iconClass="bx bxs-color"
        title="前往設計作品"
        description="探索我的平面設計、UI/UX與視覺創意專案"
        arrowDirection="left"
      />
      <ProjectCard
        type="web"
        iconClass="bx bx-windows"
        title="前往網頁作品"
        description="瀏覽我的網頁開發、前端與互動專案"
        arrowDirection="right"
      />
    </div>
  </div>
</template>

<script setup>
import ProjectCard from '@/components/projects/ProjectCard.vue'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.projects-container {
  width: 100%;
  min-height: 100vh;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background);
}

.card-wrapper {
  display: flex;
  gap: 2.5rem;
  justify-content: center;

  @media (max-width: $mobile-breakpoint) {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 500px) {
  .projects-container {
    padding: 1rem;
  }

  .card-wrapper {
    gap: 1.5rem;
  }
}
</style>
