const api = {
  // 登录
  login: '/login/cellphone', // 账号密码登录
  sendCapture: '/captch/sent', // 发送验证码
  verifyCapture: '/captch/verify', // 验证验证码
  resetPwd: '/captch/register', // 重置密码
  loginStatus: '/login/status', // 查询登录状态

  // 广告
  getBanner: '/banner',

  // 获取用户电台
  userInfo: '/user/detail', // 获取用户信息
  userDj: '/user/dj',
  recommendSong: '/personalized', // 推荐歌单
  searchHot: '/search/hot', // 热搜,
  searchSong: '/search', // 多重匹配
  searchAdvance: '/search/suggest', // 搜索建议
  userSong: '/user/playlist', // 获取用户歌单
  userRecent: '/user/record', // 获取最近用户歌单
  loveSongList: '/likelist', // 喜欢音乐的列表
  userSubCount: '/user/subcount', // 喜欢音乐的列表
  userEvent: '/user/event', // 获取用户动态
  userFollows: '/user/follows', // 获取用户关注
  userFolloweds: '/user/followeds', // 获取用户粉丝
}

export default {
  install(Vue) {
    Vue.prototype.$api = api
  }
}
