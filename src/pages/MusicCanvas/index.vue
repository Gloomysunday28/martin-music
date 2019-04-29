<template>
  <canvas class="c-music__bg" :width="width" :height="height" ref="canvas"></canvas>
</template>

<script>
const requestAnimation = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame

export default {
  name: 'MusicCanvas',
  props: {
    width: {
      type: [String, Number],
      default: 0,
      required: false
    },
    height: {
      type: [String, Number],
      default: 0,
      required: false
    },
  },
  data() {
    return {
      ctx: null,
      waves: [],
      wavesNum: 50,
      waveWidth: this.width / 50,
    }
  },
  mounted() {
    this.initCanvas()
  },
  methods: {
    initCanvas() {
      this.ctx = this.$refs.canvas.getContext('2d')
      this.initWave()
    },
    initWave() {
      const self = this
      for (let i = 0; i < this.wavesNum; i++) {
        const h = ~~(Math.random() * (this.height / 6))
        const wave = {
          ix: this.waveWidth * i,
          ih: h,
          th: h,
          w: this.waveWidth,
          speed: Math.random() + (this.height / 1000),
          draw() {
            if (this.ih < 0 || this.ih > self.height / 5) {
              this.speed = -this.speed
              self.ctx.fillStyle = `rgba(
                ${Math.random() * 255},
                ${Math.random() * 255},
                ${Math.random() * 255},
                1
              )`
            }
            this.ih += this.speed
            self.ctx.beginPath()
            self.ctx.rect(this.ix, self.height - this.ih, this.w, this.ih)
            self.ctx.fill()
            self.ctx.closePath()
          }
        }
        this.waves.push({...wave})
      }

      requestAnimation(this.drawWave)
    },
    drawWave() {
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.waves.forEach(wv => {
        wv.draw()
      })
      requestAnimation(this.drawWave)
    }
  }
}
</script>

<style scoped lang="less">
  .c-music__bg {
  }
</style>
