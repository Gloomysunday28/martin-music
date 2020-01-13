import Debounce from './Debounce'
import Throttle from './Throttle'
import InsertParent from './InsertParent'

export default {
  install(Vue) {
    Vue.component(Debounce.name, Debounce)
    Vue.component(Throttle.name, Throttle)
    Vue.component(InsertParent.name, InsertParent)
  }
}
