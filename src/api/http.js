import Vue from 'vue'
import Router from '@/router'
import axios from 'axios'
import qs from 'qs'

const box = new Vue()

const Axios = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  // baseURL: 'http://111.231.55.237:3000',
  timeout: 10000,
  withCredentials: true,
  // transformRequest(data) {
  //   return qs.stringify(data)
  // }
  paramsSerializer: function(params) {
    return qs.stringify(params, {arrayFormat: 'repeat'})
  }
})

Axios.interceptors.request.use((config) => {
  box.$loading(true)
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
      case 301:
        Router.push({name: 'MusicLogin'})
        break
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
