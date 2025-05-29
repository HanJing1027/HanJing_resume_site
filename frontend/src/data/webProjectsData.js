import { ref } from 'vue'

import japanTravel1 from '@/assets/images/web_img/japan_travel01.png'
import japanTravel2 from '@/assets/images/web_img/japan_travel02.png'
import japanTravel3 from '@/assets/images/web_img/japan_travel03.png'
import japanTravel4 from '@/assets/images/web_img/japan_travel04.png'
import japanTravel5 from '@/assets/images/web_img/japan_travel05.png'
import japanTravel6 from '@/assets/images/web_img/japan_travel06.png'
import japanTravel7 from '@/assets/images/web_img/japan_travel07.png'
import japanTravel8 from '@/assets/images/web_img/japan_travel08.png'
import japanTravel9 from '@/assets/images/web_img/japan_travel09.png'
import japanTravel10 from '@/assets/images/web_img/japan_travel10.png'
import japanTravel11 from '@/assets/images/web_img/japan_travel11.png'
import japanTravel12 from '@/assets/images/web_img/japan_travel12.png'

import kumanomori1 from '@/assets/images/web_img/kumanomori02.png'
import kumanomori2 from '@/assets/images/web_img/kumanomori01.png'
import kumanomori3 from '@/assets/images/web_img/kumanomori03.png'
import kumanomori4 from '@/assets/images/web_img/kumanomori04.png'
import kumanomori5 from '@/assets/images/web_img/kumanomori05.png'
import kumanomori6 from '@/assets/images/web_img/kumanomori06.png'
import kumanomori7 from '@/assets/images/web_img/kumanomori07.png'
import kumanomori8 from '@/assets/images/web_img/kumanomori08.png'
import kumanomori9 from '@/assets/images/web_img/kumanomori09.png'
import kumanomori10 from '@/assets/images/web_img/kumanomori10.png'
import kumanomori11 from '@/assets/images/web_img/kumanomori11.png'
import kumanomori12 from '@/assets/images/web_img/kumanomori12.png'
import kumanomori13 from '@/assets/images/web_img/kumanomori13.png'
import kumanomori14 from '@/assets/images/web_img/kumanomori14.png'
import kumanomori15 from '@/assets/images/web_img/kumanomori15.png'

import webResume1 from '@/assets/images/web_img/web_resume01.png'
import webResume2 from '@/assets/images/web_img/web_resume02.png'
import webResume3 from '@/assets/images/web_img/web_resume03.png'
import webResume4 from '@/assets/images/web_img/web_resume04.png'
import webResume5 from '@/assets/images/web_img/web_resume05.png'
import webResume6 from '@/assets/images/web_img/web_resume06.png'
import webResume7 from '@/assets/images/web_img/web_resume07.png'
import webResume8 from '@/assets/images/web_img/web_resume08.png'
import webResume9 from '@/assets/images/web_img/web_resume09.png'
import webResume10 from '@/assets/images/web_img/web_resume10.png'
import webResume11 from '@/assets/images/web_img/web_resume11.png'
import webResume12 from '@/assets/images/web_img/web_resume12.png'
import webResume13 from '@/assets/images/web_img/web_resume13.png'
import webResume14 from '@/assets/images/web_img/web_resume14.png'
import webResume15 from '@/assets/images/web_img/web_resume15.png'
import webResume16 from '@/assets/images/web_img/web_resume16.png'
import webResume17 from '@/assets/images/web_img/web_resume17.png'
import webResume18 from '@/assets/images/web_img/web_resume18.png'
import webResume19 from '@/assets/images/web_img/web_resume19.png'
import webResume20 from '@/assets/images/web_img/web_resume20.png'

