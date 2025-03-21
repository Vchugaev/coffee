import items from '@/data/users.json'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({
    items: [] as Item[],
    filters: {
      date: null as string | null,
      statuses: [] as string[]
    }
  }),
  getters: {
    filteredItems(state) {
      return state.items.filter(item => {
        const dateMatch = !state.filters.date || 
          new Date(item.date_created).toISOString().split('T')[0] === state.filters.date
        const statusMatch = !state.filters.statuses.length || 
          state.filters.statuses.includes(item.status)
        return dateMatch && statusMatch
      })
    }
  },
  actions: {
    async fetchItems() {
      // Имитация API запроса
      this.items = await new Promise(resolve => 
        setTimeout(() => resolve(items), 500))
    }
  }
})