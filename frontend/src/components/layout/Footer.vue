<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo-section">
        <div class="logo-container">
          <h2 class="footer-logo">HJ<span>.</span></h2>
        </div>
        <p class="tagline">一步步前進前端的世界</p>
      </div>

      <div class="footer-columns">
        <div class="footer-column">
          <h3>快速導航</h3>
          <ul class="footer-links">
            <li><router-link to="/">首頁</router-link></li>
            <li><router-link to="/projects">作品集</router-link></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>聯絡資訊</h3>
          <div class="contact-info">
            <div class="contact-item">
              <i class="bx bxs-map"></i>
              <span>高雄市，台灣</span>
            </div>
            <div class="contact-item">
              <i class="bx bx-mobile-alt"></i>
              <span>+886 963 387 585</span>
            </div>
            <div class="contact-item">
              <i class="bx bx-envelope"></i>
              <span>leran417@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="copyright">
        <p>Copyright © {{ currentYear }} <span>黃翰靖</span>. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

// 自動取得當前年份
const currentYear = computed(() => {
  return new Date().getFullYear()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.footer {
  cursor: default;
  position: relative;
  background-color: var(--card-bg-alt);
  color: var(--text-color);
  overflow: hidden;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 2.5rem 1.5rem 1.5rem;
  }
}

.footer-logo-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 900px) {
    align-items: flex-start; // 變更：從居中到靠左
    text-align: left; // 變更：從居中到靠左
  }
}

.logo-container {
  margin-bottom: 1rem;
}

.footer-logo {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;

  span {
    color: var(--primary-color);
  }

  @media (max-width: 900px) {
    font-size: 2.2rem; // 變更：調整小螢幕上的字體大小
  }
}

.tagline {
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 1.5rem;

  @media (max-width: 900px) {
    margin-bottom: 1.2rem; // 變更：調整間距
  }
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: left; // 變更：從居中到靠左
  }
}

.footer-column {
  h3 {
    position: relative;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    color: var(--primary-color);

    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 3px;
      width: 50px;
      background: linear-gradient(
        90deg,
        var(--primary-color) 0%,
        rgba(var(--primary-color-rgb), 0.3) 100%
      );
      border-radius: 2px;

      @media (max-width: 768px) {
        left: 0;
        transform: none;
        width: 40px;
      }
    }
  }

  p {
    line-height: 1.7;
    opacity: 0.8;
  }
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 0.75rem;

    a {
      position: relative;
      color: var(--text-color);
      opacity: 0.8;
      text-decoration: none;
      transition: all 0.3s ease;

      @media (hover: hover) {
        &:hover {
          padding-left: 0.5rem;
          color: var(--primary-color);

          &:before {
            transform: translateX(5px);
          }
        }
      }
    }
  }
}

.contact-info {
  .contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      justify-content: flex-start; // 變更：從居中到靠左
    }

    i {
      color: var(--primary-color);
      margin-right: 0.75rem;
      font-size: 1rem;
      min-width: 16px; // 新增：確保圖標寬度一致
      text-align: center; // 新增：圖標居中對齊
    }

    span {
      opacity: 0.8;
    }
  }
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  border-top: 1px solid var(--border-color);
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.2rem 1.5rem;
    margin-top: 0.5rem;
  }
}

.copyright {
  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.8;

    span {
      color: var(--primary-color);
      font-weight: 600;
    }

    @media (max-width: 768px) {
      font-size: 0.85rem;
    }
  }
}
</style>
