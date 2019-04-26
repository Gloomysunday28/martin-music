<template>
  <textarea class="c-music__textarea" :maxlength="maxlength" name="musicText" rows="10" v-model="remark"></textarea>
</template>

<script>
export default {
  name: 'MusicTextArea',
  props: {
    maxlength: {
      type: [String, Number],
      default: 30,
      required: false
    },
    value: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      remark: this.value
    }
  },
  watch: {
    remark(e) {
      this.$emit('input', e)
    },
    value(e) {
      this.remark = e
    }
  }
}
</script>

<style scoped>
.c-music__textarea {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding: 20px;
  box-sizing: border-box;
  background: #000;
  border: none;
  resize: none;
  width: 100%;
  -webkit-user-select: text;
  outline: none;
  color: #fff;
}
</style>
