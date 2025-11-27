import { createApp } from 'vue'
import App from './App.vue'

// 导入全局组件
import gloablComponent from './components'
import router from './router'
// 注册仓库
import pinia from './store'
import 'virtual:svg-icons-register'
const app = createApp(App)
// 使用全局组件
app.use(gloablComponent)
app.use(router)
app.use(pinia)
// 引入全局样式
import '@/styles/index.scss'
import './permission' // 路由鉴权
// 开发环境变量
// console.log(import.meta.env.VITE_APP_BASE_API)
app.mount('#app')