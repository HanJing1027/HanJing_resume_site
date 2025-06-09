<template>
  <div class="projects-home">
    <div class="card-wrapper">
      <ProjectCard
        type="design"
        iconClass="bx bxs-color"
        title="前往設計作品"
        description="探索我的平面設計，視覺創意專案"
        arrowDirection="left"
        @click="$router.push({ name: 'DesignProjects' })"
      />
      <ProjectCard
        type="web"
        iconClass="bx bx-windows"
        title="前往網頁作品"
        description="瀏覽我的網頁開發、前端與互動專案"
        arrowDirection="right"
        @click="$router.push({ name: 'WebProjects' })"
      />
    </div>
  </div>
</template>

<script setup>
import ProjectCard from '@/components/projects/ProjectCard.vue'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.projects-home {
  width: 100%;
}

.card-wrapper {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  padding: 3rem 1.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 70px auto 0;

  @media (max-width: $mobile-breakpoint) {
    padding: 0 1.5rem;
    margin: 36px 0;
    flex-direction: column;
    align-items: center;
  }
}
</style>
