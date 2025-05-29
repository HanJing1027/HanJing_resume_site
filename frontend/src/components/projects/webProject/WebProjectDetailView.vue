<template>
  <div class="project-detail-container">
    <!-- 頂部導航區域 -->
    <div class="project-nav">
      <div class="nav-left">
        <button class="back-link" @click="goBack">
          <i class="bx bx-left-arrow-alt"></i> 上一頁
        </button>
      </div>
      <div class="nav-right">
        <span class="category-tag">
          {{ getCategoryName(project.categories[0]) }}
        </span>
      </div>
    </div>

    <!-- 專案標題 -->
    <h1 class="project-title">{{ project.title }}</h1>

    <!-- 輪播圖區域 -->
    <div class="project-image-slider">
      <div class="image-slider-wrapper">
        <swiper
          :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
          :slides-per-view="1"
          :space-between="0"
          :loop="project.images.length > 1"
          :pagination="{ clickable: true }"
          :navigation="project.images.length > 1"
          :autoplay="project.images.length > 1 ? { delay: 5000 } : false"
          class="project-swiper"
        >
          <swiper-slide v-for="(image, index) in project.images" :key="index">
            <div class="image-container">
              <img
                :src="image"
                :alt="`${project.title} - 圖片 ${index + 1}`"
                class="project-image"
                loading="lazy"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- 技術標籤 -->
    <div class="tech-tags">
      <span v-for="(tech, index) in project.technologies" :key="index" class="tech-tag">
        <i class="bx bx-code-block"></i> {{ tech }}
      </span>
    </div>

    <!-- 專案連結 -->
    <div class="project-links">
      <a v-if="project.link" :href="project.link" target="_blank" class="project-link">
        <i class="bx bx-link-external"></i>
        Link
      </a>
    </div>

    <!-- 專案說明 -->
    <div class="project-description">
      <h2>專案說明</h2>
      <p>{{ project.description }}</p>
      <p v-if="project.extendedDescription">{{ project.extendedDescription }}</p>
    </div>

    <!-- 專案資訊 -->
    <div class="project-info-section">
      <h2>專案資訊</h2>
      <div class="info-grid">
        <!-- 第一行：開發時間和專案類型 -->
        <div class="info-row top-row">
          <div class="info-item">
            <span class="info-label">開發時間</span>
            <span class="info-value">{{ formatDate(project.date) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">專案類型</span>
            <span class="info-value">{{ getCategoryName(project.categories[0]) }}</span>
          </div>
        </div>

        <!-- 第二行：技術總結 -->
        <div class="info-row">
          <div class="info-item tech-summary">
            <div class="info-header">
              <span class="info-label">技術總結</span>
              <button class="toggle-btn" @click="showAllTech = !showAllTech" v-if="isLongTechList">
                {{ showAllTech ? '收起' : '展開' }}
              </button>
            </div>
            <div class="info-value" :class="{ expanded: showAllTech, collapsible: isLongTechList }">
              {{ project.features.join('、 ') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 相關作品區域 -->
    <div class="related-projects">
      <h2 class="related-title">相關類別作品</h2>
      <div class="related-projects-scroll">
        <div
          v-for="relatedProject in relatedProjects"
          :key="relatedProject.id"
          class="related-project-item"
          @click="navigateToProject(relatedProject)"
        >
          <div class="related-image">
            <img :src="relatedProject.imageUrl" :alt="relatedProject.title" />
          </div>
          <div class="related-info">
            <h3>{{ relatedProject.title }}</h3>
            <span class="related-category">{{
              getCategoryName(relatedProject.categories[0])
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 頁面導航按鈕 -->
    <div class="navigation-buttons">
      <button class="nav-btn back-top" @click="scrollToTop">
        <i class="bx bx-arrow-to-top"></i>
        返回頂部
      </button>
      <router-link to="/projects/web" class="nav-btn all-projects">
        <i class="bx bx-code-alt"></i>
        所有網頁作品
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import {
  Navigation as SwiperNavigation,
  Pagination as SwiperPagination,
  Autoplay as SwiperAutoplay,
} from 'swiper/modules'
import { allWebProjects, webCategories } from '@/data/webProjectsData.js'

// 引入 Swiper 樣式
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const route = useRoute()
const router = useRouter()
const projectId = computed(() => parseInt(route.params.id))

// 取得專案資料
const project = computed(() => {
  const foundProject = allWebProjects.value.find((p) => p.id === projectId.value) || {}
  return {
    id: foundProject.id || 0,
    title: foundProject.title || '專案標題',
    description: foundProject.description || '專案說明內容...',
    extendedDescription: foundProject.extendedDescription || '',
    images: foundProject.images || [],
    technologies: foundProject.technologies || [],
    categories: foundProject.categories || [],
    date: foundProject.date || '',
    link: foundProject.link || '',
    features: foundProject.features || [],
  }
})

// 取得相關專案
const relatedProjects = computed(() => {
  return allWebProjects.value
    .filter(
      (p) =>
        p.id !== project.value.id && p.categories.some((c) => project.value.categories.includes(c))
    )
    .slice(0, 6) // 限制顯示數量
})

// 取得分類名稱
const getCategoryName = (categoryId) => {
  const category = webCategories.find((c) => c.id === categoryId)
  return category ? category.name : '未分類'
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
  })
}

const goBack = () => {
  router.back()
}

// 導航到指定專案
const navigateToProject = (project) => {
  router.push({
    name: 'WebProjectDetail',
    params: { id: project.id },
  })
}

// 返回頂部
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;
@use '@/assets/styles/_mixins.scss' as *;

.project-detail-container {
  cursor: default;
  width: 100%;
  max-width: 1080px;
  min-height: 100vh;
  margin: 5rem auto;
  padding: 1.5rem;
  color: var(--text-color);

  // 響應式設計
  @media (max-width: $tablet-breakpoint) {
    padding: 1rem;
    margin: 1rem auto;
    max-width: calc(100vw - 2rem);
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    margin: 0.5rem auto;
    max-width: calc(100vw - 1.5rem);
  }
}

// 頂部導航
.project-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;

  .back-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: var(--text-color);
    text-decoration: none;
    transition: all 0.25s ease;
    font-size: 1rem;
    font-weight: 500;
    background-color: transparent;
    border: none;

    i {
      font-size: 1.1rem;
      margin-right: 0.3rem;
    }

    &:hover {
      color: var(--primary-color);
      transform: translateX(-3px);
    }
  }

  .category-tag {
    background-color: rgba(var(--primary-color-rgb), 0.1);
    color: var(--primary-color);
    padding: 0.25rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }
}

// 專案標題
.project-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--dark-text);
  line-height: 1.2;
  word-wrap: break-word;

  @media (max-width: $tablet-breakpoint) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
}

