<template>
  <div class="defaultLayoutContainer layoutContainer">
    <header class="navBarContainer">
      <NavBar v-if="SHOW_NAV" />
    </header>
    <main>
      <div class="routerViewContainer h-full">
        <RouterView />
      </div>
    </main>
    <div class="footerContainer">
      <Footer v-if="SHOW_FOOTER" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav/NavBar.vue'
import Footer from '@/components/nav/Footer.vue'
import { RouterView } from 'vue-router'
import { SHOW_FOOTER } from '@/config/nav'
import { SHOW_NAV } from '@/config/nav'
</script>