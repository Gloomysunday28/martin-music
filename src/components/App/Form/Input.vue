<template>
  <input class="c-home__search" :type="type" :style="{width}" v-model="str">
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
    }
  },
  data() {
    return {
      str: ''
    }
  },
  watch: {
    str(e) {
      this.$emit('input', e)
    }
  }
}
</script>

<style scoped>
  .c-home__search {
    padding-left: 20px;
  }
</style>
