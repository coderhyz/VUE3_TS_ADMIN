import { createPinia } from "pinia";
const pinia = createPinia()
// 统一导入
export * from './modules/layout-settings'
export * from './modules/user'
export default pinia