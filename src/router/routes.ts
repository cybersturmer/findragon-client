import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/DashLayout.vue'),
    children: [
      {
        name: 'allocation_view',
        path: '',
        component: () => import('pages/Allocations.vue')
      },
      {
        name: 'asset_view',
        path: 'assets',
        component: () => import('pages/Allocations.vue')
      }
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
