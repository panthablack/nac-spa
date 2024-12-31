import { computed, reactive, ref, type ComputedRef, type Reactive, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Player, PlayerNumber } from '@/types/player'
import { PLAYER_NUMBERS } from '@/enums/players'
import { TILE_STATES } from '@/enums/tiles'

export const usePlayerStore = defineStore('players', () => {
  // state
  const players: Reactive<Record<PlayerNumber, Player | null>> = reactive({
    [PLAYER_NUMBERS.PLAYER_1]: null,
    [PLAYER_NUMBERS.PLAYER_2]: null,
  })

  const activePlayerNumber: Ref<PlayerNumber | null> = ref(null)

  // getters
  const activePlayer: ComputedRef<Player | null> = computed(() => {
    if (!activePlayerNumber.value) return null
    else return players[activePlayerNumber.value]
  })

  const currentPlayerTile: ComputedRef<number> = computed(() => {
    if (activePlayerNumber.value === PLAYER_NUMBERS.PLAYER_1) return TILE_STATES.CROSS
    else if (activePlayerNumber.value === PLAYER_NUMBERS.PLAYER_2) return TILE_STATES.NOUGHT
    else return TILE_STATES.EMPTY
  })

  // methods
  const setActivePlayer = (n: PlayerNumber | null) => (activePlayerNumber.value = n)

  const changePlayer = () => {
    if (activePlayerNumber.value === PLAYER_NUMBERS.PLAYER_1)
      setActivePlayer(PLAYER_NUMBERS.PLAYER_2)
    else setActivePlayer(PLAYER_NUMBERS.PLAYER_1)
  }

  return {
    activePlayer,
    changePlayer,
    currentPlayerTile,
    setActivePlayer,
  }
})
