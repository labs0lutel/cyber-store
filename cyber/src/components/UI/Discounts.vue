<template>
  <div class="discount-section">
    <h2>Discounts up to -50%</h2>
    
    <div class="products-container">
          <div class="products-grid">
              <div class="product-card" v-for="product in limitedProducts" :key="product.id">
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

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])

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

const products = ref([])

const fetchProducts = async () => {
try {
  const { data } = await axios.get('http://localhost:1452/api/products/')
  products.value = data
} catch (error) {
  console.error('Error fetching products:', error)
}
}

const limitedProducts = computed(() => {
return products.value.slice(0, 4)
})

const getImageUrl = (filename) => {
const cleanFilename = filename.replace(/^image[\\/]/, '')
return `http://localhost:1452/image/${cleanFilename}`
}

onMounted(fetchProducts)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

.discount-section {
max-width: 1200px;
margin: 0 auto;
padding: 20px;
color: #000;
display: flex;
flex-direction: column;
align-items: flex-start;
margin-bottom: 50px;
}

.discount-section h2 {
font-size: 24px;
font-weight: bold;
margin-bottom: 30px;
text-align: center;
font-family: "ABeeZee", sans-serif;
margin-left: 50px;
}

.products-container {
width: 100%;
display: flex;
justify-content: center;
}

.products-grid {
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 1rem;
color: #000;
font-size: 20px;
}

.product-card {
font-weight: bold;
width: 266px;
height: 450px;
background: #F6F6F6;
padding: 1rem;
text-align: center;
box-sizing: border-box;
border-radius: 9px;
position: relative;
cursor: default;
font-family: "ABeeZee", sans-serif;
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
font-family: "ABeeZee", sans-serif; 
}

.product-image {
width: 200px;
object-fit: contain;
margin-top: 50px;
}

@media (max-width: 1200px) {
.products-grid {
  grid-template-columns: repeat(2, 1fr);
}
}

@media (max-width: 600px) {
.products-grid {
  grid-template-columns: 1fr;
}
}
</style>