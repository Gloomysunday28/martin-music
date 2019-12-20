import Vue from 'vue'
import Router from 'vue-router'
import PageLoading from '@/components/Base/PageLoading'

function lazyLoadView (AsyncView) {
  const AsyncHandler = () => ({
    // 需要加载的组件 (应该是一个 `Promise` 对象)
    component: AsyncView,
    // 异步组件加载时使用的组件
    loading: PageLoading,
    // 加载失败时使用的组件
    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay: 200,
    // 如果提供了超时时间且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout: 10000
  })
  return Promise.resolve({
    functional: true, // 无状态组件
    render (h, { data, children }) {
      return h(AsyncHandler, data, children)
    }
  })
}

Vue.use(Router)

const router = new Router({
  base: '/martin-music/',
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'MusicLogin',
      meta: {
        showHeader: false,
        isLogin: true,
        isIndex: true,
        oDeep: 0
      },
      component: () => import('@/views/Login')
    },
    {
      path: '/',
      name: 'MusicHome',
      meta: {
        keepAlive: true,
        isHome: true,
        showHeader: true,
        isIndex: true,
        oDeep: 1
      },
      component: () => lazyLoadView(import('@/views/Home'))
    },
    {
      path: '/play/list',
      name: 'MusicPlayList',
      meta: {
        keepAlive: true,
        showHeader: false,
        title: '回忆',
        oDeep: 10,
      },
      component: () => import('@/views/PlayList')
    },
    {
      path: '/search',
      name: 'MusicSearch',
      meta: {
        keepAlive: true,
        showHeader: true,
        oDeep: 3,
        isIndex: true,
        search: true
      },
      component: () => import('@/views/Search')
    },
    {
      path: '/song/type',
      name: 'MusicSongType',
      meta: {
        keepAlive: true,
        showHeader: true,
        oDeep: 3,
        title: '热门歌单'
      },
      component: () => import('@/views/SongType')
    },
    {
      path: '/person',
      name: 'MusicPerson',
      meta: {
        keepAlive: true,
        showHeader: true,
        oDeep: 3,
        title: '我的',
        extra: {
          icon: '&#xe60d;'
        }
      },
      component: () => import('@/views/Person')
    },
    {
      path: '/setting',
      name: 'MusicSetting',
      meta: {
        keepAlive: true,
        showHeader: true,
        oDeep: 4,
        title: '设置',
      },
      component: () => import('@/views/Setting')
    },
    {
      path: '/person/info',
      name: 'MusicPersonInfo',
      meta: {
        keepAlive: false,
        showHeader: false,
        oDeep: 4,
      },
      component: () => import('@/views/PersonInfo')
    },
    {
      path: '/song/list',
      name: 'MusicSongList',
      meta: {
        keepAlive: true,
        showHeader: true,
        oDeep: 4,
        title: '歌单'
      },
      component: () => import('@/views/SongList')
    },
    {
      path: '/add/song/list',
      name: 'MusicAddSongList',
      meta: {
        keepAlive: false,
        showHeader: true,
        oDeep: 5,
        title: '新建歌单'
      },
      component: () => import('@/views/AddSongList')
    },
    {
      path: '/message',
      name: 'MusicMessage',
      meta: {
        keepAlive: false,
        showHeader: true,
        oDeep: 4,
        title: '动态'
      },
      component: () => import('@/views/Message')
    },
    {
      path: '/follows',
      name: 'MusicFollows',
      meta: {
        keepAlive: false,
        showHeader: true,
        oDeep: 4,
        title: '关注'
      },
      component: () => import('@/views/Follows')
    },
    {
      path: '/others/:uid',
      name: 'MusicOthers',
      meta: {
        keepAlive: false,
        showHeader: true,
        oDeep: 15,
        title: ''
      },
      component: () => import('@/views/Others')
    },
    {
      path: '/notice',
      name: 'MusicNotice',
      meta: {
        keepAlive: false,
        showHeader: true,
        oDeep: 5,
        title: '我的消息',
        showCD: false
      },
      component: () => import('@/views/Notice')
    },
    {
      path: '/notice/chat/:id/',
      name: 'MusicChat',
      meta: {
        keepAlive: false,
        showHeader: true,
        oDeep: 6,
        title: '我的消息',
        showCD: false
      },
      component: () => import('@/views/Notice/Chat')
    },
    {
      path: '/song/option/:id',
      name: 'MusicSongInfo',
      meta: {
        keepAlive: false,
        showHeader: false,
        oDeep: 11,
        title: '',
        showCD: false
      },
      component: () => import('@/views/SongInfo')
    },
    {
      path: '/song/comment/:id',
      name: 'MusicSongComment',
      meta: {
        keepAlive: true,
        showHeader: false,
        oDeep: 12,
        title: true,
        showCD: false
      },
      component: () => import('@/views/SongComment')
    },
    {
      path: '/play/song/:id',
      name: 'MusicPlaySong',
      meta: {
        keepAlive: true,
        showHeader: false,
        oDeep: 99,
        title: ''
      },
      component: () => import('@/views/PlaySong')
    },
  ]
})

export default router
