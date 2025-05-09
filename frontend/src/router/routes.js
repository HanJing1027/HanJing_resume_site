import publicRoutes from './modules/public.routes.js'

const errorRoutes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '頁面不存在',
    },
  },
]

export default [...publicRoutes, ...errorRoutes]
