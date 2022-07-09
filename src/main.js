import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import MdEditor from 'md-editor-v3'
// import 'md-editor-v3/lib/style.css'
import './axios'
import './permission'

const app = createApp(App)
app.config.globalProperties.$http = axios
app.config.productionTip = false
app.use(store).use(router).use(ElementPlus).mount('#app')
