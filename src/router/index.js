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
        showHeader: true,
        oDeep: 3
      },
      component: () => import('@/views/Search')
    }
  ]
})
