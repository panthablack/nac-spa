<template>
  <div class="loginPageContainer">
    <LoginForm
      @submit="onSubmit"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { logIn } from '@/utilities/auth'
import { ref } from 'vue'

const authStore = useAuthStore()

const handleLoginSuccess = (v: any) => {
  console.log('handleLoginSuccess', v)
  authStore.setUser(v.data)
  router.push('/dashboard')
}

const loading = ref(false)
const onSubmit = (v: Record<string, string>) => {
  loading.value = true
  logIn(v.email, v.password)
    .then((res) => handleLoginSuccess(res))
    .catch(() => router.push('/login'))
    .finally(() => loading.value = false)
}
</script>

<style scoped lang="css">
.textInput {
  margin: 1rem 0;
  display: block;
}

.textInput label,
.textInput input {
  margin-right: 0.5rem;
}
</style>