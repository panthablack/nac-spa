<template>
  <div class="ReverbTestContainer">
    <h1>ReverbTest</h1>
  </div>
</template>

<script setup lang="ts">
import { useReverb } from '@/composables/useReverb'

const reverb = useReverb()

reverb.listen('gibbon', 'MessageSent', (v: string) => alert('It happened! ' + JSON.stringify(v)))

</script>

<style scoped lang="css">
/* ... */
</style>