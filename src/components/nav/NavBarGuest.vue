<script setup lang="ts">
import NavBarLink from '@/components/nav/NavBarLink.vue'

type NavLinkType = {
  text: string,
  to: string,
}

const navLinks: NavLinkType[] = [
  { text: 'Home', to: '/' },
  { text: 'About', to: '/about' },
]

const authLinks: NavLinkType[] = [
  { text: 'Log In', to: '/login' },
  { text: 'Register', to: '/register' },
]
</script>

<template>
  <nav class="navBar py-4 px-6 flex flex-no-wrap justify-between bg-gray-700">
    <div class="navLinks">
      <NavBarLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
      >{{ link.text }}</NavBarLink>
    </div>
    <div class="authLinks">
      <NavBarLink
        v-for="link in authLinks"
        :key="link.to"
        :to="link.to"
      >{{ link.text }}</NavBarLink>
    </div>
  </nav>
</template>

<style scoped lang="css">
.navLinks,
.authLinks {
  @apply flex flex-nowrap gap-y-4 gap-x-6;
}
</style>