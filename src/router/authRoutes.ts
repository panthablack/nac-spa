import { GUARDS } from '@/enums/constants'
import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { title: 'Dashboard' },
  },
  {
    path: '/games/:id',
    name: 'play',
    component: () => import('@/views/games/PlayView.vue'),
    meta: { title: 'Play' },
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('@/views/auth/LogoutView.vue'),
    meta: { title: 'Log Out' },
  },
].map((r: RouteRecordRaw) => ({ ...r, meta: { ...(r.meta || {}), guard: GUARDS.AUTHENTICATED } }))
