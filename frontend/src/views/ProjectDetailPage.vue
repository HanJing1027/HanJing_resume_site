<template>
  <div class="project-detail-page">
    <ProjectDetailView v-if="currentProject" :project="currentProject" :allProjects="allProjects" />
    <div v-else class="loading-state">
      <div class="spinner"></div>
      <p>載入專案中...</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProjectDetailView from '@/components/projects/ProjectDetailView.vue'
import { allProjects } from '@/data/designProjectsData'

const route = useRoute()
const projectId = computed(() => Number(route.params.id))

// 根據ID取得當前專案
const currentProject = computed(() => {
  return allProjects.value.find((project) => project.id === projectId.value) || null
})

onMounted(() => {
  // 動態設置頁面標題
  document.title = currentProject.value ? `${currentProject.value.title} | 作品詳情` : '作品詳情'
})
</script>
