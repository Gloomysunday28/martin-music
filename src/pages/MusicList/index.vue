<template>
  <div class="c-music__list">
    <div class="c-music__item" v-for="music in musicData" :key="music.id">
      <div class="c-music__msg" @click="openMusic(music)">
        <div class="c-music__img" v-lazy-decode="getCover(music)"></div>
        <div class="c-music__info">
          <p>{{getName(music)}}</p>
          <p class="c-music__creator">{{getCreator(music)}}</p>
        </div>
      </div>
      <div class="c-music__option" @click="jumpToDetail(music)">
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
    },
    record: {
      type: String,
      default: '',
      required: false,
    }
  },
  methods: {
    jumpToDetail(music) {
      if (this.record) {
        let songInfo = window.sessionStorage.songInfo || 0
        window.sessionStorage.setItem('songInfo', ++songInfo)
      }

      this.$router.push({
        name: 'MusicSongInfo',
        params: { id: music.id },
        query: {
          step: this.record ? ++this.$route.query.step : 0,
          pid: this.$route.query.id
        }
      })
    },
    openMusic(music) {
      this.$common.trigger('listenMusic', music.id, true, {
        songName: this.getName(music),
        bgUrl: this.getCover(music),
        artists: this.getCreator(music),
        isLove: this.loveSongList.some(song => song === music.id) // 因为列表第一个菜单就是喜欢列表
      })
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
        margin-right: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: flex;
        flex: 1;
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
        color: #ccc;
      }
      .c-music__option {
        display: flex;
        align-items: center;
        color: #ccc;
        flex: none;
        .iconfont {
          font-size: 36px;
        }
      }
    }
  }
</style>
