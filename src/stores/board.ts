import { computed, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { TILE_STATES } from '@/enums/tiles'
import { usePlayerStore } from '@/stores/players'
import { useGamesStore } from './games'
import { someRowHasAllElementsEqualToValue, transposeArray } from '@/utilities/arrays'
import type { Game } from '@/types/game'
import { GAME_STATES } from '@/enums/games'
import type { BoardState } from '@/types/board'

export const useBoardStore = defineStore('board', () => {
  // dependencies
  const playerStore = usePlayerStore()
  const gameStore = useGamesStore()

  // state

  // ..

  // getters
  const aPlayerHasWon: ComputedRef<boolean> = computed(() => {
    if (tileTypeWinConditionExists(playerStore.activePlayerTile)) return true
    else return false
  })

  const player1HasWon: ComputedRef<boolean> = computed(() =>
    tileTypeWinConditionExists(playerStore.getPlayerTile(playerStore.player1))
  )

  const player2HasWon: ComputedRef<boolean> = computed(() =>
    tileTypeWinConditionExists(playerStore.getPlayerTile(playerStore.player2))
  )

  const boardActive: ComputedRef<boolean> = computed(
    () =>
      gameStore.currentGameState === GAME_STATES.IN_PLAY &&
      playerStore.player1Online &&
      playerStore.player2Online
  )

  const boardMatrix: ComputedRef<number[][]> = computed(() => {
    const game: Game | null = gameStore.activeGame
    if (!game?.boardState || !game) return [[]]
    const source: BoardState = game.boardState
    const matrix = new Array(game.rows).fill(null)
    matrix.forEach((r: number[], ri) => {
      if (r) return
      matrix[ri] = new Array(game.cols).fill(null)
      matrix[ri].forEach((c: number, ci: number) => {
        if (c) return
        matrix[ri][ci] = source[getBoardIndexFromMatrixPosition(ri, ci, game.cols)]
      })
    })
    return matrix
  })

  const noMoreMovesCanBeMade: ComputedRef<boolean> = computed(
    () => !gameStore.activeGame?.boardState?.includes(TILE_STATES.EMPTY)
  )

  // methods
  const getBoardIndexFromMatrixPosition = (row: number, col: number, totalCols: number) =>
    row * totalCols + col

  const aColumnHasAllTilesOfType = (t: number): boolean =>
    someRowHasAllElementsEqualToValue(transposeArray(boardMatrix.value), t)

  const aDiagonalHasAllTilesOfType = (t: number): boolean => !t

  const aRowHasAllTilesOfType = (t: number): boolean =>
    someRowHasAllElementsEqualToValue(boardMatrix.value, t)

  const tileTypeWinConditionExists = (t: number): boolean => {
    // empty tiles cannot win, so if the tile passed is empty, return false
    if (t === TILE_STATES.EMPTY) return false
    // check rows
    if (aRowHasAllTilesOfType(t)) return true
    // check cols
    else if (aColumnHasAllTilesOfType(t)) return true
    // check diagonals
    else if (aDiagonalHasAllTilesOfType(t)) return true
    // else, return false
    else return false
  }

  const resetBoard = () => {
    gameStore.activeGame?.boardState?.fill(TILE_STATES.EMPTY)
  }

  const updateboard = (index: number) => {
    if (!gameStore.activeGame?.boardState) return
    // update internal state
    gameStore.activeGame.boardState[index] = playerStore.activePlayerTile
    // update game state if game still active
    if (!gameStore.activeGame?.endedAt) gameStore.updateActiveGame()
    // if game no longer in play, end the game
    if (gameStore.currentGameState !== GAME_STATES.IN_PLAY) gameStore.endGame()
  }

  // interface
  return {
    aPlayerHasWon,
    boardActive,
    boardMatrix,
    noMoreMovesCanBeMade,
    player1HasWon,
    player2HasWon,
    resetBoard,
    updateboard,
  }
})
