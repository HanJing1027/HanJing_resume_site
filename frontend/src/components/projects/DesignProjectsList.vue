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
      <div
        v-for="project in projects"
        :key="project.id"
        class="design-project-item"
        @click="openProjectDetail(project)"
      >
        <div class="project-image">
          <img :src="project.imageUrl" :alt="project.title" loading="lazy" />
          <div class="project-overlay">
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

import photoManipulation1 from '@/assets/images/graphic_design/photo_manipulation/IMG_2507.jpg'
import photoManipulation2 from '@/assets/images/graphic_design/photo_manipulation/IMG_2574.jpg'
import photoManipulation3 from '@/assets/images/graphic_design/photo_manipulation/IG-PROJECT-2.jpg'
import photoManipulation4 from '@/assets/images/graphic_design/photo_manipulation/IMG_9465.jpg'
import photoManipulation5 from '@/assets/images/graphic_design/photo_manipulation/project08.jpg'
import photoManipulation6 from '@/assets/images/graphic_design/photo_manipulation/project07.jpg'
import photoManipulation7 from '@/assets/images/graphic_design/photo_manipulation/ps-new-project.jpg'
import photoManipulation8 from '@/assets/images/graphic_design/photo_manipulation/ps-new-project2.jpg'

import gameUiUxDesign1 from '@/assets/images/graphic_design/game_uiux/IMG_6054.jpg'
import gameUiUxDesign2 from '@/assets/images/graphic_design/game_uiux/IMG_6103.jpg'
import gameUiUxDesign3 from '@/assets/images/graphic_design/game_uiux/IMG_6864.jpg'

import dicedChicken1 from '@/assets/images/graphic_design/diced_chicken/00.jpg'
import dicedChicken2 from '@/assets/images/graphic_design/diced_chicken/01.jpg'
import dicedChicken3 from '@/assets/images/graphic_design/diced_chicken/02.jpg'

import chickenJerky1 from '@/assets/images/graphic_design/chicken_jerky/00.jpg'
import chickenJerky2 from '@/assets/images/graphic_design/chicken_jerky/01.jpg'
import chickenJerky3 from '@/assets/images/graphic_design/chicken_jerky/02.jpg'

import chickenFloss1 from '@/assets/images/graphic_design/chicken_floss/00.jpg'
import chickenFloss2 from '@/assets/images/graphic_design/chicken_floss/01.jpg'
import chickenFloss3 from '@/assets/images/graphic_design/chicken_floss/02.jpg'

import banner1 from '@/assets/images/graphic_design/banner/banner01.jpg'
import banner2 from '@/assets/images/graphic_design/banner/banner02.jpg'
import banner3 from '@/assets/images/graphic_design/banner/banner03.jpg'
import banner4 from '@/assets/images/graphic_design/banner/banner04.jpg'

const route = useRoute()
const router = useRouter()

const goBack = () => {
  router.push({ name: 'ProjectsHome' })
}

// 定義分類與對應圖示
const categories = [
  { id: 'graphic-design', name: 'Photo Manipulation' },
  { id: 'ecommerce-visual-design', name: '電商視覺設計' },
  { id: 'game-ui-ux-design', name: '遊戲 UI/UX 設計' },
]

