const resolveInspect = function(res) {
  return {
    value: res,
    status: 'fulfilled'
  }
}

const rejectInspect = function(res) {
  return {
    value: res,
    status: 'rejected'
  }
}

function formatDouble(str) {
  return str.toString().padStart(2, 0)
}
const utils = {
  formatDouble,
  filterTime(date, format = 'YYYY-MM-DD hh:mm:ss') {
    date = new Date(date)
    const year = date.getFullYear()
    const month = formatDouble(date.getMonth() + 1)
    const day = formatDouble(date.getDay())

    const hour = formatDouble(date.getHours())
    const minutes = formatDouble(date.getMinutes())
    const seconds = formatDouble(date.getSeconds())

    return `${year}-${month}-${day}${format.includes('hh') ? hour + ':' + minutes + ':' + seconds : ''}`
  },
  /**
   * @author Mr.Cai
   * @description 模拟Promise原生带有allsetteld方法，该方法与all方法类似，但是不会因为某个环节发生错误就会终止整个数组
   * @param {function} warn Vue util下的方法
   * @param {function} promises 所有请求的集合
   * @returns 返回promise数组
   */
  allSettled(promises) {
    if (!Array.isArray(promises)) return console.warn('promises is not an array')
    const promisesSet = promises.map(pro => {
      if (typeof pro !== typeof Promise) return resolveInspect()
      return pro.then(resolveInspect, rejectInspect)
    })
    return Promise.all(promisesSet)
  }
}

export { utils }

export default {
  install(Vue) {
    Vue.prototype.$utils = utils
  }
}
