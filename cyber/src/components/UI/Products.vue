<template>
    <Header />
    <div class="content-wrapper">
      <div class="new-arrivals-page">
        <div class="section-tabs">
    <button
      class="tab"
      :class="{ active: activeTab === 'new' }"
      @click="changeTab('new')"
    >
      New Arrival
    </button>
    <button
      class="tab"
      :class="{ active: activeTab === 'bestseller' }"
      @click="changeTab('bestseller')"
    >
      Bestseller
    </button>
    <button
      class="tab"
      :class="{ active: activeTab === 'featured' }"
      @click="changeTab('featured')"
    >
      Featured Products
    </button>
  </div>

        <div class="products-grid">
          <div class="product-card" v-for="product in products" :key="product.id">
            <div class="favorite-icon" @click="toggleFavorite(product.id)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :fill="isFavorite(product.id) ? 'red' : 'none'" stroke="currentColor" stroke-width="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <img
              v-if="product.images?.[0]"
              :src="getImageUrl(product.images[0])"
              :alt="product.name"
              class="product-image"
              @click="goToProductPage(product.id)"
            />
            <h4 @click="goToProductPage(product.id)">{{ product.name }}</h4>
            <p>${{ product.price }}</p>
            <button class="buy">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from '../UI/Header.vue'
  
  export default {
    name: 'NewArrivalsPage',
    components: {
      Header
    }
  }
  </script>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  
  const router = useRouter()
  const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])
  const products = ref([])
  const activeTab = ref('new')
  
  const fetchProducts = async () => {
  try {
    const { data } = await axios.get('http://localhost:1452/api/products/')
    if (activeTab.value === 'new') {
      products.value = data.slice(0, 8)
    } else if (activeTab.value === 'bestseller') {
      products.value = data.slice(8, 16)
    } else if (activeTab.value === 'featured') {
      products.value = data.slice(16, 24)
    }
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const changeTab = (tab) => {
  activeTab.value = tab
  fetchProducts()
}

  const toggleFavorite = (productId) => {
    const index = favorites.value.indexOf(productId)
    if (index === -1) {
      favorites.value.push(productId)
    } else {
      favorites.value.splice(index, 1)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }
  
  const isFavorite = (productId) => {
    return favorites.value.includes(productId)
  }
  
  const goToProductPage = (productId) => {
    router.push(`/product/${productId}`)
  }
  
  
  const getImageUrl = (filename) => {
    const cleanFilename = filename.replace(/^image[\\/]/, '')
    return `http://localhost:1452/image/${cleanFilename}`
  }
  
  onMounted(fetchProducts)
  </script>
  
  <style scoped>
@import url('https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

.content-wrapper {
  margin-top: 80px;
  display: flex;
  justify-content: center; 
}

.new-arrivals-page {
  font-family: "ABeeZee", sans-serif;
  color: #000;
  padding: 20px;
  max-width: 1200px;
  width: 100%; 
  margin: 0 auto; 
}

.section-tabs {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
  gap: 40px;
  padding: 10px 0;
}


.tab {
  background: none;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 8px 16px;
  font-family: "ABeeZee", sans-serif;
  color: #999; 
  position: relative;
  transition: all 0.3s ease;
}

.tab.active {
  color: #000; 
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #000;
  border-radius: 3px;
}
.tab:hover {
  color: #666; 
}

.tab.active:hover {
  color: #000; 
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.product-card {
  font-weight: bold;
  width: 100%;
  height: 432px;
  background: #F6F6F6;
  padding: 1rem;
  text-align: center;
  box-sizing: border-box;
  border-radius: 9px;
  position: relative;
  cursor: default;
}

.favorite-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 1;
}

.product-image, h4 {
  cursor: pointer;
}

.product-card .buy {
  width: 186px;
  height: 48px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 5px;
  font-family: "ABeeZee", sans-serif;
}

.product-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-top: 50px;
}

h4 {
  margin: 15px 0;
  font-size: 16px;
  font-weight: bold;
}

p {
  font-size: 18px;
  margin: 10px 0;
}
</style>