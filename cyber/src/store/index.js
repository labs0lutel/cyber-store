import { createStore } from 'vuex'
import products from './modules/products'
import categories from './modules/categories'
import cart from './modules/cart'

export default createStore({
  modules: {
    products,
    categories,
    cart
  }
}) 