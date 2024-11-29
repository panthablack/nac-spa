<template>
  <div class="defaultLayoutContainer layoutContainer">
    <header class="navBarContainer">
      <NavBar />
    </header>
    <main>
      <div class="routerViewContainer h-full">
        <RouterView />
      </div>
    </main>
    <div class="footerContainer">
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav/NavBar.vue'
import Footer from '@/components/nav/Footer.vue'
import { RouterView } from 'vue-router'
</script>