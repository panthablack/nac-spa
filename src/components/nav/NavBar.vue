<script setup lang="ts">
import NavBarLink from '@/components/nav/NavBarLink.vue'
import { useAuthStore } from '@/stores/auth'
import type { NavLinkType } from '@/types/nav'
import { computed, type ComputedRef } from 'vue'

const authStore = useAuthStore()

const links: Record<('authenticated' | 'guest'), Record<string, NavLinkType[]>> = {
  authenticated: {
    navLinks: [
      { text: 'Dashboard', to: '/dashboard' },
    ],
    authLinks: [
      { text: 'Log Out', to: '/logout' },
    ]
  },
  guest: {
    navLinks: [
      { text: 'Home', to: '/' },
      { text: 'About', to: '/about' },
    ],
    authLinks: [
      { text: 'Log In', to: '/login' },
      { text: 'Register', to: '/register' },
    ]
  }
}

const authLinks: ComputedRef<NavLinkType[]> = computed(() => authStore.user ? links.authenticated.authLinks : links.guest.authLinks)

const navLinks: ComputedRef<NavLinkType[]> = computed(() => authStore.user ? links.authenticated.navLinks : links.guest.navLinks)

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