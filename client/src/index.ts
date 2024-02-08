import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Ai } from 'wasm-chinese-chess'

import 'weui/dist/style/weui.min.css'
import './index.less'

// @ts-ignore
window.wasmAi = Ai

Vue.config.productionTip = false
Vue.config.devtools = true
// eslint-disable-next-line
new Vue({
  router,
  store,
  // eslint-disable-next-line
  render: (h: any) => h(App)
}).$mount('#chinese-chess')
