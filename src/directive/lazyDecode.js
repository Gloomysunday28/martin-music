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
        const oImage = new Image()
        el.style.background = `url(${loading}) no-repeat center/cover`
        const observer = new IntersectionObserver(function(entries) {
          const {0: {
            isIntersecting
          }, 1: initInterOpt } = entries

          if (((initInterOpt && initInterOpt.isIntersecting) || isIntersecting) && !oImage.src) {
            oImage.src = el.dataset.src
            oImage.className = 'm-decode__img'
            oImage.onload = () => {
              oImage.decode().then(() => {
                el.style = null
                el.innerHTML = ''
                el.appendChild(oImage)
                observer.unobserve(el)
              })
            }
          }
        }, {
          rootMargin: '20px'
        })
        observer.observe(el)
      }
    })
  }
}
