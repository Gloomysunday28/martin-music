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
      isStop: false,
      ctx: null,
      waveBg: `rgba(${Math.random() * 255} ,${Math.random() * 255}, ${Math.random() * 255}, 1)`,
      waves: [],
      wavesNum: 100,
      waveWidth: this.width / 100,
    }
  },
  mounted() {
    this.initCanvas()
  },
  methods: {
    changeWabeBg() {
      this.waveBg = `rgba(${Math.random() * 255} ,${Math.random() * 255}, ${Math.random() * 255}, 1)`
    },
    initCanvas() {
      this.ctx = this.$refs.canvas.getContext('2d')
      this.initWave()
    },
    initWave() {
      const self = this
      for (let i = 0; i < this.wavesNum; i++) {
        const h = ~~(Math.random() * (this.height / 200))
        const wave = {
          ix: this.waveWidth * i,
          ih: h,
          th: h,
          w: this.waveWidth,
          speed: Math.random() + (this.height / 2000),
          draw() {
            if (this.ih < 0 || this.ih > self.height / 15) {
              this.speed = -this.speed
            }
            var grd = self.ctx.createLinearGradient(0, 0, self.width, self.height)
            grd.addColorStop(0, self.waveBg)
            grd.addColorStop(1, 'white')
            self.ctx.fillStyle = grd
            this.ih += this.speed
            self.ctx.beginPath()
            self.ctx.rect(this.ix, self.height - this.ih, this.w, this.ih)
            self.ctx.fill()
            self.ctx.closePath()
          }
        }
        this.waves.push({...wave})
      }

      this.startWave()
    },
    drawWave() {
      if (this.isStop) return cancelAnimationFrame(this.drawWave)
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.waves.forEach(wv => {
        wv.draw()
      })
      requestAnimation(this.drawWave)
    },
    stopWave() {
      this.isStop = true
    },
    startWave() {
      this.isStop = false
      requestAnimation(this.drawWave)
    }
  }
}
</script>
