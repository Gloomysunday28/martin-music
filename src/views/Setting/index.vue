<template>
  <div class="g-layout">
    <div class="c-add__song">
      <button class="c-add__btn" @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicSetting',
  data() {
    return {
      playList: []
    }
  },
  activated() {
    this.$common.trigger('getStatus', '设置', 'title')
  },
  detivated() {
    this.$common.removeListener('getStatus')
  },
  methods: {
    logout() {
      this.$http.get(this.$api.loginOut).then(res => {
        window.localStorage.removeItem('personal')
        this.$router.push({
          name: 'MusicLogin'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.c-add__song {
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  position: absolute;
  bottom: 40px;
  .c-add__btn {
    width: 100%;
    height: 80px;
    background: yellow;
    color: #333;
    text-align: center;
    line-height: 80px;
    border-radius: 50px;
    font-size: 32px;
  }
}
</style>
