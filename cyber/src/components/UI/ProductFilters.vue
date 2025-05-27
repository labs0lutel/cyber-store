<template>
  <Header />
  <div class="content-wrapper">
    <div class="products-page">
      <div class="sidebar">
        <div class="filter-group">
          <div class="filter-header" @click="toggleFilter('Categories')">
            <h3>Categories</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :style="{ transform: expandedFilters['Categories'] ? 'rotate(180deg)' : 'rotate(0deg)' }">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <ul v-show="expandedFilters['Categories']">
            <li v-for="category in uniqueCategories" :key="category">
              <label>
                <input type="checkbox" v-model="selectedCategories" :value="category" />
                {{ category }}
              </label>
            </li>
          </ul>
        </div>

        <div class="filter-group">
          <div class="filter-header" @click="toggleFilter('Brand')">
            <h3>Brand</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :style="{ transform: expandedFilters['Brand'] ? 'rotate(180deg)' : 'rotate(0deg)' }">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <ul v-show="expandedFilters['Brand']">
            <li v-for="brand in uniqueBrands" :key="brand">
              <label>
                <input type="checkbox" v-model="selectedBrands" :value="brand" />
                {{ brand }}
              </label>
            </li>
          </ul>
        </div>

        <div class="filter-group" v-for="(options, name) in characteristicOptions" :key="name">
          <div class="filter-header" @click="toggleFilter(name)">
            <h3>{{ name }}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :style="{ transform: expandedFilters[name] ? 'rotate(180deg)' : 'rotate(0deg)' }">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <ul v-show="expandedFilters[name]">
            <li v-for="value in options" :key="value">
              <label>
                <input
                  type="checkbox"
                  v-model="selectedCharacteristics[name]"
                  :value="value"
                />
                {{ value }}
              </label>
            </li>
          </ul>
        </div>
      </div>

      <div class="products-container">
        <div class="top-bar">
          <span>Found: {{ filteredProducts.length }}</span>
        </div>

        <div class="products-grid">
          <div class="product-card" v-for="product in paginatedProducts" :key="product.id">
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
            <button class="buy" @click="goToProductPage(product.id)">Buy Now</button>
          </div>
        </div>

        <div class="pagination">
  <button @click="prevPage" :disabled="page === 1">‹</button>
  
  <template v-if="totalPages <= 5">
    <span 
      v-for="p in totalPages" 
      :key="p" 
      @click="goToPage(p)" 
      :class="{ active: p === page }"
    >
      {{ p }}
    </span>
  </template>
  
  <template v-else>
    <span 
      v-for="p in visiblePages" 
      :key="p" 
      @click="goToPage(p)" 
      :class="{ active: p === page }"
    >
      {{ p === '...' ? '...' : p }}
    </span>
  </template>
  
  <button @click="nextPage" :disabled="page === totalPages">›</button>
</div>
      </div>
    </div>
  </div>


</template>

<script>
import Header from '../UI/Header.vue'

export default {
  name: 'ProductPage',
  components: {
    Header
  }
}
</script>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])
const expandedFilters = ref({
  'Brand': false,
  'Categories': false
})

const toggleFilter = (filterName) => {
  expandedFilters.value[filterName] = !expandedFilters.value[filterName]
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


const products = ref([])
const page = ref(1)
const perPage = 9

const selectedBrands = ref([])
const selectedCategories = ref([])
const selectedCharacteristics = ref({})

const fetchProducts = async () => {
  const { data } = await axios.get('http://localhost:1452/api/products/')
  products.value = data
  extractCharacteristicOptions(data)
}

const uniqueBrands = computed(() =>
  [...new Set(products.value.map((p) => p.brand).filter(Boolean))]
)

const uniqueCategories = computed(() =>
  [...new Set(products.value.map((p) => p.category).filter(Boolean))]
)
const characteristicOptions = ref({})

const extractCharacteristicOptions = (data) => {
  const options = {}
  data.forEach((product) => {
    product.characteristics?.forEach((char) => {
      if (!options[char.characteristic]) {
        options[char.characteristic] = new Set()
      }
      options[char.characteristic].add(char.value)
    })
  })

  characteristicOptions.value = Object.fromEntries(
    Object.entries(options).map(([key, val]) => [key, Array.from(val)])
  )

  Object.keys(characteristicOptions.value).forEach((key) => {
    if (!selectedCharacteristics.value[key]) {
      selectedCharacteristics.value[key] = []
    }
    if (expandedFilters.value[key] === undefined) {
      expandedFilters.value[key] = false
    }
  })
}

onMounted(fetchProducts)

const matchesCharacteristics = (product) => {
  for (const [name, selectedValues] of Object.entries(selectedCharacteristics.value)) {
    if (selectedValues.length === 0) continue
    const hasMatch = product.characteristics?.some(
      (c) => c.characteristic === name && selectedValues.includes(c.value)
    )
    if (!hasMatch) return false
  }
  return true
}

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchBrand = !selectedBrands.value.length || selectedBrands.value.includes(product.brand)
    const matchCategory =
      !selectedCategories.value.length || selectedCategories.value.includes(product.category)
    const matchChars = matchesCharacteristics(product)
    return matchBrand && matchCategory && matchChars
  })
})

