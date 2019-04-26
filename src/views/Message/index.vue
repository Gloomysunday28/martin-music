<template>
  <div class="g-layout">
    <div class="c-music__event" v-for="msg in message" :key="msg.id">
      <div class="c-music__avatUrl">
        <img class="c-person__header" v-lazy="msg.user.avatarUrl" />
      </div>
      <div class="c-event__info">
        <p class="c-event__user">{{msg.user.nickname}} {{msg.info.commentThread.resourceTitle}}</p>
        <p class="c-event__user c-event__act" v-if="msg.actName"># {{msg.actName}} #</p>
        <div class="c-event__event">
          <img class="c-event__img" v-lazy="msg.type === 18 ? getDiffEvent(msg).album.picUrl : getDiffEvent(msg).coverImgUrl"/>
          <div class="c-event__music">
            <p v-html="getEvent(msg)"></p>
            <p class="c-music__creator">{{getCreator(msg)}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicMessage',
  data() {
    return {
      message: []
    }
  },
  mounted() {
    this.$common.trigger('getStatus', '动态', 'title')
    this.getMessage()
  },
  methods: {
    getMessage() {
      this.$http.get(this.$api.userEvent, {
        params: {
          uid: this.$store.state.baseInfo.personal.userId
        }
      }).then(res => {
        this.message = res.data.events
      })
    },
    getDiffEvent(event) {
      return event.type === 18 ? JSON.parse(event.json).song : JSON.parse(event.json).playlist
    },
    getEvent(msg) {
      const diffEvent = this.getDiffEvent(msg)
      switch (msg.type) {
        case 18:
          return `<span class="c-music__name">
            ${diffEvent.album.name}
            ${diffEvent.alias.length ? '(' + diffEvent.alias[0] + ')' : ''}
          </span>`
        case 13:
          return `<span class="c-music__name">
            ${diffEvent.name}
          </span>`
        default:
          break
      }
    },
    getCreator(msg) {
      const diffEvent = this.getDiffEvent(msg)
      switch (msg.type) {
        case 18:
          return diffEvent.album.artists[0].name
        case 13:
          return 'by ' + diffEvent.creator.nickname
        default:
          break
      }
      return ''
    }
  }
}
</script>

<style scoped lang="less">
  .g-layout {
    padding: 0 20px;
    .c-music__event {
      margin: 20px 0;
      padding: 20px;
      display: flex;
      .c-event__user {
        font-size: 30px;
        color: #ccc;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .c-event__act {
        margin: 20px 0;
        color: yellow;
      }
    }
    .c-music__avatUrl {
      margin-right: 50px;
      flex: none;
    }
    .c-event__info {
      flex: 1;
      overflow: hidden;
    }
    .c-person__header {
      flex: none;
      width: 80px;
      height: 80px;
      border-radius: 80px;
    }
    .c-event__event {
      margin: 50px 20px 0 0;
      display: flex;
      height: 100px;
      background: #000;
    }
    .c-event__img {
      width: 100px;
      flex: none;
    }
    .c-event__music {
      padding: 5px;
      flex: 1;
      margin-left: 30px;
    }
    .c-music__creator {
      margin-top: 10px;
      color: #666;
    }
  }
</style>

<style scoped>
  .c-event__music >>> .c-music__name {
    color: #ccc;
    font-size: 32px;
  }
</style>
