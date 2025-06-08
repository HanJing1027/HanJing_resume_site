# 黃翰靖 | 前端開發作品集網站

這是我的個人履歷作品集網站，用 Vue.js 從零開始建構的。主要就是展示我的前端開發作品、技能和一些設計作品，希望能讓大家看到我這段時間學習前端的成果。

## 📌 技術棧

### Frontend

- **Vue 3**
- **Vite**
- **Vue Router**
- **Pinia**
- **SCSS**
- **Swiper.js**
- **BoxIcons**

### 開發工具

- **ESLint**
- **Prettier**
- **Git**

## 📌 專案架構

```
frontend/
├── src/
│   ├── assets/           # 靜態資源
│   │   ├── images/       # 圖片資源
│   │   │   ├── web_img/  # 網頁專案截圖
│   │   │   └── graphic_design/ # 設計作品
│   │   └── styles/       # 樣式文件
│   │       ├── main.scss     # 主樣式
│   │       ├── _variables.scss # SCSS 變數
│   │       ├── _reset.scss    # CSS Reset
│   │       └── _mixins.scss   # SCSS 混合器
│   ├── components/       # 組件
│   │   ├── common/       # 通用組件
│   │   ├── profile/      # 個人資料相關
│   │   └── projects/     # 專案展示相關
│   ├── composables/      # 組合式函數
│   ├── data/             # 資料檔案
│   │   ├── webProjectsData.js    # 網頁專案資料
│   │   └── designProjectsData.js # 設計專案資料
│   ├── router/           # 路由配置
│   ├── stores/           # Pinia Store
│   └── views/            # 頁面組件
├── public/
│   ├── favicon/          # 網站圖標
│   └── readmes/          # 專案說明文件
└── vite.config.js        # Vite 配置
```

## 📌 核心功能

### 個人簡介展示

- **基本資料卡片**
  - 頭像、姓名、職業、簡介
  - 聯絡方式和社群連結
- **技能展示**
  - 前端技術技能條，會動態顯示熟練度
  - 核心技能卡片展示
- **技能抽卡功能**
  - 互動式的技能卡片抽取效果
  - 讓瀏覽體驗更有趣一些

 

### 專案作品展示

- **網頁專案**
  - 展示前端開發練習專案
  - 從 HTML/CSS 到 Vue.j 應用都有
  - 包含 API 整合、工具應用、版面設計練習等
- **設計作品**
  - Photo Manipulation 合成作品
  - 電商視覺設計
  - 遊戲 UI/UX 設計
- **分類篩選系統**
  - 可以按技術類型、專案性質分類查看
  - 方便找到特定類型的作品

### 專案詳細頁面

- **完整專案資訊**
  - 專案截圖輪播（用 Swiper.js 做的）
  - 技術說明、功能特色
  - 開發心得和學習收穫
- **線上展示連結**
  - 大部分專案都有 GitHub Pages 展示
  - 可以直接體驗專案功能
- **README 下載功能**
  - 前後端協作專案提供技術文件下載
  - 詳細的實作說明和架構介紹

### 響應式設計

- **適配各種裝置**
  - PC、平板、手機都能正常瀏覽
  - 圖片和文字會根據螢幕大小調整
- **觸控友善**
  - 手機上的滑動、點擊體驗都有優化
  - Swiper 輪播支援觸控操作

## 📌 頁面說明

### 主要頁面

- [`Home.vue`](src/views/Home.vue) - 首頁，個人簡介和技能展示
- [`WebProjects.vue`](src/views/projects/WebProjects.vue) - 網頁專案列表
- [`DesignProjects.vue`](src/views/projects/DesignProjects.vue) - 設計作品列表

### 專案詳細頁面

- [`WebProjectDetailView.vue`](src/components/projects/webProject/WebProjectDetailView.vue) - 網頁專案詳細展示
- [`DesignProjectDetailView.vue`](src/components/projects/designProject/DesignProjectDetailView.vue) - 設計作品詳細展示

## 📌 組件設計

### 通用組件

- [`Header.vue`](src/components/common/Header.vue) - 網站頂部導航
- [`ToastMessage.vue`](src/components/common/ToastMessage.vue) - 提示訊息
- [`BaseInput.vue`](src/components/common/BaseInput.vue) - 基礎輸入框
- [`ColorSelector.vue`](src/components/common/ColorSelector.vue) - 顏色選擇器
- [`QuantitySelector.vue`](src/components/common/QuantitySelector.vue) - 數量選擇器
- [`SearchInput.vue`](src/components/common/SearchInput.vue) - 搜尋輸入框
- [`SizePicker.vue`](src/components/common/SizePicker.vue) - 尺寸選擇器
- [`ImageUploader.vue`](src/components/common/ImageUploader.vue) - 圖片上傳組件

### 專案展示組件

- [`ProjectCard.vue`](src/components/projects/ProjectCard.vue) - 專案卡片
- [`ProjectFilter.vue`](src/components/projects/ProjectFilter.vue) - 專案分類篩選
- [`ProjectGallery.vue`](src/components/projects/ProjectGallery.vue) - 專案圖片展示

### 個人資料組件

- [`ProfileCard.vue`](src/components/profile/ProfileCard.vue) - 個人資料卡片
- [`SkillSection.vue`](src/components/profile/SkillSection.vue) - 技能展示區域
- [`SkillCard.vue`](src/components/profile/SkillCard.vue) - 技能卡片

## 📌 技術實作

### 資料管理

用模組化的方式管理專案資料：

- **webProjectsData.js** - 所有網頁專案的資訊
- **designProjectsData.js** - 所有設計作品的資訊
- 每個專案都有完整的資訊，包含技術棧、分類、特色等

### 路由設計

- **動態路由** - 專案詳細頁面用動態路由處理
- **路由守衛** - 檢查專案是否存在，不存在會跳 404
- **頁面標題** - 每個頁面都有對應的標題

### 狀態管理

- 用 Pinia 管理一些全域狀態
- 主要處理主題模式切換

### 樣式架構

- **SCSS 模組化** - 用 @use 語法管理樣式
- **CSS 變數** - 主題色彩統一管理
- **響應式斷點** - 統一的 RWD 斷點設計

## 📌 專案特色

### 技術展示面

- **API 整合** - 有串接各種第三方 API 的經驗
- **前後端協作** - 有跟後端工程師合作的經驗
- **Canvas 應用** - 雖然不完全熟悉但嘗試畫圖工具、影像編輯器這類比較有挑戰性的專案

### 設計思維

- **使用者體驗** - 注重瀏覽的流暢性和直觀性
- **視覺設計** - 簡潔專業的設計風格
- **互動效果** - 適度的動畫和互動

### 學習成長

- **誠實呈現** - 每個專案都有寫開發心得，包含遇到的困難
- **持續更新** - 會定期加入新的專案和學習成果

## 📌 未來規劃

- 當未來作品更加豐富、有趣將加入搜尋功能，方便找特定專案
- 增加更多專案介面的互動效果、動畫效果，讓體驗更豐富
- 持續新增專案作品，記錄學習歷程

_這個作品集代表我這段時間學習前端開發的成果，雖然還有很多可以改進的地方，但每個專案都是我認真完成的。希望能透過這些作品展現我對前端開發的熱忱和學習能力！_