// 資料
const allProjects = ref([
  {
    id: 1,
    title: '殘垣中的探索者',
    description:
      '這張作品是一位探索者站在廢墟裡，整個場景有種末日感。橘紅色的火光跟冷色調的背景對比很強烈，就像在絕望裡還藏著一點希望。透過光影和氛圍的安排，讓人不禁去想：在極端的環境下，人到底能怎麼撐下去，又怎麼學會適應。',
    imageUrl: photoManipulation1,
    categories: ['graphic-design'],
    link: '/project/ecommerce-ux',
    technologies: ['Photoshop', 'Lightroom'],
  },
  {
    id: 2,
    title: '韌性與勇氣',
    description:
      '畫面中間是一場壯觀的火山爆發，跟周圍黑暗的背景形成很強烈的對比。主角站在那裡，面對一隻巨大到難以想像的龍，整個場景充滿張力，像是在象徵面對恐懼時的勇氣和決心。透過暗部細節和整體氛圍的營造，讓人感受到即使挑戰看起來不可能，人性裡的韌性還是能撐住一切。',
    imageUrl: photoManipulation2,
    categories: ['graphic-design'],
    date: '2023-10',
    link: '/project/brand-identity',
    technologies: ['Photoshop', 'Lightroom'],
  },
  {
    id: 3,
    title: '好奇心的邊界',
    description:
      '這張作品營造出一種神秘又安靜的氛圍。畫面裡的攝影師站在自然和科技交會的地方，遠遠看著一顆巨大的球體結構。整體用柔和的漸層色和景深效果，帶出一種面對未知世界時的好奇心和敬畏感。',
    imageUrl: photoManipulation3,
    categories: ['graphic-design'],
    date: '2023-08',
    link: '/project/health-illustrations',
    technologies: ['Photoshop', 'Lightroom'],
  },
  {
    id: 4,
    title: '沙漠中的遺跡',
    description:
      '這張作品呈現出黃昏時的場景，溫暖的沙漠色調搭配遠方的建築成為畫面的焦點。前景那些破碎的石柱表達曾經有段歷史故事。整體用了景深和細緻的材質處理，讓畫面看起來很真實，同時又帶點神秘，讓人不自覺去想像文明遺跡和自然之間的連結。',
    imageUrl: photoManipulation4,
    categories: ['graphic-design'],
    date: '2023-06',
    link: '/project/annual-report',
    technologies: ['Photoshop', 'Lightroom'],
  },
  {
    id: 5,
    title: '倒影天堂',
    description:
      '畫面中人物撐著紅傘的人站在平靜的水面上，遠方的巨大建築和天空中的星球使畫面夢幻又壯觀。水面的倒影處理得很細緻，加上藍色和暖色的搭配，讓整體色調看起來很舒服。透過透視和光線的變化，視線會自然從紅傘延伸到遠方的建築，整個場景帶出一種寧靜又不真實的氛圍。',
    imageUrl: photoManipulation5,
    categories: ['graphic-design'],
    date: '2023-04',
    link: '/project/mobile-ui',
    technologies: ['Photoshop', 'Lightroom'],
  },
  {
    id: 6,
    title: '微小世界的航程',
    description:
      '這張作品用破裂的蛋殼包裹著一片大海，透過色彩和創意展現出「侷限」與「無限」。金黃的蛋殼和深藍的海面形成鮮明的視覺效果，畫面中的雲朵和小帆船增添故事性。將超現實的概念具象化，讓觀者能感受到畫面背後深層的意義。',
    imageUrl: photoManipulation6,
    categories: ['graphic-design'],
    date: '2023-02',
    link: '/project/stationery',
    technologies: ['Photoshop', 'Lightroom'],
  },
  {
    id: 7,
    title: '從書本出發的冒險',
    description:
      '這張作品把一本書變成通往童話世界的入口。打開的書頁中間出現一條通往遠方城堡的小路，還有一個小熊熊在上面，好像正準備展開一場奇幻冒險。整體光影柔和，帶點溫暖又神祕的感覺，想表達「書本能帶我們去任何地方」這個想法。希望喜歡閱讀的人看到也會會心一笑。',
    imageUrl: photoManipulation7,
    categories: ['graphic-design'],
    date: '2023-02',
    link: '/project/stationery',
    technologies: ['Photoshop', 'Lightroom'],
  },
  {
    id: 8,
    title: '童話探險',
    description:
      '這張作品呈現一隻小熊熊走上霧氣瀰漫的石階，朝著遠方神秘的哥德式城堡前進。提著微微發光的法杖。畫面用了強烈的光影對比，讓遠方的城堡看起來若隱若現，加上飛鳥和老樹，增添了一點童話感。整體色調偏藍灰，但搭配中心暖色光源，讓整體氛圍溫柔又帶點神祕。',
    imageUrl: photoManipulation8,
    categories: ['graphic-design'],
    date: '2023-02',
    link: '/project/stationery',
    technologies: ['Photoshop', 'Lightroom'],
  },
  {
    id: 9,
    title: '遊戲 Menu 介面設計',
    description:
      '深色背景搭配金色裝飾的遊戲UI設計，左側為物品欄，右側是功能區。整體風格復古奢華，佈局清晰易用。',
    imageUrl: gameUiUxDesign1,
    categories: ['game-ui-ux-design'],
    date: '2023-02',
    link: '/project/stationery',
    technologies: ['Photoshop', 'Illustrator'],
  },
  {
    id: 10,
    title: '遊戲暫停選單設計',
    description:
      '深色背景搭配金色裝飾，簡潔精緻的遊戲暫停選單。清晰排列的功能項與精美邊框設計，呈現古典雅致的視覺風格。',
    imageUrl: gameUiUxDesign2,
    categories: ['game-ui-ux-design'],
    date: '2023-02',
    link: '/project/stationery',
    technologies: ['Photoshop', 'Illustrator'],
  },
  {
    id: 11,
    title: '遊戲開始介面設計',
    description:
      '深色背景配搭金色古典邊框的遊戲開始選單。簡約設計包含玩家資訊欄和主要功能按鈕，整體風格優雅復古，界面清晰易讀。',
    imageUrl: gameUiUxDesign3,
    categories: ['game-ui-ux-design'],
    date: '2023-02',
    link: '/project/stationery',
    technologies: ['Photoshop', 'Illustrator'],
  },
  {
    id: 12,
    title: '產品視覺設計 - 雞肉凍乾',
    description:
      '這組圖展現了電商設計的創意與專業，透過搭配的色彩、字卡設計與構圖技巧，成功提升產品對消費者的吸引力。',
    imageUrl: dicedChicken1,
    categories: ['ecommerce-visual-design'],
    date: '2023-02',
    link: '/project/stationery',
    technologies: ['Illustrator', 'Lightroom'],
  },
  {
    id: 13,
    title: '產品視覺設計 - 雞肉乾',
    description:
      '以溫暖的色調與可愛的元素，展現產品的天然與高品質，吸引消費者的目光並傳遞產品的溫馨形象。',
    imageUrl: chickenJerky1,
    categories: ['ecommerce-visual-design'],
    date: '2023-02',
    link: '/project/stationery',
    technologies: ['Illustrator', 'Lightroom'],
  },
  {
    id: 14,
    title: '產品視覺設計 - 雞肉鬆',
    description:
      '以溫暖的木質背景與柔和的光線，突顯產品的天然與手作特質，營造出溫馨且吸引人的視覺效果。',
    imageUrl: chickenFloss1,
    categories: ['ecommerce-visual-design'],
    date: '2023-02',
    link: '/project/stationery',
    technologies: ['Illustrator', 'Lightroom'],
  },
  {
    id: 15,
    title: '冬季暖心活動設計',
    description:
      '以柔和的藍色調搭配溫暖的紅色點綴，營造出冬季溫馨的氛圍。透過插畫風格的場景設計，展現活動的親和力與吸引力。',
    imageUrl: banner1,
    categories: ['ecommerce-visual-design'],
    date: '2023-02',
    link: '/project/stationery',
    technologies: ['Illustrator'],
  },
  {
    id: 16,
    title: '新春賀年活動設計',
    description:
      '以喜慶的紅色與金色為主調，搭配可愛的龍年元素與燈籠，營造出熱鬧歡樂的節慶氛圍，傳遞新春祝福與親和力。',
    imageUrl: banner3,
    categories: ['ecommerce-visual-design'],
    date: '2023-02',
    link: '/project/stationery',
    technologies: ['Illustrator'],
  },
])

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

// 其餘功能保持不變
const getCategoryName = (categoryId) => {
  const category = categories.find((c) => c.id === categoryId)
  return category ? category.name : categoryId
}

const openProjectDetail = (project) => {
  window.location.href = project.link
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
  cursor: pointer;
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

      &:hover {
        background: rgba(255, 255, 255, 0.9);
        color: var(--primary-color);
        transform: scale(1.05);
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
    justify-content: flex-start;
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
