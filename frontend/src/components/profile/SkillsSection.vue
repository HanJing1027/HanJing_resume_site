<template>
  <div class="skills-section">
    <div class="section-title">
      <h2>技能 & 專長</h2>
      <div class="title-divider"></div>
    </div>

    <!-- 主要技能展示 -->
    <div class="skills-cards">
      <div class="skill-card" v-for="(skill, index) in mainSkills" :key="index">
        <div class="skill-icon">
          <i class="bx" :class="skill.icon"></i>
        </div>
        <h3>{{ skill.title }}</h3>
        <p>{{ skill.description }}</p>
      </div>
    </div>

    <!-- 技術能力展示 -->
    <div class="tech-skills">
      <h3>技術能力</h3>
      <div class="skill-bars">
        <div class="skill-item" v-for="(tech, index) in techSkills" :key="index">
          <div class="skill-info">
            <span class="skill-name">{{ tech.name }}</span>
            <span class="skill-percentage">{{ tech.percentage }}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-progress" :style="{ width: tech.percentage + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 其他專業能力 -->
    <div class="other-skills">
      <h3>其他能力</h3>
      <div class="skills-categories">
        <div class="skill-category" v-for="(category, catIndex) in skillCategories" :key="catIndex">
          <h4>{{ category.title }}</h4>
          <div class="tag-cloud">
            <span
              class="skill-tag"
              v-for="(skill, index) in category.skills"
              :key="index"
              :class="{ 'has-icon': skill.icon }"
            >
              <i v-if="skill.icon" class="bx" :class="skill.icon"></i>
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  { name: '響應式設計', percentage: 80 },
  { name: 'Git版本控制', percentage: 70 },
])

// 其他專業能力
const skillCategories = ref([
  {
    title: '框架相關',
    skills: [
      { name: 'VueRouter', icon: 'bx-git-branch' },
      { name: 'Vuexq', icon: 'bxl-vuejs' },
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
    font-weight: 600;
    color: $dark-text;
    margin-bottom: 1rem;
  }

  .title-divider {
    width: 80px;
    height: 3px;
    background-color: $primary-color;
    margin: 0 auto;
  }
}

.skills-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  &:hover {
    cursor: default;
  }
}

.skill-card {
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform $transition-speed ease;

  &:hover {
    transform: translateY(-5px);
  }

  .skill-icon {
    font-size: 2.5rem;
    color: $primary-color;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    color: $dark-text;
    margin-bottom: 1rem;
    text-align: center;
  }

  p {
    color: $text-color;
    line-height: 1.6;
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

.skill-item {
  margin-bottom: 1.5rem;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  .skill-name {
    font-weight: 600;
    color: $dark-text;
  }

  .skill-percentage {
    color: $primary-color;
    font-weight: 600;
  }
}

.skill-bar {
  height: 8px;
  background-color: #e9ecef;
  border-radius: 100px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background-color: $primary-color;
  border-radius: 100px;
  transition: width 1.5s ease;
}

.other-skills {
  h3 {
    font-size: 1.8rem;
    color: $dark-text;
    margin-bottom: 1.5rem;
  }
}

.skills-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-category {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h4 {
    font-size: 1.3rem;
    color: $primary-color;
    margin-bottom: 1rem;
    border-bottom: 2px solid rgba($primary-color, 0.2);
    padding-bottom: 0.5rem;
  }
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.skill-tag {
  padding: 0.5rem 1.2rem;
  background-color: rgba($primary-color, 0.08);
  border-radius: 100px;
  font-weight: 500;
  color: $dark-text;
  display: flex;
  align-items: center;
  transition: all $transition-speed ease;

  i {
    margin-right: 0.5rem;
    font-size: 1.1rem;
    color: $primary-color;
  }

  &.has-icon {
    padding-left: 0.8rem;
  }

  &:hover {
    cursor: default;
    background-color: $primary-color;
    color: white;
    transform: translateY(-2px);

    i {
      color: white;
    }
  }
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
}
</style>
