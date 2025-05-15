<template>
  <section class="skills-section">
    <div class="section-header">
      <h2 class="section-title">Skills</h2>
      <div class="title-underline">
        <span class="line"></span>
        <span class="dot"></span>
        <span class="line"></span>
      </div>
    </div>

    <!-- 主要技能展示 -->
    <div class="skills-container main-skills">
      <h3 class="container-title">主要技能</h3>
      <div class="skills-cards">
        <SkillCard
          v-for="(skill, index) in mainSkills"
          :key="index"
          :skill="skill"
          class="skill-card"
        />
      </div>
    </div>

    <!-- 技術能力展示 -->
    <div class="skills-container tech-skills">
      <h3 class="container-title">技術能力</h3>
      <div class="tech-skills-container">
        <TechSkill
          v-for="(tech, index) in techSkills"
          :key="index"
          :tech="tech"
          class="tech-skill-item"
        />
      </div>
    </div>

    <!-- 其他專業能力 -->
    <div class="skills-container other-skills">
      <h3 class="container-title">其他能力</h3>
      <div class="skills-categories">
        <OtherSkill :skillCategories="skillCategories" />
      </div>
    </div>
  </section>
</template>

<script setup>
import SkillCard from './skills/SkillCard.vue'
import TechSkill from './skills/TechSkill.vue'
import OtherSkill from './skills/OtherSkill.vue'
import { ref } from 'vue'

// 主要技能資料
const mainSkills = ref([
  {
    title: '前端開發',
    icon: 'bx-code',
    description: [
      '自學 Vue.js 框架與相關生態系統',
      '理解元件化設計與前端模組化概念',
      '持續學習並應用現代前端開發技術',
    ],
  },
  {
    title: '全端協作',
    icon: 'bx-group',
    description: [
      '有與後端工程師協作經驗',
      '熟悉 API 串接與資料處理流程',
      '能有效溝通並解析技術需求',
      '解決前後端資料交換與整合問題',
    ],
  },
  {
    title: 'UI/UX 設計',
    icon: 'bx-palette',
    description: [
      '具平面設計背景，轉職前端開發',
      '設計直覺且美觀的使用者介面',
      '考量使用者體驗與操作流程設計',
      '注重美感與功能的平衡',
    ],
  },
  {
    title: '響應式設計',
    icon: 'bx-mobile',
    description: [
      '注重各裝置的瀏覽體驗與操作流暢度',
      '熟悉響應式網頁的排版與布局技巧',
      '能根據不同螢幕尺寸調整設計與排版',
      '確保網站在桌機、平板與手機等媒介中保持一致性與可用性',
    ],
  },
  {
    title: '自主學習',
    icon: 'bx-book',
    description: [
      '透過線上課、書籍、網路文章自學',
      '主動查找解決開發過程中的各種問題',
      '快速吸收並嘗試實踐新知識於專案中',
    ],
  },
])
// 技術能力資料
const techSkills = ref([
  { name: 'Vue.js', percentage: 80 },
  { name: 'HTML5 & CSS3', percentage: 82 },
  { name: 'JavaScript', percentage: 68 },
  { name: 'SCSS/SASS', percentage: 72 },
  { name: '前後端協作', percentage: 75 },
  { name: '響應式設計', percentage: 78 },
  { name: 'Git版本控制', percentage: 70 },
])
// 其他專業能力
const skillCategories = ref([
  {
    title: '框架相關',
    skills: [
      { name: 'VueRouter', icon: 'bx-git-branch' },
      { name: 'Vuex', icon: 'bxl-vuejs' },
      { name: 'Pinia', icon: 'bx-data' },
    ],
  },
  {
    title: '設計工具',
    skills: [
      { name: 'PhotoShop', icon: 'bxl-adobe' },
      { name: 'Illustrator', icon: 'bxl-adobe' },
      { name: 'Lightroom', icon: 'bxl-adobe' },
    ],
  },
  {
    title: '技術旅程中的收穫',
    skills: [
      { name: '組件化開發', icon: 'bx-layer' },
      { name: '快速學習新技術', icon: 'bx-bulb' },
      { name: '問題分析與解決', icon: 'bx-analyse' },
      { name: '自主學習能力', icon: 'bx-book-open' },
      { name: '前後端協作', icon: 'bx-conversation' },
    ],
  },
])
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.skills-section {
  padding: 5rem 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 3rem auto;
  background: linear-gradient(to bottom, var(--card-bg-alt) 0%, var(--card-bg) 100%);
  border-radius: 12px;
  box-shadow: 0 10px 40px var(--shadow);
  transition: all $transition-speed ease;
  overflow: hidden;
}

// 區塊標題設計
.section-header {
  text-align: center;
  margin-bottom: 4rem;

  .section-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--dark-text);
    margin-bottom: 1rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all $transition-speed ease;
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

  .section-subtitle {
    color: var(--text-color);
    font-size: 1.1rem;
    font-weight: 400;
    opacity: 0.8;
  }
}

// 各技能容器共用樣式
.skills-container {
  margin-bottom: 4rem;
  padding: 2rem;
  background: var(--card-bg-alt);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(var(--dark-text-rgb), 0.05);

  &:last-child {
    margin-bottom: 0;
  }

  .container-title {
    position: relative;
    font-size: 1.8rem;
    color: var(--dark-text);
    margin-bottom: 2rem;
    padding-bottom: 0.8rem;
    display: inline-block;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 40%;
      height: 3px;
      background-color: var(--primary-color);
      border-radius: 2px;
    }
  }
}

// 主要技能卡片
.main-skills {
  .skills-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2.5rem;

    .skill-card {
      transition: transform $transition-speed ease;

      &:hover {
        transform: translateY(-8px);
      }
    }
  }
}

// 技術能力進度條
.tech-skills {
  .tech-skills-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2.5rem 3rem;

    .tech-skill-item {
      margin-bottom: 0.5rem;
    }
  }
}

// 其他專業能力
.other-skills {
  .skills-categories {
    display: grid;
    gap: 2rem;
    transition: all $transition-speed ease;
  }
}

@media (max-width: $mobile-breakpoint) {
  .skills-section {
    padding: 3rem 1.2rem;
    border-radius: 8px;
  }

  .section-header {
    .section-title {
      font-size: 2.2rem;
    }

    .title-underline .line {
      width: 30px;
    }
  }

  .skills-container {
    margin-bottom: 2.5rem;
    padding: 1.2rem;

    .container-title {
      font-size: 1.6rem;
      margin-bottom: 1.5rem;
    }
  }

  .main-skills .skills-cards,
  .tech-skills .tech-skills-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
