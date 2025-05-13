<template>
  <div class="home-container">
    <section id="profile" class="section">
      <ProfileCard />
    </section>

    <section id="skills" class="section">
      <SkillsSection />
    </section>

    <section id="certifications" class="section">
      <CertificationCarousel />
    </section>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import ProfileCard from '@/components/profile/ProfileCard.vue'
import SkillsSection from '@/components/profile/SkillsSection.vue'
import CertificationCarousel from '@/components/profile/CertificationCarousel.vue'

const route = useRoute()

const scrollToElement = (elementId) => {
  setTimeout(() => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, 300)
}

// 處理載入時的 hash
onMounted(() => {
  if (route.hash) {
    const elementId = route.hash.substring(1) // 移除開頭的 #
    scrollToElement(elementId)

    setTimeout(() => {
      // 滾動到目標區塊後，清除 hash
      const clearHash = window.location.pathname
      history.replaceState(null, document.title, clearHash)
    }, 800)
  }
})

// 監聽路由的 hash 變化
watch(
  () => route.hash,
  (newHash) => {
    if (newHash) {
      const elementId = newHash.substring(1)
      scrollToElement(elementId)
    }
  }
)
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background);
  color: var(--text-color);
  padding: 6rem 1rem 6rem;
  gap: 4vh;
  transition: all $transition-speed ease;

  @media (max-width: $mobile-breakpoint) {
    padding: 2.5rem 1rem 2.5rem;
  }
}

.section {
  width: 100%;
  scroll-margin-top: 5rem; // 留出空間
}
</style>
