<template>
  <div class="project-detail-page">
    <!-- 根據專案類型載入對應的詳情組件 -->
    <DesignProjectDetailView v-if="projectType === 'design'" />
    <WebProjectDetailView v-else-if="projectType === 'web'" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DesignProjectDetailView from '@/components/projects/designProject/DesignProjectDetailView.vue'
import WebProjectDetailView from '@/components/projects/webProject/WebProjectDetailView.vue'

const route = useRoute()

// 根據路由判斷專案類型
const projectType = computed(() => {
  if (route.meta.projectType) {
    return route.meta.projectType
  }
  // 也可以根據路由路径判斷
  if (route.path.includes('/design/')) {
    return 'design'
  } else if (route.path.includes('/web/')) {
    return 'web'
  }
  return 'design' // 預設值
})
</script>

<style lang="scss" scoped>
.project-detail-page {
  width: 100%;
  height: 100%;
}
</style>
