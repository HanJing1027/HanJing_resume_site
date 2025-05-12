<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const modelValue = defineModel('modelValue', {
  type: Boolean,
  default: false,
})

const closeModal = () => {
  modelValue.value = false
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as *;

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: modal-appear 0.3s ease forwards;

  .modal-header {
    padding: 0.8rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;

    h3 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: $dark-text;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 1.8rem;
      cursor: pointer;
      color: $dark-text;
      transition: color 0.2s ease;

      &:hover {
        color: $primary-color;
      }
    }
  }

  .modal-body {
    padding: 0.8rem 2rem;
    color: $text-color;
    line-height: 1.6;
  }

  .modal-footer {
    padding: 0.8rem 2rem;
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-end;
  }
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
