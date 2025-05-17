<template>
  <div class="card-deck-container">
    <!-- 卡片堆 -->
    <div class="card-deck">
      <div class="deck-cards" ref="deckCardsRef">
        <div v-for="(i, index) in 3" :key="index" class="deck-card" />
      </div>
      <button class="draw-card-btn" @click="drawCard" :disabled="isDrawingCard">
        <i class="bx bx-chevron-right"></i>
        <span>{{ isAllCardsDrawn ? '收回技能卡' : '抽取技能卡' }}</span>
      </button>
    </div>

    <!-- 卡片展示區 -->
    <div class="draw-card-area">
      <div class="empty-state" v-if="visibleSkills.length === 0">
        <i class="bx bxs-mouse"></i>
        <p>點擊「抽取技能卡」</p>
      </div>

      <template v-else>
        <div
          class="draw-card"
          v-for="(skill, index) in visibleSkills"
          :key="skill._id"
          :class="{
            active: index === currentCardIndex,
            'manual-animation': skill._id === lastAddedCardId,
            flipped: flippedCards[index],
          }"
          @click="selectCard(index)"
        >
          <div class="card-inner" :class="{ flipped: flippedCards[index] }">
            <!-- 正面 -->
            <div class="card-front">
              <div class="skill-icon"><i class="bx" :class="skill.icon"></i></div>
              <h3>{{ skill.title }}</h3>
              <p class="card-hint">點擊查看詳情</p>
            </div>

            <!-- 背面 -->
            <div class="card-back">
              <h4>{{ skill.title }}</h4>
              <ul class="skill-points">
                <li v-for="(item, itemIndex) in skill.description" :key="itemIndex">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>

      <!-- 導航控制 -->
      <div class="card-navigation" v-if="visibleSkills.length > 0">
        <button class="nav-btn prev" @click="showPrevCard" :disabled="currentCardIndex === 0">
          <i class="bx bx-chevron-left"></i>
        </button>

        <div class="card-pagination">
          <span
            class="pagination"
            v-for="(i, index) in visibleSkills"
            :key="index"
            :class="{ active: index === currentCardIndex }"
            @click="selectCard(index)"
          />
        </div>

        <button
          class="nav-btn next"
          @click="showNextCard"
          :disabled="currentCardIndex === visibleSkills.length - 1"
        >
          <i class="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDebounce } from '@/composables/useDebounce.js'
import { computed, ref, nextTick, onMounted } from 'vue'

const { debounce } = useDebounce()

const props = defineProps({
  skills: {
    type: Array,
    required: true,
  },
})

// 狀態管理
const visibleSkills = ref([]) // 抽出的卡片
const remainingSkills = ref([...props.skills]) // 剩下的卡片
const currentCardIndex = ref(0) // 當前卡片索引
const isDrawingCard = ref(false) // 抽卡鎖定機制
const lastAddedCardId = ref(null) // 追蹤最後添加的卡片ID
const flippedCards = ref([]) // 卡片翻轉狀態
const deckCardsRef = ref(null) // DOM引用

// 判斷是否所有卡片都已抽出
const isAllCardsDrawn = computed(() => {
  return remainingSkills.value.length === 0
})

// 抽卡
const drawCardOriginal = async () => {
  // 檢查是否正在抽卡中，避免重複觸發
  if (isDrawingCard.value) return

  if (isAllCardsDrawn.value) {
    // 重置卡片
    resetCards()
  } else {
    // 設置抽卡中狀態，鎖定再次抽卡
    isDrawingCard.value = true
    animateDeckShake()

    // 延遲抽卡，讓抖動效果先顯示
    setTimeout(async () => {
      try {
        // 隨機抽取一張卡片
        const randomIndex = Math.floor(Math.random() * remainingSkills.value.length)

        // 為卡片添加唯一ID
        const drawnCard = {
          ...remainingSkills.value[randomIndex],
          _id: `card-${Date.now()}`,
        }

        // 從剩餘卡片中移除已抽出的卡片
        remainingSkills.value.splice(randomIndex, 1)

        // 記錄最後添加的卡片ID
        lastAddedCardId.value = drawnCard._id

        // 加入到已抽出的卡堆中
        visibleSkills.value.push(drawnCard)
        flippedCards.value.push(false) // 添加對應的翻轉狀態
        currentCardIndex.value = visibleSkills.value.length - 1

        // 等待DOM更新完成
        await nextTick()

        // 動畫結束後解除動畫狀態
        setTimeout(() => {
          // 清空最後添加的卡片ID，結束動畫
          lastAddedCardId.value = null

          // 額外延遲確保完全解除抽卡鎖定
          setTimeout(() => {
            isDrawingCard.value = false
          }, 200)
        }, 800)
      } catch (error) {
        console.error('抽卡出錯:', error)
        isDrawingCard.value = false
      }
    }, 300)
  }
}

