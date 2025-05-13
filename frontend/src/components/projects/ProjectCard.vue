<template>
  <div class="project-card" :class="type">
    <div class="card-content">
      <div class="card-accent"></div>
      <div class="content-main">
        <div class="icon-container">
          <div class="icon-circle">
            <i class="icon" :class="iconClass"></i>
          </div>
        </div>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
      <div class="arrow-container">
        <i
          class="arrow"
          :class="[`arrow-${arrowDirection}`, `bx bxs-chevrons-${arrowDirection}`]"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['design', 'web'].includes(value),
  },
  iconClass: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  arrowDirection: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value),
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.project-card {
  flex: 1;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px var(--shadow);
  transition: all $transition-speed;
  cursor: pointer;
  aspect-ratio: 3/4;
  max-width: 320px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(71, 85, 105, 0.12);

    .arrow-right {
      transform: translateX(6px);
    }

    .arrow-left {
      transform: translateX(-6px);
    }

    .icon-circle {
      transform: scale(1.1);
      box-shadow: 0 0 0 4px var(--accent-lighter);
    }

    .card-accent {
      height: 65%;
    }
  }

  &.design {
    .card-accent {
      background: linear-gradient(135deg, var(--accent-light) 0%, var(--accent-lighter) 100%);
    }
  }

  &.web {
    .card-accent {
      background: linear-gradient(135deg, var(--accent-light) 0%, var(--accent-lighter) 100%);
    }
  }
}

.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;
  z-index: 1;
  transition: all $transition-speed;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  opacity: 1;
}

.card-content {
  position: relative;
  z-index: 2;
  color: var(--dark-text);
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content-main {
  display: flex;
  flex-direction: column;
  margin-top: 120px;

  h2 {
    font-size: 1.8rem;
    margin: 0 0 0.8rem;
    font-weight: 600;
    color: var(--dark-text);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background: var(--primary-color);
      border-radius: 2px;
    }
  }

  p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.4;
    max-width: 100%;
    color: var(--text-color);
  }
}

.icon-container {
  margin-bottom: 1.5rem;
}

.icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--card-bg-alt);
  box-shadow: 0 4px 12px var(--shadow);
  margin-bottom: 1rem;
  transition: all $transition-speed;
  border: 2px solid var(--border-color);
}

.icon {
  color: var(--primary-color);
  font-size: 1.8rem;
  font-weight: 700;
}

.arrow-container {
  position: absolute;
  display: flex;
  align-items: center;
}

.project-card.design .arrow-container {
  right: 35px;
  bottom: 30px;
}

.project-card.web .arrow-container {
  left: 35px;
  bottom: 30px;
}

.arrow {
  display: inline-block;
  font-size: 2rem;
  font-weight: normal;
  line-height: 1;
  color: var(--primary-color);
  transition: transform $transition-speed;
  background: var(--accent-lighter);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: $mobile-breakpoint) {
  .project-card {
    aspect-ratio: 5/6;
    max-width: 100%;
    width: 85%;

    .content-main h2 {
      font-size: 1.6rem;
    }

    .content-main p {
      font-size: 0.9rem;
    }
  }
}

@media (max-width: 500px) {
  .project-card {
    aspect-ratio: 3/4;
    width: 100%;
  }
}
</style>
