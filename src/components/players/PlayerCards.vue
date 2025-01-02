<template>
  <div class="playerCardsContainer flex items-center justify-between">
    <div class="player1CardContainer">
      <PlayerInfoCard
        v-if="player1"
        :player="player1"
      />
      <WaitingForPlayerCard
        v-else
        playerNumber="1"
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
        playerNumber="2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayerInfoCard from '@/components/players/PlayerInfoCard.vue'
import WaitingForPlayerCard from '@/components/players/WaitingForPlayerCard.vue'
import { computed, type ComputedRef } from 'vue'
import type { Player } from '@/types/player'

const player1: ComputedRef<Player | null> =
  computed(() => ({ id: 1, name: 'Jack Beans', playerNumber: 1 }))

const player2: ComputedRef<Player | null> = computed(() => null)

// const player2: ComputedRef<Player | null> =
//   computed(() => ({ id: 1, name: 'Jill Beaufont', playerNumber: 2 }))

</script>

<style scoped lang="css">
/* ... */
</style>