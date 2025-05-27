<template>
  <div class="design-projects-container">
    <!-- 頂部橫幅 -->
    <div class="projects-header">
      <h2 class="header-title">設計作品集</h2>
      <div class="title-underline">
        <span class="line"></span>
        <span class="dot"></span>
        <span class="line"></span>
      </div>
    </div>

    <!-- 分類篩選器 -->
    <div class="categories-filter">
      <button
        class="category-btn"
        :class="{ active: !selectedCategory || selectedCategory === 'all' }"
        @click="setCategory(null)"
      >
        <i class="bx bx-grid-alt"></i>全部作品
      </button>
      <button
        v-for="category in categories"
        :key="category.id"
        class="category-btn"
        :class="{ active: selectedCategory === category.id }"
        @click="setCategory(category.id)"
      >
        <i class="bx bx-category"></i>{{ category.name }}
      </button>
    </div>

    <!-- 專案卡片網格 -->
    <div class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="design-project-item">
        <div class="project-image">
          <img :src="project.imageUrl" :alt="project.title" loading="lazy" />
          <div class="project-overlay" @click="openProjectDetail(project)">
            <span class="view-project">
              <i class="bx bx-show-alt"></i>
              查看專案
            </span>
          </div>
        </div>

        <div class="project-info">
          <div class="project-header">
            <h3 class="project-title">{{ project.title }}</h3>
            <div class="project-categories">
              <span
                v-for="(category, index) in project.categories"
                :key="index"
                class="category-tag"
              >
                {{ getCategoryName(category) }}
              </span>
            </div>
          </div>

          <p class="project-description">{{ project.description }}</p>

          <div class="project-footer">
            <div class="project-tech">
              <div class="tech-tags">
                <span v-for="(tech, index) in project.technologies" :key="index" class="tech-tag">
                  <i class="bx bx-purchase-tag-alt"></i>
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button class="back-button" @click="goBack">
      <i class="bx bx-arrow-back"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { allProjects, categories } from '@/data/designProjectsData'

const route = useRoute()
const router = useRouter()

const goBack = () => {
  router.push({ name: 'ProjectsHome' })
}

const selectedCategory = ref(null)

// 依據選定的分類過濾專案
const projects = computed(() => {
  if (!selectedCategory.value || selectedCategory.value === 'all') {
    return allProjects.value
  }

  return allProjects.value.filter((project) => project.categories.includes(selectedCategory.value))
})

// 設置分類並更新 URL - 已移除動畫相關邏輯
const setCategory = (categoryId) => {
  selectedCategory.value = categoryId

  // 更新 URL 查詢參數
  if (categoryId) {
    router.replace({ query: { ...route.query, category: categoryId } })
  } else {
    // 移除查詢參數
    const query = { ...route.query }
    delete query.category
    router.replace({ query })
  }
}

// 監聽 URL 查詢參數變化來更新選擇的分類 - 已移除動畫相關邏輯
watch(
  () => route.query.category,
  (newCategory) => {
    selectedCategory.value = newCategory || null
  },
  { immediate: true }
)

const getCategoryName = (categoryId) => {
  const category = categories.find((c) => c.id === categoryId)
  return category ? category.name : categoryId
}

const openProjectDetail = (project) => {
  router.push({
    name: 'ProjectDetail',
    params: { id: project.id },
  })
}

onMounted(() => {
  // 初始化時檢查 URL 查詢參數 - 已移除動畫相關邏輯
  if (route.query.category) {
    selectedCategory.value = route.query.category
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;
@use '@/assets/styles/_mixins.scss' as mixins;

.design-projects-container {
  cursor: default;
  width: 100%;
  max-width: 1200px;
  margin: 120px auto 60px;
  padding: 0 1.5rem;
}

// 返回按鈕樣式
.back-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s ease;

  i {
    font-size: 1.5rem;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  }
}

@media (max-width: $mobile-breakpoint) {
  .floating-back-button {
    width: 48px;
    height: 48px;
    bottom: 16px;
    right: 16px;

    i {
      font-size: 1.3rem;
    }
  }
}

// 頂部橫幅
.projects-header {
  margin-bottom: 3rem;
  text-align: center;
  position: relative;

  .header-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--dark-text);
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
  }

  .title-underline {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 1.5rem;

    .line {
      height: 2px;
      width: 50px;
      background-color: var(--primary-color);
    }

    .dot {
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background-color: var(--primary-color);
    }
  }
}

