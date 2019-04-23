import Vue from 'vue'
import Loading from './index.vue'

const loadingContain = new (Vue.extend(Loading))({
  el: document.createElement('div')
})

const showLoading = (bool) => {
  loadingContain.show(bool)
  document.body.appendChild(loadingContain.$el)
}

export default {
  install(Vue) {
    Vue.prototype.$loading = showLoading
  }
}
