import type { PLAYER_NUMBERS } from '@/enums/players'

export type Player = {
  id: number
  name: string
  playerNumber: PlayerNumber
}

export type PlayerNumber = (typeof PLAYER_NUMBERS)[keyof typeof PLAYER_NUMBERS]
