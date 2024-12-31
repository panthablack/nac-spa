import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Game } from '@/types/game'
import { api } from '@/utilities/api'

type ExistingGamesPaginated = {
  data: Game[]
} | null

export const useGamesStore = defineStore('games', () => {
  // state
  const activeGame: Ref<Game | null> = ref(null)
  const existingGamesPaginated: Ref<ExistingGamesPaginated> = ref(null)
  const fetchingExistingGames: Ref<boolean> = ref(false)

  // getters
  const existingGames = computed(() => existingGamesPaginated.value?.data || [])

  // methods
  const setActiveGame = (g: Game | null) => (activeGame.value = g)

  const fetchExistingGames = () =>
    new Promise((resolve, reject) => {
      fetchingExistingGames.value = true
      api('/games')
        .then(res => {
          existingGamesPaginated.value = res
          resolve(res)
        })
        .catch(e => reject(e))
        .finally(() => (fetchingExistingGames.value = false))
    })

  // interface
  return {
    activeGame,
    existingGames,
    fetchExistingGames,
    fetchingExistingGames,
    setActiveGame,
  }
})
