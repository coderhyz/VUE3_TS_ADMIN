<template>
    <div class="login-container">
        <el-col :span="12" :xs="0">
        </el-col>
        <el-col :span="12" :xs="24">
            <div class="login-form">
                <h1>Hello</h1>
                <h2>欢迎来到运营平台</h2>
                <el-form ref="ruleLoginFormRef" :model="loginForm" label-width="auto" :rules="loginRules">
                    <!-- 用户名-->
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item prop="password">
                        <el-input :prefix-icon="Lock" v-model="loginForm.password" placeholder="请输入密码"
                            show-password></el-input>
                    </el-form-item>
                    <!-- 登录按钮 -->
                    <el-form-item>
                        <el-button :loading="loading" class="login-btn" type="primary" size="default"
                            @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
// import { ElNotification } from "element-plus";
import { getTimeOfDay } from "@/utils/getTimeOfDay";
import useUserStore from '@/store/modules/user'
import router from "@/router";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()

// 用户仓库
const userStore = useUserStore()
// 校验表单
const ruleLoginFormRef = ref()
// 用户登录表单
const loginForm = reactive({
    username: "admin",
    password: "111111"
});
// 加载状态
const loading = ref(false)
// 自定义校验规则
// 校验密码
const validatePassword = (_rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        const regex = /^.{5,10}$/;
        if (regex.test(value)) {
            callback()
        } else {
            callback(new Error('请输入5-10位的密码'))
        }
    }
}
// 校验用户名
const validateUsername = (_rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('用户名不能为空'))
    } else {
        const regex = /^[a-zA-Z0-9]{5,10}$/;
        if (regex.test(value)) {
            callback()
        } else {
            callback(new Error('请输入5-10位字符(不包含特殊字符)的用户名'))
        }
    }
}
// 自定义表单校验规则
const loginRules = reactive({
    username: [
        { trigger: 'change', validator: validateUsername }
    ],
    password: [
        { trigger: 'change', validator: validatePassword }
    ]
})

// 登录
const login = async () => {
    // 用户登录
    try {
        // 表单校验
        await ruleLoginFormRef.value.validate()
        loading.value = true

        // 发起请求
        await userStore.userLogin(loginForm)
        ElNotification({
            title: '登录成功',
            type: 'success',
            message: getTimeOfDay()
        })
        // 获取登陆后要跳转的重定向路径
        let redirectPath: string = (route.query.redirect as string) || '/'
        // 跳转首页
        router.push(redirectPath)
    } catch (error) {
        // console.log(error)
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
    } finally {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.login-container {
    width: 100%;
    height: 100vh;
    background: url("@/assets/images/background.jpg") no-repeat;
    background-size: cover;
    display: flex;

    .login-form {
        position: relative;
        top: 30vh;
        width: 80%;
        padding: 40px;
        background: url("@/assets/images/login_form.png") no-repeat;
        background-size: cover;

        h1 {
            font-size: 48px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        h2 {
            font-size: 24px;
            color: #666;
            margin-bottom: 40px;
        }

        .login-btn {
            width: 100%;
            background-color: #409eff;
            color: #fff;
        }
    }

}
</style>