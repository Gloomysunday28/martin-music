const utils = {
  formatDouble(str) {
    return str.toString().padStart(2, 0)
  },
  filterTime(date) {
    date = new Date(date)
    const formatDouble = this.formatDouble
    const year = date.getFullYear()
    const month = formatDouble(date.getMonth() + 1)
    const day = formatDouble(date.getDay())

    const hour = formatDouble(date.getHours())
    const minutes = formatDouble(date.getMinutes())
    const seconds = formatDouble(date.getSeconds())

    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
  }
}

export { utils }

export default {
  install(Vue) {
    Vue.prototype.$utils = utils
  }
}
