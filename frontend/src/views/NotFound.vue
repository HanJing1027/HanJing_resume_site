<template>
  <div class="not-found-container">
    <div class="content-box">
      <h1 class="error-code">404</h1>
      <h2 class="error-title">這個頁面走丟了</h2>
      <p class="error-message">也許是走錯了路，或是這個作品已經悄悄退場！</p>
      <div class="action-buttons">
        <router-link to="/" class="home-button">返回首頁</router-link>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
@use '@/assets/styles/_variables.scss' as *;
@use '@/assets/styles/_mixins.scss' as *;

.not-found-container {
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background: var(--background);
}

.content-box {
  max-width: 600px;
  padding: 3rem 2.5rem;
  border-radius: 20px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  box-shadow: 0 15px 40px var(--shadow);
  transition: all $transition-speed ease;
}

.error-code {
  position: relative;
  font-size: 8rem;
  font-weight: 800;
  margin: 0 0 1rem;
  line-height: 0.9;
  color: var(--primary-color);

  // 頂面陰影
  text-shadow:
    1px 1px 0 #ff7f50,
    2px 2px 0 #ff7f50;

  // 使用實際的橙色值創造 3D 效果
  text-shadow:
    1px 1px 0px #e56b3e,
    2px 2px 0px #d65a33,
    3px 3px 0px #c74928,
    4px 4px 0px #b8381d,
    5px 5px 0px #a92712;

  animation: levitate 3s ease-in-out infinite;
}

@keyframes levitate {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.error-title {
  font-size: 2rem;
  margin: 1.5rem 0 1rem;
  color: var(--dark-text);
  font-weight: 600;
}

.error-message {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  color: var(--text-color);
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.home-button {
  @include base-button(0.8rem 2rem);
  text-decoration: none;
  min-width: 160px;
}

.icon {
  margin-right: 0.5rem;
  font-size: 1rem;
}

@media (max-width: calc($mobile-breakpoint - 1px)) {
  .content-box {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }

  .error-code {
    font-size: 6rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .error-message {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .home-button {
    min-width: 140px;
    padding: 0.7rem 1.5rem;
  }
}
</style>
