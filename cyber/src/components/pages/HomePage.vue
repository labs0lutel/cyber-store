<template>
  <div class="home">
    <Header />
    <Banner />
    <SmalBanner />
    <CategoryList />
    <Products />
    <Banners />
    <Discounts />
    <BigSale />
    <Footer />
  </div>
</template>

<script>
import Header from '../UI/Header.vue'
import Banner from '../UI/Banner.vue'
import SmalBanner from '../UI/SmalBaner.vue'
import CategoryList from '../UI/CategoryList.vue'
import Products from '../UI/Products.vue'
import Banners from '../UI/Banners.vue'
import Discounts from '../UI/Discounts.vue'
import BigSale from '../UI/BigSale.vue'
import Footer from '../UI/Footer.vue'

export default {
  name: 'HomePage',
  components: {
    Header,
    Banner,
    SmalBanner,
    CategoryList,
    Products,
    Banners,
    Discounts,
    BigSale, 
    Footer
  }
}
</script>

<style scoped>
body{
  background: #fff;
}
.home {

  background: #fff;
}

</style> 