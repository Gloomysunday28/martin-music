import Vue from 'vue'
import store from '@/store'
import { mapState } from 'vuex'
import App from './App'
import router from './router'
import lazyDecode from '@/directive/lazyDecode'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'
import '@/assets/css/common.less'
import 'swiper/dist/css/swiper.css'
import '@/assets/font/iconfont.css'

FastClick.attach(document.body)
Vue.config.productionTip = false

const starcts = Vue.config.optionMergeStrategies
starcts.beforeCjd = starcts.created

Vue.mixin({
  beforeCreate() {
    if (!this.cjd) {
      Vue.util.defineReactive(this, 'cjd', 123)
      if (this.$options.beforeCjd) {
        for (let o of this.$options.beforeCjd) {
          o.call(this, 3312)
        }
      }
    }
  },
  data(vm) {
    return {
      isApp: vm.isApp
    }
  },
  computed: mapState({
    personal: state => state.baseInfo.personal,
    loveSongList: state => state.baseInfo.loveList,
  })
})

// require.context(
//   // 其组件目录的相对路径
//   '@/components/App',
//   // 是否查询其子目录
//   true,
//   // 匹配基础组件文件名的正则表达式
//   /([Toast|Loading|Dialog]\/index.js)|(Form)\/(.*)\.vue/
// )

const requireBaseComponent = require.context('@/components/App', true, /([Toast|Loading|Dialog|Form]\/index.js)/)
const requireHoc = require.context('@/hoc', false)
const requireUtils = require.context('@/utils', false)
const requireServer = require.context('@/api', false)

const plugins = [requireBaseComponent, requireHoc, requireUtils, requireServer]
plugins.forEach(plugin => {
  plugin.keys().forEach(fileName => {
    const modules = plugin(fileName).default
    Vue.use(modules)
  })
})

Vue.use(lazyDecode, {
  loading: require('@/assets/img/loading-ps.jpg')
})

Vue.use(VueLazyload, { // 图片懒加载
  preLoad: 1.3,
  loading: require('@/assets/img/loading-ps.jpg'),
  attempt: 1,
  listenEvents: [ 'scroll' ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
  // renderError: h => h(App)
})
