<template>
  <transition name="opacity">
    <div class="c-extra__contain" :key="changeHeader">
      <div class="c-extra" v-if="extra.popver">
        <div class="c-extra__popver" @click="changeClass">
          <span class="c-extra__class">{{popverClassName}}</span>
          <i class="iconfont c-popver__icon">&#xe603;</i>
        </div>
      </div>
      <div class="c-extra c-extra__text" v-if="extra.text" @click="changePageStatus">
        {{extra.text}}
      </div>
      <div class="c-extra c-extra__icon" v-if="extra.icon" @click="changePageStatus">
        <i class="iconfont" :style="{color: IconColor}" v-html="extra.icon"></i>
      </div>
      <div class="c-extra c-extra__three" v-if="extra.threeLine" @click="changePageStatus">
        <div class="c-three__contain">
          <div class="c-three__line"></div>
          <div class="c-three__line"></div>
          <div class="c-three__line"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'HeaderExtra',
  props: {
    extra: {
      type: Object,
      default: () => {},
      required: false,
    },
    changeHeader: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      popverClassName: '',
      text: '',
      IconColor: '#fff',
    }
  },
  mounted() {
    this.$common.listen('getPopver', popverData => {
      this.popverClassName = popverData
    })
    this.$common.listen('getExtra', e => {
      this.text = e
    })
    this.$common.listen('changeHeaderIcon', color => {
      this.IconColor = color
    })
  },
  methods: {
    changeClass() {
      this.$common.trigger('changeClass')
    },
    changePageStatus() {
      this.$common.trigger('changePageStatus')
    },
  },
  destroyed() {
    this.$common.removeListener('getPopver')
    this.$common.removeListener('getExtra')
    this.$common.removeListener('changeHeaderIcon')
  }
}
</script>

<style scoped lang="less">
.c-extra__contain {
  position: absolute;
  right: 20px;
  .c-extra {
    display: flex;
    flex-direction: column;
    .iconfont {
      font-size: 32px;
    }
    .c-three__contain {
      width: 38px;
      height: 31px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .c-three__line {
        width: 38px;
        height: 4px;
        background: #444;
      }
    }
    .c-extra__popver {
      width: 220px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .c-popver__icon {
        font-size: 38px;
      }
      .c-extra__class {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .c-extra__text {
    font-size: 28px;
  }
}
.c-extra__item {
  margin-bottom: 8px;
  display: inline-block;
  width: 28px;
  height: 4px;
  background: #444;
}
.c-extra__new {
  color: #14c75e;
  &.c-extra__new--disabled {
    color: #ccc;
  }
}
.c-extra__search .iconfont {
  font-size: 34px;
  font-weight: bold;
}
.c-popver__list {
  position: fixed;
  right: 20px;
  top: 88px;
}
</style>
