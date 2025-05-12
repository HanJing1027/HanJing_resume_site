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
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
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

// Swiper 配置 - 修改為最多顯示兩張卡片
const SwiperNavigation = Navigation
const SwiperPagination = Pagination
const SwiperAutoplay = Autoplay
const swiperBreakpoints = {
  // 當視窗寬度大於等於 768px
  768: {
    slidesPerView: 2,
    spaceBetween: 30,
  },
  // 當視窗寬度大於等於 1024px
  1024: {
    slidesPerView: 2, // 修改為顯示兩張卡片
    spaceBetween: 50,
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.certification-section {
  padding: 4rem 2rem;
  background-color: $background;
  border-radius: 4px;
  max-width: 1200px;
  width: 100%;
  margin: 2rem auto;
  box-shadow: 0 8px 30px $shadow;
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

.certification-carousel {
  width: 100%;

  // 修改左右箭頭樣式
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    color: $primary-color; // 使用主題色

    &:after {
      font-size: 18px;
      font-weight: bold;
    }

    &:hover {
      background-color: $primary-color;
      color: white;
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
  background-color: white;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: 100%;
  transition: all 0.3s ease;

  .cert-image {
    height: 300px; // 增加圖片容器高度，從原本的180px增加到230px
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
      max-height: 300px; // 同步增加最大高度
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
      color: $dark-text;
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
    height: 420px; // 增加響應式下的高度
  }

  .cert-card {
    .cert-image {
      height: 200px; // 增加響應式下的圖片容器高度

      img {
        max-height: 200px; // 增加響應式下的圖片最大高度
      }
    }
  }
}
</style>
