import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant, { Toast } from 'vant'
import BaiduMap from 'vue-baidu-map'
import '@/assets/style.css'
import 'vant/lib/index.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://112.74.99.5:3000/web/api'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'yVYvKAVYyKpbDMmADA1upIconFUWdWHB'
})

// 请求拦截request
axios.interceptors.request.use(config => {
  // 设置请求头
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  return config
})

Vue.prototype.$http = axios
Vue.prototype.$msg = Toast

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
