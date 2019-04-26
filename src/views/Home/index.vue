<template>
  <div class="g-layout">
    <div class="c-home__contain" ref="contain">
      <router-link :to="{name: 'MusicSearch'}" class="c-home__search">
        <i class="iconfont">&#xe621;</i>
      </router-link>
      <div class="swiper-container">
        <swiper class="swiper-wrapper" :options="swiperOption">
          <swiper-slide class="swiper-slide" v-for="ban in banner" :key="ban.imageUrl">
            <img class="swpier-img" :src="ban.imageUrl"/>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper >
      </div>
      <!-- 推荐菜单 -->
      <div class="c-music__menu" v-if="banner.length">
        <router-link class="c-music__item" :to="{name: 'MusicPlayList', query: {coverUrl: banner[0].imageUrl}}">
          <div class="c-menu__img__contain">
            <img class="c-menu__img" v-lazy="banner[0].imageUrl" alt="">
          </div>
          <div class="c-menu__img__contain">
            <p class="c-menu__text">20+每日推荐</p>
            <p class="c-menu__mark">MARTIN MUSIC</p>
            <p class="c-menu__remark">
              听到外面狂风呼啸我就安心了, 又有理由宅看了,来自床上度日的飞翔的猪
            </p>
          </div>
        </router-link>
        <div class="c-music__item">
          <router-link class="c-menu__img__contain" :to="{name: 'MusicSongType'}">
            <img class="c-menu__img" v-lazy="banner[1].imageUrl" alt="">
          </router-link>
          <div class="c-menu__img__contain">
            <img class="c-menu__img" v-lazy="banner[2].imageUrl" alt="">
          </div>
        </div>
      </div>
      <!-- 推荐歌单 -->
      <div class="c-music__recommend">
        <b class="c-recommend__label">推荐歌单</b>
        <div class="c-recommend">
          <router-link class="c-music__item" v-for="rem in recommends" :key="rem.id" :to="{name: 'MusicPlayList', query: {coverUrl: rem.picUrl, title: rem.name, id: rem.id}}">
            <div class="c-menu__img__contain c-menu__recommend__recommend">
              <img class="c-menu__img" v-lazy="rem.picUrl" alt="">
            </div>
            <div class="c-menu__img__contain">
              <p class="c-menu__name">{{rem.name}}</p>
              <p class="c-menu__remark">
                播放次数: {{rem.playCount}}
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'MusicHome',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      banner: [],
      swiperOption: {
        autoplay: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
      },
      recommends: []
    }
  },
  computed: mapState({
    personal: state => state.baseInfo.personal
  }),
  mounted() {
    this.getAllData()
  },
  activated() {
    if (window.sessionStorage.scrollTop) {
      this.$nextTick().then(_ => {
        this.$refs.contain.scrollTop = window.sessionStorage.scrollTop
      })
    }
  },
  deactivated() {
    const scrollTop = this.$refs.contain.scrollTop
    window.sessionStorage.setItem('scrollTop', scrollTop)
  },
  methods: {
    getAllData() {
      Promise.all([
        this.getRecommend(),
        this.getBanner()
      ]).then(({0: recommend, 1: banner}) => {
        this.banner = banner.data.banners
        this.recommends = recommend.data.result
      })
    },
    getRecommend() {
      return this.$http.get(this.$api.recommendSong)
    },
    getBanner() {
      return this.$http.get(this.$api.getBanner)
    }
  }
}
</script>

<style scoped lang="less">
  .swiper-container {
    margin-top: 20px;
  }
  .g-layout {
    display: flex;
    flex-direction: column;
  }
  .c-home__header {
    flex: none;
    padding: 10px 20px 0;
    height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .c-music__title {
    color: #fff;
    font-weight: 600;
    font-size: 42px;
  }
  .c-person__header {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
  .swpier-img {
    width: 100%;
  }
  .c-home__contain {
    margin-top: 10px;
    padding: 0 20px;
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .c-music__menu {
    margin-top: 50px;
  }
  .c-music__item {
    margin-bottom: 40px;
    display: flex;
    .c-menu__img__contain {
      position: relative;
      flex: 1;
      height: 220px;
      margin: 0 10px;
      &.c-menu__recommend__recommend {
        height: 250px;
      }
      .c-menu__name {
        color: #fff;
        font-size: 32px;
        margin-bottom: 10px;
      }
      .c-menu__title {
        position: absolute;
        font-size: 38px;
        font-weight: bold;
        color: #ff4a69;
        left: 20px;
        top: 20px;
      }
      .c-menu__text {
        color: #fff;
        font-size: 50px;
      }
      .c-menu__mark {
        background: rgb(252, 23, 23);
        font-size: 38px;
        font-style: italic;
        font-weight: 600;
        color: #000;
      }
      .c-menu__remark {
        color: #444;
      }
    }
    .c-menu__img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  .c-recommend {
    margin-top: 40px;
  }
  .c-music__recommend {
    .c-recommend__label {
      color: #444;
      font-size: 40px;
    }
  }
</style>
