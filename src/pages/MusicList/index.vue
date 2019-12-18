<template>
  <div class="c-music__list">
    <div class="c-music__item" v-for="music in musicData" :key="music.id" @click="openMusic(music)">
      <div class="c-music__msg">
        <div class="c-music__img" v-lazy-decode="getCover(music)"></div>
        <div class="c-music__info">
          <p>{{getName(music)}}</p>
          <p class="c-music__creator">{{getCreator(music)}}</p>
        </div>
      </div>
      <div class="c-music__option">
        <i class="iconfont">&#xe637;</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicList',
  props: {
    musicData: {
      type: Array,
      default: () => [],
      required: false,
    }
  },
  methods: {
    openMusic(music) {
      this.$common.trigger('listenMusic', music.id, true, this.getCover(music))
    },
    getCover(music) {
      const cover = music.album ? music.album.picUrl : music.al.picUrl
    
      return cover
    },
    getName(music) {
      const name = music.name

      return name
    },
    getCreator(music) {
      const data = music.album ? music.album.artists : music.ar

      const name = data.map(val => val.name)
      return name.join('&')
    }
  }
}
</script>

<style scoped lang="less">
  .c-music__list {
    .c-music__item {
      display: flex;
      justify-content: space-between;
      height: 100px;
      margin: 50px 0;
      .c-music__msg {
        display: flex;
      }
      .c-music__img {
        width: 100px;
        flex: none;
      }
      .c-music__info {
        margin-left: 30px;
        color: #ccc;
      }
      .c-music__creator {
        margin-top: 20px;
        font-size: 24px;
        color: #666;
      }
      .c-music__option {
        display: flex;
        align-items: center;
        color: #ccc;
        .iconfont {
          font-size: 36px;
        }
      }
    }
  }
</style>
