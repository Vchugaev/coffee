import { defineStore } from 'pinia'

interface Product {
  id: number
  name: string
  category: string
  price: number
  status: string
  date_created: string
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    filteredProducts: [] as Product[],
    selectedCategories: [] as string[],
    dateFilter: {
      from: '',
      to: ''
    }
  }),

  actions: {
    async fetchProducts() {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        this.products = data.products
        this.filteredProducts = data.products
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },

    filterProducts() {
      let filtered = [...this.products]

      // Фильтрация по категориям
      if (this.selectedCategories.length > 0) {
        filtered = filtered.filter(product => 
          this.selectedCategories.includes(product.category)
        )
      }

      // Фильтрация по дате
      if (this.dateFilter.from && this.dateFilter.to) {
        filtered = filtered.filter(product => {
          const productDate = new Date(product.date_created)
          const fromDate = new Date(this.dateFilter.from)
          const toDate = new Date(this.dateFilter.to)
          return productDate >= fromDate && productDate <= toDate
        })
      }

      this.filteredProducts = filtered
    },

    setSelectedCategories(categories: string[]) {
      this.selectedCategories = categories
      this.filterProducts()
    },

    setDateFilter(from: string, to: string) {
      this.dateFilter = { from, to }
      this.filterProducts()
    }
  }
}) 