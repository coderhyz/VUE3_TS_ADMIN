<template>
  <!-- 全局配置：设置 Element Plus 中文 -->
  <el-config-provider :locale="zhCn">
    <!-- 一级路由入口 -->
    <router-view />
  </el-config-provider>

</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'

</script>

<style lang="scss" scoped></style>