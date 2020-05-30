import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://112.74.99.5:3000/web/api'

Vue.prototype.$http = axios
Vue.prototype.$msg = Toast

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
