<template>
  <div class="category-section">
    <div class="section-header">
      <h2>Browse By Category</h2>
      <div class="navigation-buttons">
        <button class="nav-button" @click="scrollCategories('left')">
          <span>←</span>
        </button>
        <button class="nav-button" @click="scrollCategories('right')">
          <span>→</span>
        </button>
      </div>
    </div>
    
    <div class="categories-grid" ref="categoriesContainer">
      <div class="category-card" v-for="item in categoryItems" :key="item.id" @click="goToCategory(item.id)">
        <div class="icon-container">
          <img :src="item.icon" :alt="item.name">
        </div>
        <span class="category-name">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CategoryList',
  setup() {
    const router = useRouter()
    return { router }
  },
  data() {
    return {
      categoryItems: [
        { id: 1, name: 'Phones', icon: '/src/assets/Phones.svg' },
        { id: 2, name: 'Smart Watches', icon: '/src/assets/SW.svg' },
        { id: 3, name: 'Cameras', icon: '/src/assets/Cameras.svg' },
        { id: 4, name: 'Headphones', icon: '/src/assets/Headphones.svg' },
        { id: 5, name: 'Computers', icon: '/src/assets/Computers.svg' },
        { id: 6, name: 'Gaming', icon: '/src/assets/Gaming.svg' }
      ]
    }
  },
  methods: {
    scrollCategories(direction) {
      const container = this.$refs.categoriesContainer
      const scrollAmount = 200
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount
      } else {
        container.scrollLeft += scrollAmount
      }
    },
    goToCategory(categoryId) {
      const category = this.categoryItems.find(item => item.id === categoryId)
      this.router.push({ 
        name: 'CategoryProducts', 
        params: { 
          categoryId: categoryId,
          categoryName: category.name
        }
      })
    }
  }
})
</script>

<style scoped>
.category-section {
  padding: 40px 0;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 0 20px;
}

h2 {
  font-size: 22px;
  font-weight: 500;
  color: #000;
  margin: 0;
  font-style: italic;
}

.navigation-buttons {
  display: flex;
  gap: 12px;
}

.nav-button {
  width: 28px;
  height: 28px;
  border: 1px solid #E5E5E5;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.nav-button:hover {
  border-color: #000;
}

.nav-button span {
  color: #000;
  font-size: 14px;
}

.categories-grid {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.categories-grid::-webkit-scrollbar {
  display: none;
}

.category-card {
  min-width: 170px;
  padding: 25px 20px;
  background: #F5F5F5;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.category-card:hover {
  background: #EBEBEB;
}

.icon-container {
  width: 40px;
  height: 40px;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-container img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.category-name {
  font-size: 15px;
  color: #000;
  display: block;
  font-weight: 400;
}
</style>