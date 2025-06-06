<template>
  <NavBar />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<script setup>
import NavBar from '@/components/layout/NavBar.vue'
import Footer from './components/layout/Footer.vue'
</script>

<style lang="scss" scoped></style>
