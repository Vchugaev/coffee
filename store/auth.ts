import { defineStore } from "pinia"

interface User {
  name: string
  surname: string
  username: string
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
      isAuthenticated: false,
      error: '',
      user: null as User | null
    }),
    actions: {
      async login(login: string, password: string) {
        try {
          const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password })
          })

          if (response.ok) {
            const data = await response.json()
            this.isAuthenticated = true
            this.error = ''
            this.user = data.user
            localStorage.setItem('isAuthenticated', 'true')
            localStorage.setItem('user', JSON.stringify(data.user))
          } else {
            this.error = 'Введены неверные данные авторизации. Попробуйте ещё раз'
          }
        } catch (error) {
          this.error = 'Произошла ошибка при авторизации'
        }
      },
      logout() {
        this.isAuthenticated = false
        this.user = null
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('user')
      },
      checkAuth() {
        const isAuth = localStorage.getItem('isAuthenticated')
        const userStr = localStorage.getItem('user')
        
        this.isAuthenticated = isAuth === 'true'
        if (userStr) {
          this.user = JSON.parse(userStr)
        }
      }
    }
  })