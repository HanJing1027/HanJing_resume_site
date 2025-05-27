import { ref } from 'vue'

// 網頁作品資料
export const allWebProjects = ref([
  {
    id: 1,
    title: '個人履歷網站',
    description: '使用 Vue.js 開發的響應式個人履歷網站，具備專案展示、技能介紹等功能',
    extendedDescription:
      '這是一個完整的個人品牌展示網站，採用現代化的設計風格與互動效果。網站包含個人簡介、技能展示、作品集展示等核心功能，並且針對不同裝置進行了響應式優化。',
    imageUrl: '/src/assets/images/web_projects/resume-site-preview.jpg',
    images: [
      '/src/assets/images/web_projects/resume-site-1.jpg',
      '/src/assets/images/web_projects/resume-site-2.jpg',
      '/src/assets/images/web_projects/resume-site-3.jpg',
    ],
    technologies: ['Vue.js', 'Vue Router', 'SCSS', 'Vite'],
    categories: ['frontend', 'portfolio'],
    date: '2024-03',
    link: 'https://your-resume-site.com',
  },
  {
    id: 2,
    title: 'E-commerce 購物網站',
    description: '完整的電商網站前端實作，包含商品展示、購物車、結帳流程等功能',
    extendedDescription:
      '採用 Vue.js 生態系統開發的電商平台，整合了現代化的 UI/UX 設計與完整的購物流程。具備商品分類、搜尋篩選、購物車管理、訂單處理等核心電商功能。',
    imageUrl: '/src/assets/images/web_projects/ecommerce-preview.jpg',
    images: [
      '/src/assets/images/web_projects/ecommerce-1.jpg',
      '/src/assets/images/web_projects/ecommerce-2.jpg',
    ],
    technologies: ['Vue.js', 'Pinia', 'Vue Router', 'Axios'],
    categories: ['frontend', 'ecommerce'],
    date: '2024-01',
    link: 'https://your-ecommerce-demo.com',
  },
  {
    id: 3,
    title: '天氣預報應用',
    description: '串接氣象 API 的天氣預報應用，支援多城市查詢與詳細氣象資訊',
    extendedDescription:
      '一個實用的天氣應用程式，整合第三方天氣 API，提供即時天氣資訊、未來天氣預測、多城市管理等功能。介面設計簡潔直覺，並具備響應式設計。',
    imageUrl: '/src/assets/images/web_projects/weather-app-preview.jpg',
    images: ['/src/assets/images/web_projects/weather-app-1.jpg'],
    technologies: ['Vue.js', 'Weather API', 'CSS3', 'LocalStorage'],
    categories: ['frontend', 'api-integration'],
    date: '2023-11',
    link: 'https://your-weather-app.com',
  },
])

// 分類資料
export const webCategories = [
  { id: 'tool-apps', name: '工具型小應用' },
  { id: 'api-projects', name: 'API 整合應用' },
  { id: 'vue-projects', name: 'Vue 應用開發' },
  { id: 'ui-animation', name: '介面與動畫練習' },
  { id: 'fullstack-demo', name: '前後端交互' },
]
