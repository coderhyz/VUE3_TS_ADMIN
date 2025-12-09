<template>
    <section class="attr-page">
        <!-- 分类组件 -->
        <Category :scene="scene" />
        <!-- 属性卡片 -->
        <el-card style="margin-top:10px ;" shadow="hover">
            <div v-show="scene == 0">
                <el-button :disabled="!categoryStore.c3Id" style="margin-bottom:10px ;" type="primary" icon="Plus"
                    @click="addAttr">添加属性</el-button>
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
            <div v-show="scene == 1">
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请输入属性名称"></el-input>
                    </el-form-item>
                </el-form>
                <!--添加属性值 -->
                <el-button type="primary" size="default" icon="Plus">添加属性值</el-button>
                <el-button @click="scene = 0">取消</el-button>
                <el-table border style="margin-top: 10px; width: 100%;">
                    <el-table-column label="序号" type="index" width="100"></el-table-column>
                    <el-table-column label="属性值名称"></el-table-column>
                    <el-table-column label="属性值操作"></el-table-column>
                </el-table>

                <div style="margin-top: 10px;">
                    <el-button type="primary" size="default">保存</el-button>
                    <el-button type="danger" @click="scene = 0">取消</el-button>
                </div>
            </div>
        </el-card>
    </section>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category';
import { reqAttrInfoList } from '@/api/product/attr/attr';
import { watch, ref, onMounted, reactive } from 'vue';
import type { AttrInfoResponseData, Attr } from '@/api/product/attr/type';

// 商品分类仓库
const categoryStore = useCategoryStore()
// 属性值和属性列表
const attrList = ref<Attr[]>([])
// 是否是添加属性值页面
const scene = ref(0)
// 收集新增的属性的数据
const attrParms = reactive({
    attrName: '', //新增属性的名字
    attrValueList: [
        // { valueName: '' }
    ]
})
// 组件挂载时，如果已选择三级分类，加载属性列表
onMounted(() => {
    if (categoryStore.c3Id) {
        getAttrList()
    }
})
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
 * 监听场景切换，从添加/编辑返回列表时重新加载数据
 */
watch(
    () => scene.value,
    (newScene) => {
        // 从添加/编辑页返回列表页时，如果已选择三级分类，重新加载属性列表
        if (newScene === 0 && categoryStore.c3Id) {
            getAttrList()
        }
    }
)
/**
 * 获取属性列表
 */
const getAttrList = async () => {
    /**
     * 获取属性列表接口调用
     */
    const res: AttrInfoResponseData = await reqAttrInfoList(categoryStore.c1Id, categoryStore.c2Id, categoryStore.c3Id)

    if (res.code === 200) {

        attrList.value = res.data
        // console.log(attrList.value)
    }
}

/**
 * 切换到添加属性页面
 */
const addAttr = () => {
    scene.value = 1
}

</script>

<style lang="scss" scoped>
.attr-page {
    display: flex;
    flex-direction: column;
}
</style>