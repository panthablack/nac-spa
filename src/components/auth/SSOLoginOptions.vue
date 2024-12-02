<template>
  <div>
    <div class="relative mt-10">
      <div
        class="absolute inset-0 flex items-center"
        aria-hidden="true"
      >
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative flex justify-center text-sm/6 font-medium">
        <span class="bg-white px-6 text-gray-900">Or continue with</span>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-2 gap-4">
      <a
        href="#"
        class="flexCenter w-full gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
      >
        <GoogleLogo />
        <span class="text-sm/6 font-semibold">Google</span>
      </a>

      <a
        href="#"
        class="flexCenter w-full gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
      >
        <GitHubLogo />
        <span class="text-sm/6 font-semibold">GitHub</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import GitHubLogo from '@/components/logos/GitHubLogo.vue'
import GoogleLogo from '@/components/logos/GoogleLogo.vue'
</script>