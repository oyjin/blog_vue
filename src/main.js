import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './axios'

const app = createApp(App)
app.config.globalProperties.$https = axios
app.use(store).use(router).use(ElementPlus).mount('#app')
