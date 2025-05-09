export default [
  {
    patch: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '黃翰靖 | 前端開發作品集',
    },
  },
]
