import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import fastClick from 'fastclick'

import toast from './components/common/toast'
Vue.use(toast)

fastClick.attach(document.body)

Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/1.jpg')
})

Vue.config.productionTip = false



Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
