<template>
  <div class="category-page">
    <ProductFilters 
      :initial-category="categoryName"
      @filters-changed="handleFiltersChange"
    />
    <div class="products-container">
      <div v-if="loading" class="loading-state">
        Загрузка товаров...
      </div>
      <div v-else-if="error" class="error-state">
        {{ error }}
      </div>
      <template v-else>
          
      </template>
    </div>
  </div>

  <Footer />
</template>

<script>
import Footer from '../UI/Footer.vue'
import ProductFilters from '../UI/ProductFilters.vue'
import axios from 'axios'

export default {
  name: 'CategoryProducts',
  components: {
    ProductFilters,
    Footer
  },
  data() {
    return {
      products: [],
      currentPage: 1,
      itemsPerPage: 9,
      selectedFilters: {},
      categoryName: '',
      loading: false,
      error: null
    }
  },
  computed: {
    filteredProducts() {
      let filtered = [...this.products]
      
      if (this.selectedFilters.brands?.length) {
        filtered = filtered.filter(product => 
          this.selectedFilters.brands.includes(product.brand)
        )
      }
      
      if (this.selectedFilters.batteryCapacities?.length) {
        filtered = filtered.filter(product => 
          this.selectedFilters.batteryCapacities.includes(product.battery_capacity)
        )
      }

      if (this.selectedFilters.screenTypes?.length) {
        filtered = filtered.filter(product => 
          this.selectedFilters.screenTypes.includes(product.screen_type)
        )
      }

      if (this.selectedFilters.screenSizes?.length) {
        filtered = filtered.filter(product => 
          this.selectedFilters.screenSizes.includes(product.screen_size)
        )
      }

      if (this.selectedFilters.protectionClasses?.length) {
        filtered = filtered.filter(product => 
          this.selectedFilters.protectionClasses.includes(product.protection_class)
        )
      }
      
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return filtered.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage)
    }
  },
  methods: {
    handleFiltersChange(filters) {
      this.selectedFilters = filters
      this.currentPage = 1
    },
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const categoryId = this.$route.params.categoryId
        let response

        if (categoryId) {
          response = await axios.get(`http://localhost:1452/api/category/${categoryId}`)
        } else {
          response = await axios.get('http://localhost:1452/api/products/')
        }

        if (Array.isArray(response.data)) {
          this.products = response.data.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            image: `http://localhost:1452/${product.images[0]}`,
            brand: product.brand,
            battery_capacity: product.battery_capacity,
            screen_type: product.screen_type,
            screen_size: product.screen_diagonal,
            protection_class: product.protection_class
          }))
        } else {
          throw new Error('Неверный формат данных от сервера')
        }
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error)
        this.error = 'Ошибка при загрузке товаров. Пожалуйста, попробуйте позже.'
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.categoryName = this.$route.params.categoryName
    this.fetchProducts()
  },
  watch: {
    '$route.params.categoryId'() {
      this.fetchProducts()
    }
  }
}

</script>

<style scoped>
.category-page {
  display: flex;
  gap: 30px;
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.products-container {
  flex: 1;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.product-image {
  position: relative;
  padding-top: 100%;
}

.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
}

.wishlist-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #333;
}

.product-info {
  padding: 15px;
  text-align: center;
}

.product-info h3 {
  margin: 0 0 10px;
  font-size: 16px;
  color: #333;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin: 0 0 15px;
}

.buy-button {
  background: #000;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
}

.buy-button:hover {
  background: #333;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

.pagination button {
  width: 30px;
  height: 30px;
  border: 1px solid #e5e5e5;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button.active {
  background: #000;
  color: white;
  border-color: #000;
}

.loading-state,
.error-state,
.no-products {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.error-state {
  color: #dc3545;
}

.no-products {
  color: #666;
  font-style: italic;
}
</style> 