import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/pages/HomePage.vue'
import ProductPage from '../components/pages/ProductPage.vue'
import CartPage from '../components/pages/CartPage.vue'
import CategoryProducts from '../components/pages/CategoryProducts.vue'
import Favorite from '../components/pages/Fovorite.vue'
import Category from '../components/pages/CategoryProducts.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  },
  {
    path: '/category/:categoryId/:categoryName',
    name: 'CategoryProducts',
    component: CategoryProducts
  },
  {
    path: '/favorites',
    name: 'ProductDetail',
    component: Favorite
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
