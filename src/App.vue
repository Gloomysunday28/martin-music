<template>
  <div id="app" ref="contain">
    <transition name="opacity">
      <span :class="['header-back', {'header-back--board': YGBOARD}]" @click="back" v-if="!isIndex">
        <i class="iconfont back-icon">&#xe61b;</i>
      </span>
    </transition>
    <base-header :class="{'page-header--import': showImportHeader, 'page-header__none': !showHeader}" :header-config="headerConfig" :bg-color="bgColor"/>
    <div class="g-container">
      <transition :name="fade">
        <keep-alive :exclude="keepAlive">
          <router-view ref="wrong" :class="['page-view', {'page-header--none': !showHeader, 'page-header--import': showImportHeader}]" @changeHeaderBack="YGBOARD = false"/>
        </keep-alive>
      </transition>
      <transition name="clip">
        <keep-alive>
          <play-song ref="music" :id="songId" @isPlay="v => isPlay = v" v-if="listenGlobal" v-show="listenGlobalDisplay"></play-song>
        </keep-alive>
      </transition>
      <div class="m-music__cd" @click="listenMusic('', true)">
        <div :class="['m-cd', {'m-cd__rotate': isPlay}]">
          <div class="m-cd__center"></div>
          <div class="m-rotate__mark"></div>
        </div>
        <div class="m-cd__info">
          {{currentTime}}
          <i class="iconfont m-cd__play" @click.stop="playPause" v-if="!isPlay">&#xeb6d;</i>
          <div class="m-cd__pause" @click.stop="playPause" v-else>
            <div class="m-pause"></div>
            <div class="m-pause"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Base/Header'
import PlaySong from '@/views/PlaySong'

export default {
  name: 'App',
  components: {
    'base-header': Header,
    PlaySong
  },
  data() {
    return {
      timer: null,
      isPlay: false, // 是否在播放
      duration: 0, // 该音乐的总长度
      currentTime: '00 : 00',
      listenGlobal: false, // 是否听音乐
      listenGlobalDisplay: false,
      YGBOARD: false,
      fade: 'fade-in',
      songId: '', // 音乐id
      headerConfig: {
        title: '',
        slide: 'slide-in',
        tabs: [],
        extra: false,
        search: false,
        searchBox: false,
        changeHeader: false
      },
      keepAlive: '',
      bgColor: '#fff',
      showHeader: true,
      showImportHeader: false,
      isIndex: true,
      hasNoBack: false,
      backPage: '',
      defaultMap: new Map([
        [/^(showImportHeader|isIndex)$/, false],
        [/^(keepAlive|backPage)$/, ''],
        [/hasNoBack/, false],
        [/bgColor/, '#fff'],
      ]),
    }
  },
  mounted() {
    this.$common.listen('setHeaderBack', this.changeHeaderBack)
    this.$common.listen('listenMusic', this.listenMusic)
    this.$common.listen('listenMusicProgress', this.listenMusicProgress)
  },
  methods: {
    playPause() { // 播放或暂停
      this.$refs.music.playSong()
    },
    listenMusic(id, bool = false) { // 是否听音乐
      this.listenGlobal = true
      this.listenGlobalDisplay = bool
      if (id) {
        this.songId = id
      }
    },
    doubleTime(tm) {
      if (tm >= 60) tm = 0
      return tm >= 10 ? tm : '0' + tm
    },
    listenMusicProgress(currentTime, duration) { // 监听音乐进度
      if (this.timer) clearInterval(this.timer)
      this.currentTime = this.doubleTime(~~(currentTime / 60)) + ':' + this.doubleTime(~~(currentTime % 60))
      this.duration = duration

      this.changeTime()
    },
    changeTime() {
      this.timer = setInterval(() => {
        const time = this.currentTime.split(':')
        if (this.duration - (+time[0] * 60 + +time[1]) <= 0) return void clearInterval(this.timer)
        if (+this.doubleTime((+time[1] + 1)) === 0) {
          this.currentTime = this.doubleTime(+time[0] + 1) + ':00'
        } else {
          this.currentTime = time[0] + ':' + this.doubleTime((+time[1] + 1))
        }
      }, 1000)
    },
    changeHeaderBack() {
      this.YGBOARD = true
    },
    getDataIsTrue(n, data, defaults) {
      if (data === 'keepAlive') {
        if (!n.meta.keepAlive) {
          this.keepAlive = n.name
        } else this.keepAlive = ''
      } else {
        if (n.meta[data]) {
          this[data] = n.meta[data]
        } else this[data] = defaults
      }
    },
    judgeRoute(n, v) {
      if (n.meta.isLogin || v.meta.isLogin) {
        this.fade = n.meta.isLogin ? 'login-in' : 'login-out'
      } else {
        if (!v.name && n.meta.isIndex) {
          this.fade = 'slide-up'
        } else {
          if (v.name) {
            this.headerConfig.slide = n.meta.oDeep > v.meta.oDeep ? 'slide-in' : 'slide-out'
            this.fade = n.meta.oDeep > v.meta.oDeep ? 'fade-in' : 'fade-out'
          }
        }
      }
      this.showHeader = n.meta.showHeader
      if (this.showHeader) {
        this.headerConfig.changeHeader = !this.headerConfig.changeHeader // 头部切换动画
        this.headerConfig.title = n.meta.title // 文字
        this.headerConfig.search = n.meta.search // 搜索
        this.headerConfig.searchBox = n.meta.searchBox // 首页
        this.headerConfig.extra = n.meta.extra || false // 头部是否有额外的icon
        this.headerConfig.tabs = n.meta.tabs || []
        this.headerConfig.isHome = n.meta.isHome || false
      }
      const assignData = this.assignData(n) // 函数柯里化, 设置一个默认值在里面
      assignData(['keepAlive', 'hasNoBack', 'bgColor', 'showImportHeader', 'isIndex', 'backPage'], this.actionData) // 给各种配置赋值
    },
    filterDefault(keyMap) {
      const defualtMaps = [...this.defaultMap.entries()].filter(([key, value]) => key.test(keyMap)) // 判断符合条件的map值
      return defualtMaps
    },
    assignData(n) {
      return (data, actionData) => {
        if (!Array.isArray(data)) return
        data.forEach(val => {
          actionData(n, val, this.filterDefault) // 循环头部的值并且判断
        })
        return true
      }
    },
    actionData(n, val, filterDefault) {
      const [[, defaults]] = filterDefault(val) // 筛选出默认值
      this.getDataIsTrue(n, val, defaults) // 最后判断头部配置的值
      return true
    },
    back() {
      if (this.YGBOARD) {
        this.$refs.wrong.closeBoard()
        this.YGBOARD = false
      } else {
        if (this.isIndex || window.sessionStorage.parent) { // iframe嵌套，直接返回Mobile首页
          window.sessionStorage.removeItem('parent')
          window.YunGuiBridge.sendMessage2Native('goBack', 'back')
        } else {
          if (this.backPage) this.$router.push({name: this.backPage})
          else {
            this.$router.back()
          }
        }
      }
    }
  },
  watch: {
    $route(n, v) {
      this.judgeRoute(n, v)
    },
    isPlay(n) {
      if (n) {
        this.changeTime()
      } else {
        clearInterval(this.timer)
      }
    }
  }
}
</script>

