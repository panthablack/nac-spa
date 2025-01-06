import type { TILE_STATES } from '@/enums/tiles'

export type BoardState = TileState[]

export type TileState = (typeof TILE_STATES)[keyof typeof TILE_STATES]
