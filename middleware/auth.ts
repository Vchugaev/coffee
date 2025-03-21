import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  authStore.checkAuth()

  if (!authStore.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (authStore.isAuthenticated && to.path === '/login') {
    return navigateTo('/account')
  }
}) 