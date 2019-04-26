<template>
   <transition name="slide-up-all">
    <div class="m-music__picker" v-if="showPicker">
        <div class="m-picker__contain">
          <slot></slot>
        </div>
      <div class="m-mask" @click="$emit('update:showPicker', false)"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MusicPicker',
  props: {
    showPicker: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
</script>

<style scoped lang="less">
  .m-music__picker {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    border-radius: 50px 50px 0 0;
    min-height: 100px;
    background: #000;
    box-shadow: -10px 0px 20px yellow;
    .m-picker__contain {
      position: relative;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 1;
      min-height: 100px;
    }
    .m-mask {
      position: fixed;
      left:0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }
  }
</style>