// 分類篩選
.categories-filter {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 2.5rem;

  .category-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    border-radius: 50px;
    background-color: var(--card-bg);
    color: var(--text-color);
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid var(--border-color);
    transition: all 0.25s ease;

    i {
      font-size: 1.1rem;
      color: var(--primary-color);
      transition: transform 0.25s ease;
    }

    &:hover {
      background-color: var(--card-bg-alt);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px var(--shadow);

      i {
        transform: scale(1.1);
      }
    }

    &.active {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);

      i {
        color: white;
      }
    }
  }
}

// 專案卡片網格
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.design-project-item {
  background-color: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 10px 25px -5px var(--shadow),
    0 5px 10px -5px var(--shadow);
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid var(--border-color);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 2px;
    background: linear-gradient(135deg, var(--primary-color), transparent 70%);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow:
      0 15px 35px var(--shadow),
      0 7px 15px -10px var(--shadow);
    border-color: rgba(var(--primary-color-rgb), 0.3);

    &::before {
      opacity: 1;
    }

    .project-image img {
      transform: scale(1.05);
    }

    .project-overlay {
      opacity: 1;
    }

    .project-title {
      color: var(--primary-color);
    }
  }
}

.project-image {
  position: relative;
  height: 0;
  padding-bottom: 65%;
  overflow: hidden;
  background-color: var(--img-bg);

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .project-overlay {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(var(--primary-color-rgb), 0.85);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;

    &:hover .view-project {
      background: rgba(255, 255, 255, 0.9);
      color: var(--primary-color);
      transform: scale(1.05);
    }

    .view-project {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      font-weight: 600;
      padding: 0.6rem 1.5rem;
      border: 2px solid rgba(255, 255, 255, 0.8);
      border-radius: 30px;
      transition: all 0.3s ease;

      i {
        font-size: 1.1rem;
      }
    }
  }
}

.project-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.project-header {
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--dark-text);
  margin-bottom: 0.8rem;
  transition: color 0.3s ease;
}

.project-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .category-tag {
    font-size: 0.75rem;
    padding: 0.2rem 0.7rem;
    border-radius: 50px;
    background-color: var(--accent-lighter);
    color: var(--primary-color);
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--accent-light);
      transform: translateY(-2px);
    }
  }
}

.project-description {
  color: var(--text-color);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.project-footer {
  display: flex;
  align-items: center;
  margin-top: auto;

  .project-tech {
    width: 100%;
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .tech-tag {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
    border-radius: 50px;
    background-color: var(--accent-lighter);
    color: var(--primary-color);
    transition: all 0.3s ease;

    i {
      font-size: 0.9rem;
    }

    &:hover {
      background-color: var(--accent-light);
      transform: translateY(-2px);
      box-shadow: 0 2px 5px var(--shadow);
    }
  }
}

// 響應式設計
@media (max-width: $mobile-breakpoint) {
  .design-projects-container {
    margin-top: 60px;
    padding: 0 1rem;
  }

  .projects-header {
    margin-bottom: 2rem;

    .header-title {
      font-size: 2rem;
    }
  }

  .categories-filter {
    gap: 0.6rem;
    margin-bottom: 2rem;
    justify-content: center;
    overflow-x: auto;
    padding-bottom: 0.5rem;

    .category-btn {
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
      flex-shrink: 0;
    }
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .design-project-item {
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }

  .project-title {
    font-size: 1.2rem;
  }
}
</style>
