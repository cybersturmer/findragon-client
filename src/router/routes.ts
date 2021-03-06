import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/DashLayout.vue'),
    children: [
      {
        name: 'index',
        path: '/',
        redirect: to => {
          return { name: 'stats_view' }
        }
      },
      {
        name: 'stats_view',
        path: '/stats',
        component: () => import('pages/Stats.vue')
      },
      {
        name: 'allocations_view',
        path: '/allocations',
        component: () => import('pages/Allocations.vue')
      },
      {
        name: 'assets_view',
        path: '/assets',
        component: () => import('pages/Assets.vue')
      },
      {
        name: 'transactions_view',
        path: '/transactions',
        component: () => import('pages/Transactions.vue')
      },
      {
        name: 'incomes_view',
        path: '/incomes',
        component: () => import('pages/Incomes.vue')
      }
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
