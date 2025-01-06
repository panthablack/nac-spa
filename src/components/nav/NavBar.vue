<script setup lang="ts">
import NavBarLink from '@/components/nav/NavBarLink.vue'
import { GUARDS } from '@/enums/guards'
import type { NavLinkType } from '@/types/nav'
import { computed, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const links: Record<('authenticated' | 'default' | 'guest'), Record<string, NavLinkType[]>> = {
  authenticated: {
    authLinks: [
      { text: 'Log Out', to: '/logout' },
    ],
    navLinks: [
      { text: 'Dashboard', to: '/dashboard' },
    ],
  },
  default: {
    authLinks: [
      { text: 'Log In', to: '/login' },
    ],
    navLinks: [
      { text: 'Home', to: '/' },
    ],
  },
  guest: {
    authLinks: [
      { text: 'Log In', to: '/login' },
      { text: 'Register', to: '/register' },
    ],
    navLinks: [
      { text: 'Home', to: '/' },
      { text: 'About', to: '/about' },
    ],
  }
}

const authLinks: ComputedRef<NavLinkType[]> = computed(() => {
  if (route.meta.guard == GUARDS.AUTHENTICATED) return links.authenticated.authLinks
  else if (route.meta.guard == GUARDS.GUEST) return links.guest.authLinks
  else return links.default.authLinks
})

const navLinks: ComputedRef<NavLinkType[]> = computed(() => {
  if (route.meta.guard == GUARDS.AUTHENTICATED) return links.authenticated.navLinks
  else if (route.meta.guard == GUARDS.GUEST) return links.guest.navLinks
  else return links.default.navLinks
})

</script>

<template>
  <nav class="navBar py-4 px-6 flex flex-nowrap justify-between bg-gray-700">
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