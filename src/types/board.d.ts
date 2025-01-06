import type { TILE_STATES } from '@/enums/tiles'

export type BoardState = number[]

export type TileState = (typeof TILE_STATES)[keyof typeof TILE_STATES]
