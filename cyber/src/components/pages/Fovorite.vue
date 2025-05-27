<template>
    <Header />
    <div class="content-wrapper">
      <div class="favorites-page">
        <h1 class="page-title">Favorite</h1>
        
        <div v-if="favoriteProducts.length === 0" class="empty-favorites">
          <p>You don't have any favorite products yet.</p>
          <router-link to="/category" class="continue-shopping">Continue Shopping</router-link>
        </div>
        
        <div v-else class="favorites-list">
          <div class="favorite-item" v-for="product in favoriteProducts" :key="product.id">
            <div class="product-image-container">
              <img
                :src="getImageUrl(product.images[0])"
                :alt="product.name"
                class="product-image"
              />
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-sku">#{{ product.id }}</p>
              <div class="product-variant" v-if="product.variant">
                {{ product.variant }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </template>
  
<script>

import Header from '../UI/Header.vue'
import Footer from '../UI/Footer.vue'

export default {
  name: 'Fovorite',
  components: {
    Header,
    Footer
  }
}
</script>

  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'

  const allProducts = ref([])
  const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])
  
  const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:1452/api/products/')
    allProducts.value = data.map(product => ({
      ...product,
      variant: getProductVariant(product) 
    }))
  }
  
  const getProductVariant = (product) => {
    if (product.characteristics) {
      const color = product.characteristics.find(c => c.characteristic === 'Color')?.value
      const size = product.characteristics.find(c => c.characteristic === 'Size')?.value
      return [color, size].filter(Boolean).join(' ')
    }
    return null
  }
  
  const favoriteProducts = computed(() => {
    return allProducts.value.filter(product => favorites.value.includes(product.id))
  })
  
  const toggleFavorite = (productId) => {
    const index = favorites.value.indexOf(productId)
    if (index === -1) {
      favorites.value.push(productId)
    } else {
      favorites.value.splice(index, 1)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }
  
  const getImageUrl = (filename) => {
    const cleanFilename = filename.replace(/^image[\\/]/, '')
    return `http://localhost:1452/image/${cleanFilename}`
  }
  
  onMounted(fetchProducts)
  </script>
  
  <style scoped>
  .content-wrapper {
    margin-top: 80px;
    color: #000;
    margin-left: 300px;
  }
  
  .favorites-page {
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 20px;
    font-family: "ABeeZee", sans-serif;
  }
  
  .page-title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 40px;
    text-transform: uppercase;
  }
  
  .empty-favorites {
    text-align: center;
    padding: 50px 0;
  }
  
  .empty-favorites p {
    font-size: 10px;
    margin-bottom: 20px;
  }
  
  .continue-shopping {
    display: inline-block;
    padding: 12px 24px;
    background-color: #000;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
  }
  
  .favorites-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .favorite-item {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    position: relative;
  }
  
  .product-image-container {
    width: 150px;
    height: 150px;
    margin-right: 20px;
  }
  
  .product-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  
  
  .product-name {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 8px 0;
  }
  
  .product-sku {
    font-size: 14px;
    color: #666;
    margin: 0 0 8px 0;
  }
  
  .product-variant {
    font-size: 14px;
    color: #333;
  }
  
  .favorite-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  </style>