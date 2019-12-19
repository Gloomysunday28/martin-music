<template>
  <div class="g-layout">
    <div class="c-notice__hint" v-if="hint">
      <div class="c-notice__marquee">{{hint}}</div>
    </div>
    <div class="c-notice__contain">
      <div>
        <div :class="['c-notice__chat', 'm-flex', {'c-notice__me': getFromUser(msgs)}]" v-for="msgs in msgsHistory" :key="msgs.id">
          <div class="c-notice__time">{{$utils.filterTime(msgs.time)}}</div>
          <div class="c-notice__chat__contain m-flex">
            <router-link tag="div" :to="{name: 'MusicOthers', params: {uid: msgs.fromUser.userId}}">
              <img class="c-notice__avatar" :src="msgs.fromUser.avatarUrl" alt="">
            </router-link>
            <div class="c-notice__content">
              {{msgs.msg.msg}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <form action="" class="c-notice__send__container m-flex" @submit.prevent>
      <input ref="sendInput" class="c-notice__input" type="search" v-model="msg" placeholder="说点什么吧~~" @keyup.enter="sendMsg">
      <i class="c-notice__send iconfont icon-jiahao"></i>
    </form>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'

export default {
  name: 'MusicChat',
  data() {
    return {
      bs: null,
      hint: '',
      msg: '',
      msgsHistory: []
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
      this.msgsHistory = msgs.reverse().map(history => {
        return {
          ...history,
          msg: JSON.parse(history.msg)
        }
      })
      this.$common.trigger('getStatus', msgs[0].fromUser.nickname, 'title')

      this.$nextTick().then(() => {
        this.bs = new BetterScroll('.c-notice__contain')
        this.scrollBottom()
      })
    })
  },
  methods: {
    scrollBottom() {
      this.bs.refresh()

      setTimeout(() => {
        this.bs.scrollTo(0, this.bs.maxScrollY)
      }, 0)
    },
    getFromUser(msgs) {
      const { fromUser } = msgs
      return fromUser.userId === this.personal.userId
    },
    sendMsg() {
      this.$refs.sendInput.focus()
      if (!this.msg.trim()) return void this.$toast('请输入您想输入的内容~~！')
      this.$http.get(this.$api.sendNotice, {
        params: {
          user_ids: this.$route.params.id,
          msg: this.msg
        }
      }).then(() => {
        this.msgsHistory.push({
          time: +new Date(),
          fromUser: {
            userId: this.personal.userId,
            avatarUrl: this.personal.avatarUrl
          },
          msg: {
            msg: this.msg
          }
        })

        this.msg = ''
        this.scrollBottom()
      })
    }
  }
}
</script>

<style scoped lang="less">
.g-layout {
  flex-direction: column;
  .c-notice__contain {
    margin: 20px;
    background: #0d0d0d;
    flex: 1;
    overflow-y: auto;
    .c-notice__chat {
      margin-bottom: 70px;
      flex-direction: column;
      &.c-notice__me {
        align-items: flex-end;
        .c-notice__chat__contain {
          width: 100%;
          flex-direction: row-reverse;
        }
        .c-notice__content {
          margin-right: 20px;
        }
      }
      .c-notice__time {
        margin-bottom: 20px;
        color: #666;
        width: 100%;
        text-align: center;
      }
      .c-notice__chat__contain {
        width: 100%;
        justify-content: flex-start;
        align-items: flex-start;
      }
      .c-notice__avatar {
        width: 80px;
        height: 80px;
        border-radius: 100%;
      }
      .c-notice__content {
        max-width: 60%;
        padding: 20px 25px;
        margin-left: 20px;
        border-radius: 20px;
        background: #666;
        color: #f5f5f5b3;
        font-size: 30px;
      }
    }
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
      color: #fff;
    }
    .c-notice__send {
      color: #fff;
      font-size: 50px;
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
