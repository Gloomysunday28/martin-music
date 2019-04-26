<template>
  <div class="g-layout">
    <div class="c-recommend__cover">
      <img :src="cover" alt="">
      <span class="c-play__cover">{{$route.query.title || '每日推荐'}}</span>
    </div>
    <div class="c-recommend__songs">
      <div class="c-recommend__tags" v-if="isRecoomend">
        <span class="c-recommend__tag"># 每日推荐 #</span>
        <span class="c-recommend__tag"># Vivo x27 #</span>
        <span class="c-recommend__tag"># 照亮你的美 #</span>
      </div>
      <div class="c-person__info">
        <img class="c-person__avata" :src="personal.avatarUrl" alt="">
        <span>{{personal.nickname}}</span>
      </div>
      <div class="c-recommend__lists">
        <div class="c-recommend__list__total">
          <div class="c-recommend__play">
            <i class="iconfont">&#xeb6d;</i>
          </div>
          {{recommends.length}}
        </div>
        <music-list :music-data="recommends"/>
      </div>
    </div>
  </div>
</template>

<script>
import MusicList from '@/pages/MusicList'

export default {
  name: 'MusicPlayList',
  components: {
    MusicList
  },
  data() {
    return {
      cover: '', // 封面
      isRecoomend: false,
      recommends: []
    }
  },
  mounted() {
    this.isRecoomend = !this.$route.query.title
    this.$common.trigger('getStatus', this.$route.query.title || '每日推荐', 'title')
    this.cover = this.$route.query.coverUrl
    this.getRecommend()
  },
  beforeDestory() {
    this.$common.removeListener('getStatus')
  },
  methods: {
    getRecommend() {
      this.$http.get(this.$api[this.isRecoomend ? 'recommendByPerDay' : 'playListDetail'], {
        ...!this.isRecoomend && {
          params: {
            id: this.$route.query.id
          }
        }
      }).then(res => {
        this.recommends = res.data.recommend || res.data.playlist.tracks
        if (!this.isRecoomend) {
          this.cover = res.data.playlist.coverImgUrl
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .c-play__cover {
    position: absolute;
    width: 100%;
    left: 50%;
    top: 55px;
    transform: translateX(-50%);
    font-size: 36px;
    text-align: center;
    color: #fff;
  }
  .c-recommend__cover img {
    width: 100%;
  }
  .c-recommend__songs {
    padding: 0 30px;
    .c-recommend__tags {
      margin-top: 30px;
      display: flex;
      .c-recommend__tag {
        padding: 5px 20px;
        margin-right: 15px;
        border-radius: 25px;
        background: yellow;
        color: #000;
        font-weight: bold;
        font-size: 22px;
      }
    }
    .c-person__info {
      display: flex;
      align-items: center;
      color: #ccc;
      margin-top: 50px;
      font-size: 24px;
    }
    .c-person__avata {
      margin-right: 30px;
      width: 60px;
      height: 60px;
      border-radius: 60px;
    }
    .c-recommend__lists {
      margin-top: 50px;
      .c-recommend__list__total {
        display: flex;
        align-items: center;
        color: #ccc;
        font-weight: bold;
        font-size: 22px;
      }
      .c-recommend__play {
        margin-right: 30px;
        width: 100px;
        text-align: center;
        line-height: 46px;
        height: 40px;
        border-radius: 50px;
        background: yellow;
        .iconfont {
          font-size: 32px;
          color: #000;
          transform: rotate(-.25turn);
        }
      }
    }
  }
</style>
