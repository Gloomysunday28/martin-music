<template>
  <transition name="zoom-out">
    <div class="c-dialog__contain" v-if="dialogVisiable">
      <i class="iconfont" @click="$emit('update:dialogVisiable', false)">&#xe626;</i>
      <div class="c-dialog__head">
        <slot name="header"></slot>
      </div>
      <div class="c-dialog__body">
        <slot></slot>
      </div>
      <div class="c-dialog__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppDialog',
  props: {
    dialogVisiable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    dialogVisiable(n) {
      if (!n) this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
  .c-dialog__contain {
    position: relative;
    width: 500px;
    height: 500px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .3);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    .iconfont {
      font-size: 32px;
      color: #444;
      position: absolute;
      right: 20px;
      top: 20px;
      z-index: 20;
    }
  }
  .c-dialog__head {
    flex: none;
    max-height: 60px;
  }
  .c-dialog__body {
    flex: 1;
  }
  .c-dialog__footer {
    flex: none;
    max-height: 50px;
  }
  .zoom-out-enter-active {
    animation: zoom .5s forwards;
  }
  .zoom-out-leave-active {
    animation: zoom .5s reverse;
  }

  @keyframes zoom {
    from {
      opacity: 0;
      transform: perspective(1000px) translate3d(0, 0, -100px);
    }
    to {
      opacity: 1;
      transform: perspective(1000px) translate3d(0, 0, 0);
    }
  }
</style>
