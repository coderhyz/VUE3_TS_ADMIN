// 路由鉴权，项目当中路由能不能被访问的权限的设置
import router from "@/router";
import pinia from "./store";
import useUserStore from "./store/modules/user";
// 引入进度条插件
import nprogress from "nprogress";
// pnpm add -D @types/nprogress 类型警告消除
import "nprogress/nprogress.css";
// 配置 nprogress：去掉右上角的旋转圈
nprogress.configure({ showSpinner: false });
const userStore = useUserStore(pinia);
// 检查是否有token

//前置守卫
router.beforeEach(async (to, from, next) => {
    console.log('from', from)
    console.log('to', to)
    if (to.path !== '/login') {
        nprogress.start()
    }
    const token = userStore.getToken()
    if (token) {
        // 有token
        if (to.path === '/login') {
            // 如果有token还想访问登录页，强制跳转到首页
            next({ path: '/' })
        } else {
            // 访问的不是登录页，有token，放行
            // 判断用户资料是否存在
            if (userStore.username) {
                next()
            } else {
                // 获取用户资料
                try {
                    await userStore.getUserInfo()
                    next()
                } catch (error) {
                    // token失效了
                    await userStore.userLogout()
                    next({
                        path: '/login',
                        query: { redirect: to.path } // 将要访问的路由路径作为参数传递给登录页
                    })
                }
            }
        }
    } else {
        // 没有token
        /**
         * 如果没有token，想访问的不是登录页，就强制跳转到登录页
         * 并且把想访问的路由路径作为参数传递给登录页，登录成功后跳转回该路径
         */
        if (to.path === '/login') {
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.path // 将要访问的路由路径作为参数传递给登录页
                }
            })
        }

    }
    // to 将要访问的路由
    // from 从哪个路由而来
    // next 放行函数
    // next()
});

//后置守卫
router.afterEach((to, from) => {
    document.title = to.meta.title as string || '后台管理系统'
    nprogress.done()
    // console.log("路由跳转完成");

});