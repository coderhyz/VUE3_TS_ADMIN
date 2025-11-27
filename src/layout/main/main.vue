<template>
    <!-- 过渡动效路由 -->
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" v-if="isRefreshFlag" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import useSettingsStore from '@/store/modules/layout-settings';
// 全局设置仓库
const settingStore = useSettingsStore()
const isRefreshFlag = ref(true)
// 监听刷新状态
watch(() => settingStore.isRefresh, () => {
    isRefreshFlag.value = false
    // 延迟执行，确保状态更新完成
    nextTick(() => {
        // 重置刷新状态
        isRefreshFlag.value = true
    })

})
</script>

<style lang="scss" scoped>
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active {
    transition: all 1s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>