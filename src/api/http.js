import Vue from 'vue'
import Router from '@/router'
import axios from 'axios'
import qs from 'qs'

const noCache = [
  '/user/detail',
  '/user/follows',
  '/user/followeds',
  '/follow',
  '/playlist/create',
  '/user/playlist',
  '/user/update',
]

const box = new Vue()

const Axios = axios.create({
  baseURL: 'http://192.168.8.71:3000',
  // baseURL: 'http://111.231.55.237:3000',
  timeout: 10000,
  withCredentials: true,
  paramsSerializer: function(params) {
    return qs.stringify(params, {arrayFormat: 'repeat'})
  }
})

Axios.interceptors.request.use((config) => {
  box.$loading(true)
  if (noCache.includes(config.url)) {
    config.url += (config.url.includes('?') ? '&' : '?') + `timestamp=${+new Date() + 1000 * 60 * 2}` // 网易云音乐api为了避免高频ip请求错误,设置了2分钟的时间不去请求网易云服务器, 如果设置不缓存的话那么设置teimestamp
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

Axios.interceptors.response.use((response) => {
  // Do something with response data
  box.$loading(false)
  if (response) {
    switch (true) {
      case response.data.code !== 200:
        box.$toast(response.data.msg || '请求失败')
        return response
      default:
        break
    }
  }

  return response
}, (error) => {
  box.$loading(false)
  if (error.code === 'ECONNABORTED') return void box.$toast('网络请求超时', {styles: {backgroud: '#fff'}})
  if (error.response) {
    switch (error.response.status) {
      case 301:
        Router.push({name: 'MusicLogin'})
        break
      case 400:
      case 401:
      case 408:
      case 500:
      case 505:
        box.$toast(error.response.data.msg || '请求失败', {styles: {backgroud: '#fff'}})
        return error.response
      case 502:
        box.$toast('网络请求超时', {styles: {backgroud: '#fff'}})
        return error.response
      case 509:
        box.$toast('请求过多次数, 请稍后再试~', {styles: {backgroud: '#fff'}})
        return error.response
      default:
        break
    }
  }
  // Do something with response error
  return Promise.reject(error)
})

export default {
  install(Vue) {
    Vue.prototype.$http = Axios
  }
}
