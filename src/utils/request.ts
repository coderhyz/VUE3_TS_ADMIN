// axios二次封装
import axios from 'axios';
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/modules/user';

// 网络请求实例
const instance = axios.create({
    baseURL: 'http://127.0.0.1:10086',
    timeout: 5000
})
// 请求前要做什么
instance.interceptors.request.use((config) => {
    // 携带token
    const userStore = useUserStore();
    const token = userStore.getToken()
    if (token) {
        config.headers.token = token
    }
    return config
})
// 请求后要做什么
instance.interceptors.response.use((response) => {
    const code = response.data.code
    // 状态码不等于200要会返回错误信息
    if (code != 200) {
        return Promise.reject(new Error(response.data.message))
    }
    return response.data
}, (error) => {
    let msg = '';
    let status = error.response.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break
        case 403:
            msg = "无权访问";
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络"
    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error)
})
export default instance;