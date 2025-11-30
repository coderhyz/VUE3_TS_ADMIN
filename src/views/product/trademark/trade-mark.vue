<template>
    <!-- 品牌管理 -->
    <el-card>
        <!-- 添加品牌按钮 -->
        <el-button @click="addTrademark" type="primary" icon="Plus" style="margin: 10px 10px 10px 0">添加品牌</el-button>
        <!-- 表格 -->
        <el-table :data="trademarkList" border style="width: 100%; margin-top: 20px 0">
            <el-table-column label="序号" width="100" type="index"></el-table-column>
            <el-table-column prop="tmName" label="品牌名称" width="180"></el-table-column>
            <el-table-column label="品牌LOGO">
                <!-- 插槽 -->
                <template #default="{ row }">
                    <img style="width: 60px; height: 60px; object-fit: contain; border-radius: 4px; border: 1px solid #eee;"
                        :src="row.logoUrl" alt="品牌LOGO">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <!-- 作用域插槽 -->
                <template #default="{ row, $index }">
                    <el-button type="primary" icon="Edit" @click="handleEdit(row)"></el-button>
                    <el-popconfirm title="是否确认删除该品牌？" confirm-button-text="确认" cancel-button-text="取消" width="200px"
                        @confirm="handleDelete(row.id)">
                        <template #reference>
                            <el-button type="danger" icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <!-- 
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[3, 4, 5, 6]"
        page-sieze: 每页条数
        v-model:current-page="pageNo": 当前页
        :total="totalSize": 总条数

        -->
        <div class="page-box" style="margin-top: 20px; text-align: right;">
            <el-pagination v-model:current-page="pageNo" :background=true v-model:page-size="pageSize"
                :page-sizes="[3, 4, 5, 6]" layout=" prev, pager, next, jumper,->,total, sizes" :total="totalSize"
                @current-change="getTrademarkList" @size-change="handleSizeChange" />
        </div>
        <!-- dialog组件 -->
        <el-dialog v-model="dialogVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" width="500" align-center>
            <!-- 表单 -->
            <el-form :rules="trademarkRules" :model="trademarkParams" ref="trademarkForm">
                <el-form-item label="品牌名称" prop="tmName" label-width="80px">
                    <el-input v-model="trademarkParams.tmName" placeholder="请您输入品牌名称"></el-input>
                </el-form-item>
                <!-- logo上传组件 -->
                <el-form-item label="品牌LOGO" prop="logoUrl" label-width="80px">
                    <el-upload class="avatar-uploader" action="http://127.0.0.1:10086/admin/product/fileUpload"
                        :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <!-- 自定义底部 -->
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handleCancel">取消</el-button>
                    <el-button type="primary" @click="handleConfirm">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>

    </el-card>
</template>

<script setup lang="ts">
import { reqAddTrademarkOrUpdateTrademark, reqDeleteTrademark, reqGetTrademarkList } from '@/api/product/trademark';
import { nextTick, onMounted, reactive, ref } from 'vue';
import type { Trademark, TrademarkList, getTrademarkResponseData } from '@/api/product/trademark/type';
import type { UploadProps } from 'element-plus'
import useUserStore from '@/store/modules/user';
// 用户仓库
const userStore = useUserStore()
// 图片上传也需要传递token
const headers = { token: userStore.token }
// 当前页
const pageNo = ref(1);
// 每页条数
const pageSize = ref(3);
// 总条数
const totalSize = ref(15);
// 品牌列表数据
const trademarkList = ref<TrademarkList>([]);
// 对话框显示状态
const dialogVisible = ref<boolean>(false)
// 要添加的品牌参数
const trademarkParams = reactive<Trademark>({
    tmName: '',
    logoUrl: ''
})
// 表单ref
const trademarkForm = ref<any>(null);
/**
 * 校验品牌名
 */
const validateTmName = (rule: any, value: any, callback: any) => {
    const regTmName = /^[\u4e00-\u9fa5]{2,}$/
    if (regTmName.test(value.trim())) {
        callback()
    } else {
        callback(new Error('请输入两位以上的汉字'))
    }
}
/**
 * 校验logoUrl
 */
