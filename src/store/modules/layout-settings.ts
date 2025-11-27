
import { defineStore } from "pinia";
import { ref } from "vue";
const useSettingsStore = defineStore('Settings', () => {
    // 是否折叠
    let isFold = ref(false)
    // 是否刷新
    let isRefresh = ref(false)
    // 更改折叠状态
    const changeIsFold = () => {
        isFold.value = !isFold.value
    }
    // 更改刷新状态
    const changeIsRefresh = () => {
        isRefresh.value = !isRefresh.value
    }
    return {
        isFold,
        changeIsFold,
        isRefresh,
        changeIsRefresh
    }
})
export default useSettingsStore
