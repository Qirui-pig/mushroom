import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCounter(state, payload) {
      payload.count += 1
    },
    addToCart(state, payload) {
      payload.checked = false
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      return new Promise(resolve => {
        let oldProduct = context.state.cartList.find(item => item.iid == payload.iid)

        if (oldProduct) {
          context.commit('addCounter', oldProduct)
          resolve('商品数量+1')
        } else {
          payload.count = 1
          context.commit('addToCart', payload)
          resolve('添加成功')
        }
      })
    }
  },
  getters: {
    cartList(state) {
      return state.cartList
    },
    cartCount(state) {
      return state.cartList.length
    }
  }
})

export default store