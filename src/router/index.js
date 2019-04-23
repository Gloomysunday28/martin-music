import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
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
      component: () => import('@/views/Home')
    },
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
      path: '/person',
      name: 'MusicPerson',
      meta: {
        keepAlive: true,
        showHeader: true,
        oDeep: 3,
        title: '我的'
      },
      component: () => import('@/views/Person')
    }
  ]
})
