<template>
  <div class="g-layout">
    <div class="c-user__info" v-if="user.profile">
      <div class="c-user__header">
        <img class="c-user__avatar" :src="user.profile.avatarUrl"/>
        <div :class="['c-user__follow', {'c-user__follow--end': follow}]" @click="attentionUser(follow)">
          <i class="iconfont">&#xe663;</i>
        </div>
      </div>
      <div class="c-user__name">
        {{user.profile.nickname}}
        <div :class="['c-person__vip', {'c-person__vip--active': user.profile.vipType}]">
          VIP
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicOthers',
  data() {
    return {
      user: {},
      follow: false, // 是否关注
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.$http.get(this.$api.userInfo, {
        params: {
          uid: this.$route.params.uid
        }
      }).then(res => {
        this.user = res.data
        this.follow = this.user.profile.followed
      })
    },
    attentionUser(atten) { // 关注或者取关
      this.$http.get(this.$api.followUser, {
        params: {
          id: this.$route.params.uid,
          t: (1 - +atten)
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$toast((atten ? '取关' : '关注') + '成功')
          this.follow = !atten
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .g-layout {
    padding: 0 20px;
    .c-user__info {
      height: 500px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .c-user__avatar {
      width: 150px;
      height: 150px;
      border-radius: 150px;
    }
    .c-user__header {
      position: relative;
      .c-user__follow {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        border-radius: 60px;
        background: #999;
        position: absolute;
        right: -25px;
        bottom: -10px;
        &.c-user__follow--end {
          background: yellow;
          .iconfont {
            color: #232323;
          }
        }
        .iconfont {
          font-size: 42px;
        }
      }
    }
    .c-user__name {
      margin-top: 40px;
      color: #fff;
      font-size: 26px;
      display: flex;
      .c-person__vip {
        padding: 2px 10px;
        font-size: 24px;
        margin-left: 40px;
      }
    }
  }
</style>
