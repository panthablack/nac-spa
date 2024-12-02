import { GUARDS } from '@/config/constants'
import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('@/views/auth/LogoutView.vue'),
  },
].map((r: RouteRecordRaw) => ({ ...r, meta: { ...(r.meta || {}), guard: GUARDS.AUTHENTICATED } }))
