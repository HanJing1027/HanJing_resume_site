export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '黃翰靖 | 前端開發作品集',
    },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/views/Projects.vue'),
    meta: {
      title: '作品集',
    },
    children: [
      {
        path: '',
        name: 'ProjectsHome',
        component: () => import('@/components/projects/ProjectsHome.vue'),
      },
      {
        path: 'design',
        name: 'DesignProjects',
        component: () => import('@/components/projects/DesignProjectsList.vue'),
        meta: {
          title: '設計作品集',
        },
      },
      {
        path: 'design/:id',
        name: 'ProjectDetail',
        component: () => import('@/views/ProjectDetailPage.vue'),
        meta: {
          title: '作品詳情',
        },
        beforeEnter: (to, from, next) => {
          next()
        },
      },
      // {
      //   path: 'web',
      //   name: 'WebProjects',
      //   component: () => import('@/components/projects/WebProjectsList.vue'),
      //   meta: {
      //     title: '網頁作品集',
      //   },
    ],
    // },
  },
]
