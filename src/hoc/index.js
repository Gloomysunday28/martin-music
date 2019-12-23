import Debounce from './Debounce'
import Throttle from './Throttle'

export default {
  install(Vue) {
    Vue.component(Debounce.name, Debounce)
    Vue.component(Throttle.name, Throttle)
  }
}
