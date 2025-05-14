<template>
  <div class="profile-card">
    <div class="profile-left">
      <div class="profile-image-container">
        <div class="profile-image">
          <img :src="avatarImg" alt="個人照片" />
        </div>
        <div class="profile-shape shape-1"></div>
        <div class="profile-shape shape-2"></div>
      </div>
      <h2 class="profile-name">黃翰靖</h2>
      <div class="profile-divider"></div>
      <p class="profile-title">前端開發工程師</p>
    </div>

    <div class="profile-right">
      <div class="header-container">
        <h1 class="hello-title">about me</h1>
        <div class="decorative-line"></div>
        <h3 class="subtitle">
          <span class="typed-text">{{ displayedText }}</span>
          <span class="cursor" :class="{ typing: isTyping }"></span>
        </h3>
      </div>

      <div class="intro-text">
        <p>
          我是一位致力於前端開發領域的轉職者，透過自學掌握 Vue.js
          框架，熱衷於建立直覺且美觀的使用者介面。
        </p>
        <p>
          擁有扎實的學習能力和解決問題的熱情，透過專案實作不斷精進自己的前端技術。期待在實務中累積更多經驗，並為團隊貢獻實際價值。
        </p>
      </div>

      <div class="action-buttons">
        <router-link to="/projects" class="btn primary">專案作品</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import avatarImg from '@/assets/images/avatar/avatar.jpg'
import { ref, onMounted } from 'vue'

const fullText = ['從學習到實作，一步步走進前端的世界', '讓每個專案，都成為前進的紀錄'] // 副標內容
const displayedText = ref('') // 已經顯示的文字
const isTyping = ref(true)
const isDeleting = ref(false)

let currentSubIndex = 0 // 當前副標題索引
let currentIndex = 0 // 當前字元索引

// 打字狀態
const typeText = () => {
  if (!isDeleting.value) {
    const currentSubtitle = fullText[currentSubIndex]

    if (currentIndex < currentSubtitle.length) {
      // 打字
      displayedText.value += currentSubtitle[currentIndex]
      currentIndex++
      isTyping.value = true

      setTimeout(() => {
        typeText()
      }, 100) // 每個字母之間的延遲
    } else {
      isTyping.value = false

      setTimeout(() => {
        deleteText()
      }, 2000)
    }
  }
}

// 刪除狀態
const deleteText = () => {
  if (!isTyping.value) {
    const currentSubtitle = fullText[currentSubIndex]

    if (currentIndex >= 0) {
      // 刪字
      displayedText.value = currentSubtitle.slice(0, currentIndex)
      currentIndex--
      isDeleting.value = true

      setTimeout(() => {
        deleteText()
      }, 50) // 每個字母之間的延遲
    } else {
      // 重置狀態
      isDeleting.value = false
      isTyping.value = true
      currentIndex = 0 // 重置索引避免越界打出 undefined

      // 切換下一個副標題
      currentSubIndex = (currentSubIndex + 1) % fullText.length

      setTimeout(() => {
        typeText()
      }, 500)
    }
  }
}

onMounted(() => {
  setTimeout(() => {
    typeText()
  }, 1000)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.profile-card {
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  background: var(--card-bg-alt);
  box-shadow: 0 15px 35px var(--shadow);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  transition: all $transition-speed ease;
}

.profile-left {
  flex: 0 0 35%;
  background: var(--card-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all $transition-speed ease;
  position: relative;
  z-index: 1;
  border-right: 1px solid var(--border-color);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 15px;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0));
    z-index: 0;
  }
}

.profile-image-container {
  position: relative;
  margin-bottom: 2.5rem;
}

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--card-bg-alt);
  box-shadow: 0 8px 25px var(--shadow);
  transition: all $transition-speed ease;
  position: relative;
  z-index: 2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.profile-shape {
  position: absolute;
  border-radius: 50%;
  z-index: 1;

  &.shape-1 {
    width: 70px;
    height: 70px;
    background-color: var(--accent-light);
    top: -15px;
    left: -15px;
  }

  &.shape-2 {
    width: 50px;
    height: 50px;
    background-color: var(--accent-lighter);
    bottom: 10px;
    right: -10px;
    opacity: 0.8;
  }
}

.profile-name {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--dark-text);
  transition: color $transition-speed ease;
  letter-spacing: 0.5px;
}

.profile-divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(to right, var(--primary-color), var(--primary-color-dark));
  margin: 1rem auto;
  transition: all $transition-speed ease;
  border-radius: 3px;
}

.profile-title {
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-color);
  margin-bottom: 2rem;
  transition: color $transition-speed ease;
}

.profile-right {
  flex: 1;
  padding: 3.5rem 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 15px;
    right: 15px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: var(--accent-lighter);
    opacity: 0.6;
    z-index: 0;
  }
}

.header-container {
  position: relative;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  z-index: 1;
}

.hello-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--dark-text);
  margin: 0;
  text-transform: uppercase;
  transition: color $transition-speed ease;
  position: relative;
}

.decorative-line {
  width: 80px;
  height: 3px;
  background: linear-gradient(to right, var(--primary-color), var(--primary-color-dark));
  opacity: 0.8;
  border-radius: 3px;
}

.subtitle {
  font-size: 1.5rem;
  color: var(--dark-text);
  font-weight: 500;
  line-height: 1.4;
  transition: all $transition-speed ease;
  display: flex;
  align-items: center;
  position: relative;
  min-height: 2.2rem;
}

.typed-text {
  display: inline-block;
  color: var(--dark-text);
}

.cursor {
  display: inline-block;
  width: 3px;
  height: 1.5rem;
  background-color: var(--primary-color);
  margin-left: 4px;
  border-radius: 1px;
  box-shadow: 0 0 5px rgba(var(--primary-color-rgb), 0.5);
  animation: blink 1.2s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);

  &.typing {
    animation: none;
    opacity: 1;
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
    transform: scaleY(1);
  }

  40% {
    opacity: 0.8;
    transform: scaleY(0.9);
  }

  50% {
    opacity: 0.4;
    transform: scaleY(0.5);
  }
}

.intro-text {
  color: var(--text-color);
  line-height: 1.7;
  transition: color $transition-speed ease;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;

  p {
    margin-bottom: 1rem;
  }
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  position: relative;
  z-index: 1;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 100px;
  font-weight: 600;
  text-decoration: none;
  transition: all $transition-speed ease;
  letter-spacing: 0.5px;

  @media (max-width: $mobile-breakpoint) {
    padding: 0.7rem 1.7rem;
  }

  &.primary {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-color-dark));
    color: white;
    border: none;
    transform: translateY(0);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.7s ease;
    }

    &:hover {
      transform: translateY(-3px);

      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(-1px);
    }
  }
}

@media (max-width: $mobile-breakpoint) {
  .profile-card {
    flex-direction: column;
    border-radius: 12px;
  }

  .profile-left {
    flex: none;
    width: 100%;
    padding: 2.5rem 1.5rem;
    border-right: none;
    border-bottom: 1px solid var(--border-color);

    &::after {
      display: none;
    }
  }

  .profile-right {
    padding: 2.5rem 1.5rem;
  }

  .profile-image {
    width: 220px;
    height: 220px;
  }

  .hello-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
    min-height: 1.8rem;
  }

  .cursor {
    height: 1.2rem;
  }

  .intro-text {
    font-size: 0.875rem;
  }

  .skills-container {
    justify-content: flex-end;
  }

  .action-buttons {
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>
