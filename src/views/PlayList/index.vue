<template>
  <div class="g-layout" ref="contain">
    <div class="c-recommend__header" ref="header">
      <span class="c-play__cover">{{$route.query.title || '每日推荐'}}</span>
    </div>
    <div class="c-person__info--slide" ref="person">
      <div class="c-person__info">
        <img class="c-person__avata" :src="personal.avatarUrl" alt="">
        <span>{{personal.nickname}}</span>
      </div>
      <div class="c-recommend__list__total">
        <div class="c-recommend__play">
          <i class="iconfont">&#xeb6d;</i>
        </div>
        {{recommends.length}}
      </div>
    </div>
    <div class="c-recommend__cover" ref="cover">
    </div>
    <div class="c-mask" ref="mask"></div>
    <div class="c-recommend__songs" ref="songs">
      <div>
        <div class="c-recommend__tags" v-if="isRecoomend">
          <span class="c-recommend__tag"># 每日推荐 #</span>
          <span class="c-recommend__tag"># Vivo x27 #</span>
          <span class="c-recommend__tag"># 照亮你的美 #</span>
        </div>
        <div>
          <div class="c-person__info">
            <img class="c-person__avata" :src="personal.avatarUrl" alt="">
            <span>{{personal.nickname}}</span>
          </div>
          <div class="c-recommend__list__total">
            <div class="c-recommend__play">
              <i class="iconfont">&#xeb6d;</i>
            </div>
            {{recommends.length}}
          </div>
        </div>
        <div class="c-recommend__lists">
          <music-list :music-data="recommends"/>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import MusicList from '@/pages/MusicList'
import BetterScroll from 'better-scroll'

export default {
  name: 'MusicPlayList',
  components: {
    MusicList
  },
  data() {
    return {
      bs: null,
      cover: '', // 封面
      isRecoomend: false,
      recommends: [],
      height: 0,
      headerHeight: 9,
      clientHeight: 0
    }
  },
  mounted() {
    this.height = this.$refs.cover.offsetHeight
    this.clientHeight = document.documentElement.clientHeight * 2 / 5
    this.$refs.mask.style.top = this.clientHeight + 'px'
    this.$refs.songs.style.top = this.clientHeight + 'px'
    this.headerHeight = this.$refs.header.offsetHeight
    this.bs = new BetterScroll('.c-recommend__songs', {
      probeType: 3
    })
  },
  activated() {
    this.bs.on('scroll', this.scrollAnimate)
    this.isRecoomend = !this.$route.query.title
    this.$common.trigger('getStatus', this.$route.query.title || '每日推荐', 'title')
    const oImage = new Image()
    oImage.className = 'c-image__cover'
    oImage.src = this.$route.query.coverUrl
    oImage.onload = () => {
      oImage.decode().then(_ => {
        this.$refs.cover.innerHTML = ''
        this.$refs.cover.appendChild(oImage)
      })
    }
    // this.cover = this.$route.query.coverUrl
    this.getRecommend()
  },
  deactivated() {
    this.bs.off('scroll')
  },
  methods: {
    scrollAnimate(pos) {
      const { y } = pos
      let precent = y / this.clientHeight

      if (y > 0) { // 向下滑
        this.$refs.cover.style.transform = `scale(${1 + precent})`
        this.$refs.mask.style.top = this.clientHeight + y + 'px'
        this.$refs.person.style.display = `none`
      } else if (y > -this.clientHeight + this.headerHeight) {
        precent = y / (this.clientHeight - this.headerHeight)
        this.$refs.cover.style.opacity = `${1 + precent}`
        this.$refs.header.style.background = `rgba(0, 0, 0, ${-precent})`
        this.$refs.mask.style.top = this.clientHeight + y + 'px'
        this.$refs.person.style.display = `none`
      } else {
        this.$refs.mask.style.top = this.clientHeight - this.headerHeight + 'px'
        this.$refs.cover.style.opacity = `0`
        this.$refs.header.style.background = `rgba(0, 0, 0, 1)`
        this.$refs.person.style.display = 'block'
      }
    },
    getRecommend() {
      this.$http.get(this.$api[this.isRecoomend ? 'recommendByPerDay' : 'playListDetail'], {
        ...!this.isRecoomend && {
          params: {
            id: this.$route.query.id
          }
        }
      }).then(res => {
        this.recommends = res.data.recommend || res.data.playlist.tracks
        if (!this.isRecoomend) {
          this.cover = res.data.playlist.coverImgUrl
        }
      })
    }
  },
  watch: {
    $route(n, v) {
      if (window.sessionStorage.scrollTop) {
        this.$nextTick().then(_ => {
          this.$refs.contain.scrollTop = n.meta.oDeep > v.meta.oDeep ? 0 : window.sessionStorage.scrollTop
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .g-layout {
    background: #000;
  }
  .c-play__cover {
    position: absolute;
    width: 100%;
    left: 50%;
    top: 55px;
    transform: translateX(-50%);
    font-size: 36px;
    text-align: center;
    color: #fff;
  }
  .c-recommend__cover {
    padding-top: 100%;
    overflow: hidden;
    background-size: 100% 100%;
    position: relative;
    /deep/ .c-image__cover {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
  .c-recommend__songs {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 0;
    border-radius: 30px 30px 0 0;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    .c-recommend__tags {
      margin-top: 30px;
      display: flex;
      .c-recommend__tag {
        padding: 5px 20px;
        margin-right: 15px;
        border-radius: 25px;
        background: yellow;
        color: #000;
        font-weight: bold;
        font-size: 22px;
      }
    }
    .c-recommend__lists {
      margin-top: 50px;
    }
  }
  .c-mask {
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 0;
    background: #000;
    border-radius: 30px 30px 0 0;
  }
  .c-recommend__header {
    position: absolute;
    width: 100%;
    height: 120px;
    z-index: 12;
    background: transparent;
  }
  .c-person__info {
    display: flex;
    align-items: center;
    width: 100%;
    color: #ccc;
    margin-top: 50px;
    font-size: 24px;
    left: 0;
    .c-person__avata {
      margin-right: 30px;
      width: 60px;
      height: 60px;
      border-radius: 60px;
    }
  }
  .c-person__info--slide {
    margin-top: 0;
    position: absolute;
    top: 120px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px 20px;
    background: #000;
    z-index: 100;
    display: none;
  }
  .c-recommend__list__total {
    margin-top: 30px;
    display: flex;
    align-items: center;
    color: #ccc;
    font-weight: bold;
    font-size: 22px;
  }
  .c-recommend__play {
    margin-right: 30px;
    width: 100px;
    text-align: center;
    line-height: 46px;
    height: 40px;
    border-radius: 50px;
    background: yellow;
    .iconfont {
      font-size: 32px;
      color: #000;
      transform: rotate(-.25turn);
    }
  }
</style>
