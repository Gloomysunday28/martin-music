export default {
  install(Vue, options) {
    const {
      loading
    } = options

    Vue.directive('lazy-decode', {
      bind(el, express) {
        const { value } = express
        if (value) {
          el.dataset.src = value
        }

        el.style.background = `url(${loading}) no-repeat center/contain`
        const observer = new IntersectionObserver(function(entries) {
          const {0: {
            isIntersecting
          }, 1: initInterOpt } = entries

          if (((initInterOpt && initInterOpt.isIntersecting) || isIntersecting) && !el.src) {
            el.src = el.dataset.src
            el.onload = () => {
              el.decode()
              observer.unobserve(el)
            }
          }
        })
        observer.observe(el)
      }
    })
  }
}
