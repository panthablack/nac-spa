import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/auth'
import { usePlayerStore } from '@/stores/players'
import type { Player } from '@/types/player'

export const useAuthStore = defineStore('auth', () => {
  // dependencies
  const playerStore = usePlayerStore()

  // state
  const user: Ref<User | null> = ref(null)

  // getters
  const isAuthenticated = computed(() => !!user.value)

  // methods
  const setUser = (v: User | null) => (user.value = v)

  const updateUserOnlineStatus = (user: User, status: boolean) => {
    const player = playerStore.getPlayerFromUser(user)
    if (player) playerStore.setPlayerOnline(player, status)
  }

  const updateUserOnlineStatuses = (users: User[]) => {
    console.debug('Setting user online statuses: ', users)
    const players: Player[] = Object.values(playerStore.players).filter(v => !!v)
    const isOnline = (p: Player) => !!users.find(u => u.id === p.id)
    players.forEach((p: Player) => playerStore.setPlayerOnline(p, isOnline(p)))
  }

  // interface
  return { isAuthenticated, setUser, user, updateUserOnlineStatus, updateUserOnlineStatuses }
})