// 輪播圖區域
.project-image-slider {
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--img-bg);
  width: 100%;
  aspect-ratio: 16/9;

  .image-slider-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .project-swiper {
    width: 100%;
    height: 100%;

    :deep(.swiper-wrapper) {
      height: 100%;
    }

    :deep(.swiper-slide) {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      overflow: hidden;
    }

    .image-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--img-bg);

      .project-image {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
        display: block;
      }
    }

    // 導航按鈕樣式
    :deep(.swiper-button-next),
    :deep(.swiper-button-prev) {
      color: white;
      background-color: rgba(var(--primary-color-rgb), 0.7);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      z-index: 10;

      &:after {
        font-size: 1rem;
        font-weight: bold;
      }
    }

    // 分頁指示器樣式
    :deep(.swiper-pagination) {
      bottom: 10px;
      z-index: 10;

      .swiper-pagination-bullet {
        background-color: white;
        opacity: 0.7;

        &-active {
          opacity: 1;
          background-color: var(--primary-color);
        }
      }
    }
  }

  // 響應式調整
  @media (max-width: $tablet-breakpoint) {
    margin-bottom: 1rem;
    border-radius: 6px;
    aspect-ratio: 4/3;

    :deep(.swiper-button-next),
    :deep(.swiper-button-prev) {
      display: none;
    }
  }
}

// 技術標籤
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  .tech-tag {
    display: inline-flex;
    align-items: center;
    background-color: var(--accent-lighter);
    color: var(--primary-color);
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
    transition: all 0.25s ease;

    i {
      margin-right: 0.4rem;
      font-size: 1rem;
    }

    &:hover {
      background-color: var(--accent-light);
      transform: translateY(-2px);
    }
  }
}

// 專案連結
.project-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  .project-link {
    @include base-button(0.7rem 1.5rem);

    i {
      font-size: 1.1rem;
    }
  }
}

