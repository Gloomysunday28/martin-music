<template>
  <div class="g-layout" @click="playSong">
    <span class="header-back" @click.stop="scaleMusic">
      <i class="iconfont back-icon">&#xe61b;</i>
    </span>
    <div class="c-music_mask" :style="{width: maskWidth}" v-if="isDrag">
      <span class="c-music__time">{{currentTime}}</span>
    </div>
    <div class="c-music__play" v-if="!isPlay">
      <i class="iconfont">&#xe601;</i>
    </div>
    <music-canvas :width="width" :height="height" ref="canvas"/>
    <div class="c-music__control" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></div>
    <audio class="m-music__play" :src="src" controls="controls" ref="musicPlay"></audio>
  </div>
</template>

<script>
import MusicCanvas from '@/pages/MusicCanvas'

export default {
  name: 'MusicPlaySong',
  components: {
    MusicCanvas
  },
  props: {
    id: {
      type: [String, Number],
      default: '',
      required: true
    }
  },
  data() {
    return {
      isDrag: false,
      currentTime: '00:00',
      maskWidth: 0,
      isPlay: true,
      src: '',
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      start: 0,
      end: 0
    }
  },
  activated() {
    const self = this
    this.getSongUrl()
    this.$refs.musicPlay.addEventListener('ended', function () {
      this.play()
      self.scaleMusic()
    }, false)
  },
  methods: {
    scaleMusic() { // 将播放页面往下调
      this.$common.trigger('listenMusic')
      this.$common.trigger('listenMusicProgress', this.$refs.musicPlay.currentTime, this.$refs.musicPlay.duration)
    },
    touchstart(e) {
      this.isDrag = true
      this.start = e.touches[0].pageX
      const music = this.$refs.musicPlay
      const duration = music.duration
      const currentTime = music.currentTime
      this.maskWidth = (currentTime / duration) + '%'
    },
    touchmove(e) {
      this.end = e.touches[0].pageX
      const pv = (this.end - this.start) / this.width
      this.maskWidth = pv * 100 + '%'
      const currentTime = this.$refs.musicPlay.currentTime
      const doubleTime = (tm) => {
        return tm > 10 ? tm : '0' + tm
      }
      this.currentTime = doubleTime(~~(currentTime / 60)) + ':' + doubleTime(~~(currentTime / 3600))
    },
    touchend(e) {
      const music = this.$refs.musicPlay
      const duration = music.duration
      const currentTime = music.currentTime
      const pv = (this.end - this.start) / this.width

      music.currentTime = currentTime + (duration * pv)
      this.isDrag = false
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

      this.$emit('isPlay', this.isPlay)
    },
    getSongUrl() {
      this.$http.get(this.$api.songUrl, {
        params: {
          id: this.id
        }
      }).then(res => {
        this.src = res.data.data[0].url
        this.$nextTick().then(() => {
          this.$refs.musicPlay.play()
          this.$emit('isPlay', true)
        })
      })
    }
  },
  watch: {
    id(n, v) {
      if (v && n !== v) this.getSongUrl()
    }
  },
}
</script>

<style scoped lang="less">
  .g-layout {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 500;
    background: #000;
  }
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
    color: #fff;
    z-index: 10;
  }
  .c-music__control {
    width: 100%;
    height: 300px;
    opacity: 0;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
  }
  .iconfont {
    font-size: 150px;
  }
  .c-music__bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .c-music_mask {
    position: absolute;
    left: 0;
    top: 0;
    background: red;
    height: 100vh;
    z-index: 100;
    display: flex;
  }
  .c-music__time {
    font-size: 50px;
    font-weight: bold;
    color: #fff;
    margin-top: auto;
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .header-back .iconfont{
    font-size: 60px;
  }
</style>
