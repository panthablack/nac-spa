import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  // state
  const user: Ref<User | null> = ref(null)

  // getters
  const isAuthenticated = computed(() => !!user.value)

  // methods
  const setUser = (v: User | null) => (user.value = v)

  // interface
  return { isAuthenticated, setUser, user }
})
