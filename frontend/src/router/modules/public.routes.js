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
        component: () => import('@/components/projects/designProject/DesignProjectsList.vue'),
        meta: {
          title: '設計作品集',
        },
      },
      {
        path: 'design/:id',
        name: 'ProjectDetail',
        component: () => import('@/views/ProjectDetailPage.vue'),
        meta: {
          title: '設計作品詳情',
          projectType: 'design',
        },
      },
      {
        path: 'web',
        name: 'WebProjects',
        component: () => import('@/components/projects/webProject/WebProjectsList.vue'),
        meta: {
          title: '網頁作品集',
        },
      },
      {
        path: 'web/:id',
        name: 'WebProjectDetail',
        component: () => import('@/views/ProjectDetailPage.vue'),
        meta: {
          title: '網頁專案詳情',
          projectType: 'web',
        },
      },
    ],
  },
]
