import { ref } from 'vue'

import photoManipulation1 from '@/assets/images/graphic_design/photo_manipulation/IMG_2507.webp'
import photoManipulation2 from '@/assets/images/graphic_design/photo_manipulation/IMG_2574.webp'
import photoManipulation3 from '@/assets/images/graphic_design/photo_manipulation/IG-PROJECT-2.webp'
import photoManipulation4 from '@/assets/images/graphic_design/photo_manipulation/IMG_9465.webp'
import photoManipulation5 from '@/assets/images/graphic_design/photo_manipulation/project08.webp'
import photoManipulation6 from '@/assets/images/graphic_design/photo_manipulation/project07.webp'
import photoManipulation7 from '@/assets/images/graphic_design/photo_manipulation/ps-new-project.webp'
import photoManipulation8 from '@/assets/images/graphic_design/photo_manipulation/ps-new-project2.webp'

import gameUiUxDesign1 from '@/assets/images/graphic_design/game_uiux/IMG_6054.webp'
import gameUiUxDesign2 from '@/assets/images/graphic_design/game_uiux/IMG_6103.webp'
import gameUiUxDesign3 from '@/assets/images/graphic_design/game_uiux/IMG_6864.webp'

import dicedChicken1 from '@/assets/images/graphic_design/diced_chicken/00.webp'
import dicedChicken2 from '@/assets/images/graphic_design/diced_chicken/01.webp'
import dicedChicken3 from '@/assets/images/graphic_design/diced_chicken/02.webp'

import chickenJerky1 from '@/assets/images/graphic_design/chicken_jerky/00.webp'
import chickenJerky2 from '@/assets/images/graphic_design/chicken_jerky/01.webp'
import chickenJerky3 from '@/assets/images/graphic_design/chicken_jerky/02.webp'

import chickenFloss1 from '@/assets/images/graphic_design/chicken_floss/00.webp'
import chickenFloss2 from '@/assets/images/graphic_design/chicken_floss/01.webp'
import chickenFloss3 from '@/assets/images/graphic_design/chicken_floss/02.webp'

import banner1 from '@/assets/images/graphic_design/banner/banner01.webp'
import banner2 from '@/assets/images/graphic_design/banner/banner02.webp'
import banner3 from '@/assets/images/graphic_design/banner/banner03.webp'
import banner4 from '@/assets/images/graphic_design/banner/banner04.webp'

export const allProjects = ref([
  {
    id: 1,
    title: '殘垣中的探索者',
    description:
      '這張作品是一位探索者站在廢墟裡，整個場景有種末日感。橘紅色的火光跟冷色調的背景對比很強烈，就像在絕望裡還藏著一點希望。透過光影和氛圍的安排，讓人不禁去想：在極端的環境下，人到底能怎麼撐下去，又怎麼學會適應。',
    imageUrl: photoManipulation1,
    images: [photoManipulation1],
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
    images: [photoManipulation2],
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
    images: [photoManipulation3],
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
    images: [photoManipulation4],
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
    images: [photoManipulation5],
    categories: ['graphic-design'],
    date: '2023-04',
    link: '/project/mobile-ui',
    technologies: ['Photoshop', 'Lightroom'],
  },
  {
    id: 6,
    title: '突破 出發',
    description:
      '這張作品用破裂的蛋殼包裹著一片大海，透過色彩和創意展現出「侷限」與「無限」。金黃的蛋殼和深藍的海面形成鮮明的視覺效果，畫面中的雲朵和小帆船增添故事性。將超現實的概念具象化，讓觀者能感受到畫面背後深層的意義。',
    imageUrl: photoManipulation6,
    images: [photoManipulation6],
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
    images: [photoManipulation7],
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
    images: [photoManipulation8],
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
    images: [gameUiUxDesign1],
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
    images: [gameUiUxDesign2],
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
    images: [gameUiUxDesign3],
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
    images: [dicedChicken1, dicedChicken2, dicedChicken3],
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
    images: [chickenJerky1, chickenJerky2, chickenJerky3],
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
    images: [chickenFloss1, chickenFloss2, chickenFloss3],
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
    images: [banner1, banner2],
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
    images: [banner3, banner4],
    categories: ['ecommerce-visual-design'],
    date: '2023-02',
    link: '/project/stationery',
    technologies: ['Illustrator'],
  },
])

// 分類資料
export const categories = [
  { id: 'graphic-design', name: 'Photo Manipulation' },
  { id: 'ecommerce-visual-design', name: '電商視覺設計' },
  { id: 'game-ui-ux-design', name: '遊戲 UI/UX 設計' },
]
