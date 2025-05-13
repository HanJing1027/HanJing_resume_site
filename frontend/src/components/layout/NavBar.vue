<template>
  <nav class="navbar" aria-label="主導航">
    <div class="navbar-logo">
      <router-link to="/" class="logo" @click="closeMenuOnMobile">HanJing</router-link>
    </div>

    <!-- 主導航選單 -->
    <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
      <div class="navbar-item nav-group" :class="{ active: isDropdownActive }">
        <span class="navbar-link" @click="toggleDropdown">
          About Me
          <i class="bx bx-chevron-down" :class="{ 'is-open': isDropdownActive }"></i>
        </span>
        <div class="dropdown-menu">
          <a href="#" class="dropdown-item" @click.prevent="scrollToSection('profile')">Profile</a>
          <a href="#" class="dropdown-item" @click.prevent="scrollToSection('skills')">Skills</a>
          <a href="#" class="dropdown-item" @click.prevent="scrollToSection('certifications')"
            >Certifications</a
          >
        </div>
      </div>

      <router-link
        to="/projects"
        class="navbar-item"
        active-class="active-link"
        @click="closeMenuOnMobile"
      >
        Projects
      </router-link>
    </div>

    <div class="theme-toggle-wrapper">
      <ThemeToggle />
    </div>

    <!-- 漢堡選單 -->
    <button class="navbar-burger" :class="{ 'is-active': isMenuActive }" @click="toggleMenu">
      <i class="bx" :class="isMenuActive ? 'bx-x' : 'bx-menu'"></i>
    </button>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ThemeToggle from '@/components/features/ThemeToggle.vue'

const route = useRoute()
const router = useRouter()
const isMenuActive = ref(false)
const isDropdownActive = ref(false)

// 選單開關
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value

  // 關閉主選單時也關閉下拉選單
  if (!isMenuActive.value) {
    isDropdownActive.value = false
  }

  if (isMenuActive.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// 下拉選單開關
const toggleDropdown = (event) => {
  event.stopPropagation() // 防止事件冒泡

  // 在桌面版點擊時也能開關選單
  isDropdownActive.value = !isDropdownActive.value

  // 如果開啟下拉選單，設置點擊事件監聽器來關閉選單
  if (isDropdownActive.value) {
    // 使用一次性事件監聽器 - 點擊其他區域時關閉選單
    setTimeout(() => {
      const closeDropdown = () => {
        isDropdownActive.value = false
        document.removeEventListener('click', closeDropdown)
      }
      document.addEventListener('click', closeDropdown)
    }, 0)
  }
}

// 在手機上點擊選單項後自動關閉選單
const closeMenuOnMobile = () => {
  if (window.innerWidth <= 768) {
    isMenuActive.value = false
    isDropdownActive.value = false
    document.body.style.overflow = ''
  }
}

// 滾動到特定區塊的功能
const scrollToSection = async (sectionId) => {
  closeMenuOnMobile()

  if (route.path !== '/') {
    // 如果不在首頁 先到首頁
    await router.push({ name: 'Home', hash: `#${sectionId}` })
  } else {
    // 如果已經在首頁 直接滾動到目標區塊
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
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
  if ((isMenuActive.value || isDropdownActive.value) && navbar && !navbar.contains(event.target)) {
    isMenuActive.value = false
    isDropdownActive.value = false
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

.theme-toggle-wrapper {
  position: absolute;
  right: 2rem;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 6.4rem 1rem 2rem;
  background-color: var(--card-bg-alt);
  box-shadow: 0 2px 10px var(--shadow);
  position: fixed;
  top: 0;
  z-index: 1000;
  transition: all $transition-speed ease;

  &-logo {
    .logo {
      cursor: pointer;
      font-size: 1.8rem;
      font-weight: 700;
      text-decoration: none;
      color: var(--dark-text);
      position: relative;
      transition: color $transition-speed ease;
    }
  }

  &-menu {
    display: flex;
    gap: 2rem;
    align-items: center;
    background-color: var(--card-bg-alt);
  }

  &-item {
    cursor: pointer;
    text-decoration: none;
    color: var(--text-color);
    font-weight: 600;
    font-size: 1.1rem;
    padding: 0.5rem 0;
    position: relative;
    text-transform: uppercase;
    transition: color $transition-speed ease;

    &:hover,
    &.active-link {
      color: var(--primary-color);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--primary-color);
      transition: width $transition-speed ease;
    }

    &:hover::after,
    &.active-link::after {
      width: 100%;
    }
  }

  // 下拉選單樣式
  .nav-group {
    position: relative;

    .navbar-link {
      position: relative;
      display: inline-block;
      cursor: pointer;
      padding-right: 1.5rem;

      i {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        transition: transform 0.3s ease;
        font-size: 1.3rem;

        &.is-open {
          transform: translateY(-50%) rotate(180deg);
        }
      }
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      background-color: var(--card-bg-alt);
      box-shadow: 0 2px 10px var(--shadow);
      border-radius: 4px;
      min-width: 180px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: all 0.3s ease;
      z-index: 20;
      padding: 0;
      max-height: 0;
      overflow: hidden;
    }

    &.active .dropdown-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      padding: 0.5rem 0;
      max-height: 500px;
    }

    .dropdown-item {
      display: block;
      padding: 0.7rem 1.2rem;
      color: var(--text-color);
      text-decoration: none;
      text-transform: none;
      font-size: 0.95rem;
      transition: all 0.2s ease;

      &:hover {
        background-color: var(--accent-lighter);
        color: var(--primary-color);
      }
    }

    @media (min-width: 769px) {
      &:hover .dropdown-menu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
        padding: 0.5rem 0;
        max-height: 500px;
      }

      &:hover i {
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }

  &-burger {
    display: none;
    cursor: pointer;
    color: var(--text-color);
    background: transparent;
    border: none;
    padding: 0;
    transition: all $transition-speed ease;

    &:hover {
      color: var(--primary-color);
    }

    &.is-active {
      color: var(--primary-color);
    }

    i {
      font-size: 1.8rem;
      transition: all $transition-speed ease;
      display: block;
    }

    &.is-active i {
      transform: rotate(180deg);
    }

    &:not(.is-active) i {
      color: var(--text-color);
      transform: rotate(0);
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
      right: 5rem;
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
      background-color: var(--card-bg-alt);
      box-shadow: 0 5px 10px var(--shadow);

      &.is-active {
        max-height: 500px;
        opacity: 1;
        visibility: visible;
        padding: 1rem 0;
      }

      .navbar-item {
        width: 80%;
        padding: 0.75rem 0;
        text-align: center;
        opacity: 0;
        transform: translateY(-10px);
        transition: all $transition-speed ease;
      }

      &.is-active .navbar-item {
        opacity: 1;
        transform: translateY(0);
        transition-delay: 0.1s;
      }

      // 移動版下拉選單
      .nav-group {
        width: 80%;
        text-align: center;

        .navbar-link {
          width: 100%;
          display: block;
          text-align: center;
          padding: 0.75rem 1rem;
          position: relative;

          .dropdown-icon {
            right: 1rem;
          }
        }

        .dropdown-menu {
          position: static;
          width: 100%;
          box-shadow: none;
          background-color: var(--accent-lighter);
          border-radius: 4px;
        }

        .dropdown-item {
          text-align: center;
          padding: 0.75rem 1rem;
        }
      }
    }
  }
}
</style>
