import { defineStore } from "pinia";
import { ref } from "vue";
import { reqCategory1List, reqCategory2List, reqCategory3List } from "@/api/product/attr/attr";
import type { AttrCategoryData } from "@/api/product/attr/type";
const useCategoryStore = defineStore('category', () => {
    // 分类列表数据
    const categoryOneList = ref<AttrCategoryData[]>([])
    const categoryTwoList = ref<AttrCategoryData[]>([])
    const categoryThreeList = ref<AttrCategoryData[]>([])
    // 分类id
    const c1Id = ref<string | number>('')
    const c2Id = ref<string | number>('')
    const c3Id = ref<string | number>('')
    // 请求一级分类列表数据
    const getCategoryOneList = async () => {
        const res = await reqCategory1List()
        if (res.code === 200) {
            categoryOneList.value = res.data
        } else {
            categoryOneList.value = []
        }
    }
    // 请求二级分类列表数据
    const getCategoryTwoList = async (category1Id: number | string) => {
        const res = await reqCategory2List(category1Id)
        if (res.code === 200) {
            categoryTwoList.value = res.data
        } else {
            categoryTwoList.value = []
        }
    }
    // 请求三级分类列表数据
    const getCategoryThreeList = async (category2Id: number | string) => {
        const res = await reqCategory3List(category2Id)
        if (res.code === 200) {
            categoryThreeList.value = res.data
        } else {
            categoryThreeList.value = []
        }
    }

    const resetAfterLevel1Change = () => {
        c2Id.value = ''
        c3Id.value = ''
        categoryTwoList.value = []
        categoryThreeList.value = []
    }

    const resetAfterLevel2Change = () => {
        c3Id.value = ''
        categoryThreeList.value = []
    }
    return {
        categoryOneList,
        categoryTwoList,
        categoryThreeList,
        getCategoryOneList,
        getCategoryTwoList,
        getCategoryThreeList,
        resetAfterLevel1Change,
        resetAfterLevel2Change,
        c1Id,
        c2Id,
        c3Id
    }
})
export default useCategoryStore;