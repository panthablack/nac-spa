import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchUserData } from '@/utilities/auth'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { GUARDS } from '@/config/constants'

export const useBootStore = defineStore('boot', () => {
  const router = useRouter()
  const route = useRoute()

  const booting: Ref<boolean> = ref(true)

  const setBooting = (v: boolean) => (booting.value = v)

  const getNextRoute = () => {
    const authStore = useAuthStore()
    const isAuthenticated: boolean = authStore.isAuthenticated
    if (!isAuthenticated && route.meta.guard === GUARDS.AUTHENTICATED) return { name: 'login' }
    else if (isAuthenticated && route.meta.guard === GUARDS.GUEST) return { name: 'dashboard' }
    else return
  }

  const onBootFinished = () => {
    setBooting(false)
    const nextRoute = getNextRoute()
    if (!nextRoute || route.name === nextRoute.name) return
    else router.push(nextRoute)
  }

  const boot = () => {
    setBooting(true)
    fetchUserData().finally(() => onBootFinished())
  }

  return { booting, boot, setBooting }
})
