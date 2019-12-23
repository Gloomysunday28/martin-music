import Vue from 'vue'
import Vuex from 'vuex'
import baseInfo from './model/baseInfo'
import server from './model/server'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    baseInfo,
    server
  }
})
