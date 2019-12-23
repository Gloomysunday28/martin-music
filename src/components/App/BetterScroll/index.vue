<template>
  <div class="m-better__scroll" ref="container" @scroll.passive="initNativeScroll">
    <slot></slot>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'
import { mapState } from 'vuex'

export default {
  name: 'MusicAppBetterScroll',
  props: {
    isNative: {
      type: Boolean,
      required: false,
      default: false
    },
    options: {
      type: Object,
      required: false,
      default: () => {}
    },
    contain: {
      type: String,
      required: false,
      default: ''
    },
  },
  computed: mapState({
    loading: state => state.server.loading
  }),
  data() {
    return {
      bs: null
    }
  },
  mounted() {
    this.initBs()
  },
  methods: {
    initBs() {
      if (this.isNative) return void 0

      this.initBetterScroll()
    },
    initNativeScroll() {
      if (this.loading) return void 0
      const contain = this.$refs.container
      const clientHeight = contain.clientHeight
      const scrollTop = contain.scrollTop
      const scrollHeight = contain.scrollHeight
      if (scrollTop + clientHeight + 200 > scrollHeight) {
        this.$emit('pullingUp')
      }
    },
    initBetterScroll() {
      const defaultOptions = {
        pullDownRefresh: true,
        pullUpLoad: true
      }

      this.bs = new BetterScroll('.c-comment__contain', {...defaultOptions, ...this.options})
      const pullBehavior = ['Down', 'Up']
      let currentBehavior = ''
      while (currentBehavior = pullBehavior.shift()) {
        this.bsAddEventListener(this.getBehaviorName(currentBehavior))
      }
    },
    bsAddEventListener({ addEventName, clearEventName } = {}) {
      this.bs.on(addEventName, async () => {
        await this.$emit(addEventName)
        let timer = setTimeout(() => {
          this.bs[clearEventName]()
          this.bs.refresh()
          clearTimeout(timer)
          timer = null
        }, 1000)
      })
    },
    getBehaviorName(currentBehavior) {
      return {
        addEventName: 'pulling' + currentBehavior,
        clearEventName: 'finishPull' + currentBehavior
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .m-better__scroll {
    max-height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
</style>
