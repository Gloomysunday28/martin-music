<template>
  <div class="g-layout" @click="playSong">
    <div class="g-container" :style="{background: !music.bgUrl ? '#000' : `url(${music.bgUrl}) no-repeat center/cover`}">
    </div>
    <span class="header-back" @click.stop="scaleMusic">
      <i class="iconfont back-icon">&#xe61b;</i>
    </span>
    <div class="c-music_mask" :style="{width: maskWidth}" v-if="isDrag">
      <span class="c-music__time">{{currentTime}}</span>
    </div>
    <div class="c-lyric__container">
      <transition name="fade-slide-top">
        <div class="c-music__lyric" :key="lyric" @click.stop="showAllLyric = true" v-if="!showAllLyric">
          {{lyric}}
        </div>
        <div class="c-music__lyric c-music__lyric--all" v-else @click.stop="showAllLyric = false">
          <div class="c-lyric__content" v-html="allLyrics" ref="lyric" :style="{ transform: `translate3d(0, ${scrollLyric}px, 0)`}">
          </div>
        </div>
      </transition>
    </div>
    <div class="c-song__info">
      <div class="c-song__msg">
        <span class="c-song__name">{{music.songName}}</span>
        <div class="c-song__artist">
          <img class="c-song__artists" :src="music.bgUrl" alt="">
          {{music.artists}}
        </div>
      </div>
      <div class="c-song__option">
        <transition name="zoom-out">
          <i :class="{'c-song__icon--love': music.isLove}" class="iconfont icon-aixin1" :key="music.isLove" @click.stop="likeSong"></i>
        </transition>
      </div>
    </div>
    <div class="c-music__play" v-if="!isPlay">
      <i class="iconfont icon-bofang"></i>
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
    },
    music: {
      type: Object,
      default: () => ({}),
      required: false
    },
  },
  computed: {
    allLyrics() {
      return this.assembleLyric.map(lyric => {
        const content = lyric[1] || ''
        return `<div class="c-lyric__single ${this.lyric === content ? 'c-lyric__single--active' : ''}">${content}</div>`
      }).join('')
    }
  },
  data() {
    return {
      lyric: '',
      isDrag: false,
      currentTime: '00:00',
      maskWidth: 0,
      isPlay: true,
      src: '',
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      start: 0,
      end: 0,
      assembleLyric: [],
      lyricOrder: 0,
      lyricTime: 0,
      lyricCurrent: [],
      showAllLyric: false,
      scrollLyric: 0,
    }
  },
  activated() {
    const __self = this

    this.getSongUrl()
    this.$refs.musicPlay.addEventListener('ended', function () {
      this.play()
      __self.scaleMusic()
    }, false)
  },
  methods: {
    likeSong() {
      const like = !this.music.isLove
      this.$http.get(this.$api.likeSong, {
        params: {
          id: this.id,
          like
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.music.isLove = like
        }
      })
    },
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
        this.$refs.canvas.startWave()
      } else {
        music.pause()
        this.isPlay = false
        this.$refs.canvas.stopWave()
      }

      this.$emit('isPlay', this.isPlay)
    },
    getSongUrl() {
      this.lyricOrder = 0
      this.lyricTime = 0
      this.lyricCurrent = []
      this.showAllLyric = false
      this.scrollLyric = 0

      this.$http.get(this.$api.songUrl, {
        params: {
          id: this.id
        }
      }).then(res => {
        this.src = res.data.data[0].url
        this.$emit('isPlay', true)
        return this.$http.get(this.$api.songLyrics, {
          params: {
            id: this.id
          }
        })
      }).then(res => {
        const {
          lrc = {
            lyric: ''
          }
        } = res.data

        if (lrc.lyric) {
          const { lyric } = lrc
          this.assembleLyric = lyric.split('\n').map(ly => ly.replace('[', '').split(']').filter(Boolean))
          this.lyric = this.assembleLyric[this.lyricOrder++][1]
        } else this.lyric = ''

        const { canvas, musicPlay } = this.$refs || {}
        this.$nextTick().then(() => {
          musicPlay.play()
          if (lrc.lyric) {
            musicPlay.removeEventListener('timeupdate', this.updateLyric)
            musicPlay.addEventListener('timeupdate', this.updateLyric)
          }
          if (canvas) {
            canvas.changeWabeBg()
          }
        })
      })
    },
    updateLyric(e) {
      const {
        target: {
          currentTime
        }
      } = e

      if (this.lyricTime < currentTime) this.lyric = this.lyricCurrent[1]
    }
  },
  watch: {
    id(n, v) {
      if (v && n !== v) this.getSongUrl()
    },
    lyric(n) {
      this.lyricCurrent = this.assembleLyric[this.lyricOrder++]
      const [minute, second] = this.lyricCurrent[0].split(':')
      this.lyricTime = +minute * 60 + +second
      this.scrollLyric -= 34
    }
  },
}
</script>

<style scoped lang="less">
  .g-layout {
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 500;
    background: #000;
    .g-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    /deep/ .c-lyric__single {
      color: rgba(255, 255, 255, .5);
      margin-bottom: 20px;
      &.c-lyric__single--active {
       color: #fff;
      }
    }
    /deep/ .g-layout--lyric {
      filter: blur(-4px);
    }
  }
  .m-music__play {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 0;
  }
  .c-music__play {
    width: 100vw;
    height: 120vh;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 30px;
    margin: auto;
    color: #fff;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .5);
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
  .c-lyric__container {
    position: absolute;
    left: 50px;
    top: 200px;
    height: 60vh;
    width: 100%;
    overflow-y: auto;
    z-index: 10;
  }
  .c-music__lyric {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 36px;
    color: #fff;
    opacity: .9;
    z-index: 100;
    &.c-music__lyric--all {
      top: 300px;
    }
  }
  .c-lyric__content {
    overflow-y: auto;
    transition: transform .5s ease-in-out;
  }
  .c-song__info {
    width: 650px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 50px;
    bottom: 400px;
    z-index: 100;
    color: #fff;
    .c-song__msg {
      width: 70%;
    }
    .c-song__name {
      font-size: 42px;
    }
    .c-song__artist {
      display: flex;
      align-items: center;
      margin-top: 30px;
      font-size: 30px;
      .c-song__artists {
        margin-right: 40px;
        width: 60px;
        height: 60px;
        border-radius: 100%;
      }
    }
    .c-song__option {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .iconfont {
        position: absolute;
      }
    }
    .icon-aixin1 {
      top: 0;
      right: 0;
      font-size: 80px;
      margin-bottom: 20px;
    }
    .icon-more {
      top: 100px;
      right: 15px;
      font-size: 50px;
    }
    .c-song__icon--love {
      color: #f75f47;
    }
  }
</style>
