<template>
  <div class="g-layout">
    <p class="c-follow__number">{{userList.length}}</p>
    <router-link class="c-follow" :to="{name: 'MusicOthers', params: {uid: usr.userId}}" v-for="usr in userList" :key="usr.userId">
      <div class="c-follow__info">
        <img class="c-header__img" :src="usr.avatarUrl" alt="">
        <p class="c-follow__name">{{usr.nickname}}</p>
      </div>
      <p class="c-follow--end">已关注</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MusicFollows',
  data() {
    return {
      userList: []
    }
  },
  mounted() {
    this.$common.trigger('getStatus', this.$route.query.title, 'title')
    this.getUserList()
  },
  methods: {
    getUserList() {
      this.$http.get(this.$api[this.$route.query.title === '关注' ? 'userFollows' : 'userFolloweds'], {
        params: {
          uid: this.$store.state.baseInfo.personal.userId
        }
      }).then(res => {
        this.userList = res.data.follow || res.data.followeds
      })
    }
  }
}
</script>

<style scoped lang="less">
  .g-layout {
    padding: 0 20px;
    box-sizing: border-box;
  }
  .c-follow__number {
    margin: 20px 0 50px;
    font-size: 36px;
    font-weight: bold;
    color: #999;
  }
  .c-follow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
  }
  .c-follow__info {
    display: flex;
    .c-header__img {
      width: 100px;
      height: 100px;
      border-radius: 100px;
    }
    .c-follow__name {
      margin-left: 40px;
      font-size: 32px;
      display: flex;
      align-items: center;
      color: #ddd;
    }
  }
  .c-follow--end {
    color: #666;
    font-size: 34px;
  }
</style>
