// import Vue from 'vue'

// const bus = new Vue()

// export default {
//   install(Vue) {
//     Vue.prototype.$common = bus
//   }
// }

const pubListeners = { //  发布者
  subscriber: {}, // 订阅者
  listen(key, fn) { // 添加订阅者
    if (!this.subscriber[key]) this.subscriber[key] = []
    this.subscriber[key].push(fn)
  },
  judgeKey(key) {
    if (!this.subscriber[key] || !this.subscriber[key].length) return false
    else return this.subscriber[key]
  },
  trigger(key, ...rest) {
    const lisntenrs = this.judgeKey(key)
    if (!lisntenrs) return false
    for (let subsc of lisntenrs) {
      subsc.apply(null, rest)
    }
  },
  removeListener(key) {
    const lisntenrs = this.judgeKey(key)
    if (!lisntenrs) return false
    lisntenrs.pop()
  }
}

export default {
  install(Vue) {
    Vue.prototype.$common = pubListeners
  }
}
