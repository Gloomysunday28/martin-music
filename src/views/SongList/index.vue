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
      <component :is="songTypes[type].comp" :musicData="songLists"/>
    </div>
  </div>
</template>

<script>
import SongList from '@/pages/SongList'
import MusicList from '@/pages/MusicList'

export default {
  name: 'MusicSongList',
  components: {
    'page-song-list': SongList, // 歌单
    'page-music-list': MusicList, // 歌曲
  },
  data() {
    return {
      songTypes: {
        0: {
          label: ['自建'],
          comp: 'page-song-list',
          url: this.$api.userSong
        },
        1: {
          label: ['歌曲'],
          comp: 'page-music-list',
          url: this.$api.loveSongList
        },
      },
      songLists: [], // 歌单
      type: 0
    }
  },
  mounted() {
    this.type = this.$route.query.type
    this.getUserSongList()
  },
  activated() {
    this.$common.trigger('getStatus', '歌单', 'title')
  },
  methods: {
    getUserSongList() {
      this.$http.get(this.songTypes[this.type].url, {
        params: {
          uid: this.personal.userId
        }
      }).then(res => {
        this.songLists = res.data.playlist || res.data.songs
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
  }
</style>
