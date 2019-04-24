<template>
  <div class="g-layout">
    <p class="c-search__title" v-if="clearSearch && !isSearchEd">热搜</p>
     <ul class="c-search__list" v-if="isSearchEd">
      <li class="c-search__sons" v-for="sear in searachDatas" :key="sear.id">
        <img class="c-sons__album" :src="sear.album.artist.img1v1Url" alt="">
        <div class="c-sons__msg">
          <p class="c-songs__name">{{sear.name}}</p>
          <p class="c-songs__album__name">{{sear.album.name}}</p>
        </div>
        <div class="c-songs__option">
          <i class="iconfont">&#xe637;</i>
        </div>
      </li>
    </ul>
    <ul class="c-search__list" @click="inputHotSearch" v-else>
      <li class="c-search__item" v-for="sear in searchLists" :key="sear.id">
        {{sear.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MusicSearch',
  data() {
    return {
      isSearchEd: false, // 是否已经点击搜索建议
      clearSearch: true, // 输入搜索取消热搜两个字
      searchLists: [],
      searachDatas: [], // 搜索结果
      hotSearch: [], // 热搜
      searchAdvance: [] // 搜索建议
    }
  },
  mounted() {
    this.$common.listen('changeStatus', this.searchDataAdvance)
    this.getSearchHot()
  },
  methods: {
    inputHotSearch(e) {
      const target = e.target
      if (target.classList.contains('c-search__item')) {
        this.$common.trigger('getStatus', target.innerHTML.trim(), 'search')
        this.searchData(target.innerHTML.trim())
      }
    },
    getSearchHot() {
      this.$http.get(this.$api.searchHot).then(res => {
        if (res.data.code === 200) {
          this.hotSearch = res.data.result.hots
          this.searchLists = [...this.hotSearch].map(val => {
            val.name = val.first
            return val
          })
        }
      })
    },
    searchData(data) { // 搜索数据
      this.isSearchEd = true
      this.$http.get(this.$api.searchSong, {
        params: {
          keywords: data
        }
      }).then(res => {
        this.searachDatas = res.data.result.songs
      })
    },
    searchDataAdvance(search) { // 搜索建议
      this.isSearchEd = false
      if (search) {
        this.clearSearch = false
        this.$http.get(this.$api.searchAdvance, {
          params: {
            keywords: search,
            type: 'mobile'
          }
        }).then(res => {
          this.searchAdvance = res.data.result.allMatch
          if (this.searchAdvance) {
            this.searchLists = [...this.searchAdvance].map(val => {
              val.name = val.keyword
              return val
            })
          } else this.searchLists = []
        })
      } else {
        this.clearSearch = true
        this.searchLists = [...this.hotSearch].map(val => {
          val.name = val.first
          return val
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .g-layout {
    padding: 0 30px;
    display: flex;
    flex-direction: column;
  }
  .c-search__title {
    margin-top: 20px;
    color: #666;
    flex: none;
    font-size: 26px;
  }
  .c-search__list {
    margin-top: 30px;
    color: #ccc;
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .c-search__item {
    margin-bottom: 40px;
    font-size: 24px;
  }
  .c-search__sons {
    display: flex;
    margin-bottom: 50px;
    .c-sons__album {
      width: 100px;
      height: 100px;
      border-radius: 8px;
      flex: none;
    }
    .c-sons__msg {
      margin: 0 15px;
      flex: 1;
      overflow: hidden;
    }
    .c-songs__name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .c-songs__album__name {
      color: #444;
    }
    .c-songs__option {
      width: 100px;
      display: flex;
      align-items: center;
      .iconfont {
        color: #ccc;
        font-size: 36px;
      }
    }
  }
</style>
