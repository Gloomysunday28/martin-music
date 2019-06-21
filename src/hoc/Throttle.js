const throttle = (fn, mustRun, immidate = false) => { // 函数节流
  let oldTime = +new Date()

  return function() {
    let newTime = +new Date()

    if (immidate) {
      fn && fn.call(this, ...arguments)
    } else {
      if (newTime - oldTime > mustRun) {
        fn && fn.call(this, ...arguments)
        oldTime = newTime
      }
    }
  }
}

export default {
  name: 'MartinThrottle',
  abstract: true,
  render() {
    const slots = this.$slots.default[0]

    if (slots.data.on) {
      for (let eve in slots.data.on) {
        slots.data.on[eve] = throttle(slots.data.on[eve], 500)
      }
    }
    return this.$slots.default[0]
  }
}