<style scoped lang="less">
#app {
  font-family: -apple-system,BlinkMacSystemFont,PingFang SC,Helvetica Neue,STHeiti,Microsoft Yahei,Tahoma,Simsun,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #444;
  width: 100%;
  height: 100%;
  font-size: 28px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #0D0D0D;
  // touch-action: none;
  background: rgba(0, 0, 0, .9);
}
.page-header--import {
  z-index: 100 !important;
}
.g-container {
  position: relative;
  overflow: hidden;
  flex: 1;
}
.page-view {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  &.page-header--show {
    z-index: 200;
  }
}
.header--show {
  z-index: 200;
}
</style>

<style scoped>
  #app >>> .icon-love {
    position: absolute;
    font-size: 32px;
    z-index: 10;
    animation: slideOpacity .8s ease-in-out forwards;
  }

  @keyframes slideOpacity {
    from {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    to {
      transform: translate3d(0, -50px, 0);
      opacity: 0;
    }
  }
  .m-music__cd {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 20px;
    bottom: 50px;
    z-index: 400;
  }
  .m-cd {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 120px;
    background: #000;
    z-index: 10;
  }
  .m-cd__rotate {
    animation: infinateRotate 2s linear infinite;
  }

  .m-rotate__mark {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    background: rgba(255, 255, 255, .1);
    height: 100%;
  }

  .m-cd__center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background: yellow;
  }

  @keyframes infinateRotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(1turn);
    }
  }

  .m-cd__info {
    font-family: '微软雅黑';
    font-size: 40px;
    color: #fff;
    text-align: center;
    line-height: 100px;
    position: absolute;
    left: 40px;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    height: 100px;
    border-radius: 50px;
    background: rgba(0,0,0, 1);
  }

  .m-cd__play {
    position: absolute;
    right: 30px;
    font-size: 40px;
    transform: rotate(-.25turn);
  }

  .m-cd__pause {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .m-cd__pause .m-pause {
    width: 10px;
    height: 100%;
    margin: 0 5px;
    background: #fff;
  }
  .page-header__none {
    height: 0 !important;
    padding: 0 !important;
  }
</style>
