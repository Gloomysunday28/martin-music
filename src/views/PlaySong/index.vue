<template>
  <div class="g-layout" @click="playSong">
    <div class="c-music__play" v-if="!isPlay">
      <i class="iconfont">&#xe601;</i>
    </div>
    <div class="c-music__control" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></div>
    <audio class="m-music__play" :src="src" muted="muted" controls="controls" ref="musicPlay"></audio>
  </div>
</template>

<script>
export default {
  name: 'MusicPlay',
  data() {
    return {
      isPlay: false,
      src: '',
      width: document.documentElement.clientWidth,
      start: 0,
      end: 0
    }
  },
  mounted() {
    this.getSongUrl()
  },
  methods: {
    touchstart(e) {
      this.start = e.touches[0].pageX
    },
    touchmove(e) {
      this.end = e.touches[0].pageX
    },
    touchend(e) {
      const music = this.$refs.musicPlay
      const duration = music.duration
      const currentTime = music.currentTime
      const pv = (this.end - this.start) / this.width
      music.currentTime = currentTime + (duration * pv)
      const promise = music.play()
      if (promise !== undefined) {
        promise.then(_ => {
          music.play()
        }).catch(_ => {
          this.isPlay = false
        })
      }
    },
    playSong() {
      const music = this.$refs.musicPlay
      if (music.paused) {
        this.isPlay = true
        music.play()
      } else {
        music.pause()
        this.isPlay = false
      }
    },
    getSongUrl() {
      this.$http.get(this.$api.songUrl, {
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        this.src = res.data.data[0].url
      })
    }
  }
}
</script>

<style scoped>
  .m-music__play {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 0;
  }
  .c-music__play {
    width: 150px;
    height: 150px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 30px;
    margin: auto;
  }
  .c-music__control {
    width: 100%;
    height: 200px;
    opacity: 0;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
  }
  .iconfont {
    font-size: 150px;
  }
</style>
