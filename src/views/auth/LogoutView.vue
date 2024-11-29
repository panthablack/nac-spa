<template>
  <div class="logoutPageContainer h-full flex align-middle items-center">
    <div class="cardContainer w-full">
      <Card class="m-6">
        <div class="contentContainer flex items-center justify-center">
          <p>Logging Out</p>
          <div class="spinnerContainer mx-4">
            <Spinner />
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/elements/Card.vue'
import Spinner from '@/components/loading/Spinner.vue'
import router from '@/router'
import { logOut } from '@/utilities/auth'

logOut().finally(() => router.push('/'))
</script>

<style scoped lang="css"></style>