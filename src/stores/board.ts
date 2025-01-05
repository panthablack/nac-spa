import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { PLAYER_NUMBERS } from '@/enums/players'
import { TILE_STATES } from '@/enums/tiles'
import { usePlayerStore } from './players'
import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from '@/config/board'
import { useGamesStore } from './games'
import { someRowHasAllElementsEqualToValue, transposeArray } from '@/utilities/arrays'
import type { BoardState } from '@/types/game'

export const useBoardStore = defineStore('board', () => {
  // dependencies
  const playerStore = usePlayerStore()
  const gameStore = useGamesStore()
  const numTiles = NUMBER_OF_ROWS * NUMBER_OF_COLUMNS

  // state
  const board: Ref<BoardState> = ref(new Array(numTiles))

  // getters
  const boardMatrix: ComputedRef<number[][]> = computed(() => {
    const matrix = new Array(NUMBER_OF_ROWS).fill(null)
    matrix.forEach((r: number[], ri) => {
      if (r) return
      matrix[ri] = new Array(NUMBER_OF_COLUMNS).fill(null)
      matrix[ri].forEach((c: number, ci: number) => {
        if (c) return
        matrix[ri][ci] = board.value[getBoardIndexFromMatrixPosition(ri, ci)]
      })
    })
    return matrix
  })

  const noMoreMovesCanBeMade: ComputedRef<boolean> = computed(
    () => !board.value.includes(TILE_STATES.EMPTY)
  )

  const boardActive: ComputedRef<boolean> = computed(
    () => playerStore.player1Online && playerStore.player2Online
  )

  // methods
  const getBoardIndexFromMatrixPosition = (row: number, col: number) =>
    row * NUMBER_OF_COLUMNS + col

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
    board.value.fill(TILE_STATES.EMPTY)
    playerStore.setActivePlayer(PLAYER_NUMBERS.PLAYER_1)
  }

  const updateboard = (index: number) => {
    board.value[index] = playerStore.activePlayerTile
    if (!playerStore.activePlayerNumber) return
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
