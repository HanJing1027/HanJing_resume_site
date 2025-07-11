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
          :space-between="10"
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

    <!-- 專案連結 -->
    <div class="project-links">
      <a v-if="project.link" :href="project.link" target="_blank" class="project-link">
        <i class="bx bx-link-external"></i>
        Link
      </a>

      <button
        v-if="project.downloadReadme"
        class="project-link"
        @click="downloadReadme(project.downloadReadme)"
      >
        <i class="bx bx-cloud-download"></i>
        下載 README
      </button>
    </div>

    <!-- 技術標籤 -->
    <div class="tech-tags-section">
      <div class="tech-header" @click="toggleTechTags">
        <div class="header-left">
          <div class="tech-icon">
            <i class="bx bx-code-alt"></i>
          </div>
          <h3 class="tech-title">使用技術</h3>
          <span class="tech-count">({{ project.technologies.length }} 項)</span>
        </div>
        <button class="toggle-btn" :class="{ expanded: isTechTagsExpanded }">
          <i class="bx" :class="isTechTagsExpanded ? 'bx-chevron-up' : 'bx-chevron-down'"></i>
        </button>
      </div>

      <transition name="tech-collapse">
        <div v-if="isTechTagsExpanded" class="tech-tags">
          <div
            v-for="(tech, index) in project.technologies"
            :key="index"
            class="tech-tag"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <i class="bx bx-code-block"></i>
            <span>{{ tech }}</span>
          </div>
        </div>
      </transition>
    </div>

    <!-- 專案說明 -->
    <div class="project-description">
      <div class="description-header">
        <div class="header-content">
          <div class="desc-icon">
            <i class="bx bx-file-blank"></i>
          </div>
          <h2>專案說明</h2>
        </div>
      </div>

      <div class="description-content">
        <!-- 基本說明 -->
        <div class="basic-description">
          <p>{{ project.description }}</p>
        </div>

        <!-- 詳細說明 -->
        <div v-if="project.extendedDescription" class="extended-description-section">
          <div class="extended-header" @click="toggleExtendedDesc">
            <div class="extended-info">
              <i class="bx bx-detail"></i>
              <span class="extended-title">詳細說明</span>
            </div>
            <button class="expand-btn" :class="{ expanded: isExtendedDescExpanded }">
              <i
                class="bx"
                :class="isExtendedDescExpanded ? 'bx-chevron-up' : 'bx-chevron-down'"
              ></i>
            </button>
          </div>

          <transition name="extended-collapse">
            <div v-if="isExtendedDescExpanded" class="extended-content">
              <p>{{ project.extendedDescription }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- 專案資訊 -->
    <div class="project-info-section">
      <div class="info-header">
        <div class="header-content">
          <div class="info-icon">
            <i class="bx bx-info-circle"></i>
          </div>
          <h2>專案資訊</h2>
        </div>
      </div>

      <div class="info-grid">
        <!-- 第一行：開發時間和專案類型 -->
        <div class="info-row top-row">
          <div class="info-item">
            <div class="item-header">
              <i class="bx bx-calendar"></i>
              <span class="info-label">開發時間</span>
            </div>
            <span class="info-value">{{ formatDate(project.date) }}</span>
          </div>
          <div class="info-item">
            <div class="item-header">
              <i class="bx bx-category"></i>
              <span class="info-label">專案類型</span>
            </div>
            <span class="info-value">{{ getCategoryName(project.categories[0]) }}</span>
          </div>
        </div>

        <!-- 第二行：技術功能總結 -->
        <div class="info-row">
          <div class="info-item tech-summary-collapsible full-width">
            <div class="summary-header" @click="toggleFeatures">
              <div class="header-left">
                <div class="summary-icon">
                  <i class="bx bx-list-check"></i>
                </div>
                <div class="summary-info">
                  <span class="info-label">技術、功能總結</span>
                  <span class="feature-count">({{ project.features.length }} 項)</span>
                </div>
              </div>
              <button class="toggle-btn" :class="{ expanded: isFeaturesExpanded }">
                <i class="bx" :class="isFeaturesExpanded ? 'bx-chevron-up' : 'bx-chevron-down'"></i>
              </button>
            </div>

            <transition name="features-collapse">
              <div v-if="isFeaturesExpanded" class="features-content">
                <div class="features-grid">
                  <div
                    v-for="(feature, index) in project.features"
                    :key="index"
                    class="feature-item"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                  >
                    <i class="bx bx-check-circle"></i>
                    <span>{{ feature }}</span>
                  </div>
                </div>
              </div>
            </transition>
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
import { computed, ref } from 'vue'
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
    id: foundProject.id,
    title: foundProject.title,
    description: foundProject.description,
    extendedDescription: foundProject.extendedDescription,
    images: foundProject.images,
    technologies: foundProject.technologies,
    categories: foundProject.categories,
    date: foundProject.date,
    link: foundProject.link,
    downloadReadme: foundProject.downloadReadme,
    features: foundProject.features,
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

// 展開狀態
const isTechTagsExpanded = ref(false)
const isExtendedDescExpanded = ref(false)
const isFeaturesExpanded = ref(false)

// 切換技術標籤展開狀態
const toggleTechTags = () => {
  isTechTagsExpanded.value = !isTechTagsExpanded.value
}

// 切換擴展說明展開狀態
const toggleExtendedDesc = () => {
  isExtendedDescExpanded.value = !isExtendedDescExpanded.value
}

// 切換功能總結展開狀態
const toggleFeatures = () => {
  isFeaturesExpanded.value = !isFeaturesExpanded.value
}

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

// 下載專案 README 檔案
const downloadReadme = (filename) => {
  const link = document.createElement('a')
  link.href = `/readmes/${filename}`
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
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
  user-select: none;
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

.tech-tags-section {
  margin-bottom: 2rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  @media (hover: hover) {
    &:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    }
  }

  .tech-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 1px solid transparent;
    background-color: rgba(var(--primary-color-rgb), 0.02);

    @media (hover: hover) {
      &:hover {
        .toggle-btn {
          transform: scale(1.1);
        }
      }
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;

      .tech-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(
          135deg,
          var(--primary-color),
          rgba(var(--primary-color-rgb), 0.8)
        );
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          color: white;
          font-size: 1.2rem;
        }
      }

      .tech-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--dark-text);
        margin: 0;
        transition: color 0.3s ease;
      }

      .tech-count {
        font-size: 0.85rem;
        color: var(--text-color);
        background-color: rgba(var(--primary-color-rgb), 0.1);
        padding: 0.25rem 0.7rem;
        border-radius: 15px;
        font-weight: 500;
      }
    }

    .toggle-btn {
      background: rgba(var(--primary-color-rgb), 0.1);
      border: none;
      border-radius: 8px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      color: var(--primary-color);

      &:hover {
        background: rgba(var(--primary-color-rgb), 0.2);
      }

      &.expanded {
        background: var(--primary-color);
        color: white;
      }

      i {
        font-size: 1.3rem;
        transition: transform 0.3s ease;
      }
    }
  }

  .tech-tags {
    padding: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;

    .tech-tag {
      display: inline-flex;
      align-items: center;
      background: linear-gradient(
        135deg,
        var(--accent-lighter),
        rgba(var(--primary-color-rgb), 0.08)
      );
      color: var(--primary-color);
      padding: 0.6rem 1rem;
      border-radius: 25px;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.3s ease;
      border: 1px solid rgba(var(--primary-color-rgb), 0.15);
      opacity: 0;
      transform: translateY(20px);
      animation: techTagFadeIn 0.4s ease forwards;

      i {
        margin-right: 0.6rem;
        font-size: 1rem;
        transition: transform 0.3s ease;
      }

      span {
        font-weight: 500;
      }

      @media (hover: hover) {
        &:hover {
          background: linear-gradient(
            135deg,
            var(--accent-light),
            rgba(var(--primary-color-rgb), 0.15)
          );
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(var(--primary-color-rgb), 0.2);
          border-color: rgba(var(--primary-color-rgb), 0.3);

          i {
            transform: rotate(360deg);
          }
        }
      }
    }
  }

  // 響應式調整
  @media (max-width: $tablet-breakpoint) {
    .tech-header {
      padding: 1.2rem;

      .header-left {
        gap: 0.8rem;

        .tech-icon {
          width: 36px;
          height: 36px;

          i {
            font-size: 1.1rem;
          }
        }

        .tech-title {
          font-size: 1.1rem;
        }

        .tech-count {
          font-size: 0.8rem;
          padding: 0.2rem 0.6rem;
        }
      }

      .toggle-btn {
        width: 36px;
        height: 36px;

        i {
          font-size: 1.2rem;
        }
      }
    }

    .tech-tags {
      padding: 1.2rem;
      gap: 0.6rem;

      .tech-tag {
        padding: 0.5rem 0.8rem;
        font-size: 0.85rem;

        i {
          margin-right: 0.5rem;
          font-size: 0.9rem;
        }
      }
    }
  }
}

