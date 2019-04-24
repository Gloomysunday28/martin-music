<template>
  <div class="g-layout">
    <div class="c-music__login">
      <!-- <div class="c-music__logo">
        <img class="c-music__logo" src="@/assets/img/logo.png" alt="">
      </div>-->
      <div>
        <div class="c-input__contain">
          <label class="c-input__label">账号</label>
          <input class="c-music__input" type="tel" v-model="phone">
        </div>
        <div class="c-input__contain">
          <label class="c-input__label">密码</label>
          <input class="c-music__input" type="password" v-model="password">
        </div>
        <div class="c-input__contain c-method__capture" v-if="showCapture">
          <label class="c-input__label">验证码</label>
          <input class="c-music__input" type="text" v-model="capture">
          <label class="c-input__label c-input__capture" @click="sendCapture">{{countDown}}</label>
        </div>
      </div>
      <div class="c-login__method">
        <span class="c-method__item" @click="showCapture = false">账号密码</span>
        <span class="c-method__item" @click="showCapture = true">修改密码</span>
      </div>
    </div>
    <button class="c-music__submit" @click="showCapture ? resetPassword() : login()">{{showCapture ? '修改密码' : '登录'}}</button>
  </div>
</template>

<script>
export default {
  name: 'MusicLogin',
  data() {
    return {
      showCapture: false,
      phone: '',
      password: '',
      capture: '', // 验证码
      countDown: '发送验证码',
    }
  },
  methods: {
    // 发送验证码
    sendCapture() {
      if (!this.phone) return void this.$toast('请输入手机号码')
      this.$http.get(this.$api.sendCapture, {
        params: {
          phone: this.phone
        }
      }).then(res => {
        this.$toast('发送成功')
      })
      this.countDown = 60 + 's'
      this.timer = setInterval(_ => {
        if (parseInt(this.countDown, 10) <= 0) {
          this.countDown = '发送验证码'
          return void clearInterval(this.timer)
        }

        this.countDown = parseInt(this.countDown, 10) - 1 + 's'
      }, 1000)
    },
    resetPassword() {
      this.$http.get(this.$api.verifyCapture, {
        params: {
          phone: this.phone,
          captcha: this.capture
        }
      }).then(res => {
        if (res.data.code === 200) {
          return this.$http.get(this.$api.resetPwd, {
            params: {
              phone: this.phone,
              password: this.password,
              captcha: this.capture
            }
          })
        } else this.$toast('验证码错误')
      }).then(res => {
        if (res.data.code === 200) this.$toast('修改密码成功!')
      })
    },
    login() {
      this.$http.get(this.$api.login, {
        params: {
          phone: this.phone,
          password: this.password
        }
      }).then(res => {
        if (res.data.code === 200) {
          window.localStorage.setItem('personal', JSON.stringify(res.data.profile))
          this.$store.dispatch('setPersonInfo', res.data.profile)
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.g-layout {
  position: relative;
  .c-music__login {
    width: 80%;
    height: 400px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    .c-music__logo {
      width: 100%;
      height: 100px;
      mix-blend-mode: screen;
    }
    .c-input__contain {
      margin: 40px 0;
      height: 60px;
      position: relative;
      display: flex;
      &.c-method__capture {
        .c-music__input {
          border-radius: 0;
        }
        .c-input__capture {
          width: 28%;
          border-radius: 0 30px 30px 0;
          border-left: 1Px solid #ccc;
        }
      }
      .c-input__label {
        flex: none;
        width: 20%;
        color: #444;
        background: #fff;
        border-radius: 30px 0 0 30px;
        text-align: center;
        line-height: 60px;
        border-right: 1Px solid #ccc;
      }
    }
    .c-music__input {
      width: 100%;
      padding-left: 20px;
      box-sizing: border-box;
      height: 60px;
      border-radius: 0 30px 30px 0;
      font-size: 30px;
      color: #444;
    }
    .c-login__method {
      margin-top: 10px;
      display: flex;
      .c-method__item {
        flex: 1;
        color: #fff;
        text-align: center;
      }
    }
  }
  .c-music__submit {
    position: absolute;
    width: 80%;
    left: 50%;
    bottom: 100px;
    transform: translateX(-50%);
    padding: 15px 0;
    border-radius: 30px;
    background: yellow;
    color: #444;
    font-size: 28px;
    font-weight: 600;
  }
}
</style>
