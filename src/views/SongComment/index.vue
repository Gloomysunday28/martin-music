<template>
  <div class="g-layout">
    <header class="header">
      评论
    </header>
    <div class="c-comment__contain" @scroll="scrolls">
      <better-scroll
        :is-native="true"
        @pullingUp="pullingUp"
      >
        <div class="c-comment__content">
          <p class="c-comment__label">热门评论</p>
          <music-comment
            :comments="hotComments"
            :filterTime="$utils.filterTime"
            @likeComment="likeComment"
          />
        </div>
        <div class="c-comment__content">
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
    }
  },
  mounted() {
    this.getSongComment()
  },
  methods: {
    scrolls() {
      console.log('martin', 321)/* 2019年12月23日 13时51分22秒 */
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
        if (comment.liked) {
          comment.likedCount++
        } else {
          comment.likedCount--
        }
      })
    }
  },
  watch: {
    offset() {
      this.getSongComment()
    },
    $route(n, v) {
      if (!v || (n.meta.oDeep > v.meta.oDeep && n.name === 'MusicSongComment')) {
        this.getSongComment()
      }
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
      padding: 0 30px;
      flex: 1;
      overflow: hidden;
    }
    .c-comment__label {
      padding: 20px 15px;
      background: #0D0D0D;
      position: sticky;
      top: -1px;
      color: #aaa;
      font-size: 32px;
      z-index: 100;
    }
  }
</style>
