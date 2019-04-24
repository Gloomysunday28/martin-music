<template>
  <div class="g-layout">
    <div class="c-songlist__tag">
      <div class="c-songlist__tag__item">
        自建
      </div>
    </div>
    <div class="c-songlist__option">
      <span>{{songLists.length}}</span>
      <div class="c-song__option">
        <i class="iconfont" @click="$router.push({name: 'MusicAddSongList'})">&#xe61e;</i>
        <i class="iconfont">&#xe628;</i>
      </div>
    </div>
    <div class="c-songlist__list">
      <div class="c-list__item" v-for="song in songLists" :key="song.id">
        <img class="c-list__cover" :src="song.coverImgUrl" alt="">
        <div class="c-list__info">
          <p class="c-list__name">{{song.name}}</p>
          <p>{{song.trackCount}}首</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicSongList',
  data() {
    return {
      songLists: [], // 歌单
    }
  },
  mounted() {
    this.getUserSongList()
  },
  activated() {
    this.$common.trigger('getStatus', '歌单', 'title')
  },
  methods: {
    getUserSongList() {
      this.$http.get(this.$api.userSong, {
        params: {
          uid: this.personal.userId
        }
      }).then(res => {
        this.songLists = res.data.playlist
      })
    }
  }
}
</script>

<style scoped lang="less">
  .g-layout {
    padding: 0 30px;
    .c-songlist__option {
      margin: 30px 0;
      color: #666;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .c-song__option {
        display: flex;
        .iconfont {
          font-size: 42px;
          margin-right: 20px;
        }
      }
    }
    .c-list__item {
      margin-bottom: 40px;
      display: flex;
      .c-list__cover {
        height: 100px;
        width: 100px;
      }
      .c-list__info {
        margin-left: 20px;
        font-size: 24px;
        padding-top: 10px;
        .c-list__name {
          margin-bottom: 12px;
          color: #ccc;
          font-size: 26px;
        }
      }
    }
  }
</style>
