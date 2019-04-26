<template>
  <div class="g-layout">
    <div class="c-person__avatar">
      <img class="c-person__avatar__img" :src="avatar" alt="">
    </div>
    <div class="c-person__info">
      <div class="c-person__detail">
        <p class="c-person__label">昵称</p>
        <music-input v-model="nickname"/>
      </div>
      <div class="c-person__detail" @click="showPicker = true">
        <p class="c-person__label">性别</p>
        <music-input :defaultValue="gender ? '男' : '女'" :disabled="true"/>
      </div>
    </div>
    <music-picker :show-picker.sync="showPicker">
      <div class="c-gendor">
        <div :class="['c-gendor__item', {'c-gendor__item--active': gen.check}]" v-for="gen in gendors" :key="gen.name">
          {{gen.name}}
        </div>
      </div>
    </music-picker>
  </div>
</template>

<script>
import Picker from '@/components/App/Picker'

export default {
  name: 'MusicPersonInfo',
  components: {
    'music-picker': Picker
  },
  data() {
    return {
      showPicker: false,
      avatar: '',
      nickname: '',
      gender: 0,
      gendors: [{
        name: '保密',
        value: 2,
        checked: false,
      }, {
        name: '男',
        value: 1,
        checked: false
      }, {
        name: '女',
        value: 0,
        checked: false
      }]
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$http.get(this.$api.userInfo, {
        params: {
          uid: this.personal.userId
        }
      }).then(res => {
        const person = res.data.profile
        this.avatar = person.avatarUrl
        this.nickname = person.nickname
        this.gender = person.gender
      })
    }
  }
}
</script>

<style scoped lang="less">
  .g-layout {
    padding: 0 30px;
    .c-person__avatar {
      margin: 200px auto 150px;
      width: 120px;
      height: 120px;
      .c-person__avatar__img {
        width: 100%;
        height: 100%;
        border-radius: 120px;
      }
    }
    .c-person__detail {
      margin-bottom: 40px;
      .c-person__label {
        margin-bottom: 30px;
        color: #ccc;
        font-size: 32px;
      }
    }
    .c-gendor {
      padding: 30px;
      display: flex;
      .c-gendor__item {
        width: 80px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 20px;
        color: #000;
        background: #ddd;
      }
    }
  }
</style>
