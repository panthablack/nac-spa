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
import { logIn } from '@/utilities/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLoginSuccess = (v: any) => {
  console.log('handleLoginSuccess', v)
  router.push({ name: 'dashboard' })
}

const loading = ref(false)

const onSubmit = (v: Record<string, string>) => {
  loading.value = true
  logIn(v.email, v.password)
    .then((res) => handleLoginSuccess(res))
    .catch(() => router.push({ name: 'login' }))
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