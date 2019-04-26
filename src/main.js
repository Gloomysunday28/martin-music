import Vue from 'vue'
import {mapState} from 'vuex'
import App from './App'
import router from './router'
import Bus from '@/utils/Bus'
import FastClick from 'fastclick'
import Toast from '@/components/App/Toast'
import Loading from '@/components/App/Loading'
import Dialog from '@/components/App/Dialog'
import HTTP from '@/api/http'
import Api from '@/api/api'
import store from '@/store'
import MusicInput from '@/components/App/Form/Input'
import MusicTextArea from '@/components/App/Form/TextArea'
import isApp from '@/utils/isApp'
import VueLazyload from 'vue-lazyload'
import '@/assets/css/common.less'
import 'swiper/dist/css/swiper.css'
// import '@/assets/css/resource.less'
import '@/assets/font/iconfont.css'

const components = [MusicInput, MusicTextArea]

components.forEach(comp => {
  Vue.component(comp.name, comp)
})

FastClick.attach(document.body)

Vue.use(Toast)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Bus)
Vue.use(HTTP)
Vue.use(Api)

Vue.config.productionTip = false

Vue.mixin({
  data() {
    return {
      isApp
    }
  },
  computed: mapState({
    personal: state => state.baseInfo.personal,
  })
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
})
