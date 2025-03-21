<template>
  <div class="account-container">
    <div class="header">
      <div class="user-info">
        <h1>Страница аккаунта</h1>
        <p class="user-name">Пользователь: {{ authStore.user?.name }} {{ authStore.user?.surname }}</p>
      </div>
      <button @click="handleLogout" class="btn-logout">Выход</button>
    </div>

    <div class="filters">
      <div class="filter-group">
        <h3>Фильтр по категориям</h3>
        <div class="checkbox-group">
          <label v-for="category in categories" :key="category">
            <input
              type="checkbox"
              :value="category"
              v-model="productsStore.selectedCategories"
              @change="productsStore.filterProducts"
            />
            {{ category }}
          </label>
        </div>
      </div>

      <div class="filter-group">
        <h3>Фильтр по дате</h3>
        <div class="date-filters">
          <div class="date-input">
            <label>От:</label>
            <input
              type="date"
              v-model="dateFrom"
              @change="handleDateFilter"
            />
          </div>
          <div class="date-input">
            <label>До:</label>
            <input
              type="date"
              v-model="dateTo"
              @change="handleDateFilter"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Категория</th>
            <th>Цена</th>
            <th>Статус</th>
            <th>Дата создания</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in productsStore.filteredProducts" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.price }} ₽</td>
            <td>{{ product.status }}</td>
            <td>{{ formatDate(product.date_created) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store/auth'
import { useProductsStore } from '~/store/products'

const router = useRouter()
const authStore = useAuthStore()
const productsStore = useProductsStore()

const dateFrom = ref('')
const dateTo = ref('')

const categories = computed(() => {
  const uniqueCategories = new Set(productsStore.products.map(p => p.category))
  return Array.from(uniqueCategories)
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const handleDateFilter = () => {
  productsStore.setDateFilter(dateFrom.value, dateTo.value)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU')
}

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }
  await productsStore.fetchProducts()
})
</script>

<style lang="scss" scoped>
.account-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  .user-info {
    h1 {
      margin: 0;
      color: #333;
    }

    .user-name {
      margin: 0.5rem 0 0;
      color: #666;
      font-size: 0.9rem;
    }
  }
}

.btn-logout {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-group {
  h3 {
    margin: 0 0 1rem 0;
    color: #333;
  }
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
}

.date-filters {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.date-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: #666;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #4a90e2;
    }
  }
}

.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #333;
  }

  tr:hover {
    background-color: #f8f9fa;
  }
}
</style>