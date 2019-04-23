<template>
  <header class="header">
    <transition :name="headerConfig.slide">
      <div class="bar" v-bind:key="headerConfig.changeHeader">
        <div v-if="headerConfig.searchBox">
          <div class="c-search__box">
            <div class="c-search-icon">
              <i class="iconfont">&#xe61c;</i>
            </div>
            <router-link class="c-search__link" :to="{name: 'ScheduleSearch'}">
              搜索
            </router-link>
          </div>
        </div>
        <div class="c-search" v-if="headerConfig.search">
          <Debounce>
            <input class="c-home__search" type="text" v-model="search" @keyup="searchData"/>
          </Debounce>
          <i class="iconfont">&#xe621;</i>
          <span class="c-search__cancel" @click="$router.back()">取消</span>
        </div>
        <div class="header-title" v-if="headerConfig.title">
          {{title || headerConfig.title}}
        </div>
        <div class="header-tabs" v-if="headerConfig.tabs.length">
          <div v-for="(tab, index) in headerConfig.tabs" :key="index" :class="['header-tab', {'header-tab--active': tabIndex === tab.value}]" @click="changeTab(tab.value)">
            {{tab.name}}
          </div>
        </div>
        <div class="c-home__header" v-if="headerConfig.isHome">
          <div class="c-music__title">
            DISCOVER
          </div>
          <img class="c-person__header" :src="personal.avatarUrl" alt="" @click="$router.push({name: 'MusicPerson'})">
        </div>
      </div>
    </transition>
    <base-extra :extra="headerConfig.extra" :change-header="headerConfig.changeHeader" v-if="headerConfig.extra"/>
  </header>
</template>

<script>
import Extra from './HeaderExtra'
import {mapState} from 'vuex'
import Debounce from '../App/Debounce'

export default {
  name: 'BaseHeader',
  components: {
    Debounce,
    'base-extra': Extra
  },
  props: {
    headerConfig: {
      type: Object,
      default: () => {},
      required: true,
    },
    bgColor: {
      type: String,
      default: '#fff',
      required: true,
    },
  },
  computed: mapState({
    personal: state => state.baseInfo.personal
  }),
  data() {
    return {
      search: '',
      title: '',
      tabIndex: 1
    }
  },
  mounted() {
    this.$common.listen('getStatus', this.getStatus)
  },
  methods: {
    getStatus(value, type) {
      if (type === 'search') this.getSearch(value)
      if (type === 'title') this.title = value
    },
    getSearch(value) {
      this.search = value
    },
    changeTab(value) {
      this.tabIndex = value
    },
    submitData(e) {
      e.preventDefault()
      return false // 禁止刷新页面
    },
    searchData() {
      this.$common.trigger('changeStatus', this.search)
    }
  },
  watch: {
    tabIndex(e) {
      this.$common.trigger('changeStatus', e)
    },
  }
}
</script>

<style scoped lang="less">
.header {
  width: 100vw;
  height: 110px;
  box-sizing: border-box;
  flex: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #0D0D0D;
  color: #444;
  // z-index: 20;
  .bar {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    margin: auto;
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    height: 88px;
  }
  .header-tabs {
    display: flex;
    align-items: center;
    border-radius: 8px;
    .header-tab {
      width: 180px;
      height: 58px;
      border: 1Px solid #D9D9D9;
      line-height: 58px;
      text-align: center;
      &:first-child {
        border-radius: 8px 0 0 8px;
        border-right: none;
      }
      &:last-child {
        border-radius: 0 8px 8px 0;
        border-left: none;
      }
      &.header-tab--active {
        background: #14c75e;
        color: #fff;
        border-color: #14c75e;
      }
    }
  }
  .c-search__box {
    // padding-left: 61px;
    margin-left: 23px;
    margin-right: 20px;
    width: 600px;
    height: 60px;
    background: #F5F5F5;
    color: #999;
    line-height: 60px;
    display: flex;
    text-align: left;
    .c-search__link {
      display: inline-block;
      color: #999;
      width: 100%;
      height: 100%;
    }
    .c-search-icon {
      width: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      .iconfont {
        font-size: 28px;
        font-weight: 600;
      }
    }
  }
  .header-title {
    width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    // font-size: px;
    text-align: center;
    color: #ccc;
    font-weight: 500;
  }
  .c-search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
    .iconfont {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 46px;
      color: yellow;
    }
  }
  .c-home__search {
    width: 90%;
    box-sizing: border-box;
    color: #ccc;
    padding-left: 80px;
  }
  .c-search__cancel {
    color: #999;
  }
  .c-home__header {
    width: 100%;
    flex: none;
    padding: 10px 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .c-music__title {
      color: #fff;
      font-weight: 600;
      font-size: 42px;
    }
  }
}
</style>
