<template>
    <!-- 分类组件 -->
    <Category />
    <!-- 属性卡片 -->
    <el-card style="margin-top:10px ;">
        <el-button style="margin-bottom:10px ;" type="primary" icon="Plus">添加属性</el-button>
        <!-- 属性表格 -->
        <el-table border style="width: 100%">
            <el-table-column label="序号" type="index" width="100"></el-table-column>
            <el-table-column label="属性名称" width="120"></el-table-column>
            <el-table-column label="属性值名称"> </el-table-column>
            <el-table-column label="操作" width="360"> </el-table-column>

        </el-table>
    </el-card>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped></style>