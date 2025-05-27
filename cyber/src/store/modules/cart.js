const state = {
  cartItems: []
};

const mutations = {
  ADD_PRODUCT_TO_CART(state, { product, quantity }) {
    console.log('Adding product to cart:', product);
    const existingItem = state.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem = {
        id: product.id,
        name: product.name,
        description: product.description,
        sku: product.sku || Math.floor(Math.random() * 10000000000).toString(),
        price: product.discount_price || product.price,
        quantity,
        images: product.images,
        selected: true
      };
      console.log('New cart item:', newItem);
      state.cartItems.push(newItem);
    }
  },

  REMOVE_PRODUCT_FROM_CART(state, index) {
    state.cartItems.splice(index, 1);
  },

  LOAD_CART_ITEMS(state, items) {
    state.cartItems = items;
  }
};


const actions = {
  addProductToCart({ commit }, { product, quantity }) {
    commit('ADD_PRODUCT_TO_CART', { product, quantity });
    localStorage.setItem('vue-cart', JSON.stringify(state.cartItems));
  },
  removeProductFromCart({ commit }, index) {
    commit('REMOVE_PRODUCT_FROM_CART', index);
    localStorage.setItem('vue-cart', JSON.stringify(state.cartItems));
  },
  loadCartItems({ commit }) {
    const savedCart = localStorage.getItem('vue-cart');
    if (savedCart) {
      commit('LOAD_CART_ITEMS', JSON.parse(savedCart));
    }
  }
};

const getters = {
  cartItems: state => state.cartItems,
  subtotal: state => state.cartItems.reduce((sum, item) => sum + (item.selected ? item.price * item.quantity : 0), 0),
  total: (state, getters) => getters.subtotal + 50 + 29 
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};