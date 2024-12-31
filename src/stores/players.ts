import { computed, reactive, ref, type ComputedRef, type Reactive, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Player, PlayerNumber } from '@/types/player'
import { PLAYER_NUMBERS } from '@/enums/players'

export const useGamesStore = defineStore('games', () => {
  const players: Reactive<Record<PlayerNumber, Player | null>> = reactive({
    [PLAYER_NUMBERS.PLAYER_1]: null,
    [PLAYER_NUMBERS.PLAYER_2]: null,
  })

  const activePlayerNumber: Ref<PlayerNumber | null> = ref(null)

  const activePlayer: ComputedRef<Player | null> = computed(() => {
    if (!activePlayerNumber.value) return null
    else return players[activePlayerNumber.value]
  })

  const setActivePlayer = (n: PlayerNumber | null) => (activePlayerNumber.value = n)

  return {
    activePlayer,
    setActivePlayer,
  }
})
