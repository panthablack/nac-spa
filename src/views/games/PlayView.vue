<template>
  <PageContainer class="playViewContainer">
    <PageHeading>Play</PageHeading>
    <p>This is a play page for game {{ gameID }}.</p>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from '@/components/pages/PageContainer.vue'
import PageHeading from '@/components/pages/PageHeading.vue'
import { useReverb } from '@/composables/useReverb'
import { useGamesStore } from '@/stores/games'
import type { Game } from '@/types/game'
import { api } from '@/utilities/api'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const gameStore = useGamesStore()
const gameID = parseInt(String(route.params.id))
const loading = ref(true)
const { listen } = useReverb()
listen('nac-lobby', 'GameJoined', (e: Event) => {
  console.log('GameJoined', e)
  alert('Joined Game')
})

const onGameFetchFailed = () => router.push({ name: 'dashboard' })

const onCreated = async () => {
  loading.value = true
  // if correct game loaded, return as no further setup necessary
  if (gameID === gameStore.activeGame?.id) return
  // try to load correct game
  const game: Game = (await api(`/games/${gameID}`))
  // if game fetch failed, handle cannot start game
  if (!game || gameID !== game.id) onGameFetchFailed()
  else gameStore.setActiveGame(game)
}

onCreated().finally(() => loading.value = false)
</script>