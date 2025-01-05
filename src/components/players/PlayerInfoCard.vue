<template>
  <Card
    class="playerInfoCardContainer flexCenter gap-2 w-96"
    :class="`${reverseClass}`"
  >
    <AvatarWithOnlineStatus :online="playerIsOnline" />
    <span class="playerName font-semibold text-lg">{{ player.name }}</span>
    <PlayerPieceIcon :playerNumber="player.playerNumber" />
  </Card>
</template>

<script setup lang="ts">
import AvatarWithOnlineStatus from '@/components/elements/AvatarWithOnlineStatus.vue'
import Card from '@/components/elements/Card.vue'
import PlayerPieceIcon from '@/components/players/PlayerPieceIcon.vue'
import { usePlayerStore } from '@/stores/players'
import type { Player } from '@/types/player'
import { computed } from 'vue'

const props = defineProps<{
  player: Player,
  reverse?: boolean
}>()

const playerStore = usePlayerStore()

const playerIsOnline = computed(() => playerStore.playerIsOnline(props.player))

const reverseClass = computed(() => props.reverse ? 'flex-row-reverse' : '')
</script>

<style scoped lang="css"></style>