import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { BoardState, Game } from '@/types/game'
import { NEW_GAME_DEFAULTS } from '@/config/board'
import { api } from '@/utilities/api'
import { usePlayerStore } from '@/stores/players'
import { TILE_STATES } from '@/enums/tiles'
import { PLAYER_NUMBERS } from '@/enums/players'

type ExistingGamesPaginated = {
  data: Game[]
} | null

const { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } = NEW_GAME_DEFAULTS

export const useGamesStore = defineStore('games', () => {
  // dependencies
  const playerStore = usePlayerStore()

  // state
  const activeGame: Ref<Game | null> = ref(null)
  const existingGamesPaginated: Ref<ExistingGamesPaginated> = ref(null)
  const fetchingExistingGames: Ref<boolean> = ref(false)

  // getters
  const existingGames = computed(() => existingGamesPaginated.value?.data || [])

  const newGameDefaults = computed(() => ({
    rows: NUMBER_OF_ROWS,
    cols: NUMBER_OF_COLUMNS,
    boardState: getDefaultBoardStateFromRowsAndCols(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS),
  }))

  // methods
  const endGame = () => {
    // if no active game, do nothing
    if (!activeGame.value) return
    // else set ended at date
    activeGame.value.endedAt = Date.now().toLocaleString()
    alert(`Game ended!`)
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

  const getDefaultBoardStateFromRowsAndCols = (rows: number, cols: number) => {
    const numTiles = rows * cols
    const boardState = new Array(numTiles)
    boardState.fill(TILE_STATES.EMPTY)
    return boardState
  }

  const join = async (game: Game) => await api(`/games/${game.id}/join`, { method: 'POST' })

  const startNewGame = async () => {
    const res = await api('/games', { method: 'POST', data: newGameDefaults.value })
    if (res) playerStore.setActivePlayer(PLAYER_NUMBERS.PLAYER_1)
    return res
  }

  const setActiveGame = (g: Game | null) => (activeGame.value = g)

  const updateActiveGame = async (boardState: BoardState) => {
    if (!activeGame.value) return
    else {
      activeGame.value = await api(`/games/${activeGame.value.id}`, {
        data: { boardState: boardState },
        method: 'PATCH',
      })
    }
  }

  // interface
  return {
    activeGame,
    endGame,
    existingGames,
    fetchExistingGames,
    fetchingExistingGames,
    join,
    newGameDefaults,
    setActiveGame,
    startNewGame,
    updateActiveGame,
  }
})
