<template>
  <div class="g-layout">
    <div class="c-home__header">
      <div class="c-music__title">
        DISCOVER
      </div>
      <img class="c-person__header" :src="header" alt="">
    </div>
    <div class="c-home__contain">
      <div class="c-home__search">
        <i class="iconfont">&#xe621;</i>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'MusicHome',
  data() {
    return {
    }
  },
  computed: mapState({
    header: state => state.baseInfo.personal.avatarUrl
  })
}
</script>

<style scoped lang="less">
  .g-layout {
    display: flex;
    flex-direction: column;
  }
  .c-home__header {
    flex: none;
    padding: 10px 20px 0;
    height: 88px;
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
    background: red;
  }
  .c-home__contain {
    margin-top: 10px;
    padding: 0 20px;
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .c-home__search {
      height: 50px;
      background: rgba(0, 0, 0, 1);
      border-radius: 30px;
      display: flex;
      align-items: center;
      padding-left: 10px;
      .iconfont {
        font-size: 46px;
        color: yellow;
      }
    }
  }
</style>