// 術標籤展開收縮動畫
.tech-collapse-enter-active,
.tech-collapse-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
  will-change: max-height, opacity, transform;
}

.tech-collapse-enter-from {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.tech-collapse-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.tech-collapse-enter-to {
  max-height: 800px;
  opacity: 1;
  transform: translateY(0);
}

.tech-collapse-leave-from {
  max-height: 800px;
  opacity: 1;
  transform: translateY(0);
}

// 技術標籤逐個顯示動畫
@keyframes techTagFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 專案連結
.project-links {
  display: flex;
  gap: 10px;
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
  background: linear-gradient(135deg, var(--card-bg), rgba(var(--card-bg), 0.8));
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  .description-header {
    padding: 1.5rem;
    background-color: rgba(var(--primary-color-rgb), 0.02);
    border-bottom: 1px solid var(--border-color);

    .header-content {
      display: flex;
      align-items: center;
      gap: 1rem;

      .desc-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(
          135deg,
          var(--primary-color),
          rgba(var(--primary-color-rgb), 0.8)
        );
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          color: white;
          font-size: 1.2rem;
        }
      }

      h2 {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--dark-text);
        margin: 0;
        transition: color 0.3s ease;
      }
    }
  }

  .description-content {
    padding: 1.5rem;

    .basic-description {
      margin-bottom: 1rem;

      p {
        line-height: 1.6;
        color: var(--text-color);
        white-space: pre-wrap;
        margin: 0;
        font-size: 0.95rem;
      }
    }

    .extended-description-section {
      border-top: 1px solid var(--border-color);
      padding-top: 1rem;

      .extended-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.8rem 1rem;
        background-color: rgba(var(--primary-color-rgb), 0.05);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 0.5rem;

        @media (hover: hover) {
          &:hover {
            .expand-btn {
              transform: scale(1.1);
            }
          }
        }

        .extended-info {
          display: flex;
          align-items: center;
          gap: 0.8rem;

          i {
            font-size: 1.1rem;
            color: var(--primary-color);
          }

          .extended-title {
            font-size: 0.95rem;
            font-weight: 500;
            color: var(--dark-text);
            transition: color 0.3s ease;
          }
        }

        .expand-btn {
          background: rgba(var(--primary-color-rgb), 0.1);
          border: none;
          border-radius: 6px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--primary-color);

          @media (hover: hover) {
            &:hover {
              background: rgba(var(--primary-color-rgb), 0.2);
            }
          }

          &.expanded {
            background: var(--primary-color);
            color: white;
          }

          i {
            font-size: 1.1rem;
            transition: transform 0.3s ease;
          }
        }
      }

      .extended-content {
        padding: 1rem;
        background-color: rgba(var(--accent-lighter), 0.3);
        border-radius: 8px;
        border: 1px solid rgba(var(--primary-color-rgb), 0.1);

        p {
          line-height: 1.6;
          color: var(--text-color);
          white-space: pre-wrap;
          margin: 0;
          font-size: 0.95rem;
          opacity: 0;
          transform: translateY(10px);
          animation: fadeInUp 0.4s ease forwards;
        }
      }
    }
  }

  // 響應式調整
  @media (max-width: $tablet-breakpoint) {
    .description-header {
      padding: 1.2rem;

      .header-content {
        gap: 0.8rem;

        .desc-icon {
          width: 36px;
          height: 36px;

          i {
            font-size: 1.1rem;
          }
        }

        h2 {
          font-size: 1.1rem;
        }
      }
    }

    .description-content {
      padding: 1.2rem;

      .basic-description p {
        font-size: 0.9rem;
      }

      .extended-description-section {
        .extended-header {
          padding: 0.7rem 0.8rem;

          .extended-info {
            gap: 0.6rem;

            i {
              font-size: 1rem;
            }

            .extended-title {
              font-size: 0.9rem;
            }
          }

          .expand-btn {
            width: 28px;
            height: 28px;

            i {
              font-size: 1rem;
            }
          }
        }

        .extended-content {
          padding: 0.8rem;

          p {
            text-align: justify;
            font-size: 0.9rem;
            white-space: pre-wrap;
          }
        }
      }
    }
  }
}

