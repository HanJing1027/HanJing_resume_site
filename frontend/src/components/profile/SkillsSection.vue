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
    <!-- 增加讀條感覺的動畫樣式 -->
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
    description:
      '自學 Vue.js 框架，能獨立開發互動式網頁，了解元件化設計與前端模組化流程，持續學習現代前端技術。',
  },
  {
    title: '全端協作',
    icon: 'bx-group',
    description:
      '具備與後端工程師協作經驗，理解 API 設計與整合流程，能有效溝通技術需求並共同解決前後端銜接問題。',
  },
  {
    title: 'UI/UX 設計',
    icon: 'bx-palette',
    description: '平面設計轉職，具備基礎設計直覺且美觀的使用者介面，並考慮使用者體驗與可用性。',
  },
  {
    title: '響應式設計',
    icon: 'bx-mobile',
    description: '注重跨裝置使用體驗，運用 CSS Grid 與 Flexbox 打造適應各種螢幕尺寸的網站。',
  },
  {
    title: '自主學習',
    icon: 'bx-book',
    description: '具備高效的自學能力，透過線上課程、文件與實作進行學習，並能迅速應用於專案中。',
  },
])
// 技術能力資料
const techSkills = ref([
  { name: 'Vue.js', percentage: 75 },
  { name: 'HTML5 & CSS3', percentage: 85 },
  { name: 'JavaScript', percentage: 65 },
  { name: 'SCSS/SASS', percentage: 80 },
  { name: '前後端協作', percentage: 75 },
  { name: '響應式設計', percentage: 80 },
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
  background-color: $background;
  border-radius: 4px;
  max-width: 1200px;
  width: 100%;
  margin: 2rem auto;
  box-shadow: 0 8px 30px $shadow;

  h3 {
    font-weight: 500;
  }
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: $dark-text;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  .title-divider {
    width: 80px;
    height: 3px;
    background-color: $primary-color;
    margin: 0 auto;
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
    color: $dark-text;
    margin-bottom: 1.5rem;
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
    color: $dark-text;
    margin-bottom: 1.5rem;
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
