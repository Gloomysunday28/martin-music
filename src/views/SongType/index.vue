<template>
  <div class="g-layout">

  </div>
</template>

<script>
export default {
  name: 'MusicSongType',
  data() {
    return {
      playList: []
    }
  },
  mounted() {
    this.getHotSongType()
  },
  activated() {
    this.$common.trigger('getStatus', '', 'title')
  },
  deactivated() {
    this.$common.removeListener('getStatus')
  },
  methods: {
    getHotSongType() {
      this.$http.get(this.$api.playHot).then(res => {
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
