<template>
    <div class="logo">
        <img src="../../../public/vite.svg" alt="logo">
        <p>后台管理系统</p>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.logo {
    width: 100%;
    height: $base-navbar-height;
    padding: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
        width: 35px;
        height: 35px;

    }

    p {
        font-size: 20px;
        white-space: nowrap;
    }
}
</style>