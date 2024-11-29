import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from './authRoutes'
import { guestRoutes } from './guestRoutes'
import { utilityRoutes } from './utilityRoutes'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/types/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...guestRoutes, ...authRoutes, ...utilityRoutes],
})

// authentication guard

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const user: User | null = authStore.user
  if (!user && to.meta.guard === 'auth') next({ name: 'login' })
  else if (!!user && to.meta.guard === 'guest') next({ name: 'dashboard' })
  else next()
})

export default router