// 增加 debounce 延遲，避免快速點擊
const drawCard = debounce(drawCardOriginal, 300)

// 重置卡片
const resetCards = () => {
  lastAddedCardId.value = null // 重置動畫狀態
  remainingSkills.value = [...props.skills]
  visibleSkills.value = [] // 清空已抽出的卡片
  flippedCards.value = [] // 重置翻轉狀態
}

// 抽卡抖動動畫
const animateDeckShake = () => {
  if (deckCardsRef.value) {
    deckCardsRef.value.classList.add('shaking')
    setTimeout(() => {
      deckCardsRef.value.classList.remove('shaking')
    }, 500)
  } else {
    // 向下兼容
    const deckCards = document.querySelector('.deck-cards')
    if (deckCards) {
      deckCards.classList.add('shaking')
      setTimeout(() => {
        deckCards.classList.remove('shaking')
      }, 500)
    }
  }
}

// 切換到指定卡片
const selectCard = (index) => {
  if (index === currentCardIndex.value) {
    // 當點擊已選中的卡片時，切換翻轉狀態
    toggleCardFlip(index)
  } else {
    // 選擇新卡片時，設置為當前卡片
    currentCardIndex.value = index
  }
}

// 翻轉卡片
const toggleCardFlip = (index) => {
  // 確保陣列長度足夠
  while (flippedCards.value.length <= index) {
    flippedCards.value.push(false)
  }
  // 切換翻轉狀態
  flippedCards.value[index] = !flippedCards.value[index]
}

// 顯示上一張卡片
const showPrevCard = () => {
  if (currentCardIndex.value > 0) {
    currentCardIndex.value--
  }
}

// 顯示下一張卡片
const showNextCard = () => {
  if (currentCardIndex.value < visibleSkills.value.length - 1) {
    currentCardIndex.value++
  }
}

// 生命週期鉤子
onMounted(() => {
  // 監聽動畫結束事件，防止重複播放
  document.addEventListener('animationend', (event) => {
    if (event.animationName === 'manual-card-in') {
      // 動畫結束後添加標記
      event.target.classList.add('animation-completed')
    }
  })

  // 初始化翻轉狀態
  flippedCards.value = Array(visibleSkills.value.length).fill(false)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;
@use '@/assets/styles/mixins' as *;

// 卡片容器響應式
.card-deck-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
  justify-content: center;
  z-index: 1;

  // 手機尺寸優化 - 垂直排列
  @media (max-width: $mobile-breakpoint) {
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
  }
}

.card-deck {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  .deck-cards {
    position: relative;
    width: 200px;
    height: 280px;
    margin: 0 auto;

    // 抽卡時抖動效果
    &.shaking {
      animation: deck-shake 0.5s ease;
    }

    .deck-card {
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-color-dark));
      border-radius: 12px;
      box-shadow: 0 3px 15px rgba(var(--primary-color-rgb), 0.3);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      border: 2px solid rgba(255, 255, 255, 0.2);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 10px;
        opacity: 0.1;
      }

      &:nth-child(2) {
        transform: translateY(4px) scale(0.98) rotateZ(-1deg);
      }

      &:nth-child(3) {
        transform: translateY(8px) scale(0.96) rotateZ(1deg);
      }
    }

    @media (max-width: $mobile-breakpoint) {
      width: 160px;
      height: 220px;
    }
  }

  @keyframes deck-shake {
    0%,
    100% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(-5px) rotateZ(-2deg);
    }
    40% {
      transform: translateX(5px) rotateZ(2deg);
    }
    60% {
      transform: translateX(-3px) rotateZ(-1deg);
    }
    80% {
      transform: translateX(3px) rotateZ(1deg);
    }
  }

  .draw-card-btn {
    @include base-button(0.8rem 1.8rem);

    i {
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }

    &:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(var(--primary-color-rgb), 0.4);

      i {
        transform: translateX(3px);
      }
    }

    &:disabled {
      opacity: 0.6;
      cursor: default;
      transform: none;
      box-shadow: none;

      &:hover {
        transform: none;
        box-shadow: none;

        i {
          transform: none;
        }
      }
    }

    // 手機尺寸調整
    @media (max-width: $mobile-breakpoint) {
      width: 100%;
      max-width: 240px;
      padding: 0.7rem 1.2rem;
      font-size: 0.9rem;
    }
  }

  // 平板和手機尺寸整體調整
  @media (max-width: $mobile-breakpoint) {
    width: 100%;
    max-width: 300px;
  }
}

