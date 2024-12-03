import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Game } from '@/types/game'

export const useGamesStore = defineStore('games', () => {
  const activeGame: Ref<Game | null> = ref(null)

  const setActiveGame = (g: Game | null) => (activeGame.value = g)

  return { activeGame, setActiveGame }
})
