<template>
  <div id="app" ref="contain">
    <transition name="opacity">
      <span :class="['header-back', {'header-back--board': YGBOARD}]" @click="back" v-if="!isIndex">
        <i class="iconfont back-icon">&#xe61b;</i>
      </span>
    </transition>
    <base-header :class="{'page-header--import': showImportHeader}" :header-config="headerConfig" :bg-color="bgColor"/>
    <div class="g-container">
      <transition :name="fade">
        <keep-alive :exclude="keepAlive">
          <router-view ref="wrong" :class="['page-view', {'page-header--none': !showHeader, 'page-header--import': showImportHeader}]" @changeHeaderBack="YGBOARD = false"/>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Base/Header'

export default {
  name: 'App',
  components: {
    'base-header': Header,
  },
  data() {
    return {
      YGBOARD: false,
      fade: 'fade-in',
      headerConfig: {
        title: '',
        slide: 'slide-in',
        tabs: [],
        extra: false,
        search: false,
        searchBox: false,
        changeHeader: false
      },
      keepAlive: '',
      bgColor: '#fff',
      showHeader: true,
      showImportHeader: false,
      isIndex: true,
      hasNoBack: false,
      backPage: '',
      defaultMap: new Map([
        [/^(showImportHeader|isIndex)$/, false],
        [/^(keepAlive|backPage)$/, ''],
        [/hasNoBack/, false],
        [/bgColor/, '#fff'],
      ]),
    }
  },
  mounted() {
    this.$common.listen('setHeaderBack', this.changeHeaderBack)
  },
  methods: {
    changeHeaderBack() {
      this.YGBOARD = true
    },
    getDataIsTrue(n, data, defaults) {
      if (data === 'keepAlive') {
        if (!n.meta.keepAlive) {
          this.keepAlive = n.name
        } else this.keepAlive = ''
      } else {
        if (n.meta[data]) {
          this[data] = n.meta[data]
        } else this[data] = defaults
      }
    },
    judgeRoute(n, v) {
      if (n.meta.isLogin || v.meta.isLogin) {
        this.fade = n.meta.isLogin ? 'login-in' : 'login-out'
      } else {
        if (!v.name && n.meta.isIndex) {
          this.fade = 'slide-up'
        } else {
          if (v.name) {
            this.headerConfig.slide = n.meta.oDeep > v.meta.oDeep ? 'slide-in' : 'slide-out'
            this.fade = n.meta.oDeep > v.meta.oDeep ? 'fade-in' : 'fade-out'
          }
        }
      }
      this.showHeader = n.meta.showHeader
      if (this.showHeader) {
        this.headerConfig.changeHeader = !this.headerConfig.changeHeader // 头部切换动画
        this.headerConfig.title = n.meta.title // 文字
        this.headerConfig.search = n.meta.search // 搜索
        this.headerConfig.searchBox = n.meta.searchBox // 首页
        this.headerConfig.extra = n.meta.extra || false // 头部是否有额外的icon
        this.headerConfig.tabs = n.meta.tabs || []
        this.headerConfig.isHome = n.meta.isHome || false
      }
      const assignData = this.assignData(n) // 函数柯里化, 设置一个默认值在里面
      assignData(['keepAlive', 'hasNoBack', 'bgColor', 'showImportHeader', 'isIndex', 'backPage'], this.actionData) // 给各种配置赋值
    },
    filterDefault(keyMap) {
      const defualtMaps = [...this.defaultMap.entries()].filter(([key, value]) => key.test(keyMap)) // 判断符合条件的map值
      return defualtMaps
    },
    assignData(n) {
      return (data, actionData) => {
        if (!Array.isArray(data)) return
        data.forEach(val => {
          actionData(n, val, this.filterDefault) // 循环头部的值并且判断
        })
        return true
      }
    },
    actionData(n, val, filterDefault) {
      const [[, defaults]] = filterDefault(val) // 筛选出默认值
      this.getDataIsTrue(n, val, defaults) // 最后判断头部配置的值
      return true
    },
    back() {
      if (this.YGBOARD) {
        this.$refs.wrong.closeBoard()
        this.YGBOARD = false
      } else {
        if (this.isIndex || window.sessionStorage.parent) { // iframe嵌套，直接返回Mobile首页
          window.sessionStorage.removeItem('parent')
          window.YunGuiBridge.sendMessage2Native('goBack', 'back')
        } else {
          if (this.backPage) this.$router.push({name: this.backPage})
          else {
            this.$router.back()
          }
        }
      }
    }
  },
  watch: {
    $route(n, v) {
      this.judgeRoute(n, v)
    },
  }
}
</script>

<style scoped lang="less">
#app {
  font-family: -apple-system,BlinkMacSystemFont,PingFang SC,Helvetica Neue,STHeiti,Microsoft Yahei,Tahoma,Simsun,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #444;
  width: 100%;
  height: 100%;
  font-size: 28px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #0D0D0D;
  touch-action: none;
  // background: rgba(0, 0, 0, .9);
}
.page-header--import {
  z-index: 100 !important;
}
.g-container {
  position: relative;
  overflow: hidden;
  flex: 1;
}
.page-view {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  &.page-header--none {
    position: fixed;
    z-index: 200;
  }
  &.page-header--show {
    z-index: 200;
  }
}
.header--show {
  z-index: 200;
}
</style>

<style scoped>
  #app >>> .icon-love {
    position: absolute;
    font-size: 32px;
    z-index: 10;
    animation: slideOpacity .8s ease-in-out forwards;
  }

  @keyframes slideOpacity {
    from {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    to {
      transform: translate3d(0, -50px, 0);
      opacity: 0;
    }
  }
</style>
