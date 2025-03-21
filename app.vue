<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  // Редирект с корневого пути на страницу авторизации
  if (window.location.pathname === '/') {
    router.push('/login')
  }
})
</script>
