import type { User } from './auth'

export type Game = {
  id: number
  playerOneId: number
  playerTwoId: number
  createdAt: string
  updatedAt: string
  endedAt?: string
  playerOne?: User
  playerTwo?: User
}
