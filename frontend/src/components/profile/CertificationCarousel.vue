<template>
  <section class="certification-section">
    <div class="section-header">
      <h2 class="section-title">Certificate</h2>
      <div class="title-underline">
        <span class="line"></span>
        <span class="dot"></span>
        <span class="line"></span>
      </div>
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
        :loop="true"
        class="certification-swiper"
      >
        <swiper-slide v-for="(cert, index) in certifications" :key="index" class="cert-slide">
          <div class="cert-card">
            <div class="cert-image">
              <img :src="cert.image" :alt="cert.title" />
              <div class="cert-overlay">
                <button class="view-cert-btn">查看證書</button>
              </div>
            </div>
            <div class="cert-info">
              <h4>{{ cert.title }}</h4>
              <p class="cert-issuer">{{ cert.issuer }}</p>
              <p class="cert-date">{{ cert.date }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
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
    issuer: 'Adobe Systems',
    date: '2023年4月',
    id: 'PS-2023-1234',
  },
  {
    title: 'SSE Adobe Illustrator CC',
    image: IllustratorImg,
    issuer: 'Adobe Systems',
    date: '2023年6月',
    id: 'AI-2023-5678',
  },
  {
    title: 'SSE Chromatics',
    image: chromaticsImg,
    issuer: 'SSE Organization',
    date: '2023年9月',
    id: 'CHR-2023-9012',
  },
])

// swiper 配置
const SwiperNavigation = Navigation
const SwiperPagination = Pagination
const SwiperAutoplay = Autoplay
const swiperBreakpoints = {
  768: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;
@use '@/assets/styles/_mixins.scss' as *;

.section-header {
  text-align: center;
  margin-bottom: 4rem;

  .section-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--dark-text);
    margin-bottom: 1rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all $transition-speed ease;
  }

  .title-underline {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 1.5rem;

    .line {
      height: 2px;
      width: 50px;
      background-color: var(--primary-color);
    }

    .dot {
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background-color: var(--primary-color);
    }
  }
}

.certification-section {
  padding: 3.5rem 2rem;
  background: var(--card-bg-alt);
  border-radius: 8px;
  max-width: 1200px;
  width: 100%;
  margin: 3rem auto;
  box-shadow: 0 5px 15px var(--shadow);
  transition: all $transition-speed ease;
}

.certification-carousel {
  width: 100%;
  padding: 1rem 0;

  // 左右箭頭樣式
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    width: 40px;
    height: 40px;
    background: var(--primary-color);
    border-radius: 50%;
    color: white;
    transition: all 0.15s ease-in-out;

    &:after {
      font-size: 18px;
    }

    &:hover {
      background: var(--primary-color-dark);
    }

    @media (max-width: $mobile-breakpoint) {
      display: none;
    }
  }

  // 分頁點點樣式
  :deep(.swiper-pagination) {
    margin-top: 15px;

    .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
      background: var(--text-color);
      opacity: 0.3;
    }

    .swiper-pagination-bullet-active {
      width: 10px;
      height: 10px;
      background: var(--primary-color);
      opacity: 1;
    }
  }
}

.certification-swiper {
  width: 100%;
  height: 400px;
  padding: 1rem 0;
}

.cert-card {
  display: flex;
  flex-direction: column;
  background: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px var(--shadow);
  height: 100%;
  transition: all 0.25s ease;

  &:hover {
    box-shadow: 0 8px 20px var(--shadow);

    .cert-overlay {
      opacity: 1;
    }
  }

  .cert-image {
    height: 220px;
    overflow: hidden;
    position: relative;
    background: var(--img-bg);

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .cert-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(var(--primary-color-rgb), 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.25s ease;

      .view-cert-btn {
        @include base-button(0.7rem 1.2rem);
        background: white;
        color: var(--primary-color);
        border-radius: 4px;

        &:hover {
          background: var(--card-bg);
        }
      }
    }
  }

  .cert-info {
    padding: 1.2rem;
    display: flex;
    flex-direction: column;

    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--dark-text);
    }

    .cert-issuer {
      font-size: 0.9rem;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    .cert-date {
      font-size: 0.8rem;
      color: var(--text-color);
    }
  }
}

// 響應式適配
@media (max-width: $mobile-breakpoint) {
  .certification-section {
    padding: 2.5rem 1.5rem;
  }

  .certification-swiper {
    height: 380px;
  }

  .cert-card {
    .cert-image {
      height: 200px;
    }

    .cert-info {
      padding: 1rem;

      h4 {
        font-size: 1rem;
      }
    }
  }
}
</style>
