<template functional>
  <div class="m-song__comment">
    <div class="m-comment__contain m-flex" v-for="comment in props.comments" :key="comment.id">
      <router-link :to="{name: 'MusicOthers', params: {uid: comment.user.userId}}" class="m-comment__avatarurl" v-lazy-decode="comment.user.avatarUrl">
      </router-link>
      <div class="m-comment__content">
        <div class="m-comment__user">
          <div class="m-comment__like m-flex">
            <span>{{comment.user.nickname}}</span>
            <span class="c-icon__likes" :class="{'c-icon__like': comment.liked}" @click="listeners.likeComment(comment)">
              <transition name="zoom-out">
                <i class="iconfont icon-dianzan" :key="comment.liked"></i>
              </transition>
              {{comment.likedCount}}
            </span>
          </div>
          <p class="m-comment__time">{{props.filterTime(comment.time, 'YYYY-MM-DD')}}</p>
        </div>
        <div class="m-content">
          {{comment.content}}
        </div>
      </div>
      <slot :comment="comment">
      </slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .m-comment__contain {
    padding-top: 20px;
    justify-content: flex-start;
    align-items: flex-start;
    .m-comment__avatarurl {
      margin-right: 20px;
      width: 70px;
      height: 70px;
      border-radius: 100%;
      flex: none;
      overflow: hidden;
    }
    .m-comment__content {
      padding: 0 10px 40px;
      flex: 1;
      border-bottom: 1px solid #333;
      .m-comment__user {
        color: #888;
        .m-comment__like {
          justify-content: space-between;
        }
        .c-icon__likes {
          position: relative;
        }
        .icon-dianzan {
          position: absolute;
          top: 0;
          left: -45px;
          font-size: 36px;
        }
        .c-icon__like {
          color: yellow;
        }
        .m-comment__time {
          font-size: 24px;
          color: #444;
        }
      }
      .m-content {
        margin-top: 20px;
        color: #aaa;
      }
    }
  }
</style>
