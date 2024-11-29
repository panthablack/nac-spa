<template>
  <div class="loginFormContainer">
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          class="mx-auto h-10 w-auto"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        >
        <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to
          your account</h2>
      </div>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div class="bg-slate-200 px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form
            class="space-y-6"
            action="#"
            method="POST"
            @submit.prevent="onSubmit"
          >
            <div>
              <label
                for="email"
                class="block text-sm/6 font-medium text-gray-900"
              >Email address</label>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  v-model="email"
                >
              </div>
            </div>
            <div>
              <label
                for="password"
                class="block text-sm/6 font-medium text-gray-900"
              >Password</label>
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  v-model="password"
                >
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                >
                <label
                  for="remember-me"
                  class="ml-3 block text-sm/6 text-gray-900"
                >Remember me</label>
              </div>
              <div class="text-sm/6">
                <a
                  href="#"
                  class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <Spinner v-if="loading" />
                <span v-else>Sign in</span>
              </button>
            </div>
          </form>
          <SSOLoginOptions v-if="showSSOLoginOptions" />
        </div>
        <NotAMemberMessage v-if="showNotAMemberMessage" />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import NotAMemberMessage from '@/components/auth/NotAMemberMessage.vue'
import SSOLoginOptions from '@/components/auth/SSOLoginOptions.vue'
import Spinner from '@/components/loading/Spinner.vue'
import { ref } from 'vue'

defineProps<{
  loading: boolean
}>()

const showNotAMemberMessage = ref(false)
const showSSOLoginOptions = ref(false)

const email = ref('')
const password = ref('')

const getSubmissionPayload = () => ({
  email: email.value,
  password: password.value,
})

const emit = defineEmits(['submit'])
const onSubmit = () => emit('submit', getSubmissionPayload())
</script>