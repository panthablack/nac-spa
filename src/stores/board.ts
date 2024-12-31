import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { PLAYER_NUMBERS } from '@/enums/players'
import { TILE_STATES } from '@/enums/tiles'
import { usePlayerStore } from './players'
import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from '@/enums/board'

export const useBoardStore = defineStore('board', () => {
  // dependencies
  const playerStore = usePlayerStore()
  const numTiles = NUMBER_OF_ROWS * NUMBER_OF_COLUMNS

  // state
  const board: Ref<number[]> = ref(new Array(numTiles))

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

  // methods
  const getBoardIndexFromMatrixPosition = (row: number, col: number) =>
    row * NUMBER_OF_COLUMNS + col

  const aColumnHasAllTilesOfType = (t: number): boolean => !t

  const aDiagonalHasAllTilesOfType = (t: number): boolean => !t

  const aRowHasAllTilesOfType = (t: number): boolean => {
    return boardMatrix.value.reduce((ra, rv) => {
      if (ra === true) return true
      else
        return rv.reduce((ca, cv) => {
          if (ca === false) return false
          else return cv === t
        }, true)
    }, false)
  }

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

  const resetBoard = () => {
    board.value.fill(TILE_STATES.EMPTY)
    playerStore.setActivePlayer(PLAYER_NUMBERS.PLAYER_1)
  }

  const updateboard = (index: number) => {
    board.value[index] = playerStore.activePlayerTile
    if (!playerStore.activePlayerNumber) return
    else if (currentPlayerHasWon()) playerStore.handlePlayerVictory(playerStore.activePlayerNumber)
    else playerStore.changePlayer()
  }

  // interface
  return {
    board,
    resetBoard,
    updateboard,
  }
})
