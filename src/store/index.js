import Vue from 'vue'
import Vuex from 'vuex'
import baseInfo from './model/baseInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    baseInfo,
  }
})
