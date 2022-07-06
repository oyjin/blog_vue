import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
  },
  // 获取state中数据的方式有两种，一种是通过state.token直接调用，一种是在getter中写对应字段的get方法
  // 例如：this.$store.getters.getUser; this.$store.state.token
  getters: {
    // get
    getUser: (state) => {
      return state.userInfo
    }
  },
  // vue文件中可以通过this.$store.commit("方法名", "参数")调用mutations中的set和remove方法
  // 例如；this.$store.commit("SET_USERINFO", userInfo)
  mutations: {
    // set
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem('token', token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state) => {
      state.token = ''
      state.userInfo = {}
      localStorage.setItem('token', '')
      sessionStorage.setItem('userInfo', JSON.stringify(''))
    }
  },
  actions: {},
  modules: {}
})
