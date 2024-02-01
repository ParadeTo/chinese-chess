import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'weui/dist/style/weui.min.css'
import './index.less'

// eslint-disable-next-line
// import wasm from 'wasm-chinese-chess'
// eslint-disable-next-line

import('wasm-chinese-chess').then(({ Ai }) => {
  Ai.new()

  Vue.config.productionTip = false
  Vue.config.devtools = true

  // new Vue({
  //   router,
  //   store,
  //   render: (h) => h(App),
  // }).$mount('#chinese-chess')
})
