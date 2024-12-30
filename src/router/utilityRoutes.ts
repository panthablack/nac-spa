import Error404 from '@/views/errors/404.vue'
import type { RouteRecordRaw } from 'vue-router'

export const utilityRoutes: RouteRecordRaw[] = [
  // 404 Catch All Must go last // *****************************************************************
  {
    path: '/:pathMatch(.*)*',
    name: 'Error404',
    component: Error404,
    meta: { title: '404' },
  },
  // ***********************************************************************************************
]
