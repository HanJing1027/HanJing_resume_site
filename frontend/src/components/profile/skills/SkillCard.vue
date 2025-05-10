<template>
  <div class="skill-card">
    <div class="skill-icon">
      <i class="bx" :class="skill.icon"></i>
    </div>
    <h3>{{ skill.title }}</h3>
    <p>{{ skill.description }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  skill: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.skill-card {
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform $transition-speed ease;

  &:hover {
    transform: translateY(-5px);
  }

  .skill-icon {
    font-size: 2.5rem;
    color: $primary-color;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    color: $dark-text;
    margin-bottom: 1rem;
    text-align: center;
  }

  p {
    color: $text-color;
    line-height: 1.6;
  }
}
</style>
