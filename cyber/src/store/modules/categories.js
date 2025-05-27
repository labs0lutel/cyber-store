import axios from 'axios'

export default {
  namespaced: true,
  state: {
    categories: [],
    loading: false,
    error: null
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        commit('SET_LOADING', true)
        const response = await axios.get('http://localhost:1452/api/category/')
        commit('SET_CATEGORIES', response.data)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },
  getters: {
    allCategories: state => state.categories,
    isLoading: state => state.loading,
    error: state => state.error
  }
} 