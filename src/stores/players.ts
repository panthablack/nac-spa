import { computed, reactive, ref, type ComputedRef, type Reactive, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Player, PlayerNumber } from '@/types/player'
import { PLAYER_NUMBERS } from '@/enums/players'
import { TILE_STATES } from '@/enums/tiles'
import { useGamesStore } from './games'
import { api } from '@/utilities/api'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/types/auth'
import { getFrequenciesFromArray } from '@/utilities/arrays'
import type { TileState } from '@/types/board'

const { PLAYER_1, PLAYER_2 } = PLAYER_NUMBERS
const { EMPTY, NOUGHT, CROSS } = TILE_STATES

export const usePlayerStore = defineStore('players', () => {
  // dependencies
  const authStore = useAuthStore()
  const gameStore = useGamesStore()

  // state
  const players: Reactive<Record<PlayerNumber, Player | null>> = reactive({
    [PLAYER_1]: null,
    [PLAYER_2]: null,
  })

  const playerTiles: ComputedRef<Record<PlayerNumber, TileState>> = computed(() => ({
    [PLAYER_1]: CROSS,
    [PLAYER_2]: NOUGHT,
  }))

  // getters
  const activePlayerNumber: ComputedRef<PlayerNumber | null> = computed(() => {
    const p1Tile = playerTiles.value[PLAYER_1]
    const p2Tile = playerTiles.value[PLAYER_2]
    if (!gameStore.activeGame?.boardState) return null
    const map = getFrequenciesFromArray(gameStore.activeGame.boardState)
    const frequencies = Object.fromEntries(map)
    if (!frequencies || !frequencies[EMPTY]) return null
    else if (!frequencies[p1Tile] || frequencies[p1Tile] <= frequencies[p2Tile]) return PLAYER_1
    else return PLAYER_2
  })

  const activePlayer: ComputedRef<Player | null> = computed(() => {
    if (!activePlayerNumber.value) return null
    else return players[activePlayerNumber.value]
  })

  const activePlayerIsAuthUser: ComputedRef<boolean> = computed(
    () => activePlayer.value?.id === authStore.user?.id
  )

  const atleast1PlayerIsOnline: ComputedRef<boolean> = computed(
    () => player1Online.value || player2Online.value
  )

  const activePlayerTile: ComputedRef<number> = computed(() => getPlayerTile(activePlayer.value))

  const player1: ComputedRef<Player | null> = computed(() => players[PLAYER_1])

  const player1Online: Ref<boolean> = ref(false)

  const player2: ComputedRef<Player | null> = computed(() => players[PLAYER_2])

  const player2Online: Ref<boolean> = ref(false)

  const playerIsOnline = (player: Player): boolean => {
    if (player.playerNumber === PLAYER_1) return !!players[PLAYER_1] && player1Online.value
    else if (player.playerNumber === PLAYER_2) return !!players[PLAYER_2] && player2Online.value
    else return false
  }

  const handlePlayerVictory = (playerNumber: PlayerNumber) => {
    alert(`Player ${playerNumber} has won!`)
    gameStore.endGame()
  }

  const fetchPlayers = async () => {
    const gameId = gameStore.activeGame?.id
    if (!gameId) return
    return await api(`/games/${gameId}/players`)
  }

  const getPlayerFromUser = (user: User): Player | null =>
    Object.values(players).find(p => p?.id === user.id) || null

  const getPlayerTile = (player: Player | null): TileState => {
    if (player?.playerNumber === PLAYER_1) return TILE_STATES.CROSS
    else if (player?.playerNumber === PLAYER_2) return TILE_STATES.NOUGHT
    else return TILE_STATES.EMPTY
  }

  const loadPlayers = async () => {
    // if no active game, return
    if (!gameStore.activeGame) return
    // try to fetch players
    const fetched = await fetchPlayers()
    // try to set player 1
    const p1 = fetched.find((p: Player) => p?.id === gameStore.activeGame?.playerOneId)
    setPlayer(PLAYER_1, p1)
    // try to set player 2
    const p2 = fetched.find((p: Player) => p?.id === gameStore.activeGame?.playerTwoId)
    setPlayer(PLAYER_2, p2)
  }

  const setPlayer = (n: PlayerNumber, p: Player) => {
    if (!n) return
    else if (!p) players[n] = null
    else players[n] = { ...p, playerNumber: n }
  }

  const setPlayerOnline = (player: Player, status: boolean) => {
    if (player.playerNumber === PLAYER_1) return (player1Online.value = status)
    else if (player.playerNumber === PLAYER_2) return (player2Online.value = status)
  }

  // interface
  return {
    activePlayer,
    activePlayerIsAuthUser,
    activePlayerNumber,
    activePlayerTile,
    atleast1PlayerIsOnline,
    getPlayerFromUser,
    getPlayerTile,
    handlePlayerVictory,
    loadPlayers,
    player1,
    player1Online,
    player2,
    player2Online,
    playerIsOnline,
    players,
    setPlayerOnline,
  }
})
