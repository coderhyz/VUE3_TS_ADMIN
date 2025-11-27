<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item @click="goRoute" v-if="!item.meta.isHidden" :index="item.path">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>

                {{ item.meta.title }}
            </el-menu-item>
        </template>
        <!-- 有子路由但是只有一个子路由 -->
        <template v-if="item.children && item.children.length == 1" @click="goRoute">
            <el-menu-item v-if="!item.children[0].meta.isHidden" :index="item.children[0].path">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>{{ item.children[0].meta.title }}</template>
            </el-menu-item>
        </template>
        <!-- 有子路由且个数大于1 -->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">

            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>

            </template>
            <!-- 递归调用组件 -->
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
defineOptions({
    name: 'Menu'
})
defineProps(['menuList'])
const goRoute = (vc: any) => {
    console.log(vc)
}
</script>

<style lang="scss" scoped>
.icon {
    width: 10px;
    height: 10px;
}


</style>