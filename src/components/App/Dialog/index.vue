<template>
  <transition name="zoom-out">
    <div class="c-dialog__contain" v-if="dialogVisiable" @click="closeDialog">
      <div class="c-dialog__box">
        <i class="iconfont" @click="closeDialog">&#xe626;</i>
        <div class="c-dialog__head">
          <slot name="header"></slot>
        </div>
        <div class="c-dialog__body">
          <slot></slot>
        </div>
        <div class="c-dialog__footer">
          <slot name="footer">
            <div class="m-flex">
              <button class="c-dialog__btn" @click="closeDialog">取消</button>
              <button class="c-dialog__btn c-dialog__sure" @click="sureDialog">确定</button>
            </div>
          </slot>
        </div>
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
  methods: {
    closeDialog() {
      this.$emit('update:dialogVisiable', false)
    },
    sureDialog() {
      this.$emit('onSure')
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
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .c-dialog__box {
      position: relative;
      width: 80vw;
      min-height: 20vh;
      max-height: 30vh;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, .3);
      background: #0d0d0d;
      color: #fff;
      display: flex;
      flex-direction: column;
    }
    .iconfont {
      font-size: 50px;
      color: #ccc;
      position: absolute;
      right: 20px;
      top: 20px;
      z-index: 20;
    }
  }
  .c-dialog__head {
    flex: none;
    height: 60px;
    padding: 20px 0;
    line-height: 60px;
    text-align: center;
    font-size: 34px;
  }
  .c-dialog__body {
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-size: 32px;
    flex: 1;
    text-align: center;
    border-top: 1px solid  rgba(238, 238, 238, .2);
    border-bottom: 1px solid  rgba(238, 238, 238, .2);
  }
  .c-dialog__footer {
    flex: none;
    max-height: 80px;
    .c-dialog__btn {
      font-size: 32px;
      flex: 1;
      text-align: center;
      line-height: 80px;
      color: #fff;
      &.c-dialog__sure {
        border-left: 1px solid rgba(238, 238, 238, .2);
        color: red;
      }
    }
  }
  .zoom-out-enter-active {
    animation: zoom .3s forwards;
  }
  .zoom-out-leave-active {
    animation: zoom .3s reverse;
  }

  @keyframes zoom {
    from {
      opacity: 0;
      transform: perspective(1000px) translate3d(0, 0, -300px);
    }
    to {
      opacity: 1;
      transform: perspective(1000px) translate3d(0, 0, 0);
    }
  }
</style>
