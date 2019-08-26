<template>
  <div class="g-layout">
    <router-link class="c-person__card" :to="{name: 'MusicPersonInfo'}">
      <div class="c-person__msg">
        <img class="c-person__header" :src="userInfo.avatarUrl || require('@/assets/img/loading-ps.jpg')" alt="">
        <div class="c-person__info">
          <p class="c-person_nickname">{{userInfo.nickname}}</p>
          <p>{{userInfo.signature}}</p>
        </div>
      </div>
      <div class="c-person__follow">
        <div class="c-person__follow c-person__follows">
          <router-link :to="{name: 'MusicFollows', query: {title: '关注'}}">
            <span class="c-follow__label">关注 </span>
            <span class="c-follow__data">{{userInfo.follows}}</span>
          </router-link>
          <router-link :to="{name: 'MusicFollows', query: {title: '粉丝'}}">
            <span class="c-follow__label">粉丝 </span>
            <span class="c-follow__data">{{userInfo.followeds}}</span>
          </router-link>
        </div>
        <div :class="['c-person__vip', {'c-person__vip--active': userInfo.vipType}]">
          VIP
        </div>
      </div>
    </router-link>
    <div class="c-person__songs">
      <router-link class="c-person__list" :to="{name: 'MusicSongList', query: {type: 1}}">
        <div class="c-song__list">
          <div class="c-song__img"></div>
          <div class="c-song__img"></div>
          <div class="c-song__img"></div>
        </div>
        <div class="c-song__title">
          <span class="c-song__label">喜欢</span>
          <span class="c-song__number">{{loveList.length}}</span>
        </div>
      </router-link>
      <router-link class="c-person__list" :to="{name: 'MusicSongList', query: {type: 0}}">
        <div class="c-song__list">
          <div class="c-song__img" v-for="play in playListCover" :key="play.id">
            <img class="c-song__cover" :src="play.coverImgUrl">
          </div>
        </div>
        <div class="c-song__title">
          <span class="c-song__label">歌单</span>
          <span class="c-song__number">{{playList.length}}</span>
        </div>
      </router-link>
      <div class="c-person__list">
        <div class="c-song__list">
          <div class="c-song__img" v-for="play in recentListCover" :key="play.song.id">
            <img class="c-song__cover" :src="play.song.al.picUrl">
          </div>
        </div>
        <div class="c-song__title">
          <span class="c-song__label">最近播放</span>
          <span class="c-song__number">{{recentList.length}}</span>
        </div>
      </div>
      <div class="c-person__list">
        <div class="c-song__list">
          <div class="c-song__img"></div>
          <div class="c-song__img"></div>
          <div class="c-song__img"></div>
        </div>
        <div class="c-song__title">
          <span class="c-song__label">收藏</span>
          <span class="c-song__number">{{userSubCount}}</span>
        </div>
      </div>
    </div>
    <router-link class="c-music__message" :to="{name: 'MusicMessage'}">
      动态
      <i class="iconfont">&#xe603;</i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MusicPerson',
  data() {
    return {
      playList: [],
      loveList: [],
      recentList: [],
      userSubCount: [],
      userInfo: {}
    }
  },
  computed: {
    playListCover() {
      return [...this.playList].splice(0, 3)
    },
    recentListCover() {
      return [...this.recentList].splice(0, 3)
    },
  },
  beforeCjd() {
    console.log(312)
  },
  beforeRouteEnter(to, from, next) {
    console.log(to)
    next()
  },
  mounted() {
    this.$common.listen('changePageStatus', () => {
      this.$router.push({
        name: 'MusicSetting'
      })
    })
    this.getPersonMsg()
  },
  activated() {
    this.$common.trigger('getStatus', '我的', 'title')
    this.$common.trigger('changeHeaderIcon', '#ccc')
    this.getUser()
  },
  deactivated() {
    this.$common.removeListener('changeHeaderIcon')
  },
  methods: {
    getUser() {
      this.$http.get(this.$api.userInfo, {
        params: {
          uid: this.personal.userId
        }
      }).then(res => {
        this.userInfo = res.data.profile
      })
    },
    getPersonMsg() {
      Promise.all([
        this.getUserInfo(),
        this.getLoveSong(),
        this.getRecentSong(),
        this.getUserSubCount(),
      ]).then(({0: playList, 1: loveList, 2: recentList, 3: userSubCount}) => {
        this.playList = playList.data.playlist
        this.loveList = loveList.data.ids
        this.recentList = recentList.data.weekData
        this.userSubCount = userSubCount.data.mvCount
      })
    },
    getUserInfo() { // 歌曲
      return this.$http.get(this.$api.userSong, {
        params: {
          uid: this.personal.userId
        }
      })
    },
    getLoveSong() {
      return this.$http.get(this.$api.loveSongList, {
        params: {
          uid: this.personal.userId
        }
      })
    },
    getRecentSong() {
      return this.$http.get(this.$api.userRecent, {
        params: {
          uid: this.personal.userId
        }
      })
    },
    getUserSubCount() {
      return this.$http.get(this.$api.userSubCount)
    }
  },
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
    .c-person__songs {
      margin-top: 50px;
      display: flex;
      flex-wrap: wrap;
    }
    .c-person__list {
      margin-bottom: 50px;
      padding: 20px;
      width: 50%;
      box-sizing: border-box;
      .c-song__list {
        margin-bottom: 50px;
        height: 120px;
        display: flex;
        .c-song__img {
          flex: 1;
          background: #666;
          box-shadow: -10px 10px 10px rgba(0, 0, 0, .5);
          .c-song__cover {
            width: 100%;
            height: 100%;
          }
        }
      }
      .c-song__title {
        height: 60px;
        background: #000;
        border-radius: 30px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        .c-song__label {
          color: #ddd;
        }
        .c-song__number {
          font-weight: bold;
          font-size: 36px;
        }
      }
    }
    .c-music__message {
      margin-top: 40px;
      font-size: 32px;
      color: #ccc;
      display: flex;
      justify-content: space-between;
      .iconfont {
        color: #ccc;
        font-size: 36px;
        transform: rotate(-.25turn);
      }
    }
  }
</style>
