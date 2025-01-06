import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from './authRoutes'
import { guestRoutes } from './guestRoutes'
import { utilityRoutes } from './utilityRoutes'
import { useAuthStore } from '@/stores/auth'
import { useBootStore } from '@/stores/boot'
import { GUARDS } from '@/enums/guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...guestRoutes, ...authRoutes, ...utilityRoutes],
})

// authentication guard

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const bootStore = useBootStore()
  if (bootStore.booting) next()
  const isAuthenticated: boolean = authStore.isAuthenticated
  if (!isAuthenticated && to.meta.guard === GUARDS.AUTHENTICATED) return next({ name: 'login' })
  else if (isAuthenticated && to.meta.guard === GUARDS.GUEST) return next({ name: 'dashboard' })
  else return next()
})

export default router
