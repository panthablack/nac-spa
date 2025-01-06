import type { GAME_STATES } from '@/enums/games'
import type { User } from './auth'

export type Game = {
  id: number
  playerOneId: number
  playerTwoId: number
  boardState: BoardState
  createdAt: string
  cols: number
  rows: number
  updatedAt: string
  endedAt?: string
  playerOne?: User
  playerTwo?: User
}

export type GameState = (typeof GAME_STATES)[keyof typeof GAME_STATES]