const validateLogoUrl = (rule: any, value: any, callback: any) => {
    if (value) {
        callback()
    } else {
        callback(new Error('请务必上传品牌LOGO'))
    }
}
/**
 * 添加品牌校验规则
 */
const trademarkRules = {
    tmName: [
        { required: true, message: '请输入品牌名称', trigger: 'blur' },
        // 校验函数
        { validator: validateTmName, trigger: 'blur' }
    ],
    logoUrl: [
        { required: true, validator: validateLogoUrl, trigger: 'blur' },

    ]
}
/**
 * 
 * @param pager 
 * 获取品牌列表函数
 */
const getTrademarkList = async (pager: number = 1) => {
    // 当前页
    pageNo.value = pager
    /**
     * 当前页
     * 每页条数
     */
    const res: getTrademarkResponseData = await reqGetTrademarkList(pageNo.value, pageSize.value)
    if (res.code === 200) {
        trademarkList.value = res.data.records.map((item: Trademark) => {
            const newLogoUrl = item.logoUrl.replace(/^\/api/, '')
            return {
                ...item,
                logoUrl: import.meta.env.VITE_APP_BASE_API + newLogoUrl
            }
        })
        totalSize.value = res.data.total
    }
}
/**
 * 分页器每页条数pageSize改变的回调
 */
const handleSizeChange = () => {
    getTrademarkList()
}
/** 
 * 添加品牌按钮
 * */
const addTrademark = () => {
    dialogVisible.value = true
    // 清除表单校验信息
    trademarkForm.value.clearValidate()
    //清空收集数据
    trademarkParams.id = 0;
    trademarkParams.tmName = '';
    trademarkParams.logoUrl = '';

}
/**
 * 点击dialog取消按钮
 *  */
const handleCancel = () => {
    dialogVisible.value = false
    // 清除表单校验信息
    trademarkForm.value.clearValidate()
}
/**
 * 点击确定按钮添加/修改品牌
 * */
const handleConfirm = async () => {
    await trademarkForm.value.validate()
    try {

        // 修改或者添加品牌
        const res = await reqAddTrademarkOrUpdateTrademark(trademarkParams)
        if (res.code == 200) {
            // 根据id判断是增加还是修改
            ElMessage.success(trademarkParams.id ? '修改品牌成功' : '添加品牌成功')
            getTrademarkList(trademarkParams.id ? pageNo.value : 1)

        }
    } catch (error: any) {
        ElMessage.error(error.message)
    } finally {
        dialogVisible.value = false
    }
}
/**
 * 添加图片后的回调
 * @param response 
 */
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    inputFile,
) => {
    // 
    const newLogoUrl = response.data.replace(/^\/api/, '')
    trademarkParams.logoUrl = import.meta.env.VITE_APP_BASE_API + newLogoUrl
    nextTick(() => {
        // 清除表单校验信息
        trademarkForm.value.clearValidate(['logoUrl'])
    })
}
/**
 * 
 * @param rawFile 
 * 上传文件之前的回调
 * 主要对文件格式和大小等进行限制
 */
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('上传的图片必须是 JPG 或 PNG 格式!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 20) {
        ElMessage.error('上传的图片大小要小于 20MB!')
        return false
    }
    return true
}
/**
 * 更新品牌
 * @param id 
 */
const handleEdit = (row: Trademark) => {
    dialogVisible.value = true
    Object.assign(trademarkParams, row)
}
/**
 * 删除品牌
 * @param id 
 */
const handleDelete = async (id: number) => {
    try {
        const res = await reqDeleteTrademark(id)
        if (res.code === 200) {
            ElMessage.success('删除品牌成功')
            // 删除成功后重新获取品牌列表
            // 判断当前页是否还有数据
            if (trademarkList.value.length === 1 && pageNo.value > 1) {
                pageNo.value -= 1
            }
            getTrademarkList(pageNo.value)
        }
    } catch (error: any) {
        ElMessage.error(error.message)
    }
}
/**
 * 生命周期钩子
 * 页面加载完毕获取品牌列表
 */
onMounted(() => {
    getTrademarkList()
})
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>