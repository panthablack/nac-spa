import { computed, reactive, ref, type ComputedRef, type Reactive, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Player, PlayerNumber } from '@/types/player'
import { PLAYER_NUMBERS } from '@/enums/players'
import { TILE_STATES } from '@/enums/tiles'
import { useGamesStore } from './games'

export const usePlayerStore = defineStore('players', () => {
  // dependencies
  const gameStore = useGamesStore()

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

  const activePlayerTile: ComputedRef<number> = computed(() => {
    if (activePlayerNumber.value === PLAYER_NUMBERS.PLAYER_1) return TILE_STATES.CROSS
    else if (activePlayerNumber.value === PLAYER_NUMBERS.PLAYER_2) return TILE_STATES.NOUGHT
    else return TILE_STATES.EMPTY
  })

  // methods
  const changePlayer = () => {
    if (activePlayerNumber.value === PLAYER_NUMBERS.PLAYER_1)
      setActivePlayer(PLAYER_NUMBERS.PLAYER_2)
    else setActivePlayer(PLAYER_NUMBERS.PLAYER_1)
  }

  const handlePlayerVictory = (playerNumber: PlayerNumber) => {
    alert(`Player ${playerNumber} has won!`)
    gameStore.endGame()
  }

  const setActivePlayer = (n: PlayerNumber | null) => (activePlayerNumber.value = n)

  // interface
  return {
    activePlayer,
    activePlayerNumber,
    activePlayerTile,
    changePlayer,
    handlePlayerVictory,
    setActivePlayer,
  }
})
