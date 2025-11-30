<template>
    <!-- 分类组件 -->
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类" style="width: 240px">
                <el-select placeholder="请选择一级分类" clearable>
                    <el-option label="北京" value="shanghai" />
                    <el-option label="上海" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" style="width: 240px">
                <el-select placeholder="请选择二级分类" clearable>
                    <el-option label="北京" value="shanghai" />
                    <el-option label="上海" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类" style="width: 240px">
                <el-select placeholder="请选择三级分类" clearable>
                    <el-option label="北京" value="shanghai" />
                    <el-option label="上海" value="beijing" />
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped></style>