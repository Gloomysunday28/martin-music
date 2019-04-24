<template>
  <div class="g-layout">
    <div class="c-songlist__tag">
      <div class="c-songlist__tag__item">
        自建
      </div>
    </div>
    <div class="c-songlist__">

    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicSongList',
  activated() {
    this.$common.trigger('getStatus', '歌单', 'title')
  }
}
</script>

<style scoped lang="less">
  .g-layout {
    padding: 0 30px;
    .c-songlist__tag {
      margin-top: 30px;
      display: flex;
      .c-songlist__tag__item {
        font-size: 24px;
        padding-bottom: 10px;
        color: #ccc;
        border-bottom: 3px solid #ccc;
        border-radius: 2px;
      }
    }
  }
</style>