// 專案說明
.project-description {
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--dark-text);
  }

  p {
    line-height: 1.8;
    margin-bottom: 1rem;
    color: var(--text-color);
  }
}

// 專案資訊區域
.project-info-section {
  margin-bottom: 3rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--dark-text);
  }

  .info-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .info-row {
    display: flex;
    gap: 1rem;
    width: 100%;

    &.top-row {
      .info-item {
        flex: 1;
        min-width: 0; // 防止溢出
      }
    }
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: 1rem;
    background-color: var(--card-bg);
    border-radius: 8px;
    border: 1px solid var(--border-color);
    width: 100%;

    &.tech-summary {
      .info-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.3rem;
      }

      .toggle-btn {
        background: none;
        border: none;
        color: var(--primary-color);
        font-size: 0.85rem;
        cursor: pointer;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;

        &:hover {
          background-color: rgba(var(--primary-color-rgb), 0.1);
        }
      }

      .info-value.collapsible {
        max-height: 80px;
        overflow-y: hidden;
        position: relative;
        transition: max-height 0.3s ease;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 30px;
          background: linear-gradient(transparent, var(--card-bg));
          pointer-events: none;
        }

        &.expanded {
          max-height: 300px;
          overflow-y: auto;

          &::after {
            display: none;
          }
        }
      }
    }

    .info-label {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--primary-color);
    }

    .info-value {
      font-size: 0.95rem;
      color: var(--dark-text);
      font-weight: 400;
      line-height: 1.5;
    }
  }

  // 響應式調整
  @media (max-width: $tablet-breakpoint) {
    .info-row.top-row {
      flex-direction: column;
    }
  }
}

// 相關作品
.related-projects {
  margin-bottom: 3rem;

  .related-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--dark-text);

    @media (max-width: $tablet-breakpoint) {
      font-size: 1.3rem;
      margin-bottom: 1rem;
    }
  }

  // 水平滾動容器
  .related-projects-scroll {
    display: flex;
    overflow-x: auto;
    gap: 1.5rem;
    max-width: 100%;
    padding-bottom: 1rem;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;

    // 自訂滾動條樣式
    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: var(--accent-lighter);
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--primary-color);
      border-radius: 8px;
    }

    .related-project-item {
      flex: 0 0 auto;
      width: 220px;
      min-width: 220px;
      cursor: pointer;
      border-radius: 8px;
      overflow: hidden;
      background-color: var(--card-bg);
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px var(--shadow);
      border: 1px solid var(--border-color);

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px var(--shadow);

        .related-image img {
          transform: scale(1.05);
        }

        .related-info h3 {
          color: var(--primary-color);
        }
      }

      .related-image {
        height: 0;
        padding-bottom: 66%;
        position: relative;
        background-color: var(--img-bg);

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
      }

      .related-info {
        padding: 1rem;

        h3 {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.3rem;
          color: var(--dark-text);
          transition: color 0.3s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .related-category {
          font-size: 0.8rem;
          color: var(--primary-color);
        }
      }
    }

    @media (max-width: $tablet-breakpoint) {
      gap: 1rem;
      padding-bottom: 0.8rem;

      &::-webkit-scrollbar {
        height: 4px;
      }

      .related-project-item {
        width: 180px;
        min-width: 180px;

        .related-info {
          padding: 0.8rem;

          h3 {
            font-size: 0.9rem;
          }

          .related-category {
            font-size: 0.75rem;
          }
        }
      }
    }
  }
}

// 導航按鈕
.navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;

  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    border-radius: 30px;
    border: none;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;

    i {
      font-size: 1.1rem;
    }

    &:hover {
      transform: translateY(-3px);
    }

    &.back-top {
      background-color: var(--card-bg);
      color: var(--text-color);
      border: 1px solid var(--border-color);

      &:hover {
        background-color: var(--card-bg-alt);
        box-shadow: 0 5px 15px var(--shadow);
      }
    }

    &.all-projects {
      background-color: var(--primary-color);
      color: white;

      &:hover {
        background-color: var(--primary-color-dark);
        box-shadow: 0 5px 15px rgba(var(--primary-color-rgb), 0.3);
      }
    }
  }

  @media (max-width: $tablet-breakpoint) {
    flex-direction: column;

    .nav-btn {
      width: 100%;
    }
  }
}
</style>
