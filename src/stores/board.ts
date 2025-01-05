import { computed, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { PLAYER_NUMBERS } from '@/enums/players'
import { TILE_STATES } from '@/enums/tiles'
import { usePlayerStore } from '@/stores/players'
import { useGamesStore } from './games'
import { someRowHasAllElementsEqualToValue, transposeArray } from '@/utilities/arrays'
import type { BoardState, Game } from '@/types/game'

export const useBoardStore = defineStore('board', () => {
  // dependencies
  const playerStore = usePlayerStore()
  const gameStore = useGamesStore()

  // state
  const board: ComputedRef<BoardState | null> = computed(
    () => gameStore.activeGame?.boardState || null
  )

  // getters
  const boardMatrix: ComputedRef<number[][]> = computed(() => {
    const game: Game | null = gameStore.activeGame
    if (!board.value || !game) return []
    const source: BoardState = board.value
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
    () => !board.value?.includes(TILE_STATES.EMPTY)
  )

  const boardActive: ComputedRef<boolean> = computed(
    () => playerStore.player1Online && playerStore.player2Online
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
    // check rows
    if (aRowHasAllTilesOfType(t)) return true
    // check cols
    else if (aColumnHasAllTilesOfType(t)) return true
    // check diagonals
    else if (aDiagonalHasAllTilesOfType(t)) return true
    // else, return false
    else return false
  }

  const currentPlayerHasWon = (): boolean => {
    if (tileTypeWinConditionExists(playerStore.activePlayerTile)) return true
    else return false
  }

  const handleDrawCondition = () => {
    alert(`It's a draw!`)
    gameStore.endGame()
  }

  const resetBoard = () => {
    gameStore.activeGame?.boardState?.fill(TILE_STATES.EMPTY)
    playerStore.setActivePlayer(PLAYER_NUMBERS.PLAYER_1)
  }

  const updateboard = (index: number) => {
    if (!board.value) return
    // update internal state
    board.value[index] = playerStore.activePlayerTile
    // update game state
    gameStore.updateActiveGame(board.value)
    // handle any win conditions
    if (!playerStore.activePlayerNumber) return
    // TODO: update 'a player has won' check, so that it works on both screens
    else if (currentPlayerHasWon()) playerStore.handlePlayerVictory(playerStore.activePlayerNumber)
    else if (noMoreMovesCanBeMade.value) handleDrawCondition()
    else playerStore.changePlayer()
  }

  // interface
  return {
    board,
    boardActive,
    resetBoard,
    updateboard,
  }
})
