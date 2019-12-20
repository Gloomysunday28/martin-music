<template>
  <div class="g-layout">
    <header class="header">
      评论
    </header>
    <div class="c-comment__contain">
      <better-scroll
        :options="betterScrollOptions"
        ref="betterScroll"
        contain=".c-comment__contain"
        @pullingDown="pullingDown"
        @pullingUp="pullingUp"
      >
        <div class="c-comment__content">
          <p class="c-comment__label">热门评论</p>
          <music-comment
            :comments="hotComments"
            :filterTime="$utils.filterTime"
            @likeComment="likeComment"
          />
          <p class="c-comment__label">最新评论</p>
          <music-comment
            :comments="comments"
            :filterTime="$utils.filterTime"
            @likeComment="likeComment"
          />
        </div>
      </better-scroll>
    </div>
  </div>
</template>

<script>
import BetterScroll from '@/components/App/BetterScroll'
import MusicComment from './Comment'

export default {
  name: 'MusicSongComment',
  components: {
    BetterScroll,
    MusicComment
  },
  data() {
    return {
      offset: 0,
      hotComments: [],
      comments: [],
      betterScrollOptions: {
        click: true,
        preventDefault: true,
        bounceTime: 600,
        probeType: 3,
      }
    }
  },
  mounted() {
    this.getSongComment()
  },
  methods: {
    pullingDown() {
      this.offset = 0
    },
    pullingUp() {
      this.offset += 1
    },
    getSongComment() {
      this.$http.get(this.$api.songComment, {
        params: {
          id: this.$route.params.id,
          offset: this.offset
        }
      }).then(({ data } = {}) => {
        if (!this.offset) {
          this.hotComments = []
          this.comments = []
        }
        this.hotComments.push(...(data.hotComments || []))
        this.comments.push(...(data.comments || []))

        this.$nextTick().then(() => {
          this.$refs.betterScroll.bs.refresh()
        })
      })
    },
    likeComment(comment) {
      this.$http.get(this.$api.likeMusic, {
        params: {
          id: this.$route.params.id,
          cid: comment.commentId,
          t: +!comment.liked,
          type: 0
        }
      }).then(() => {
        comment.liked = !comment.liked
      })
    }
  },
  watch: {
    offset() {
      this.getSongComment()
    }
  }
}
</script>

<style lang="less" scoped>
  .g-layout {
    flex-direction: column;
    .header {
      flex: none;
      color: #ccc;
      height: 150px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .c-comment__contain {
      padding: 10px 30px 0;
      flex: 1;
      overflow-y: auto;
    }
    .c-comment__label {
      margin: 20px 0;
      position: -webkit-sticky;
      color: #aaa;
      font-size: 32px;
    }
  }
</style>
