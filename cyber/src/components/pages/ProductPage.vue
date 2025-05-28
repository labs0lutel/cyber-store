<template>
  <div class="product-page">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="product" class="product-container">
      <Header />
      <div class="product-details">
        <div class="product-image">
          <img :src="getImageUrl(product.images[0])" :alt="product.name">
        </div>
        <div class="product-info">
          <h1>{{ product.brand }} {{ product.name }}</h1>
          <div class="price-section">
            <span class="current-price">{{ formattedPrice.current }}</span>
            <span v-if="formattedPrice.original" class="original-price">{{ formattedPrice.original }}</span>
          </div>
          
          <div class="specifications">
            <div class="spec-item" v-for="(spec, index) in displayedSpecs" :key="index">
              <div class="spec-icon">
                <img v-if="spec.label === 'Screen Size'" src="@/assets/propage/screen.png" alt="Screen Size">
                <img v-else-if="spec.label === 'CPU'" src="@/assets/propage/cpu.png" alt="CPU">
                <img v-else-if="spec.label === 'Number of Cores'" src="@/assets/propage/core.png" alt="Cores">
                <img v-else-if="spec.label === 'Main Cameras'" src="@/assets/propage/camera.png" alt="Main Camera">
                <img v-else-if="spec.label === 'Front Camera'" src="@/assets/propage/frocame.png" alt="Front Camera">
                <img v-else-if="spec.label === 'Battery Capacity'" src="@/assets/propage/battery.png" alt="Battery">
                <img v-else src="@/assets/propage/verify.png" alt="Default">
              </div>
              <div class="spec-content">
                <strong>{{ spec.label }}</strong>
                <span>{{ spec.value }}</span>
              </div>
            </div>
          </div>
          <p class="description">
            Enhanced capabilities thanks to an enlarged display of {{ getScreenSize }} inches and work without recharging throughout the day. Incredible photos in weak and bright light using the new system with two cameras more...
          </p>
          <div class="action-section">
            <button class="wishlist-btn">Add to Wishlist</button>
            <button 
              class="cart-btn" 
              @click="addToCartHandler"
              :disabled="isAddingToCart"
            >
              {{ isAddingToCart ? 'Adding...' : 'Add to Cart' }}
            </button>
          </div>
          <div class="delivery-info">
            <div class="delivery-item">
              <div class="delivery-icon">
                <img src="@/assets/propage/deli.png" alt="Delivery">
              </div>
              <div class="text-block">
                <span>Free Delivery</span>
                <span>1–2 day</span>
              </div>
            </div>
            <div class="delivery-item">
              <div class="delivery-icon">
                <img src="@/assets/propage/shop.png" alt="In Stock">
              </div>
              <div class="text-block">
                <span>In Stock</span>
                <span>Today</span>
              </div>
            </div>
            <div class="delivery-item">
              <div class="delivery-icon">
                <img src="@/assets/propage/verify.png" alt="Guarantee">
              </div>
              <div class="text-block">
                <span>Guaranteed</span>
                <span>{{ (product.guarantee || 12) + ' months' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="details">
        <div class="display-specs">
          <h2>Deteils</h2>
          <p>Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display. Nothing surprising, because advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker, leaving no room for bold design solutions. And how good that in such realities Apple everything is fine with displays. Both critics and mass consumers always praise the quality of the picture provided by the products of the Californian brand. And last year's 6.7-inch Retina panels, which had ProMotion, caused real admiration for many.</p>
          <div class="spec-grid">
            <div class="specs-item">
              <span class="spec-label">Screen diagonal</span>
              <span class="spec-value">{{ displaySpecs.screenDiagonal || 'N/A' }}</span>
            </div>
            <div class="specs-item">
              <span class="spec-label">Screen resolution</span>
              <span class="spec-value">{{ displaySpecs.screenResolution || 'N/A' }}</span>
            </div>
            <div class="specs-item">
              <span class="spec-label">Refresh rate</span>
              <span class="spec-value">{{ displaySpecs.refreshRate || 'N/A' }}</span>
            </div>
            <div class="specs-item">
              <span class="spec-label">Pixel density</span>
              <span class="spec-value">{{ displaySpecs.pixelDensity || 'N/A' }}</span>
            </div>
            <div class="specs-item">
              <span class="spec-label">Screen type</span>
              <span class="spec-value">{{ displaySpecs.screenType || 'N/A' }}</span>
            </div>
            <div class="specs-item">
              <span class="spec-label">CPU</span>
              <span class="spec-value">{{ displaySpecs.cpu || 'N/A'}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rating-section">
        <div class="rating-value">{{ product.rating }}</div>
        <div class="rating-text">of {{ product.count_review }} nations</div>
        <div class="rating-stars">
        <span v-for="i in 5" :key="i" class="star">
          <span class="star-filled" :style="getStarStyle(i)">★</span>
          <span class="star-empty">★</span>
        </span>
      </div>
      </div>
      <RelatedProducts />
    </div>
  </div>
  <Footer />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Header from '../UI/Header.vue'
import Footer from '../UI/Footer.vue'
import RelatedProducts from '../UI/RelatedProducts.vue'

export default {
  components: {
    Header,
    RelatedProducts,
    Footer
  },
  name: 'ProductPage',
  data() {
    return {
      quantity: 1,
      isAddingToCart: false
    }
  },
  computed: {
    ...mapState('products', ['currentProduct', 'loading', 'error']),
    product() {
      return this.currentProduct || {}
    },
    displaySpecs() {
      return {
        screenDiagonal: this.getCharacteristicValue('Диагональ') || 'N/A"',
        screenResolution: this.getCharacteristicValue('Разрешение') || 'N/A',
        refreshRate: this.getCharacteristicValue('Частота обновления') || 'N/A',
        pixelDensity: this.getCharacteristicValue('Плотность пикселей') || 'N/A',
        screenType: this.getCharacteristicValue('Тип экрана') || 'N/A',
        cpu: this.getCharacteristicValue('Процессор') || 'N/A'
      }
    },
    displayedSpecs() {
      const specMapping = [
        { label: 'Screen Size', key: 'Диагональ' },
        { label: 'CPU', key: 'Процессор' },
        { label: 'Number of Cores', key: 'Ядра' },
        { label: 'Main Cameras', key: 'Основная камера' },
        { label: 'Front Camera', key: 'Фронтальная камера' },
        { label: 'Battery Capacity', key: 'Аккумулятор' }
      ]
      return specMapping.map(spec => ({
        label: spec.label,
        value: this.getCharacteristicValue(spec.key) || 'N/A'
      })).slice(0, 6)
    },
    getScreenSize() {
      const screenSize = this.getCharacteristicValue('Диагональ') || 'N/A'
      return screenSize !== 'N/A' ? screenSize : 'unknown'
    },
    formattedPrice() {
      if (!this.product.price) return {}
      
      const price = this.product.discount_price 
        ? this.product.discount_price 
        : this.product.price
      
      return {
        current: `$${price}`,
        original: this.product.discount_price 
          ? `$${this.product.price}` 
          : null
      }
    }
  },
  created() {
    this.fetchProductById(this.$route.params.id)
  },
  methods: {
    ...mapActions('products', ['fetchProductById']),
    ...mapActions('cart', ['addProductToCart']),
    
    getImageUrl(imagePath) {
      return imagePath ? `http://localhost:1452/${imagePath}` : 'placeholder-image.jpg'
    },
    getCharacteristicValue(key) {
      const char = this.product.characteristics?.find(c => c.characteristic === key)
      return char ? char.value : null
    },
    getStarStyle(starIndex) {
      const rating = this.product.rating || 0
      const fillPercentage = Math.min(1, Math.max(0, rating - (starIndex - 1)))
      return {
        width: `${fillPercentage * 100}%`
      }
    },
    async addToCartHandler() {
      if (!this.product || this.isAddingToCart) return
      
      this.isAddingToCart = true
      try {
        await this.addProductToCart({
          product: this.product,
          quantity: this.quantity
        })
        
        alert(`${this.product.name} added to cart!`)
      } catch (error) {
        console.error('Error adding to cart:', error)
        alert('Failed to add product to cart')
      } finally {
        this.isAddingToCart = false
      }
    }
  }
}
</script>

<style scoped>
.product-page {
  padding: 20px;
  max-width: 1200px;
  margin: 80px auto 0; 
  font-family: 'Arial', sans-serif;
}

.product-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.product-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.product-image img {
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  border-radius: 8px;
}

.product-info {
  padding: 20px;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 600;
}

.price-section {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.current-price {
  font-size: 24px;
  font-weight: 600;
  color: #000;
}

.original-price {
  font-size: 18px;
  color: #A0A0A0;
  text-decoration: line-through;
}

.details {
  background: #FAFAFA;
  width: 100vw; 
  min-height: 100vh; 
  margin-left: -368px;
}

.display-specs {
  font-family: Arial, sans-serif;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  padding: 40px 40px;
  margin-top: 150px;
}

.display-specs h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
}

.display-specs p {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 50px;
  color: #666;
}

.display-specs .spec-grid {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.display-specs .specs-item {
  display: flex;
  width: 100%;
  margin-bottom: 30px;
  border-bottom: 1px solid #CDCDCD;
}

.display-specs .spec-label {
  font-weight: normal;
  color: #333;
  flex: 0 0 50%;
  font-size: 14px;
}

.display-specs .spec-value {
  font-weight: bold;
  flex: 0 0 50%;
  text-align: right;
  font-size: 14px;
}

.specifications {
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 10px;
  padding: 15px; 
  border-radius: 10px; 
}

.spec-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  background-color: #F4F4F4;
}

.spec-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: #4E4E4E;
  margin-top: 5px;
}

.spec-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.spec-content {
  display: flex;
  flex-direction: column;
}

.spec-content strong {
  color: #6e6e73;
  font-weight: 400;
  font-size: 13px;
  margin-bottom: 4px;
}

.spec-content span {
  color: #1d1d1f;
  font-weight: 600;
  font-size: 14px;
}

.description {
  margin: 20px 0;
  line-height: 1.6;
  color: #1d1d1f;
  font-size: 15px;
}

.action-section {
  display: flex;
  gap: 15px;
  margin: 20px 0;
}

.wishlist-btn, .cart-btn {
  width: 260px;
  height: 56px;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.wishlist-btn {
  background: none;
  color: #000;
  border: 1px solid #000;
}

.wishlist-btn:hover {
  background: #f5f5f7;
}

.cart-btn {
  background: #000;
  color: white;
  border: none;
}

.cart-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.delivery-info {
  display: flex;
  gap: 20px; 
  margin-top: 30px;
}

.delivery-item {
  display: flex;
  align-items: center; 
  gap: 15px; 
  padding: 15px;
  border-radius: 16px;
  min-width: 160px; 
}

.delivery-icon {
  background-color: #F6F6F6; 
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px; 
  height: 32px; 
}

.delivery-icon img {
  width: 24px;
  height: 24px;
}

.text-block {
  text-align: left; 
  display: flex;
  flex-direction: column;
}

.text-block span:first-child {
  color: #1d1d1f; 
  font-size: 14px;
  font-style: normal;
  font-weight: 600; 
}

.text-block span:last-child {
  color: #6e6e73; 
  font-size: 13px;
  font-style: italic;
  font-weight: 400;
}

.rating-section {
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin: 30px 0;
  padding: 20px;
  background-color: #FAFAFA;
  border-radius: 25px;
}

.rating-value {
  font-size: 32px;
  font-weight: bold;
  line-height: 1;
}

.rating-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.rating-stars {
  font-size: 24px;
  color: #FFB800;
  letter-spacing: 1px;
  position: relative;
  display: inline-block;
}

.star {
  position: relative;
  display: inline-block;
}

.star-filled {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  white-space: nowrap;
  overflow: hidden;
}

.star-empty {
  color: #ddd; 
}

.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.error {  
  color: #ff1900;
}
</style>
