<template>
  <div class="m-better__scroll">
    <slot></slot>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'

export default {
  name: 'MusicAppBetterScroll',
  props: {
    options: {
      type: Object,
      required: false,
      default: () => {}
    },
    contain: {
      type: String,
      required: true,
      default: ''
    },
  },
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