const visiblePages = computed(() => {
  const current = page.value;
  const total = totalPages.value;
  const range = [];
  
  range.push(1);
  
  if (current > 3) {
    range.push('...');
  }

  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    range.push(i);
  }

  if (current < total - 2) {
    range.push('...');
  }
  
  if (total > 1) {
    range.push(total);
  }
  
  return range;
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / perPage)
)

const paginatedProducts = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredProducts.value.slice(start, start + perPage)
})

const scrollToTop = () => {
  const duration = 800; 
  const start = window.pageYOffset;
  const startTime = performance.now();

  const animateScroll = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easeInOutCubic = t => t<.5 ? 4*t*t*t : 1-((t=-2*t+2)*t*t)/2;
    
    window.scrollTo(0, start * (1 - easeInOutCubic(progress)));
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

const goToPage = (p) => {
  if (p === '...') return;
  page.value = p;
  scrollToTop();
};

const prevPage = () => { 
  if (page.value > 1) {
    page.value--;
    scrollToTop();
  }
};

const nextPage = () => { 
  if (page.value < totalPages.value) {
    page.value++;
    scrollToTop();
  }
};


const getImageUrl = (filename) => {
  const cleanFilename = filename.replace(/^image[\\/]/, '')
  return `http://localhost:1452/image/${cleanFilename}`
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

.content-wrapper {
  margin-top: 80px; 
}

.products-page {
  font-family: "ABeeZee", sans-serif;
  display: flex;
  color: #000;
}
.sidebar {
  width: 250px;
  padding: 1rem;
  border-right: 1px solid #ccc;
  overflow-y: auto;
}
.filter-group {
  margin-bottom: 1rem;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 8px 0;
}

.filter-header svg {
  transition: transform 0.2s ease;
}

.filter-group h3 {
  margin: 0;
  font-size: 16px;
  font-weight: normal;
}

.filter-group ul {
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
}

.filter-group li {
  margin: 0.5rem 0;
  padding-left: 8px;
}

.filter-group input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #000;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  vertical-align: middle;
  position: relative;
  margin-right: 8px;
}

.filter-group input[type="checkbox"]:checked {
  background-color: #000;
}

.filter-group input[type="checkbox"]:checked::after {
  content: "✓";
  position: absolute;
  color: white;
  font-size: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.products-container {
  flex: 1;
  padding: 1rem;
}
.top-bar {
  margin-bottom: 1rem;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.product-card {
  font-weight: bold;
  width: 266px;
  height: 450px;
  padding: 1rem;
  text-align: center;
  box-sizing: border-box;
  border-radius: 9px;
  position: relative;
  cursor: default;
  background-color: #F6F6F6;
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

.product-card .buy{
  width: 186px;
  height: 48px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 15px;
  font-family: "ABeeZee", sans-serif; 
}
.product-image {
  width: 200px;
  object-fit: contain;
  margin-top: 50px;
}
.pagination {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  
}

.pagination button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0 0.5rem;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination span {
  cursor: pointer;
  padding: 0 0.5rem;
  background-color: #F6F6F6;
  width: 32px;
  height: 32px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination .active {
  font-weight: bold;
  cursor: default;
}
</style>