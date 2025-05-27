<template>
  <div class="banner-container">
    <div class="banner">
      <div class="banner-content">
        <p class="pro-beyond">Pro.Beyond.</p>
        <h1 class="iphone-model">iPhone 14 Pro</h1>
        <p class="slogan">Created to change everything for the better. For everyone.</p>
        <router-link to="/category">
          <button class="shop-now">Shop Now </button>
        </router-link>
      </div>
      <img class="banner-logo" src="/src/assets/header/Iphone.svg" alt="iPhone 14 Pro">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style scoped>
.banner-container {
  background: linear-gradient(50deg, #211c24 0%, #211c24 100%);
  width: 100%;
  height: 632px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.banner {
  width: 100%;
  max-width: 1440px;
  padding: 0 5%;
  position: relative;
  display: flex;
}

.banner-content {
  max-width: 600px;
  z-index: 2;
}

.pro-beyond {
  font-size: 24px;
  font-weight: 500;
  color: #aaa;
  margin-bottom: 10px;
}

.iphone-model {
  font-size: 80px;
  font-weight: 700;
  color: white;
  line-height: 1.1;
  margin-bottom: 20px;
}

.slogan {
  font-size: 20px;
  font-weight: 400;
  color: #aaa;
  margin-bottom: 40px;
}

.shop-now {
  color: white;
  width: 188px;
  height: 56px;
  border: 1px solid #ffffff;
  border-radius: 6px;
  padding: 16px 56px;
  background: none;
  cursor: pointer;
}

.banner-logo {
margin-top: -100px;
position: absolute;
margin-left: 1000px;
width: 406px;
}

@media (max-width: 1024px) {
  .iphone-model {
    font-size: 60px;
  }
  .banner-logo {
    opacity: 0.5;
  }
}
</style>