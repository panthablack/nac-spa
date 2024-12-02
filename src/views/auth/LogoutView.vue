<template>
  <div class="logoutPageContainer h-full align-middle flexCenter">
    <div class="cardContainer w-full">
      <Card class="m-6">
        <div class="contentContainer flexCenter">
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
import { logOut } from '@/utilities/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

logOut().finally(() => router.push({ name: 'home' }))
</script>

<style scoped lang="css"></style>