<template>
  <nav class="navbar" aria-label="主導航">
    <!-- 品牌標誌 -->
    <div class="navbar-logo">
      <router-link to="/" class="logo">HanJing</router-link>
    </div>

    <!-- 導航選單 -->
    <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
      <router-link
        to="/"
        class="navbar-item"
        exact-active-class="active-link"
        @click="closeMenuOnMobile"
      >
        about me
      </router-link>
      <router-link
        to="/projects"
        class="navbar-item"
        active-class="active-link"
        @click="closeMenuOnMobile"
      >
        projects
      </router-link>
    </div>

    <!-- 漢堡選單按鈕 -->
    <button
      class="navbar-burger"
      :class="{ 'is-active': isMenuActive }"
      @click="toggleMenu"
      aria-label="選單"
    >
      <i class="bx" :class="isMenuActive ? 'bx-x' : 'bx-menu'"></i>
    </button>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isMenuActive = ref(false)

// 選單開關
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value
}

// 在手機上點擊選單項後自動關閉選單
const closeMenuOnMobile = () => {
  if (window.innerWidth <= 768) {
    isMenuActive.value = false
    document.body.style.overflow = ''
  }
}

// ESC 鍵關閉選單
const handleEscKey = (event) => {
  if (event.key === 'Escape' && isMenuActive.value) {
    isMenuActive.value = false
    document.body.style.overflow = ''
  }
}

// 點擊外部關閉選單
const handleOutsideClick = (event) => {
  const navbar = document.querySelector('.navbar')
  if (isMenuActive.value && navbar && !navbar.contains(event.target)) {
    isMenuActive.value = false
    document.body.style.overflow = ''
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
  document.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscKey)
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: $background;
  box-shadow: 0 2px 10px $shadow;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all $transition-speed ease;

  &-logo {
    .logo {
      cursor: pointer;
      font-size: 1.8rem;
      font-weight: 700;
      text-decoration: none;
      color: $dark-text;
      position: relative;
      transition: color $transition-speed ease;
    }
  }

  &-menu {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  &-item {
    cursor: pointer;
    text-decoration: none;
    color: $text-color;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 0.5rem 0;
    position: relative;
    text-transform: uppercase;
    transition: color $transition-speed ease;

    &:hover,
    &.active-link {
      color: $primary-color;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: $primary-color;
      transition: width $transition-speed ease;
    }

    &:hover::after,
    &.active-link::after {
      width: 100%;
    }
  }

  &-burger {
    display: none;
    cursor: pointer;
    color: $text-color;
    background: transparent;
    border: none;
    padding: 0;
    transition: color $transition-speed ease;

    &:hover {
      color: $primary-color;
    }

    i {
      font-size: 1.8rem;
      transition: transform $transition-speed ease;
      display: block;
    }

    &.is-active i {
      transform: rotate(180deg);
    }
  }

  @media (max-width: $mobile-breakpoint) {
    position: relative;

    &-logo {
      .logo {
        font-size: 1.5rem;
      }
    }

    &-burger {
      display: block;
      position: absolute;
      right: 2rem;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
    }

    &-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transition: all $transition-speed ease;
      padding: 0;
      margin: 0;
      background-color: $background;
      box-shadow: 0 5px 10px $shadow;

      &.is-active {
        max-height: 300px;
        opacity: 1;
        visibility: visible;
        padding: 1rem 0;
      }

      .navbar-item {
        width: 80%;
        padding: 0.75rem 0;
        text-align: start;
        opacity: 0;
        transform: translateY(-10px);
        transition:
          opacity $transition-speed ease,
          transform $transition-speed ease;
      }

      &.is-active .navbar-item {
        opacity: 1;
        transform: translateY(0);
        transition-delay: 0.1s;
      }
    }
  }
}
</style>
