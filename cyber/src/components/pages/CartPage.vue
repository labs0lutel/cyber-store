<template>
  <Header />
  <div class="shopping-cart cart-container">
    <div class="cart-items">
      <h1>Shopping Cart</h1>
      <div v-for="(item, index) in cartItems" :key="item.id" class="cart-item" :class="{ 'fade-out': isCheckingOut }">
        <img
          v-if="item.images?.[0]"
          :src="getImageUrl(item.images[0])"
          alt="Product Image"
          class="item-image"
          @error="handleImageError"
        />
        <img
          v-else
          :src="placeholderImage"
          alt="No Image Available"
          class="item-image"
        />

        <div class="item-details">
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p v-if="item.description"><i>{{ item.description }}</i></p>
            <p>#{{ item.sku }}</p>
          </div>
          <div class="item-action">
            <div class="quantity-controls">
              <button class="quantity-btn" @click="decreaseQuantity(index)">−</button>
              <span class="quantity">{{ item.quantity }}</span>
              <button class="quantity-btn" @click="increaseQuantity(index)">+</button>
            </div>
            <span class="item-price">${{ item.price * item.quantity }}</span>
            <button @click="removeItem(index)" class="remove-btn">×</button>
          </div>
        </div>
      </div>
      <div v-if="cartItems.length === 0" class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some items to your cart to continue shopping</p>
      </div>
    </div>

    <div class="order-summary" :class="{ 'fade-out': isCheckingOut }">
      <h2>Order Summary</h2>

      <div class="promo-section">
        <p>Discount code / Promo code</p>
        <input type="text" placeholder="Code" v-model="promoCode" />
      </div>

      <div class="bonus-card">
        <p>Your bonus card number</p>
        <div class="bonus-input">
          <input type="text" placeholder="Enter Card Number" v-model="bonusCardNumber" />
          <button @click="applyBonusCard">Apply</button>
        </div>
      </div>

      <div class="totals">
        <div class="subtotal">
          <span>Subtotal</span>
          <span>${{ subtotal }}</span>
        </div>
        <div class="tax">
          <span>Estimated Tax</span>
          <span>${{ estimatedTax }}</span>
        </div>
        <div class="shipping">
          <span>Estimated shipping & Handling</span>
          <span>${{ estimatedShipping }}</span>
        </div>
        <div class="total">
          <span>Total</span>
          <span>${{ total }}</span>
        </div>
      </div>

      <button 
        class="checkout-btn" 
        @click="checkout" 
        :disabled="cartItems.length === 0 || isCheckingOut"
      >
        {{ isCheckingOut ? 'Processing...' : 'Checkout' }}
      </button>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import placeholderImage from '@/assets/placeholder.svg';
import Header from '@/components/UI/Header.vue';
import Footer from '../UI/Footer.vue';

const cartItems = ref([]);
const promoCode = ref('');
const bonusCardNumber = ref('');
const estimatedTax = ref(50);
const estimatedShipping = ref(29);
const baseImageUrl = import.meta.env.VITE_API_URL || 'http://localhost:1452';
const isCheckingOut = ref(false);

const subtotal = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
});

const total = computed(() => {
  return subtotal.value + estimatedTax.value + estimatedShipping.value;
});

const getImageUrl = (filename) => {
  if (!filename) return placeholderImage;
  try {
    const imagePath = filename.startsWith('image/') ? filename : `image/${filename}`;
    const url = `${baseImageUrl}/${imagePath}`;
    console.log('Generated image URL:', url);
    return url;
  } catch (error) {
    console.error('Error generating image URL:', error);
    return placeholderImage;
  }
};

const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src);
  event.target.src = placeholderImage;
};

const loadCartItems = () => {
  try {
    const savedCart = localStorage.getItem('vue-cart');
    if (savedCart) {
      cartItems.value = JSON.parse(savedCart);
      console.log('Loaded cart items:', cartItems.value);
    }
  } catch (error) {
    console.error('Error loading cart:', error);
  }
};

const saveCart = () => {
  localStorage.setItem('vue-cart', JSON.stringify(cartItems.value));
};

const increaseQuantity = (index) => {
  cartItems.value[index].quantity += 1;
  saveCart();
};

const decreaseQuantity = (index) => {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity -= 1;
    saveCart();
  }
};

const removeItem = (index) => {
  cartItems.value.splice(index, 1);
  saveCart();
};

const applyBonusCard = () => {
  console.log('Bonus card applied:', bonusCardNumber.value);
};

const checkout = async () => {
  if (cartItems.value.length === 0) return;
  
  isCheckingOut.value = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    cartItems.value = [];
    saveCart();
    
    alert('Thank you for your order! Your items will be shipped soon.');
  } catch (error) {
    console.error('Error during checkout:', error);
    alert('There was an error processing your order. Please try again.');
  } finally {
    isCheckingOut.value = false;
  }
};

onMounted(() => {
  loadCartItems();
  console.log('Cart items after load:', cartItems.value);
});
</script>

<style scoped>
.shopping-cart {
  font-family: Arial, sans-serif;
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 100px;
}

.cart-container {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: flex-start;
}

.cart-items {
  flex: 1;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
  gap: 15px;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.item-details {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-info h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.item-info p {
  margin: 2px 0;
  font-size: 14px;
  color: #666;
}

.item-action {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 5px;
}

.quantity-btn {
  background: none;
  border: 1px solid #ddd;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 16px;
}

.quantity {
  font-size: 14px;
  width: 20px;
  text-align: center;
}

.item-price {
  font-weight: bold;
  font-size: 16px;
}

.remove-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 18px;
}

.remove-btn:hover {
  color: #333;
}

.order-summary {
  width: 340px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.order-summary h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.promo-section,
.bonus-card {
  margin-bottom: 15px;
}

.promo-section p,
.bonus-card p {
  margin: 0 0 5px 0;
  font-size: 14px;
}

input[type='text'] {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.bonus-input {
  display: flex;
  gap: 10px;
  margin-top: 5px;
}

.bonus-input button {
  padding: 8px 15px;
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.bonus-input button:hover {
  background-color: #f0f0f0;
}

.totals {
  margin: 20px 0;
  font-size: 14px;
}

.totals div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.total {
  font-weight: bold;
  font-size: 16px;
}

.checkout-btn {
  width: 100%;
  padding: 12px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.checkout-btn:hover {
  background-color: #333;
}

.fade-out {
  animation: fadeOut 0.5s ease-out forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.empty-cart {
  text-align: center;
  padding: 40px 0;
  color: #666;
}

.empty-cart h2 {
  margin-bottom: 10px;
  font-size: 24px;
}

.empty-cart p {
  font-size: 16px;
}

.checkout-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.checkout-btn {
  transition: all 0.3s ease;
}

.checkout-btn:hover:not(:disabled) {
  background-color: #333;
  transform: translateY(-2px);
}
</style>
