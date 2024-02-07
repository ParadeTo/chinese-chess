import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'weui/dist/style/weui.min.css'
import './index.less'
debugger
Vue.config.productionTip = false
Vue.config.devtools = true
// eslint-disable-next-line
new Vue({
  router,
  store,
  // eslint-disable-next-line
  render: (h: any) => h(App),
}).$mount('#chinese-chess')

// import('wasm-chinese-chess').then(({ Ai, Color }) => {
//   window.wasmAi = Ai.new()
// })
