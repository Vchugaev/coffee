<template>
  <div class="login-container">
    <div class="login-form">
      <h1>Авторизация</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="login">Логин:</label>
          <input
            id="login"
            v-model="login"
            type="text"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="form-control"
          />
        </div>
        <div v-if="authStore.error" class="error-message">
          {{ authStore.error }}
        </div>
        <button type="submit" class="btn-login">Войти</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store/auth'

const router = useRouter()
const authStore = useAuthStore()
const login = ref('')
const password = ref('')

const handleLogin = async () => {
  await authStore.login(login.value, password.value)
  if (authStore.isAuthenticated) {
    router.push('/account')
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
  }
}

.form-group {
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #666;
  }
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
}

.btn-login {
  width: 100%;
  padding: 0.75rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #357abd;
  }
}

.error-message {
  color: #dc3545;
  margin-bottom: 1rem;
  text-align: center;
}
</style>