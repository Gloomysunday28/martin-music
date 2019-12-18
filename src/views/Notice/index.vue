<template>
  <div class="g-layout">
    <div class="c-notice__container">
      <router-link :to="{name: 'MusicChat', params: {id: notice.fromUser.userId}}" class="c-notice__item m-flex" v-for="notice in this.noticeLists" :key="notice.lastMsgTime">
        <div class="c-notice__avaturl" v-lazy-decode="notice.fromUser.avatarUrl"></div>
        <div class="c-notice__info">
          <div class="m-flex">
            <span>{{notice.fromUser.nickname}}</span>
            <span>{{notice.lastMsgTime | filterTime}}</span>
          </div>
          <p class="c-notice__lastmsg">{{notice.lastMsg | filterMsg}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { utils } from '@/utils'

export default {
  name: 'Notice',
  filters: {
    filterMsg(msg) {
      msg = JSON.parse(msg)
      return msg.msg
    },
    filterTime(date) {
      date = new Date(date)
      return `${utils.formatDouble(date.getMonth() + 1)}月${utils.formatDouble(date.getDay())}日`
    }
  },
  data() {
    return {
      noticeLists: []
    }
  },
  activated() {
    this.$common.trigger('getStatus', '我的消息', 'title')
  },
  methods: {
    getNotice() {
      this.$http.get(this.$api.noticeLists, {
        params: {
          offset: 0,
          limit: 30
        }
      }).then(res => {
        this.noticeLists = res.data.msgs || []
      })
    }
  },
  watch: {
    $route: {
      handler(n, v) {
        if (!v || v.meta.oDeep < 5) {
          this.getNotice()
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="less">
.c-notice__container {
  margin-top: 20px;
}
.c-notice__item {
  padding: 0 30px;
  justify-content: flex-start;
  color: #fff;
  .c-notice__avaturl {
    flex: none;
    margin-right: 30px;
    width: 80px;
    height: 80px;
    border-radius: 100%;
    overflow: hidden;
  }
  .c-notice__info {
    flex: 1;
    padding: 20px 0;
    border-bottom: 1px solid #555;
  }
  .m-flex {
    justify-content: space-between;
  }
  .c-notice__lastmsg {
    margin-top: 5px;
    color: #888;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
