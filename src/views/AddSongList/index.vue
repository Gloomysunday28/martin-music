<template>
  <div class="g-layout">
    <div class="c-songlist__tag">
      <div class="c-songlist__tag__item">
        创建
      </div>
    </div>
    <div class="c-song__add">
      <div class="c-song__form">
        <!-- <label class="c-song__label">歌单名称</label> -->
        dsds
        <music-input v-model="name"/>
      </div>
      <div class="c-song__form">
        <label class="c-song__label">歌单介绍</label>
        <music-text-area v-model="remark"/>
      </div>
    </div>
    <div class="c-add__song">
      <button class="c-add__btn" @click="addSongList">创建</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicAddSongList',
  data() {
    return {
      name: '',
      remark: '',
    }
  },
  mounted() {
    this.$common.trigger('getStatus', '新建歌单', 'title')
  },
  methods: {
    addSongList() {
      if (!this.name) return void this.$toast('请输入歌单名称')
      this.$http.get(this.$api.addSongList, {
        params: {
          name: this.name,
          description: this.remark
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$toast('添加成功')
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .g-layout {
    padding: 0 30px;
    .c-song__add {
      margin-top: 30px;
    }
    .c-add__song {
      width: 90%;
      box-sizing: border-box;
      position: absolute;
      bottom: 40px;
      .c-add__btn {
        width: 100%;
        height: 80px;
        background: yellow;
        color: #333;
        text-align: center;
        line-height: 80px;
        border-radius: 50px;
        font-size: 32px;
      }
    }
    .c-song__form {
      margin-bottom: 40px;
      display: flex;
      flex-direction: column;
      .c-song__label {
        margin-bottom: 20px;
        color: #ccc;
      }
      .c-home__search {
        width: 100%;
      }
    }
  }
</style>
