<template>
  <div class="g-layout">
    <div class="c-person__card">
      <div class="c-person__msg">
        <img class="c-person__header" :src="personal.avatarUrl" alt="">
        <div class="c-person__info">
          <p class="c-person_nickname">{{personal.nickname}}</p>
          <p>{{personal.signature}}</p>
        </div>
      </div>
      <div class="c-person__follow">
        <div class="c-person__follow c-person__follows">
          <p>
            <span class="c-follow__label">关注 </span>
            <span class="c-follow__data">{{personal.follows}}</span>
          </p>
          <p>
            <span class="c-follow__label">粉丝 </span>
            <span class="c-follow__data">{{personal.followeds}}</span>
          </p>
        </div>
        <div :class="['c-person__vip', {'c-person__vip--active': personal.vipType}]">
          VIP
        </div>
      </div>
    </div>
    <div class="c-person__songs">
      <div class="c-person__list">
        <div>
        </div>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MusicPerson',
  data() {
    return {
    }
  },
  computed: mapState({
    personal: state => state.baseInfo.personal
  }),
  methods: {
  }
}
</script>

<style scoped lang="less">
  .g-layout {
    box-sizing: border-box;
    padding: 0 20px;
    .c-person__card {
      padding: 20px 30px;
      box-sizing: border-box;
      height: 250px;
      border-radius: 8px;
      background: #000;
      .c-person__msg {
        display: flex;
        height: 70%;
        align-items: center;
        .c-person__info {
          margin-left: 50px;
          font-weight: bold;
        }
        .c-person_nickname {
          color: #ddd;
          margin-bottom: 10px;
        }
      }
      .c-person__header {
        flex: none;
        width: 80px;
        height: 80px;
      }
    }
    .c-person__follow {
      margin-top: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .c-person__follows {
        justify-content: flex-start;
      }
      .c-person__vip {
        padding: 5px 20px;
        border-radius: 30px;
        background: #666;
        font-size: 26px;
        color: rgba(0, 0, 0, .9);
        font-weight: bold;
        &.c-person__vip--active {
          background: yellow;
          color: #000;
        }
      }
      .c-follow__label {
        font-size: 24px;
      }
      .c-follow__data {
        font-weight: bold;
        color: #666;
        margin-left: 10px;
        margin-right: 30px;
      }
    }
  }
</style>
