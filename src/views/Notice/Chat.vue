<template>
  <div class="g-layout">
    <div class="c-notice__hint">
      <div class="c-notice__marquee">{{hint}}</div>
    </div>
    <div class="c-notice__contain">
    </div>
    <div class="c-notice__send__container m-flex">
      <input class="c-notice__input" type="text" placeholder="说点什么吧~~">
      <button class="c-notice__send">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicChat',
  data() {
    return {
      hint: ''
    }
  },
  mounted() {
    this.$http.get(this.$api.noticeHistory, {
      params: {
        uid: this.$route.params.id
      }
    }).then(({ data }) => {
      const {
        msgs,
        hint
      } = data
      this.hint = hint
      this.$common.trigger('getStatus', msgs[0].fromUser.nickname, 'title')
    })
  }
}
</script>

<style scoped lang="less">
.g-layout {
  flex-direction: column;
  .c-notice__contain {
    background: #0d0d0d;
    flex: 1;
  }
  .c-notice__hint {
    flex: none;
    box-sizing: border-box;
    width: 96%;
    padding: 20px;
    white-space: nowrap;
    color: rgba(255, 255, 0, 1);
    overflow: hidden;
    .c-notice__marquee {
      transform: translate3d(100%, 0, 0);
      animation: marquee 20s infinite linear;
    }
  }
  .c-notice__send__container {
    height: 100px;
    justify-content: flex-start;
    border-top: 1px solid #444;
    .c-notice__input {
      flex: 1;
      font-size: 36px;
      padding-left: 30px;
    }
    .c-notice__send {
      color: #fff;
      font-size: 36px;
      padding: 0 20px;
    }
  }
}

@keyframes marquee {
  from {
    transform: translate3d(100%, 0, 0);
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
