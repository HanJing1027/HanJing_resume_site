import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, from) => {
  const title = to.meta.title || '黃翰靖 | 前端開發作品集'
  document.title = title
})

export default router
