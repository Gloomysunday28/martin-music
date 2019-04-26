<template>
  <input class="c-home__search" :disabled="disabled" :type="type" :style="{width}" v-model="str">
</template>

<script>
export default {
  name: 'MusicInput',
  props: {
    width: {
      type: [String, Number],
      default: '100%',
      required: false
    },
    type: {
      type: String,
      default: 'text',
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    defaultValue: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      str: this.defaultValue
    }
  },
  watch: {
    str(e) {
      this.$emit('input', e)
    },
    defaultValue(e) {
      this.str = e
    }
  }
}
</script>

<style scoped>
  .c-home__search {
    box-sizing: border-box;
    padding-left: 20px;
    font-size: 30px;
    color: #fff;
  }
</style>
