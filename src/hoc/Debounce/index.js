const debounce = function(fn, wait, immediate) {
  let timer = null

  function debounced() {
    if (timer) clearTimeout(timer) // clearTimeout 无法消除timer变量值, 只有手动设置为null, 才视为消除
    if (immediate) { // 当事件在一定时间内不断触发, timer始终是有值的, function在这段时间内是不会执行的
      const cancelTime = !timer
      timer = setTimeout(_ => {
        timer = null
      }, wait)

      if (cancelTime) return fn && fn.apply(this, arguments)
    } else {
      timer = setTimeout(_ => {
        fn && fn.apply(this, arguments)
      }, wait)
    }
  }

  debounced.cancel = function() { // 如果wait时间过久, 可以重置防抖时间
    clearTimeout(timer)
    timer = null
  }

  return debounced
}

export default {
  name: 'MusicDebounce',
  abstract: true, // 抽象组件
  props: {
    time: {
      type: [String, Number],
      default: 300,
      required: false
    }
  },
  render() {
    const vnode = this.$slots.default
    vnode.forEach(v => {
      for (let event in v.data.on) {
        v.data.on[event] = debounce(v.data.on[event], this.time)
      }
    })
    return vnode
  }
}
