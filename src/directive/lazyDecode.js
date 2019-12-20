export default {
  install(Vue, options) {
    const {
      loading
    } = options

    const getExpressValue = function(value) {
      let src = ''
      let options = {}
      if (value) {
        if (Array.isArray(value)) {
          src = value[0]
          options = value[1]
        } else src = value
      }

      return {
        src,
        options
      }
    }

    Vue.directive('lazy-decode', {
      bind(el, express) {
        const { value } = express
        const { src, options } = getExpressValue(value)
        const oImage = new Image()
        el.style.background = `url(${loading}) no-repeat center/cover`
        const observer = new IntersectionObserver(function(entries) {
          const {0: {
            isIntersecting
          }, 1: initInterOpt } = entries

          if (((initInterOpt && initInterOpt.isIntersecting) || isIntersecting) && !oImage.src) {
            oImage.src = src
            oImage.className = options.className || 'm-decode__img'
            oImage.decoding = 'async'
            oImage.onload = async () => {
              try {
                await oImage.decode()

                el.style = null
                el.innerHTML = ''
                el.appendChild(oImage)
                observer.unobserve(el)
              } catch (err) {
                console.log(err)
                observer.unobserve(el)
              }
            }
          }
        }, {
          rootMargin: '20px'
        })
        observer.observe(el)
      },
      update(el, express) {
        const { value } = express
        const { src, options } = getExpressValue(value)

        const oImage = new Image()
        oImage.src = src
        oImage.className = options.className || 'm-decode__img'
        oImage.decoding = 'async'
        oImage.onload = async () => {
          try {
            await oImage.decode()

            el.style = null
            el.innerHTML = ''
            el.appendChild(oImage)
          } catch (err) {
            console.log(err)
          }
        }
      }
    })
  }
}
