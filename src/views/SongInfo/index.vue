<template>
  <div class="g-layout">
    <div class="c-song__frost__glass" v-lazy-decode="[songInfo.al.picUrl, {'className': 'c-song__info__img'}]">
    </div>
    <div class="c-song__contain">
      <div class="c-song__cover__contain">
        <div class="c-song__cover" v-lazy-decode="[songInfo.al.picUrl, {'className': 'c-song__info__img'}]">
        </div>
        <svg class="c-song__cd" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <circle class="progress-background" fill="transparent"></circle>
          <circle class="progress-bar" fill="transparent"></circle>
          <circle class="progress-bar progress-bar-9" fill="transparent"></circle>
          <circle class="progress-bar progress-bar-8" fill="transparent"></circle>
          <circle class="progress-bar progress-bar-7" fill="transparent"></circle>
          <circle class="progress-bar progress-bar-6" fill="transparent"></circle>
          <circle class="progress-bar progress-bar-5" fill="yellow"></circle>
        </svg>
      </div>
      <div class="c-song__info">
        <p>{{songInfo.name}}</p>
        <p class="c-song__artist">{{songInfo.ar[0].name}}</p>
      </div>
      <div class="c-song__option">
        <div v-for="icon in optionIcons" :key="icon.id" class="c-song__icon" v-on="icon.on">
          <InsertParent :dymicData="icon.dymicData">
            <transition name="zoom-out" slot="parent" v-if="icon.transition">
            </transition>
            <i :key="icon.changeKey ? icon.changeKey() : null " class="iconfont" :class="icon.icon"></i>
          </InsertParent>
        </div>
      </div>
      <div class="c-song__simo">
        <music-list :music-data="simoLists" record="record"/>
      </div>
      <app-dialog
        :dialogVisiable.sync="dialogVisiable"
        @onSure="removeSong"
        >
        <p slot="header">是否从此歌单移除？</p>
        <div>
          将 <span class="m-red">{{songInfo.name}}</span> 移除
        </div>
      </app-dialog>
    </div>
  </div>
</template>

<script>
import MusicList from '@/pages/MusicList'

export default {
  name: 'MusicSongInfo',
  components: {
    MusicList
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    pid() {
      return this.$route.query.pid
    },
  },
  data(vm) {
    return {
      dialogVisiable: false,
      liked: false,
      songInfo: {
        al: {},
        ar: [{}],
        liked: false
      },
      optionIcons: [{
        transition: 'zoom-out',
        id: 'love',
        icon: 'icon-aixin1',
        on: {
          click: this.likeSong
        },
        changeKey() {
          return vm.liked ? 'zoom-out' : 'zoom-in'
        },
        dymicData() {
          return {
            class: {
              'icon-aixin1': true,
              'c-song__icon--love': vm.liked
            }
          }
        }
      }, {
        id: 'menu',
        icon: 'icon-guanli'
      }, {
        id: 'comment',
        icon: 'icon-pinglun',
        on: {
          click: this.jumpToComment
        }
      }, {
        id: 'delete',
        icon: 'icon-shanchu',
        on: {
          click: () => { this.dialogVisiable = true }
        }
      }],
      simoLists: []
    }
  },
  mounted() {
    this.$utils.allSettled([
      this.getSongInfo(),
      this.getSimoSong()
    ])
  },
  methods: {
    likeSong() {
      const like = !this.liked
      this.$http.get(this.$api.likeSong, {
        params: {
          id: this.id,
          like
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.liked = like
          if (like) {
            this.loveSongList.push(+this.id)
          } else {
            const index = this.loveSongList.indexOf(+this.id)
            if (~index) this.loveSongList.splice(index, 1)
          }

          this.$store.dispatch('setLoveSong', this.loveSongList)
        }
      })
    },
    removeSong() {
      this.$http.get(this.$api.removeSong, {
        params: {
          op: 'del',
          pid: this.pid,
          tracks: this.id
        }
      }).then(() => {
        this.$toast('删除成功')
      }).finally(() => {
        this.dialogVisiable = false
      })
    },
    jumpToComment() {
      this.$router.push({
        name: 'MusicSongComment',
        params: {
          id: this.id
        }
      })
    },
    getSongInfo() {
      return this.$http.get(this.$api.songDetail, {
        params: {
          ids: this.id
        }
      }).then(res => {
        this.songInfo = res.data.songs[0] || {}
        this.liked = this.loveSongList.includes(+this.id)
      })
    },
    getSimoSong() {
      return this.$http.get(this.$api.simoSong, {
        params: {
          id: this.id
        }
      }).then(res => {
        this.simoLists = res.data.songs
      })
    }
  }
}
</script>

<style scoped lang="less">
  .g-layout {
    // background: #fff;
    .c-song__info__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .c-song__frost__glass {
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 50vh;
      filter: blur(60px);
      z-index: -1;
      overflow: hidden;
    }
    .c-song__contain {
      margin: 200px 80px 0;
    }
    .c-song__cover__contain {
      display: flex;
    }
    .c-song__cover {
      width: 280px;
      height: 280px;
      border-radius: 20px;
      overflow: hidden;
    }
    .c-song__cd {
      width: 200px;
      height: 280px;
    }
    circle {
      r: 100px;
      cx: -20px;
      cy: 105px;
      stroke-width: 2px;
      transform-origin: center center;
    }
    .progress-background {
      fill: #000;
    }
    circle.progress-bar {
      stroke: #666;
      &.progress-bar-9 {
        cx: -22px;
        r: 90px;
        stroke: rgba(102, 102, 102, .9);
      }
      &.progress-bar-8 {
        cx: -25px;
        r: 80px;
        stroke: rgba(102, 102, 102, .8);
      }
      &.progress-bar-7 {
        cx: -27px;
        r: 70px;
        stroke: rgba(102, 102, 102, .7);
      }
      &.progress-bar-6 {
        cx: -32px;
        r: 60px;
        stroke: rgba(102, 102, 102, .6);
      }
      &.progress-bar-5 {
        cx: -35px;
        r: 50px;
      }
    }
    .c-song__info {
      margin-top: 50px;
      color: #eee;
      .c-song__artist {
        color: #888;
      }
    }

    .c-song__option {
      display: flex;
      margin-top: 50px;
      .c-song__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 25%;
        text-align: center;
      }
      .iconfont {
        font-size: 70px;
        color: #fff;
      }
      .icon-pinglun {
        font-size: 50px;
      }
      .icon-aixin1 {
        position: absolute;
        left: 0;
        top: 15px;
        right: 0;
        margin: auto;
        font-size: 50px;
        &.c-song__icon--love {
          color: #f75f47;
        }
      }
      .icon-shanchu {
        font-size: 50px;
        font-weight: bold;
        color: rgba(255, 0, 0, .7);
      }
    }

    .c-song__simo {
      margin-top: 150px;
    }
  }
</style>
