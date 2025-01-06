import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Game, GameState } from '@/types/game'
import { NEW_GAME_DEFAULTS } from '@/config/board'
import { api } from '@/utilities/api'
import { TILE_STATES } from '@/enums/tiles'
import { GAME_STATES } from '@/enums/games'
import { useBoardStore } from '@/stores/board'
import { useReverb } from '@/composables/useReverb'

type ExistingGamesPaginated = {
  data: Game[]
} | null

const { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } = NEW_GAME_DEFAULTS

export const useGamesStore = defineStore('games', () => {
  // dependencies
  const boardStore = useBoardStore()
  const reverb = useReverb()

  // state
  const activeGame: Ref<Game | null> = ref(null)
  const existingGamesPaginated: Ref<ExistingGamesPaginated> = ref(null)
  const fetchingExistingGames: Ref<boolean> = ref(false)

  // getters
  const currentGameState: ComputedRef<GameState> = computed(() => {
    // if draw, return DRAW
    if (boardStore.noMoreMovesCanBeMade && !boardStore.aPlayerHasWon) return GAME_STATES.DRAW
    // if player 1 has won, return PLAYER_1_WIN
    else if (boardStore.player1HasWon) return GAME_STATES.PLAYER_1_WIN
    // if player 2 has won, return PLAYER_2_WIN
    else if (boardStore.player2HasWon) return GAME_STATES.PLAYER_2_WIN
    // if no win state, return IN_PLAY
    else return GAME_STATES.IN_PLAY
  })

  const existingGames = computed(() => existingGamesPaginated.value?.data || [])

  const newGameDefaults = computed(() => ({
    rows: NUMBER_OF_ROWS,
    cols: NUMBER_OF_COLUMNS,
    boardState: getDefaultBoardStateFromRowsAndCols(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS),
  }))

  // methods
  const endGame = async () => {
    // if no active game or game already ended, do nothing
    if (!activeGame.value || !!activeGame.value.endedAt) return
    // else set ended at date and update game
    activeGame.value.endedAt = Date.now().toLocaleString()
    await updateActiveGame()
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

  const startNewGame = async () =>
    await api('/games', { method: 'POST', data: newGameDefaults.value })

  const setActiveGame = (g: Game | null) => (activeGame.value = g)

  const updateActiveGame = async () => {
    if (!activeGame.value) return
    else {
      reverb.presenceChannels[`games.${activeGame.value?.id}`].whisper('GameUpdated', {
        game: activeGame.value,
      })
      activeGame.value = await api(`/games/${activeGame.value.id}`, {
        data: activeGame.value,
        method: 'PATCH',
      })
    }
  }

  // interface
  return {
    activeGame,
    currentGameState,
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
