<template>
    <div class="layout-container">
        <!-- 左侧菜单 -->
        <div class="layout-menu" :class="{ fold: settingsStore.isFold }">
            <Logo></Logo>
            <!-- 递归菜单 滚动组件 -->
            <el-scrollbar class="scroll-bar">
                <!-- 展示菜单 -->
                <el-menu :collapse="settingsStore.isFold" :default-active="route.path" unique-opened router
                    background-color="#001529" text-color="white">
                    <!-- 传递的路由 -->
                    <Menu :menuList="userStore.menuList"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 导航栏 -->
        <div class="layout-navbar" :class="{ fold: settingsStore.isFold ? true : false }">
            <Tabbar></Tabbar>
        </div>
        <!-- 主要内容 -->
        <div class="layout-main" :class="{ fold: settingsStore.isFold }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Menu from './menu/menu.vue';
import Logo from './logo/index.vue';
import Main from './main/main.vue';
import Tabbar from './tabbar/tabbar.vue';
import useUserStore from '@/store/modules/user';
import useSettingsStore from '@/store/modules/layout-settings';
import { useRoute } from 'vue-router';
const userStore = useUserStore()
const route = useRoute()
const settingsStore = useSettingsStore()
</script>

<style lang="scss" scoped>
.layout-container {
    width: 100%;
    height: 100vh;
    // background-color: red;

    .layout-menu {
        width: $menu-width;
        height: 100%;
        background-color: $base-menu-color;
        color: white;
        transition: width .25s ease;
        will-change: width;
        overflow: hidden;

        &.fold {
            width: $base-menu-min-width;
        }

        .scroll-bar {
            height: calc(100% - $base-navbar-height);

            /* 隐藏 el-scrollbar 自带滚动条但保留滚动能力 */
            :deep(.el-scrollbar__bar) {
                display: none;
            }

            :deep(.el-scrollbar__wrap) {
                /* Firefox / IE */
                -ms-overflow-style: none;
                scrollbar-width: none;
                /* 避免右侧预留滚动槽导致的小缝隙 */
                margin-right: 0 !important;
                padding-right: 0 !important;
                overflow-x: hidden;
            }

            :deep(.el-scrollbar__wrap::-webkit-scrollbar) {
                /* Chrome / Safari */
                width: 0;
                height: 0;
            }
        }

        /* 让菜单填满容器并移除右边框，避免右侧缝隙 */
        :deep(.el-menu) {
            width: 100%;
            border-right: none;
        }
    }

    .layout-navbar {
        position: fixed;
        top: 0;
        left: $menu-width;
        right: 0;
        height: $base-navbar-height;
        transition: left .25s ease;
        will-change: left;

        &.fold {
            left: $base-menu-min-width;
        }
    }

    .layout-main {
        position: absolute;
        top: $base-navbar-height;
        left: $menu-width;
        right: 0;
        height: calc(100% - $base-navbar-height);
        transition: left .25s ease;
        will-change: left;

        &.fold {
            left: $base-menu-min-width;
        }

        overflow: auto;
        padding: 20px;
    }
}
</style>