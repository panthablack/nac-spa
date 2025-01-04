<template>
  <div
    class="playerCardsContainer flex items-center justify-between flex-col lg:flex-row p-4 gap-2">
    <div class="player1CardContainer">
      <PlayerInfoCard
        v-if="player1"
        :player="player1"
      />
      <WaitingForPlayerCard
        v-else
        :playerNumber="1"
      />
    </div>
    <div class="player2CardContainer">
      <PlayerInfoCard
        v-if="player2"
        :player="player2"
        reverse
      />
      <WaitingForPlayerCard
        v-else
        :playerNumber="2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayerInfoCard from '@/components/players/PlayerInfoCard.vue'
import WaitingForPlayerCard from '@/components/players/WaitingForPlayerCard.vue'
import { computed, type ComputedRef } from 'vue'
import type { Player } from '@/types/player'
import { usePlayerStore } from '@/stores/players'

const playerStore = usePlayerStore()

const player1: ComputedRef<Player | null> = computed(() => (playerStore.player1))

const player2: ComputedRef<Player | null> = computed(() => (playerStore.player2))
</script>

<style scoped lang="css">
/* ... */
</style>