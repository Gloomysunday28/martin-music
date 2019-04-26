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
        <music-input :defaultValue="gender | parseGender" :disabled="true"/>
      </div>
      <div class="c-person__detail">
        <p class="c-person__label">个性签名</p>
        <music-text-area v-model="signature"/>
      </div>
    </div>
    <div class="c-add__song">
      <button class="c-add__btn" @click="editPerson">保存</button>
    </div>
    <music-picker :show-picker.sync="showPicker">
      <div class="c-gendor">
        <div :class="['c-gendor__item', {'c-gendor__item--active': gen.checked}]" v-for="gen in gendors" :key="gen.name" @click="selectGenger(gen)">
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
  filters: {
    parseGender(gender) {
      const genderMap = {
        0: '保密',
        1: '男',
        2: '女'
      }
      return genderMap[gender]
    }
  },
  data() {
    return {
      showPicker: false,
      avatar: '',
      nickname: '',
      gender: 0,
      signature: '',
      gendors: [{
        name: '保密',
        value: 0,
        checked: false,
      }, {
        name: '男',
        value: 1,
        checked: false
      }, {
        name: '女',
        value: 2,
        checked: false
      }]
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    filterGender() {
      this.gendors.forEach(gen => {
        gen.checked = gen.value === this.gender
      })
    },
    selectGenger(gender) {
      this.gender = gender.value
      this.showPicker = false
      this.filterGender()
    },
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
        this.signature = person.signature
      })
    },
    editPerson() {
      this.$http.get(this.$api.userUpdate, {
        params: {
          nickname: this.nickname,
          gender: this.gender,
          signature: this.signature,
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$toast('保存成功')
          this.$router.back()
        } else {
          this.$toast(res.data.msg || '保存失败')
        }
      })
    }
  },
  watch: {
    showPicker(n) {
      if (n) {
        this.filterGender()
      }
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
      height: 100px;
      align-items: center;
      justify-content: center;
      padding: 30px;
      display: flex;
      .c-gendor__item {
        margin-right: 40px;
        width: 100px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 10px;
        font-size: 26px;
        color: #000;
        background: #ddd;
        &.c-gendor__item--active {
          background: yellow;
          color: #444;
          font-weight: bold;
        }
      }
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
  }
</style>
