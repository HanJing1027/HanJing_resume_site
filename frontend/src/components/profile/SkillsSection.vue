<template>
  <div class="skills-section">
    <div class="section-title">
      <h2>Skills</h2>
      <div class="title-divider"></div>
    </div>

    <!-- 主要技能展示 -->
    <div class="skills-cards">
      <SkillCard v-for="(skill, index) in mainSkills" :key="index" :skill="skill" />
    </div>

    <!-- 技術能力展示 -->
    <div class="tech-skills">
      <h3>技術能力</h3>
      <div class="skill-bars">
        <TechSkill v-for="(tech, index) in techSkills" :key="index" :tech="tech" />
      </div>
    </div>

    <!-- 其他專業能力 -->
    <div class="other-skills">
      <h3>其他能力</h3>
      <div class="skills-categories">
        <OtherSkill :skillCategories="skillCategories" />
      </div>
    </div>
  </div>
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
  padding: 4rem 2rem;
  background: var(--card-bg-alt);
  border-radius: 4px;
  max-width: 1200px;
  width: 100%;
  margin: 2rem auto;
  box-shadow: 0 8px 30px var(--shadow);
  transition: all $transition-speed ease;

  h3 {
    font-weight: 500;
    color: var(--dark-text);
    transition: color $transition-speed ease;
  }
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--dark-text);
    margin-bottom: 1rem;
    text-transform: uppercase;
    transition: color $transition-speed ease;
  }

  .title-divider {
    width: 80px;
    height: 3px;
    background: var(--primary-color);
    margin: 0 auto;
    transition: all $transition-speed ease;
  }
}

// 主要技能卡片
.skills-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  &:hover {
    cursor: default;
  }
}

// 技術能力進度條
.tech-skills {
  margin-bottom: 3rem;

  h3 {
    font-size: 1.8rem;
    color: var(--dark-text);
    margin-bottom: 1.5rem;
    transition: color $transition-speed ease;
  }
}

.skill-bars {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

// 其他專業能力 - 折疊設計
.other-skills {
  h3 {
    font-size: 1.8rem;
    color: var(--dark-text);
    margin-bottom: 1.5rem;
    transition: color $transition-speed ease;
  }
}

.skills-categories {
  display: grid;
  gap: 1rem;
}

// 響應式設計
@media (max-width: $mobile-breakpoint) {
  .skills-section {
    padding: 3rem 1.5rem;
  }

  .skills-cards {
    grid-template-columns: 1fr;
  }

  .skill-bars {
    grid-template-columns: 1fr;
  }

  .skills-categories {
    gap: 0.8rem;
  }
}
</style>
