<template>
    <!-- 分类组件 -->
    <Category />
    <!-- 属性卡片 -->
    <el-card style="margin-top:10px ;" shadow="hover">
        <div class="attrCard">
            <el-button :disabled="!categoryStore.c3Id" style="margin-bottom:10px ;" type="primary"
                icon="Plus">添加属性</el-button>
            <!-- 属性表格 -->
            <template v-if="attrList">
                <el-table :data="attrList" border style="width: 100%">
                    <el-table-column label="序号" type="index" width="100"></el-table-column>
                    <el-table-column prop="attrName" label="属性名称" width="120"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #default="{ row }">
                            <div>
                                <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin-right: 6px;">
                                    {{ item.valueName }}
                                </el-tag>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="360">
                        <template #default="{ row }">
                            <el-button type="primary" icon="Edit"></el-button>
                            <el-popconfirm title="是否确认删除该属性？" confirm-button-text="确认" cancel-button-text="取消"
                                width="200px">
                                <template #reference>
                                    <el-button type="danger" icon="Delete"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>

                </el-table>
            </template>
            <el-empty v-else description="暂无数据" />
        </div>
        <div class="add-attr-card"> </div>
    </el-card>

</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category';
import { reqAttrInfoList } from '@/api/product/attr/attr';
import { watch, ref } from 'vue';
import type { AttrInfoResponseData, Attr } from '@/api/product/attr/type';

// 分类仓库
const categoryStore = useCategoryStore()
// 属性值和属性列表
const attrList = ref<Attr[]>([])
/**
 * 监听三级分类id变化，联动更新属性列表
 */
watch(
    () => categoryStore.c3Id,
    (newC3Id) => {
        if (!newC3Id) return
        // 首先清空属性列表
        attrList.value = []
        getAttrList()
    }
)
/**
 * 获取属性列表
 */
const getAttrList = async () => {
    const res: AttrInfoResponseData = await reqAttrInfoList(categoryStore.c1Id, categoryStore.c2Id, categoryStore.c3Id)

    if (res.code === 200) {
        attrList.value = res.data
    }
}


</script>

<style lang="scss" scoped></style>