import { defineStore } from "pinia";
import { ref } from 'vue'
import { reqLogin, reqLogout, reqUserInfo } from "@/api/user/user";
import type { loginFormData, loginResponseData } from "@/api/user/type";
import { constantRoutes } from "@/router/routes";
import { Set_Token, Get_Token, Remove_Token } from "@/utils/tokenUtils";
const useUserStore = defineStore('User', () => {
    // 用户token
    let token = ref(Get_Token()) || ref('')
    // 用户名
    let username = ref('')
    // 用户头像
    let avatar = ref('')
    // 用户菜单
    const menuList = ref(constantRoutes)
    // 获取token
    const getToken = (): string => {
        return (token.value as string)
    }
    // 设置用户token
    const setToken = (newToken: string): void => {
        token.value = newToken
        Set_Token(newToken)
    }
    // 设置用户名
    const setUsername = (newUsername: string): void => {
        username.value = newUsername
    }
    // 获取用户名
    const getUsername = (): string => {
        return (username.value as string)
    }
    // 设置用户头像
    const setAvatar = (newAvatar: string): void => {
        avatar.value = newAvatar
    }
    // 获取用户头像
    const getAvatar = (): string => {
        return (avatar.value as string)
    }
    // 用户登录方法
    const userLogin = async (data: loginFormData) => {
        // 发起用户登录请求
        const res: loginResponseData = await reqLogin(data)
        console.log(res)
        if (res.code === 200) {
            // 存储token
            setToken((res.data as string))
            return 'ok'
        } else {
            return Promise.reject(new Error((res.message)))
        }
    }
    // 获取用户信息
    async function getUserInfo() {
        const res = await reqUserInfo()
        if (res.code === 200) {
            // 存储用户信息
            username.value = res.data?.name as string
            avatar.value = res.data?.avatar as string
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    }
    // 用户退出登录
    const userLogout = async () => {
        const res = await reqLogout()
        if (res.code === 200) {
            token.value = ''
            username.value = ''
            avatar.value = ''
            Remove_Token()
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }

    }
    return {
        token,
        username,
        avatar,
        getToken,
        setToken,
        getUsername,
        setUsername,
        getAvatar,
        setAvatar,
        userLogin,
        menuList,
        getUserInfo,
        userLogout,
    }
})
export default useUserStore;