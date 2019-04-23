<template>
  <div class="g-layout">
    <div class="c-user__info" v-if="user.profile">
      <div class="c-user__header">
        <img class="c-user__avatar" :src="user.profile.avatarUrl"/>
        <div class="c-user__follow">

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
      user: {}
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
      width: 300px;
      height: 300px;
      border-radius: 300px;
    }
    .c-user__header {
      position: relative;
      .c-user__follow {
        width: 80px;
        height: 80px;
        border-radius: 80px;
        background: #999;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
    .c-user__name {
      margin-top: 40px;
      color: #fff;
      font-size: 36px;
      display: flex;
      .c-person__vip {
        margin-left: 40px;
      }
    }
  }
</style>
