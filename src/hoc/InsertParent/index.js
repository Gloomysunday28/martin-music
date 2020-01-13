export default {
  name: 'InsertParent',
  props: {
    dymicData: {
      type: Function,
      required: false,
      default: () => ({})
    }
  },
  render() {
    const slots = this.$slots.default.slice(-1)[0]
    const [parentNode] = this.$slots.parent || []

    slots.data = {...slots.data, ...this.dymicData()} // 构建虚拟DOM时createElement传入的第二个参数
    if (parentNode) {
      ;(parentNode.componentOptions || parentNode).children = [slots]
      return parentNode
    }

    return slots
  }
}
