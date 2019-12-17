<template>
  <div class="c-page__song">
    <router-link
      class="c-list__item"
      v-for="song in musicData"
      :key="song.id"
      :to="{
        name: 'MusicPlayList',
        query: {
          title: song.name,
          id: song.id,
          coverUrl: song.coverImgUrl
        }
      }"
    >
      <img class="c-list__cover" :src="song.coverImgUrl" alt>
      <div class="c-list__info">
        <p class="c-list__name">{{song.name}}</p>
        <p>{{song.trackCount}}首</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'PageSongList',
  props: {
    musicData: {
      type: Array,
      default: () => [],
      required: false
    }
  }
}
</script>

<style scoped lang="less">
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
</style>
