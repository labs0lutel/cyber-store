import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: [],
    currentProduct: null,
    loading: false,
    error: null
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_CURRENT_PRODUCT(state, product) {
      state.currentProduct = product
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        commit('SET_LOADING', true)
        const response = await axios.get('http://localhost:1452/api/products/')
        commit('SET_PRODUCTS', response.data)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async fetchProductById({ commit }, id) {
      try {
        commit('SET_LOADING', true)
        const response = await axios.get(`http://localhost:1452/api/products/${id}`)
        commit('SET_CURRENT_PRODUCT', response.data)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },
  getters: {
    allProducts: state => state.products,
    currentProduct: state => state.currentProduct,
    isLoading: state => state.loading,
    error: state => state.error
  }
} 