const api = {
  // 登录
  login: '/login/cellphone', // 账号密码登录
  loginOut: '/logout', // 退出登录
  sendCapture: '/captch/sent', // 发送验证码
  verifyCapture: '/captch/verify', // 验证验证码
  resetPwd: '/captch/register', // 重置密码
  loginStatus: '/login/status', // 查询登录状态

  // 广告
  getBanner: '/banner',

  // 热门
  playHot: '/playlist/hot', // 热门歌单

  // 获取用户电台
  userInfo: '/user/detail', // 获取用户信息
  userUpdate: '/user/update', // 更新用户信息

  userDj: '/user/dj',
  recommendSong: '/personalized', // 推荐歌单
  searchHot: '/search/hot', // 热搜,
  searchSong: '/search', // 多重匹配
  searchAdvance: '/search/suggest', // 搜索建议
  userSong: '/user/playlist', // 获取用户歌单
  userRecent: '/user/record', // 获取最近用户歌单
  likeSong: '/like', // 喜欢音乐
  loveSongList: '/likelist', // 喜欢音乐的列表
  userSubCount: '/user/subcount', // 喜欢音乐的列表
  userEvent: '/user/event', // 获取用户动态
  userFollows: '/user/follows', // 获取用户关注
  userFolloweds: '/user/followeds', // 获取用户粉丝
  recommendByPerDay: '/recommend/songs', // 获取每日推荐歌曲
  addSongList: '/playlist/create', // 新建歌单
  songUrl: '/song/url', // 歌曲地址
  playListDetail: '/playlist/detail', // 歌单内容
  songLyrics: '/lyric', // 获取歌词
  songDetail: '/song/detail', // 获取歌曲详情
  simoSong: '/simi/song', // 获取详细的歌曲
  removeSong: '/playlist/tracks', // 删除歌单中的歌曲

  // 关注
  followUser: '/follow', // 关注或者取关

  // 消息
  noticeLists: '/msg/private', // 消息列表
  noticeHistory: '/msg/private/history', // 消息内容
  sendNotice: '/send/text', // 发送消息

  // 评论
  songComment: '/comment/music', // 歌曲评论列表
  /**
   * @params {Number} type
   * 0: 歌曲
     1: mv
     2: 歌单
     3: 专辑
     4: 电台
     5: 视频
     6: 动态
   */
  likeMusic: '/comment/like'
}

export default {
  install(Vue) {
    Vue.prototype.$api = api
  }
}
