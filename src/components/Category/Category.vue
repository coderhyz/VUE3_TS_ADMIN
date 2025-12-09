<template>
    <!-- 分类组件 -->
    <el-card>
        <el-form :inline="true" label-width="80px" class="category-form">
            <el-form-item label="一级分类">
                <!-- 
                v-model:绑定的值
                 label:展示的选择文本
                value:选项的值
                -->
                <el-select v-model="categoryStore.c1Id" placeholder="请选择一级分类" clearable
                    :disabled="scene == 1 ? true : false" class="category-select">
                    <el-option v-for="item in categoryStore.categoryOneList" :key="item.id" :label="item.name"
                        :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model="categoryStore.c2Id" placeholder="请选择二级分类" clearable
                    :disabled="scene == 1 ? true : false || !categoryStore.categoryTwoList.length"
                    class="category-select">
                    <el-option v-for="item in categoryStore.categoryTwoList" :key="item.id" :label="item.name"
                        :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model="categoryStore.c3Id" placeholder="请选择三级分类" clearable
                    :disabled="scene == 1 ? true : false || !categoryStore.categoryThreeList.length"
                    class="category-select">
                    <el-option v-for="item in categoryStore.categoryThreeList" :key="item.id" :label="item.name"
                        :value="item.id" />
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category';
import { onMounted, watch } from 'vue';
// 分类仓库
const categoryStore = useCategoryStore()
// 获取分类列表
const getCategoryList = async () => {
    await categoryStore.getCategoryOneList()
    // 如果store中已有一级分类id，恢复二级分类列表
    if (categoryStore.c1Id) {
        await categoryStore.getCategoryTwoList(categoryStore.c1Id)
    }
    // 如果store中已有二级分类id，恢复三级分类列表
    if (categoryStore.c2Id) {
        await categoryStore.getCategoryThreeList(categoryStore.c2Id)
    }
}
onMounted(() => {
    getCategoryList()
})
/**
 * 监听一级分类id变化，联动更新下级分类列表
 */
watch(
    () => categoryStore.c1Id,
    async (newId) => {
        categoryStore.resetAfterLevel1Change()
        if (newId) {
            await categoryStore.getCategoryTwoList(newId)
        }
    }
)
/**
 * 监听二级分类id变化，联动更新下级分类列表
 */
watch(
    () => categoryStore.c2Id,
    async (newId) => {
        categoryStore.resetAfterLevel2Change()
        if (newId) {
            await categoryStore.getCategoryThreeList(newId)
        }
    }
)

watch(
    () => categoryStore.c3Id,
    () => {
        // 预留：选择三级分类后可触发属性列表刷新
    }
)
defineProps(['scene'])
</script>

<style lang="scss" scoped>
.category-form {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}

.category-select {
    width: 220px;
}
</style>