<template>
    <div class="tabbar-right-icon">
        <!-- 图标 -->
        <el-button icon="Refresh" circle @click="handleRefresh" />
        <el-button icon="FullScreen" circle @click="handleFullScreen" />
        <el-button icon="Setting" circle />
    </div>
    <img :src="userStore.avatar" alt="">
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <!-- 下拉菜单插槽 -->
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import useSettingsStore from '@/store/modules/layout-settings';
import useUserStore from '@/store/modules/user';
const settingStore = useSettingsStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
// 刷新页面
const handleRefresh = () => {
    settingStore.changeIsRefresh()
}
// 全屏功能
const handleFullScreen = () => {
    // 如果不是全屏
    if (!document.fullscreenElement) {
        // 改为全屏状态
        document.documentElement.requestFullscreen();
    } else {
        // 退出全屏
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
// 退出登录
const logout = async () => {
    await userStore.userLogout()
    // 跳转到登录页面，
    router.push({
        path: '/login',
        query: {
            redirect: route.path //并且传递当前路由地址作为参数
        }
    })
}

</script>

<style lang="scss" scoped>
.tabbar-right-icon {
    margin-right: 10px;
    display: flex;
    gap: 10px;
    margin-right: 20px;

    :deep(.el-button.is-circle) {
        border: 1px solid var(--el-border-color, #dcdfe6);

        &:hover {
            border-color: var(--el-color-primary, #409eff);
        }
    }
}

img {
    height: 30px;
    width: 30px;
    margin-right: 10px;
}
</style>