// 網頁作品資料
export const allWebProjects = ref([
  // 01
  {
    id: 1,
    title: '日本旅行體驗網站',
    description:
      '基於純 HTML、CSS、JavaScript 打造的響應式日本旅遊主題網站，展現現代化 UI 設計與互動體驗',
    extendedDescription:
      '這個專案是我想練習基礎前端技術的作品，主題選了自己喜歡的日本旅遊。網站內容包含戶外活動、季節文化、美食介紹等，希望營造出日式的清新感覺。設計上我嘗試用簡潔的版面和舒服的配色，讓閱讀體驗不會太複雜。技術方面使用 HTML、SCSS 和 JavaScript，我特別花時間學習 SCSS 的模組化寫法，還有一些基本的 CSS 動畫。整合了 Font Awesome 圖標來豐富視覺效果。雖然功能不算複雜，但這個專案讓我對前端基礎有更紮實的理解，也學會怎麼規劃一個完整網站的架構。',
    imageUrl: japanTravel1,
    images: [
      japanTravel1,
      japanTravel2,
      japanTravel3,
      japanTravel4,
      japanTravel5,
      japanTravel6,
      japanTravel7,
      japanTravel8,
      japanTravel9,
      japanTravel10,
      japanTravel11,
      japanTravel12,
    ],
    technologies: ['HTML5', 'CSS / SCSS', 'JavaSc ript ES6+', 'Font Awesome', 'Responsive Design'],
    categories: ['ui-animation'],
    date: '2024-05',
    link: 'https://your-japan-travel-site.com',
    features: [
      '語意化 HTML 結構',
      'SCSS 模組化樣式架構',
      'JavaScript 動態載入功能',
      '跨裝置響應式設計',
      'CSS 動畫效果',
    ],
  },
  // 02
  {
    id: 2,
    title: '寵物零食品牌網站',
    description:
      '基於純 HTML、SCSS、JavaScript 打造的響應式寵物零食品牌網站，展現溫馨自然的品牌形象',
    extendedDescription:
      '這個專案是我想挑戰自己在前端動畫和視覺設計方面的能力。網站以溫馨自然的風格為主軸，希望傳達品牌對寵物的關愛。在設計上，我選用了溫暖的配色和可愛的元素，讓整個網站感覺親近又專業。技術方面，我使用了 HTML、SCSS 和 JavaScript 來建構，特別花時間在動畫效果上 - 像是首頁的打字動畫、按鈕的 hover 效果，還有頁面載入的開場動畫。雖然是靜態網站，但我用 Swiper 做了產品輪播，也整合了 GSAP 來讓動畫更流暢。整個專案讓我學到很多關於使用者體驗設計的眉角，也更了解如何在沒有框架的情況下組織好程式碼。',
    imageUrl: kumanomori1,
    images: [
      kumanomori1,
      kumanomori2,
      kumanomori3,
      kumanomori4,
      kumanomori5,
      kumanomori6,
      kumanomori7,
      kumanomori8,
      kumanomori9,
      kumanomori10,
      kumanomori11,
      kumanomori12,
      kumanomori13,
      kumanomori14,
      kumanomori15,
    ],
    technologies: [
      'HTML5',
      'CSS / SCSS',
      'JavaScript ES6+',
      'Swiper.js',
      'GSAP',
      'Font Awesome',
      'Responsive Design',
    ],
    categories: ['ui-animation'],
    date: '2024-05',
    link: 'https://kumanomori.store/',
    features: [
      '語意化 HTML 結構',
      'SCSS 模組化樣式架構（使用 @use 語法）',
      '動畫效果（打字動畫、按鈕特效、開頭動畫）',
      'RWD 響應式設計',
      'Swiper 輪播功能整合',
      'JavaScript 動態載入組件',
    ],
  },
  // 03
  {
    id: 3,
    title: '個人履歷作品集網站',
    description: '使用 Vue.js 建構的響應式個人履歷網站，整合個人簡介與作品集展示',
    extendedDescription:
      '這是我的個人履歷網站專案，想要挑戰自己用 Vue.js 從零開始建構一個完整的作品集。設計上走簡潔專業的路線，選用了舒服的配色搭配，還加入了技能卡片的抽卡互動效果，希望讓瀏覽體驗更有趣一些。功能方面，我實作了專案分類篩選、詳細頁面展示、響應式設計等。技術上使用了 Vue 3 的 Composition API、Vue Router 做頁面路由、還有 Swiper 做圖片輪播。整個專案讓我學到很多關於組件設計、狀態管理，還有如何組織一個中型前端專案的架構。雖然還有很多可以改進的地方，但這個專案讓我對 Vue 生態系統有了更深的理解。',
    imageUrl: webResume1,
    images: [
      webResume1,
      webResume2,
      webResume3,
      webResume4,
      webResume5,
      webResume6,
      webResume7,
      webResume8,
      webResume9,
      webResume10,
      webResume11,
      webResume12,
      webResume13,
      webResume14,
      webResume15,
      webResume16,
      webResume17,
      webResume18,
      webResume19,
      webResume20,
    ],
    technologies: [
      'Vue 3',
      'Vue Router',
      'Pinia',
      'Composition API',
      'CSS / SCSS',
      'Swiper.js',
      'Responsive Design',
      'Vite',
    ],
    categories: ['vue-projects', 'ui-animation'],
    date: '2024-12',
    link: 'https://your-portfolio-site.com',
    features: [
      'Vue 3 Composition API 架構',
      '模組化組件設計',
      '動態路由與頁面導航',
      '作品分類篩選功能',
      '響應式圖片輪播',
      '專案詳情頁面',
      'SCSS 樣式管理',
      '技能卡片抽卡互動效果',
      '舒適的配色與視覺設計',
    ],
  },
  // 04
  {
    //
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
