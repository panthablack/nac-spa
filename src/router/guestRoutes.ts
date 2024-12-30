import { GUARDS } from '@/config/constants'
import type { RouteRecordRaw } from 'vue-router'

export const guestRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: import('@/views/public/HomeView.vue'),
    meta: { title: 'Home' },
    alias: '/home',
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/public/AboutView.vue'),
    meta: { title: 'About' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { title: 'Login' },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: { title: 'Register' },
  },
].map((r: RouteRecordRaw) => ({ ...r, meta: { ...(r.meta || {}), guard: GUARDS.GUEST } }))