.draw-card-area {
  flex: 1;
  position: relative;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .empty-state {
    height: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: var(--text-color);
    opacity: 0.7;

    i {
      font-size: 3rem;
      color: var(--primary-color);
    }

    p {
      font-size: 0.95rem;
    }

    // 手機尺寸調整
    @media (max-width: $mobile-breakpoint) {
      min-height: 200px;

      i {
        font-size: 2.5rem;
      }

      p {
        font-size: 0.85rem;
      }
    }
  }

  .draw-card {
    cursor: pointer;
    position: absolute;
    width: 280px;
    height: 300px;
    right: 0;
    left: 0;
    margin: 0 auto 5rem;
    perspective: 1000px; // 3D 效果

    opacity: 0.5;
    transform: translateX(30px) scale(0.85);
    transition: all 0.5s ease;

    &.active {
      opacity: 1;
      transform: translateX(0) scale(1);
      z-index: 5;
    }

    // 卡片內部容器
    .card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 0 8px rgba(var(--dark-text-rgb), 0.1);
      border-radius: 12px;

      .active &:hover {
        transform: translateY(-8px);
      }

      .active &:active {
        transform: translateY(-4px) scale(0.98);
      }

      // 基於class的卡片翻轉
      &.flipped {
        transform: rotateY(180deg);
      }
    }

    // 桌面懸停翻牌效果
    @media (hover: hover) {
      &.active:hover .card-inner:not(.flipped) {
        transform: rotateY(180deg);
      }
    }

    // 卡片正反面通用樣式
    .card-front,
    .card-back {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      backface-visibility: hidden; // 隱藏背面
      border-radius: 12px;
      padding: 2rem;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      overflow: hidden;
    }

    // 卡片正面
    .card-front {
      .skill-icon {
        font-size: 3rem;
        color: var(--primary-color);
        margin-bottom: 1.5rem;
        background: var(--accent-lighter);
        border-radius: 50%;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all $transition-speed ease;
        border: 2px solid var(--border-color);

        // 手機尺寸調整
        @media (max-width: $mobile-breakpoint) {
          font-size: 2.5rem;
          width: 70px;
          height: 70px;
          margin-bottom: 1rem;
        }
      }

      h3 {
        font-size: 1.6rem;
        font-weight: 600;
        color: var(--dark-text);
        margin-bottom: 0.8rem;
        text-align: center;

        // 手機尺寸調整
        @media (max-width: $mobile-breakpoint) {
          font-size: 1.4rem;
          margin-bottom: 0.6rem;
        }
      }

      .card-hint {
        font-size: 0.85rem;
        color: var(--text-color);
        opacity: 0.6;
        margin-top: auto;

        .active &:hover {
          opacity: 1;
        }

        // 手機尺寸調整
        @media (max-width: $mobile-breakpoint) {
          font-size: 0.8rem;
        }
      }
    }

    // 卡片背面
    .card-back {
      transform: rotateY(180deg);
      background: var(--card-bg-alt);
      text-align: left;
      align-items: flex-start;
      padding: 1.5rem;
      justify-content: flex-start;

      h4 {
        font-size: 1.4rem;
        color: var(--dark-text);
        margin-bottom: 1.2rem;
        padding-bottom: 0.8rem;
        position: relative;
        align-self: center;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--primary-color);
          border-radius: 2px;
        }

        // 手機尺寸調整
        @media (max-width: $mobile-breakpoint) {
          font-size: 1.2rem;
          margin-bottom: 0.9rem;
          padding-bottom: 0.6rem;
        }
      }

      .skill-points {
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;

        li {
          position: relative;
          padding: 0.6rem 0.6rem 0.6rem 2rem;
          margin-bottom: 0.5rem;
          color: var(--text-color);
          font-size: 0.9rem;
          background: var(--accent-lighter);
          border-radius: 6px;
          transition: all 0.2s ease;

          &:before {
            content: '•';
            color: var(--primary-color);
            position: absolute;
            left: 0.8rem;
            font-weight: bold;
          }

          &:hover {
            background: var(--accent-light);
            transform: translateX(3px);
          }

          // 手機尺寸調整
          @media (max-width: $mobile-breakpoint) {
            padding: 0.5rem 0.5rem 0.5rem 1.8rem;
            font-size: 0.85rem;
            margin-bottom: 0.4rem;
          }
        }
      }

      // 翻回按鈕
      .flip-back-btn {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--accent-lighter);
        color: var(--primary-color);
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        transition: all 0.3s ease;

        &:hover,
        &:active {
          background: var(--primary-color);
          color: white;
          transform: rotate(-180deg);
        }
      }
    }

    // 只有標記為最後添加的卡片才執行動畫
    &.manual-animation:not(.animation-completed) {
      animation: manual-card-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      animation-iteration-count: 1;

      &::after {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border-radius: 15px;
        background: radial-gradient(
          circle at center,
          rgba(var(--primary-color-rgb), 0.7) 0%,
          rgba(var(--primary-color-rgb), 0) 70%
        );
        opacity: 0;
        z-index: -1;
        animation: card-glow 1.2s ease-out;
      }
    }

    // 已完成動畫的卡片
    &.animation-completed {
      // 保留動畫最終狀態
      transform: translateY(0) scale(1) rotateX(0) rotateZ(0);
      opacity: 1;
    }

    // 手機尺寸調整
    @media (max-width: $mobile-breakpoint) {
      width: 240px;
      height: 260px;
      margin: 0 auto 3rem;
    }
  }

  // 卡片入場動畫
  @keyframes manual-card-in {
    0% {
      transform: translateY(-500px) scale(0.3) rotateX(-90deg) rotateZ(10deg);
      opacity: 0;
    }
    60% {
      transform: translateY(20px) scale(1.1) rotateX(5deg) rotateZ(-2deg);
      opacity: 1;
    }
    80% {
      transform: translateY(-10px) scale(0.95) rotateX(0deg) rotateZ(1deg);
    }
    100% {
      transform: translateY(0) scale(1) rotateX(0) rotateZ(0);
      opacity: 1;
    }
  }

  // 手機版入場動畫優化
  @media (max-width: $mobile-breakpoint) {
    @keyframes manual-card-in {
      0% {
        transform: translateY(-200px) scale(0.3) rotateX(-90deg) rotateZ(10deg);
        opacity: 0;
      }
      60% {
        transform: translateY(10px) scale(1.1) rotateX(5deg) rotateZ(-2deg);
        opacity: 1;
      }
      80% {
        transform: translateY(-5px) scale(0.95) rotateX(0deg) rotateZ(1deg);
      }
      100% {
        transform: translateY(0) scale(1) rotateX(0) rotateZ(0);
        opacity: 1;
      }
    }
  }

  @keyframes card-glow {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }

  // 手機尺寸調整
  @media (max-width: $mobile-breakpoint) {
    min-height: 300px;
    width: 100%;
  }
}

.card-navigation {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: auto;
  padding-top: 2rem;

  .nav-btn {
    cursor: pointer;
    background: var(--accent-lighter);
    color: var(--dark-text);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all $transition-speed ease;

    &:hover:not(:disabled) {
      background: var(--primary-color);
      color: white;
      transform: scale(1.1);
    }

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }

    i {
      font-size: 1.5rem;
    }

    // 手機尺寸調整
    @media (max-width: $mobile-breakpoint) {
      width: 36px;
      height: 36px;

      i {
        font-size: 1.3rem;
      }
    }
  }

  .card-pagination {
    display: flex;
    gap: 0.5rem;

    .pagination {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent-light);
      display: inline-block;
      cursor: pointer;
      transition: all $transition-speed ease;

      &.active {
        background: var(--primary-color);
        transform: scale(1.3);
      }

      &:hover:not(.active) {
        transform: scale(1.2);
        background: var(--primary-color-dark);
      }

      // 手機尺寸調整
      @media (max-width: $mobile-breakpoint) {
        width: 8px;
        height: 8px;
      }
    }

    // 手機尺寸調整
    @media (max-width: $mobile-breakpoint) {
      gap: 0.4rem;
    }
  }
}
</style>
