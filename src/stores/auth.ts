import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null> = ref(null)

  const setUser = (v: User | null) => (user.value = v)

  return { setUser, user }
})
