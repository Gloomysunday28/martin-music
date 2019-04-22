<template>
  <transition name="app-loading">
    <div class="c-toast__hint" v-if="showToast">
      <div class="c-toast__text">
        <slot>
          {{toastHint}}
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ToastHint',
  data() {
    return {
      showToast: false,
      toastHint: '',
      timer: null,
    }
  },
  methods: {
    show(message) {
      this.showToast = true
      this.toastHint = message
    }
  },
  watch: {
    showToast(n) {
      if (n) {
        this.timer = setTimeout(_ => {
          clearTimeout(this.timer)
          this.showToast = false
        }, 1500)
      }
    }
  }
}
</script>

<style scoped lang="less">
.c-toast__hint {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 10;
  border-radius: 8px;
  color: #fff;
  font-size: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}
.c-toast__text {
  padding: 5px 20px;
  max-width: 70%;
  text-align: center;
  min-height: 80px;
  background: rgba(0, 0, 0, .8);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
</style>