// 擴展說明展開收縮動畫
.extended-collapse-enter-active,
.extended-collapse-leave-active {
  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.extended-collapse-enter-from,
.extended-collapse-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.extended-collapse-enter-to,
.extended-collapse-leave-from {
  max-height: 300px;
  opacity: 1;
  transform: translateY(0);
}

// 內容淡入動畫
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 專案資訊區域 - 完整重寫
.project-info-section {
  margin-bottom: 3rem;
  background: linear-gradient(135deg, var(--card-bg), rgba(var(--card-bg), 0.8));
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  @media (hover: hover) {
    &:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    }
  }

  .info-header {
    padding: 1.5rem;
    background-color: rgba(var(--primary-color-rgb), 0.02);
    border-bottom: 1px solid var(--border-color);

    .header-content {
      display: flex;
      align-items: center;
      gap: 1rem;

      .info-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(
          135deg,
          var(--primary-color),
          rgba(var(--primary-color-rgb), 0.8)
        );
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          color: white;
          font-size: 1.2rem;
        }
      }

      h2 {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--dark-text);
        margin: 0;
      }
    }
  }

  .info-grid {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .info-row {
    display: flex;
    gap: 1.5rem;
    width: 100%;

    &.top-row {
      .info-item {
        flex: 1;
        min-width: 0;
      }
    }
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.2rem;
    background: linear-gradient(
      135deg,
      rgba(var(--primary-color-rgb), 0.05),
      rgba(var(--accent-lighter), 0.3)
    );
    border-radius: 10px;
    border: 1px solid rgba(var(--primary-color-rgb), 0.1);
    transition: all 0.3s ease;

    @media (hover: hover) {
      &:hover {
        background: linear-gradient(
          135deg,
          rgba(var(--primary-color-rgb), 0.08),
          rgba(var(--accent-lighter), 0.4)
        );
        border-color: rgba(var(--primary-color-rgb), 0.2);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }

    .item-header {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      i {
        font-size: 1.2rem;
        color: var(--primary-color);
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(var(--primary-color-rgb), 0.1);
        border-radius: 6px;
        flex-shrink: 0;
      }

      .info-label {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--primary-color);
      }
    }

    .info-value {
      font-size: 1rem;
      color: var(--dark-text);
      font-weight: 500;
      line-height: 1.5;
      margin-left: 2.2rem;
    }

    // 技術功能總結 - 全寬度版本
    &.tech-summary-collapsible {
      padding: 0;
      background: transparent;
      border: none;
      box-shadow: none;

      &.full-width {
        flex: 1;
        width: 100%;
      }

      &:hover {
        background: transparent;
        transform: none;
        box-shadow: none;
      }

      .summary-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.2rem;
        background: linear-gradient(
          135deg,
          rgba(var(--primary-color-rgb), 0.05),
          rgba(var(--accent-lighter), 0.2)
        );
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid rgba(var(--primary-color-rgb), 0.1);

        @media (hover: hover) {
          &:hover {
            background: linear-gradient(
              135deg,
              rgba(var(--primary-color-rgb), 0.08),
              rgba(var(--accent-lighter), 0.3)
            );
            border-color: rgba(var(--primary-color-rgb), 0.2);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

            .summary-info .info-label {
              color: var(--primary-color-dark);
            }

            .toggle-btn {
              transform: scale(1.1);
            }
          }
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;

          .summary-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(
              135deg,
              var(--primary-color),
              rgba(var(--primary-color-rgb), 0.8)
            );
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;

            i {
              color: white;
              font-size: 1.2rem;
            }
          }

          .summary-info {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;

            .info-label {
              font-size: 0.95rem;
              font-weight: 600;
              color: var(--dark-text);
              transition: color 0.3s ease;
            }

            .feature-count {
              font-size: 0.8rem;
              color: var(--text-color);
              background-color: rgba(var(--primary-color-rgb), 0.1);
              padding: 0.2rem 0.6rem;
              border-radius: 12px;
              font-weight: 500;
              align-self: flex-start;
            }
          }
        }

        .toggle-btn {
          background: rgba(var(--primary-color-rgb), 0.1);
          border: none;
          border-radius: 8px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--primary-color);

          @media (hover: hover) {
            &:hover {
              background: rgba(var(--primary-color-rgb), 0.2);
            }
          }

          &.expanded {
            background: var(--primary-color);
            color: white;
          }

          i {
            font-size: 1.3rem;
          }
        }
      }

      .features-content {
        margin-top: 1rem;
        padding: 1.2rem;
        background: linear-gradient(
          135deg,
          rgba(var(--accent-lighter), 0.2),
          rgba(var(--primary-color-rgb), 0.03)
        );
        border-radius: 10px;
        border: 1px solid rgba(var(--primary-color-rgb), 0.1);

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 0.8rem;

          .feature-item {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            padding: 0.8rem 1rem;
            background-color: rgba(var(--card-bg), 0.9);
            border-radius: 8px;
            border: 1px solid rgba(var(--primary-color-rgb), 0.1);
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
            animation: featureSlideIn 0.4s ease forwards;

            i {
              font-size: 1.1rem;
              color: var(--primary-color);
              flex-shrink: 0;
            }

            span {
              font-size: 0.9rem;
              color: var(--dark-text);
              line-height: 1.4;
              font-weight: 500;
            }

            @media (hover: hover) {
              &:hover {
                background-color: var(--card-bg);
                border-color: rgba(var(--primary-color-rgb), 0.2);
                transform: translateY(-2px);
                box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
              }
            }
          }
        }
      }
    }
  }

  // 響應式調整
  @media (max-width: $tablet-breakpoint) {
    .info-header {
      padding: 1.2rem;

      .header-content {
        gap: 0.8rem;

        .info-icon {
          width: 36px;
          height: 36px;

          i {
            font-size: 1.1rem;
          }
        }

        h2 {
          font-size: 1.1rem;
        }
      }
    }

    .info-grid {
      padding: 1.2rem;
      gap: 1.2rem;
    }

    .info-row.top-row {
      flex-direction: column;
      gap: 1rem;
    }

    .info-item {
      padding: 1rem;

      .item-header {
        gap: 0.6rem;

        i {
          font-size: 1.1rem;
          width: 22px;
          height: 22px;
        }

        .info-label {
          font-size: 0.85rem;
        }
      }

      .info-value {
        font-size: 0.9rem;
        margin-left: 2rem;
      }

      &.tech-summary-collapsible {
        .summary-header {
          padding: 1rem;

          .header-left {
            gap: 0.8rem;

            .summary-icon {
              width: 36px;
              height: 36px;

              i {
                font-size: 1.1rem;
              }
            }

            .summary-info {
              .info-label {
                font-size: 0.9rem;
              }

              .feature-count {
                font-size: 0.75rem;
                padding: 0.15rem 0.5rem;
              }
            }
          }

          .toggle-btn {
            width: 36px;
            height: 36px;

            i {
              font-size: 1.2rem;
            }
          }
        }

        .features-content {
          padding: 1rem;

          .features-grid {
            grid-template-columns: 1fr;
            gap: 0.6rem;

            .feature-item {
              padding: 0.6rem 0.8rem;

              i {
                font-size: 1rem;
              }

              span {
                font-size: 0.85rem;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    .info-grid {
      padding: 1rem;
    }

    .info-item {
      padding: 0.8rem;

      .item-header {
        gap: 0.5rem;

        i {
          font-size: 1rem;
          width: 20px;
          height: 20px;
        }

        .info-label {
          font-size: 0.8rem;
        }
      }

      .info-value {
        font-size: 0.85rem;
        margin-left: 1.7rem;
      }
    }
  }
}

// 功能項目滑入動畫
@keyframes featureSlideIn {
  to {
    opacity: 1;
    transform: translateY(0);
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

      @media (hover: hover) {
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

    @media (hover: hover) {
      &:hover {
        transform: translateY(-3px);
      }
    }

    &.back-top {
      background-color: var(--card-bg);
      color: var(--text-color);
      border: 1px solid var(--border-color);

      @media (hover: hover) {
        &:hover {
          background-color: var(--card-bg-alt);
          box-shadow: 0 5px 15px var(--shadow);
        }
      }
    }

    &.all-projects {
      background-color: var(--primary-color);
      color: white;

      @media (hover: hover) {
        &:hover {
          background-color: var(--primary-color-dark);
          box-shadow: 0 5px 15px rgba(var(--primary-color-rgb), 0.3);
        }
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
