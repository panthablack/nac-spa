<template>
  <Card
    class="playerInfoCardContainer flexCenter gap-2"
    :class="`${reverseClass}`"
  >
    <PlayerPieceIcon :playerNumber="player.playerNumber" />
    <span class="playerName font-semibold text-lg">{{ player.name }}</span>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/elements/Card.vue'
import PlayerPieceIcon from '@/components/players/PlayerPieceIcon.vue'
import type { Player } from '@/types/player'
import { computed } from 'vue'

const props = defineProps<{
  player: Player,
  reverse?: boolean
}>()

const reverseClass = computed(() => props.reverse ? 'flex-row-reverse' : '')
</script>

<style scoped lang="css">
/* ... */
</style>