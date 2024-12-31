import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchUserData } from '@/utilities/auth'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { GUARDS } from '@/enums/constants'
import { DEFAULT_AUTH_TYPE } from '@/config/auth'
import { AUTH_TYPES } from '@/enums/auth'

export const useBootStore = defineStore('boot', () => {
  // dependencies
  const router = useRouter()
  const route = useRoute()

  // state
  const booting: Ref<boolean> = ref(true)

  // getters

  // ...

  // methods
  const getNextRoute = () => {
    if (DEFAULT_AUTH_TYPE === AUTH_TYPES.NONE) return
    else return getNextAuthRoute()
  }

  const getNextAuthRoute = () => {
    const authStore = useAuthStore()
    const isAuthenticated: boolean = authStore.isAuthenticated
    if (!isAuthenticated && route.meta.guard === GUARDS.AUTHENTICATED) return { name: 'login' }
    else if (isAuthenticated && route.meta.guard === GUARDS.GUEST) return { name: 'dashboard' }
    else return
  }

  const setBooting = (v: boolean) => (booting.value = v)

  const onBootFinished = () => {
    setBooting(false)
    const nextRoute = getNextRoute()
    if (!nextRoute || route.name === nextRoute.name) return
    else router.push(nextRoute)
  }

  const boot = async () => {
    setBooting(true)
    if (DEFAULT_AUTH_TYPE === AUTH_TYPES.NONE) onBootFinished()
    else if (route.meta.guard === GUARDS.PUBLIC) onBootFinished()
    else return await fetchUserData().finally(() => onBootFinished())
  }

  // interface
  return { booting, boot, setBooting }
})
