<template>
  <div class="avatarContainer">
    <span class="relative inline-block">
      <img
        v-if="src"
        class="size-16 rounded-full"
        :src="src"
        :alt="alt"
      />
      <span
        v-else
        class="inline-block size-14 overflow-hidden rounded-full bg-gray-100"
      >
        <svg
          class="size-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </span>
      <span
        class="absolute bottom-0 right-0 block size-4 rounded-full ring-2 ring-white"
        :class="online ? 'bg-green-400' : 'bg-amber-400'"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  alt?: string
  src?: string
  online?: boolean
}>()
</script>

<style scoped lang="css">
/* ... */
</style>