<template>
  <div class="projects-container">
    <div class="card-wrapper">
      <div class="project-card design">
        <div class="card-content">
          <div class="card-accent"></div>
          <div class="content-main">
            <div class="icon-container">
              <div class="icon-circle">
                <span class="icon">D</span>
              </div>
            </div>
            <h2>前往設計作品</h2>
            <p>探索我的平面設計、UI/UX與視覺創意專案</p>
          </div>
          <div class="arrow-container">
            <span class="arrow arrow-right">→</span>
          </div>
        </div>
      </div>

      <div class="project-card web">
        <div class="card-content">
          <div class="card-accent"></div>
          <div class="content-main">
            <div class="icon-container">
              <div class="icon-circle">
                <span class="icon">W</span>
              </div>
            </div>
            <h2>前往網頁作品</h2>
            <p>瀏覽我的網頁開發、前端與互動專案</p>
          </div>
          <div class="arrow-container">
            <span class="arrow arrow-left">←</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.projects-container {
  min-height: 100vh;
  width: 100%;
  color: var(--text-color);
  background-color: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}

.card-wrapper {
  display: flex;
  gap: 2.5rem;
  justify-content: center;

  @media (max-width: $mobile-breakpoint) {
    flex-direction: column;
    align-items: center;
  }
}

.project-card {
  flex: 1;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px var(--shadow);
  transition: all $transition-speed;
  cursor: pointer;
  aspect-ratio: 3/4; // 垂直導向的卡片
  max-width: 320px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(71, 85, 105, 0.12);

    .arrow-right {
      transform: translateX(6px);
    }

    .arrow-left {
      transform: translateX(-6px);
    }

    .icon-circle {
      transform: scale(1.1);
      box-shadow: 0 0 0 4px var(--accent-lighter);
    }

    .card-accent {
      height: 65%;
    }
  }

  &.design {
    .card-accent {
      background: linear-gradient(135deg, var(--accent-light) 0%, var(--accent-lighter) 100%);
    }
  }

  &.web {
    .card-accent {
      background: linear-gradient(135deg, var(--accent-light) 0%, var(--accent-lighter) 100%);
    }
  }
}

.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;
  z-index: 1;
  transition: all $transition-speed;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  opacity: 1;
}

.card-content {
  position: relative;
  z-index: 2;
  color: var(--dark-text);
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content-main {
  display: flex;
  flex-direction: column;
  margin-top: auto;

  h2 {
    font-size: 1.8rem;
    margin: 0 0 0.8rem;
    font-weight: 600;
    color: var(--dark-text);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 40px;
      height: 3px;
      background: var(--primary-color);
      border-radius: 2px;
    }
  }

  p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.4;
    max-width: 100%;
    color: var(--text-color);
  }
}

.icon-container {
  margin-bottom: 1.5rem;
}

.icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--card-bg-alt);
  box-shadow: 0 4px 12px var(--shadow);
  margin-bottom: 1rem;
  transition: all $transition-speed;
  border: 2px solid var(--border-color);
}

.icon {
  color: var(--primary-color);
  font-size: 1.8rem;
  font-weight: 700;
}

.arrow-container {
  display: flex;
  align-items: center;
  margin-top: 2rem;
}

.arrow {
  display: inline-block;
  font-size: 2rem;
  font-weight: normal;
  line-height: 1;
  color: var(--primary-color);
  transition: transform $transition-speed;
  background: var(--accent-lighter);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: $mobile-breakpoint) {
  .project-card {
    aspect-ratio: 5/6;
    max-width: 100%;
    width: 85%;

    .content-main h2 {
      font-size: 1.6rem;
    }

    .content-main p {
      font-size: 0.9rem;
    }
  }
}

@media (max-width: 500px) {
  .projects-container {
    padding: 1rem;
  }

  .card-wrapper {
    gap: 1.5rem;
  }

  .project-card {
    aspect-ratio: 3/4;
    width: 100%;
  }
}
</style>
