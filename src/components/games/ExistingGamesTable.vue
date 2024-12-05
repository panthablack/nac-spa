<template>
  <div class="existingGamesContainer mt-8 flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                v-for="heading in headings"
                :key="heading"
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >{{ heading }}</th>
              <th
                scope="col"
                class="relative py-3.5 px-3"
              >
                <span class="sr-only">Join</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="game in games"
              :key="game.id"
            >
              <td class="whitespace-nowrap py-5 px-3 text-sm rounded-sm">
                <div class="flex items-center">
                  <div class="ml-4">
                    <div class="font-medium text-gray-900">{{ game.playerOne?.name }}</div>
                  </div>
                </div>
              </td>
              <td class="relative whitespace-nowrap py-5 px-3 text-right text-sm font-medium">
                <PrimaryButton @click="onJoinGame(game)">
                  Join Game<span class="sr-only"> with {{ game.playerOne?.name }}</span>
                </PrimaryButton>
              </td>
            </tr>
          </tbody>
        </table>
        <LoadingMessage v-if="loading">
          Loading Games
        </LoadingMessage>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import LoadingMessage from '@/components/loading/LoadingMessage.vue'
import type { Game } from '@/types/game'

const emit = defineEmits(['join'])

const headings = ['Player 1 Name']

const onJoinGame = (game: Game) => emit('join', game)

defineProps<{
  games: Game[],
  loading: boolean
}>()
</script>