import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MusicHome',
      meta: {
        showHeader: false,
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
    }
  ]
})
