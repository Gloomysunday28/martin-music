const debounce = (fn, delayTime) => {
  let timer = null
  return function(...rest) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(val => {
      fn && fn.apply(fn, rest)
    }, delayTime)
  }
}

export default {
  name: 'MusicDebounce',
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
