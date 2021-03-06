import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import router from './router'

axios.defaults.baseURL = 'http://localhost:8081'

// 前置拦截
axios.interceptors.request.use((config) => {
  // 为所有请求装配上header的token信息
  // config:对象  与 axios.defaults 相当
  // 借助config配置token
  let token = window.localStorage.getItem('token')
  // 判断token存在再做配置
  if (token) {
    console.log('token:' + token)
    config.headers.Authorization = token
  }
  return config
})

axios.interceptors.response.use(
  (response) => {
    let res = response.data

    console.log('=================')
    console.log(res)
    console.log('=================')

    if (res.code === 200) {
      return response
    } else {
      ElMessage({
        message: 'Congrats, this is a fail message.',
        type: 'error'
      })

      return Promise.reject(response.data.msg)
    }
  },
  (error) => {
    console.log(error)
    if (error.response.data) {
      error.message = error.response.data.msg
    }

    if (error.response.status === 401) {
      store.commit('REMOVE_INFO')
      router.push('/login')
    }

    ElMessage({
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)
