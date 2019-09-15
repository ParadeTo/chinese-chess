import Vue from 'vue'
import Vuex from 'vuex'

import game from './modules/game'
import setting from './modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    game,
    setting
  }
})
