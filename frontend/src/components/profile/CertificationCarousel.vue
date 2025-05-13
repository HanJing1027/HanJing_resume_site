<template>
  <div class="certification-section">
    <div class="section-title">
      <h2>Certificate</h2>
      <div class="title-divider"></div>
    </div>

    <div class="certification-carousel">
      <swiper
        :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
        :slides-per-view="1"
        :space-between="30"
        :breakpoints="swiperBreakpoints"
        :pagination="{ clickable: true }"
        :navigation="true"
        :autoplay="{ delay: 4000, disableOnInteraction: true }"
        class="certification-swiper"
      >
        <swiper-slide v-for="(cert, index) in certifications" :key="index" class="cert-slide">
          <div class="cert-card">
            <div class="cert-image">
              <img :src="cert.image" :alt="cert.title" />
            </div>
            <div class="cert-info">
              <h4>{{ cert.title }}</h4>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { ref } from 'vue'

import photoshopImg from '@/assets/images/certifications/photoshop.jpg'
import IllustratorImg from '@/assets/images/certifications/illustrator.jpg'
import chromaticsImg from '@/assets/images/certifications/chromatics.jpg'

// 證照資料
const certifications = ref([
  {
    title: 'SSE Adobe PhotoShop CC',
    image: photoshopImg,
  },
  {
    title: 'SSE Adobe Illustrator CC',
    image: IllustratorImg,
  },
  {
    title: 'SSE Chromatics',
    image: chromaticsImg,
  },
])

// swiper 配置
const SwiperNavigation = Navigation
const SwiperPagination = Pagination
const SwiperAutoplay = Autoplay
const swiperBreakpoints = {
  768: {
    slidesPerView: 2,
    spaceBetween: 30,
  },
  1024: {
    slidesPerView: 2, // 最多顯示卡片數量
    spaceBetween: 50,
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.certification-section {
  padding: 4rem 2rem;
  background-color: var(--card-bg-alt);
  border-radius: 4px;
  max-width: 1200px;
  width: 100%;
  margin: 2rem auto;
  box-shadow: 0 8px 30px var(--shadow);
  transition: all $transition-speed ease;
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
    background-color: var(--primary-color);
    margin: 0 auto;
    transition: background-color $transition-speed ease;
  }
}

.certification-carousel {
  width: 100%;

  // 左右箭頭樣式
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    width: 40px;
    height: 40px;
    background-color: var(--card-bg-alt);
    border-radius: 50%;
    box-shadow: 0 2px 10px var(--shadow);
    color: var(--primary-color);
    transition: all $transition-speed ease;

    &:after {
      font-size: 18px;
      font-weight: bold;
    }

    &:hover {
      background-color: var(--primary-color);
      color: white;
    }
  }

  // 分頁點點樣式
  :deep(.swiper-pagination) {
    margin-top: 15px;

    // 未選中
    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      background-color: var(--text-color);
      opacity: 0.3;
      margin: 0 5px;
      transition: all 0.3s ease;
    }

    // 選中
    .swiper-pagination-bullet-active {
      background-color: var(--primary-color);
      opacity: 1;
      width: 12px;
      height: 12px;
    }
  }
}

.certification-swiper {
  width: 100%;
  height: 400px;
}

.cert-card {
  cursor: default;
  display: flex;
  flex-direction: column;
  background-color: var(--card-bg-alt);
  overflow: hidden;
  box-shadow: 0 5px 15px var(--shadow);
  height: 100%;
  transition: all $transition-speed ease;

  .cert-image {
    height: 300px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: transform 0.5s ease;
    }
  }

  &:hover .cert-image img {
    transform: scale(1.03);
  }

  .cert-info {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;

    h4 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.8rem;
      text-align: center;
      color: var(--dark-text);
      transition: color $transition-speed ease;
    }
  }
}

// 響應式適配
@media (max-width: $mobile-breakpoint) {
  .certification-section {
    padding: 3rem 1.5rem;
  }

  .certification-carousel {
    :deep(.swiper-button-prev),
    :deep(.swiper-button-next) {
      display: none;
    }
  }

  .certification-swiper {
    height: 420px;
  }

  .cert-card {
    .cert-image {
      height: 300px;

      img {
        max-height: 200px;
      }
    }
  }
}
</style>
d
