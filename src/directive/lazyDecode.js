export default {
  install(Vue, options) {
    const {
      loading
    } = options

    Vue.directive('lazy-decode', {
      bind(el) {
        el.style.background = `url(${loading}) no-repeat center/contain`
        const oImage = new Image()
        const observer = new IntersectionObserver(function(entries) {
          const {0: {
            isIntersecting
          }, 1: initInterOpt } = entries

          if ((initInterOpt && initInterOpt.isIntersecting) || isIntersecting) {
            oImage.src = el.dataset.src
            oImage.onload = () => {
              oImage.decode().then(() => {
                el.appendChild(oImage)
                el.style = null
              })
            }
          }
        })
        observer.observe(el)
      }
    })
  }
}
