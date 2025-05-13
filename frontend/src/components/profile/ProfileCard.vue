<template>
  <div class="profile-card">
    <div class="profile-left">
      <div class="profile-image">
        <img :src="avatarImg" alt="個人照片" />
      </div>
      <h2 class="profile-name">黃翰靖</h2>
      <div class="profile-divider"></div>
      <p class="profile-title">前端開發工程師</p>
    </div>

    <div class="profile-right">
      <h1 class="hello-title">about me</h1>
      <h3 class="subtitle">從學習到實作，一步步走進前端的世界</h3>

      <div class="action-buttons">
        <router-link to="/projects" class="btn primary">專案作品</router-link>
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
    </div>
  </div>
</template>

<script setup>
import avatarImg from '@/assets/images/avatar/avatar.jpg'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.profile-card {
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  background: var(--card-bg-alt);
  box-shadow: 0 8px 30px var(--shadow);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  transition: all $transition-speed ease;
}

.profile-left {
  flex: 0 0 40%;
  background: var(--card-bg);
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all $transition-speed ease;
}

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 4px solid var(--background);
  box-shadow: 0 5px 15px var(--shadow);
  transition: all $transition-speed ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.profile-name {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--dark-text);
  transition: color $transition-speed ease;
}

.profile-divider {
  width: 80px;
  height: 3px;
  background: var(--primary-color);
  margin: 1rem auto;
  transition: all $transition-speed ease;
}

.profile-title {
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-color);
  margin-bottom: 2rem;
  transition: color $transition-speed ease;
}

.profile-right {
  flex: 1;
  padding: 3rem 2.5rem;
}

.hello-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--dark-text);
  margin: 0 0 1rem;
  text-transform: uppercase;
  transition: color $transition-speed ease;
}

.subtitle {
  font-size: 1.5rem;
  color: var(--dark-text);
  margin-bottom: 2rem;
  font-weight: 500;
  line-height: 1.25;
  transition: color $transition-speed ease;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 100px;
  font-weight: 600;
  text-decoration: none;
  transition: all $transition-speed ease;

  @media (max-width: $mobile-breakpoint) {
    padding: 0.7rem 1.7rem;
  }

  &.primary {
    background: var(--primary-color);
    color: white;

    &:hover {
      filter: brightness(90%);
    }
  }
}

.intro-text {
  color: var(--text-color);
  line-height: 1.6;
  transition: color $transition-speed ease;

  p {
    margin-bottom: 1rem;
  }
}

@media (max-width: $mobile-breakpoint) {
  .profile-card {
    flex-direction: column;
  }

  .profile-left,
  .profile-right {
    flex: 1;
    width: 100%;
  }

  .hello-title {
    font-size: 2.5rem;
  }
}
</style>
