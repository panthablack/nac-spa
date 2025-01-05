import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { BoardState, Game } from '@/types/game'
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
  const endGame = () => {
    // if no active game, do nothing
    if (!activeGame.value) return
    // else set ended at date
    activeGame.value.endedAt = Date.now().toLocaleString()
    alert(`Game ended!`)
  }

  const setActiveGame = (g: Game | null) => (activeGame.value = g)

  const updateActiveGame = async (boardState: BoardState) => {
    if (!activeGame.value) return
    else {
      activeGame.value.boardState = boardState
      await api(`/games/${activeGame.value.id}`, {
        data: { boardState: boardState },
        method: 'PATCH',
      })
    }
  }

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
    endGame,
    existingGames,
    fetchExistingGames,
    fetchingExistingGames,
    setActiveGame,
    updateActiveGame,
  }
})
