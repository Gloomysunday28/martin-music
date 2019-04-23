const api = {
  // 登录
  login: '/login/cellphone', // 账号密码登录
  sendCapture: '/captch/sent', // 发送验证码
  verifyCapture: '/captch/verify', // 验证验证码
  resetPwd: '/captch/register', // 重置密码

  // 广告
  getBanner: '/banner',

  // 获取用户电台
  userDj: '/user/dj',
  recommendSong: '/personalized', // 推荐歌单
  searchHot: '/search/hot', // 热搜,
  searchSong: '/search', // 多重匹配
  searchAdvance: '/search/suggest', // 搜索建议
}

export default {
  install(Vue) {
    Vue.prototype.$api = api
  }
}
