<template>
  <PageContainer class="homePageContainer">
    <div class="h-full flexCenter">
      <SimpleBoard />
      <!-- <Card class="bg-slate-800">
        <NavBarLink to="/login">Go to Login Page</NavBarLink>
      </Card> -->
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
// import Card from '@/components/elements/Card.vue'
import SimpleBoard from '@/components/games/SimpleBoard.vue'
// import NavBarLink from '@/components/nav/NavBarLink.vue'
import PageContainer from '@/components/pages/PageContainer.vue'
</script>