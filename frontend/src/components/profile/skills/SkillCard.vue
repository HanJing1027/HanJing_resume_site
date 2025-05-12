<template>
  <div class="skill-card">
    <div class="skill-icon">
      <i class="bx" :class="skill.icon"></i>
    </div>
    <h3>{{ skill.title }}</h3>
    <button class="open-modal-btn" @click="openModal">view more</button>
  </div>

  <BaseModal v-model="isModalOpen" :title="skill.title">
    <div class="modal-content-wrapper">
      <!-- 調整圖標位置和尺寸 -->
      <div class="modal-header-icon">
        <div class="modal-icon">
          <i class="bx" :class="skill.icon"></i>
        </div>
      </div>

      <div class="skill-description">
        <ul>
          <li v-for="(item, index) in skill.description" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'

const props = defineProps({
  skill: {
    type: Object,
    required: true,
  },
})

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.skill-card {
  cursor: default;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

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
    margin-bottom: 0;
    text-align: center;
  }

  .open-modal-btn {
    background: none;
    border: none;
    color: $primary-color;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0.5rem 0;
    margin-top: 1.5rem;
    cursor: pointer;
    position: relative;
    display: block;
    width: 100%;
    text-align: center;
    overflow: hidden;
    transition: all 0.25s ease;
    opacity: 0.75;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 1px;
      background-color: $primary-color;
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }

    &::before {
      content: '→';
      position: absolute;
      right: 50%;
      opacity: 0;
      transform: translateX(20px);
      transition: all 0.3s ease;
    }

    &:hover {
      opacity: 1;
      letter-spacing: 0.5px;

      &::after {
        width: 60%;
      }

      &::before {
        opacity: 1;
        right: 30%;
        transform: translateX(0);
      }
    }

    &:active {
      transform: scale(0.98);
    }
  }
}

.modal-content-wrapper {
  text-align: center;

  .modal-header-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .modal-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba($primary-color, 0.1);
    border-radius: 50%;
    font-size: 2rem;
    color: $primary-color;
  }
}

.skill-description {
  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
    text-align: left; // 文字左對齊
    max-width: 500px;
    margin: 0 auto; // 居中顯示列表
  }

  li {
    position: relative;
    padding: 0.8rem 1rem 0.8rem 2.5rem;
    margin-bottom: 0.5rem;
    color: $text-color;
    background-color: rgba($primary-color, 0.03);
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
      background-color: rgba($primary-color, 0.07);
    }

    &:before {
      content: '•';
      color: $primary-color;
      font-weight: bold;
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.5em;
    }
  }
}

// 增加響應式調整
@media (max-width: 768px) {
  .skill-description ul {
    width: 100%;
  }
}
</style>
