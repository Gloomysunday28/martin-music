<template>
  <div class="c-music__list">
    <router-link class="c-music__item" :to="{name: 'MusicPlaySong', params: {id: music.id}}" v-for="music in musicData" :key="music.id">
      <div class="c-music__msg">
        <img class="c-music__img" :src="music.album.picUrl" alt>
        <div class="c-music__info">
          <p>{{music.album.name}}</p>
          <p class="c-music__creator">{{music.album.artists[0].name}}</p>
        </div>
      </div>
      <div class="c-music__option">
        <i class="iconfont">&#xe637;</i>
      </div>
    </router-link>
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
  }
}
</script>

<style scoped lang="less">
  .c-music__list {
    .c-music__item {
      display: flex;
      justify-content: space-between;
      height: 100px;
      margin: 30px 0;
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
