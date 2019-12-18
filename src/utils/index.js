const utils = {
  formatDouble(str) {
    return str.toString().padStart(2, 0)
  }
}

export { utils }

export default {
  install(Vue) {
    Vue.prototype.$utils = utils
  }
}
