<template>
  <div class="home-container">
    <ProfileCard />
    <SkillsSection />
  </div>
</template>

<script setup>
import ProfileCard from '@/components/profile/ProfileCard.vue'
import SkillsSection from '@/components/profile/SkillsSection.vue'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.home-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  background-color: #f6f1e8;
  padding: 6rem 1rem 6rem;
  gap: 4vh;

  @media (max-width: $mobile-breakpoint) {
    padding: 2.5rem 1rem 2.5rem;
  }
}
</style>
