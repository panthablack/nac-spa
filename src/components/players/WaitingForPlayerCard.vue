<template>
  <Card class="WaitingForPlayerCardContainer flexCenter gap-2">
    <h1>Waiting For Player {{ playerNumber }}</h1>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/elements/Card.vue'
import type { PlayerNumber } from '@/types/player'

defineProps<{
  playerNumber?: PlayerNumber
}>()
</script>

<style scoped lang="css">
/* ... */
</style>