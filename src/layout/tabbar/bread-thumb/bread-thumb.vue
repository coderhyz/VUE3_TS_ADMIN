<template>
    <el-icon size="24px" @click="changeIcon" class="tabbar-icon">
        <!-- <Expand /> -->
        <!-- <el-icon>
            <Fold />
        </el-icon> -->
        <component :is="settingStore.isFold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight" class="bread-thumb-lg">
        <!-- 匹配的路由 -->
        <template v-for="item in route.matched" :key="item.path">
            <el-breadcrumb-item v-if="item.meta.title" :to="item.path">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                {{ item.meta.title }}
            </el-breadcrumb-item>
        </template>

    </el-breadcrumb>
</template>

<script setup lang="ts">
import useSettingsStore from '@/store/modules/layout-settings';
import { useRoute } from 'vue-router';
// 系统配置仓库
const settingStore = useSettingsStore()
// 路由配置
const route = useRoute()
// 是否打开还是折叠
// 更改图标
const changeIcon = () => {
    // 更改折叠状态
    settingStore.changeIsFold()
}
</script>

<style lang="scss" scoped>
.tabbar-icon {
    margin-right: 10px;
    transition: color .5s;
    height: 30px;
    width: 30px;

    &:hover {
        color: #157bff;
    }
}

.bread-thumb-lg {
    // background-color: pink;
    font-size: 17px;
}
</style>